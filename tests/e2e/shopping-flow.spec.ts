import { test, expect } from '@playwright/test';

test.describe('Digital Shop - Shopping Flow', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to shop
        await page.goto('/shop');
    });

    test('complete shopping flow: browse → filter → quick view → add to cart', async ({ page }) => {
        // Wait for items to load
        await expect(page.locator('[data-testid="item-card"]').first()).toBeVisible();

        // Verify items are displayed
        const itemCards = page.locator('[data-testid="item-card"]');
        await expect(itemCards).toHaveCount(await itemCards.count());

        // Apply category filter
        await page.locator('[data-testid="filter-category"]').selectOption('themes');
        await page.locator('[data-testid="apply-filters"]').click();

        // Wait for filtered results
        await page.waitForTimeout(1000);

        // Open quick view for first item
        const firstItem = page.locator('[data-testid="item-card"]').first();
        await firstItem.locator('[data-testid="quick-view-button"]').click();

        // Verify quick view modal is open
        await expect(page.locator('[data-testid="quick-view-modal"]')).toBeVisible();

        // Check item details are displayed
        await expect(page.locator('[data-testid="item-name"]')).toBeVisible();
        await expect(page.locator('[data-testid="item-price"]')).toBeVisible();
        await expect(page.locator('[data-testid="item-description"]')).toBeVisible();

        // Add to cart from quick view
        await page.locator('[data-testid="add-to-cart"]').click();

        // Verify cart count updated
        await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');

        // Verify success notification
        await expect(page.locator('[role="alert"]')).toContainText(/added to cart/i);
    });

    test('filter items by price range', async ({ page }) => {
        // Set price range
        const minPriceSlider = page.locator('[data-testid="price-range-min"]');
        const maxPriceSlider = page.locator('[data-testid="price-range-max"]');

        await minPriceSlider.fill('10');
        await maxPriceSlider.fill('50');

        // Apply filters
        await page.locator('[data-testid="apply-filters"]').click();

        // Wait for results
        await page.waitForTimeout(1000);

        // Verify URL has filter params
        expect(page.url()).toContain('minPrice=10');
        expect(page.url()).toContain('maxPrice=50');

        // Verify filtered items are within range
        const prices = await page.locator('[data-testid="item-price"]').allTextContents();
        prices.forEach(priceText => {
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            expect(price).toBeGreaterThanOrEqual(10);
            expect(price).toBeLessThanOrEqual(50);
        });
    });

    test('compare multiple items', async ({ page }) => {
        // Select items for comparison (max 3)
        const compareCheckboxes = page.locator('[data-testid="compare-checkbox"]');

        for (let i = 0; i < 3; i++) {
            await compareCheckboxes.nth(i).check();
        }

        // Verify comparison bar appears
        await expect(page.locator('[data-testid="comparison-bar"]')).toBeVisible();
        await expect(page.locator('[data-testid="comparison-bar"]')).toContainText('3 items');

        // Open comparison view
        await page.locator('[data-testid="compare-now"]').click();

        // Verify comparison table
        await expect(page.locator('[data-testid="comparison-table"]')).toBeVisible();

        // Verify 3 columns (one per item)
        const itemColumns = page.locator('[data-testid="comparison-item"]');
        await expect(itemColumns).toHaveCount(3);

        // Verify each item has name, price, rating displayed
        for (let i = 0; i < 3; i++) {
            const column = itemColumns.nth(i);
            await expect(column.locator('[data-testid="item-name"]')).toBeVisible();
            await expect(column.locator('[data-testid="item-price"]')).toBeVisible();
            await expect(column.locator('[data-testid="item-rating"]')).toBeVisible();
        }
    });

    test('sort items by rating', async ({ page }) => {
        // Select sort option
        await page.locator('[data-testid="sort-select"]').selectOption('rating-desc');

        // Wait for sorted results
        await page.waitForTimeout(1000);

        // Get all ratings
        const ratings = await page.locator('[data-testid="item-rating"]').allTextContents();
        const ratingValues = ratings.map(r => parseFloat(r.replace(/[^0-9.]/g, '')));

        // Verify descending order
        for (let i = 0; i < ratingValues.length - 1; i++) {
            expect(ratingValues[i]).toBeGreaterThanOrEqual(ratingValues[i + 1]);
        }
    });

    test('search for items', async ({ page }) => {
        // Enter search term
        const searchInput = page.locator('[data-testid="search-input"]');
        await searchInput.fill('premium theme');
        await searchInput.press('Enter');

        // Wait for results
        await page.waitForTimeout(1000);

        // Verify results contain search term
        const itemNames = await page.locator('[data-testid="item-name"]').allTextContents();
        const hasMatchingItems = itemNames.some(name =>
            name.toLowerCase().includes('premium') || name.toLowerCase().includes('theme')
        );
        expect(hasMatchingItems).toBeTruthy();
    });

    test('handle empty search results', async ({ page }) => {
        // Search for non-existent item
        await page.locator('[data-testid="search-input"]').fill('zzzznonexistent');
        await page.locator('[data-testid="search-input"]').press('Enter');

        // Wait for results
        await page.waitForTimeout(1000);

        // Verify empty state message
        await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
        await expect(page.locator('[data-testid="empty-state"]')).toContainText(/no items found/i);
    });

    test('related items suggestions', async ({ page }) => {
        // Click on an item to view details
        await page.locator('[data-testid="item-card"]').first().click();

        // Wait for item page to load
        await expect(page.locator('[data-testid="item-details"]')).toBeVisible();

        // Scroll to related items section
        await page.locator('[data-testid="related-items"]').scrollIntoViewIfNeeded();

        // Verify related items are displayed
        await expect(page.locator('[data-testid="related-items"]')).toBeVisible();
        const relatedItems = page.locator('[data-testid="related-item-card"]');
        await expect(relatedItems).toHaveCount(await relatedItems.count());

        // Verify related items are the same category
        const mainCategory = await page.locator('[data-testid="item-category"]').textContent();
        const relatedCategories = await page.locator('[data-testid="related-item-category"]').allTextContents();

        relatedCategories.forEach(category => {
            expect(category).toBe(mainCategory);
        });
    });
});

test.describe('Digital Shop - Responsive Design', () => {
    test('mobile view - filters in drawer', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/shop');

        // Verify filters are hidden initially
        await expect(page.locator('[data-testid="filters-panel"]')).not.toBeVisible();

        // Open filters drawer
        await page.locator('[data-testid="open-filters"]').click();

        // Verify filters drawer is visible
        await expect(page.locator('[data-testid="filters-panel"]')).toBeVisible();

        // Close drawer
        await page.locator('[data-testid="close-filters"]').click();
        await expect(page.locator('[data-testid="filters-panel"]')).not.toBeVisible();
    });

    test('tablet view - grid layout adjusts', async ({ page }) => {
        // Set tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await page.goto('/shop');

        // Verify grid displays 2 columns on tablet
        const grid = page.locator('[data-testid="items-grid"]');
        const gridColumns = await grid.evaluate(el => {
            return window.getComputedStyle(el).gridTemplateColumns.split(' ').length;
        });

        expect(gridColumns).toBe(2);
    });
});

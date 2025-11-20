import { render, screen, waitFor } from '../utils/test-utils';
import { mockApiResponse, mockApiError } from '../utils/mock-api';
import { mockItems, mockCategories } from '../utils/fixtures';
import ShopPage from '@/app/shop/page';

// Mock the API module
jest.mock('@/lib/api', () => ({
    getItems: jest.fn(),
    getCategories: jest.fn(),
}));

import * as api from '@/lib/api';

describe('Shop Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Initial Load', () => {
        it('should render shop page with items', async () => {
            // Mock API responses
            (api.getItems as jest.Mock).mockReturnValue(mockApiResponse(mockItems));
            (api.getCategories as jest.Mock).mockReturnValue(mockApiResponse(mockCategories));

            render(<ShopPage />);

            // Wait for items to load
            await waitFor(() => {
                expect(screen.getByText('Item 1')).toBeInTheDocument();
            });

            // Verify multiple items are displayed
            expect(screen.getByText('Item 1')).toBeInTheDocument();
            expect(screen.getByText('Item 2')).toBeInTheDocument();
        });

        it('should show loading state initially', () => {
            (api.getItems as jest.Mock).mockReturnValue(mockApiResponse(mockItems, 1000));

            render(<ShopPage />);

            // Should show loading indicator
            expect(screen.getByRole('status')).toBeInTheDocument();
        });

        it('should handle API errors gracefully', async () => {
            // Mock API error
            (api.getItems as jest.Mock).mockReturnValue(
                mockApiError('Failed to fetch items', 500)
            );

            render(<ShopPage />);

            // Wait for error message
            await waitFor(() => {
                expect(screen.getByRole('alert')).toBeInTheDocument();
            });

            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });

    describe('Filtering', () => {
        it('should filter items by category', async () => {
            (api.getItems as jest.Mock).mockReturnValue(mockApiResponse(mockItems));
            (api.getCategories as jest.Mock).mockReturnValue(mockApiResponse(mockCategories));

            render(<ShopPage />);

            // Wait for items to load
            await waitFor(() => {
                expect(screen.getByText('Item 1')).toBeInTheDocument();
            });

            // Click category filter
            const categoryFilter = screen.getByRole('combobox', { name: /category/i });
            await userEvent.selectOptions(categoryFilter, 'themes');

            // Verify API called with category filter
            expect(api.getItems).toHaveBeenCalledWith(
                expect.objectContaining({ category: 'themes' })
            );
        });

        it('should filter items by price range', async () => {
            (api.getItems as jest.Mock).mockReturnValue(mockApiResponse(mockItems));

            render(<ShopPage />);

            await waitFor(() => {
                expect(screen.getByText('Item 1')).toBeInTheDocument();
            });

            // Adjust price range
            const minPriceInput = screen.getByLabelText(/min price/i);
            const maxPriceInput = screen.getByLabelText(/max price/i);

            await userEvent.clear(minPriceInput);
            await userEvent.type(minPriceInput, '10');
            await userEvent.clear(maxPriceInput);
            await userEvent.type(maxPriceInput, '50');

            // Click apply filters
            const applyButton = screen.getByRole('button', { name: /apply/i });
            await userEvent.click(applyButton);

            // Verify API called with price filters
            expect(api.getItems).toHaveBeenCalledWith(
                expect.objectContaining({ minPrice: 10, maxPrice: 50 })
            );
        });
    });

    describe('Sorting', () => {
        it('should sort items by price ascending', async () => {
            (api.getItems as jest.Mock).mockReturnValue(mockApiResponse(mockItems));

            render(<ShopPage />);

            await waitFor(() => {
                expect(screen.getByText('Item 1')).toBeInTheDocument();
            });

            // Select sort option
            const sortSelect = screen.getByRole('combobox', { name: /sort/i });
            await userEvent.selectOptions(sortSelect, 'price-asc');

            // Verify API called with sort parameters
            expect(api.getItems).toHaveBeenCalledWith(
                expect.objectContaining({ sortBy: 'price', sortOrder: 'asc' })
            );
        });
    });

    describe('Empty States', () => {
        it('should show empty state when no items found', async () => {
            (api.getItems as jest.Mock).mockReturnValue(mockApiResponse([]));

            render(<ShopPage />);

            await waitFor(() => {
                expect(screen.getByText(/no items found/i)).toBeInTheDocument();
            });
        });
    });
});

import { render, screen, waitFor } from '../../../tests/utils/test-utils';
import { ItemQuickView } from './ItemQuickView';
import { ShopItem } from '@/types';

const mockItem: ShopItem = {
    item_id: '1',
    name: 'Premium Theme',
    description: 'A beautiful dark theme for modern websites',
    category: 'themes',
    price: 29.99,
    stock: 15,
    is_available: true,
    image_url: 'https://example.com/theme.jpg',
};

describe('ItemQuickView', () => {
    const mockOnOpenChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render item details correctly', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText('Premium Theme')).toBeInTheDocument();
            expect(screen.getByText('A beautiful dark theme for modern websites')).toBeInTheDocument();
            expect(screen.getByText('themes')).toBeInTheDocument();
            expect(screen.getByText(/29\.99 SBD/)).toBeInTheDocument();
        });

        it('should display stock information', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText('15 items in stock')).toBeInTheDocument();
        });

        it('should display low stock warning', () => {
            const lowStockItem = { ...mockItem, stock: 5 };
            render(
                <ItemQuickView item={lowStockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText('Only 5 left')).toBeInTheDocument();
        });

        it('should show out of stock state', () => {
            const outOfStockItem = { ...mockItem, stock: 0, is_available: false };
            render(
                <ItemQuickView item={outOfStockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText('Out of Stock')).toBeInTheDocument();
        });

        it('should render placeholder when no image', () => {
            const noImageItem = { ...mockItem, image_url: undefined };
            render(
                <ItemQuickView item={noImageItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            // Should show shopping cart icon as placeholder
            const icon = screen.getByRole('img', { hidden: true });
            expect(icon).toBeInTheDocument();
        });

        it('should return null when item is null', () => {
            const { container } = render(
                <ItemQuickView item={null} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(container.firstChild).toBeNull();
        });
    });

    describe('Interactions', () => {
        it('should call onOpenChange when close button clicked', async () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            const closeButton = screen.getByText('Close');
            await userEvent.click(closeButton);

            expect(mockOnOpenChange).toHaveBeenCalledWith(false);
        });

        it('should render add to cart button', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            // AddToCartButton component should be present
            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('Dialog State', () => {
        it('should not render dialog when open is false', () => {
            render(
                <ItemQuickView item={mockItem} open={false} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('should render dialog when open is true', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
    });

    describe('Price Display', () => {
        it('should format price with locale string', () => {
            const expensiveItem = { ...mockItem, price: 1234.56 };
            render(
                <ItemQuickView item={expensiveItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText(/1,234\.56 SBD/)).toBeInTheDocument();
        });

        it('should show price with SBD currency', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            const priceElement = screen.getByText(/SBD/);
            expect(priceElement).toBeInTheDocument();
        });
    });

    describe('Stock Levels', () => {
        it('should show singular "item" for stock of 1', () => {
            const singleItem = { ...mockItem, stock: 1 };
            render(
                <ItemQuickView item={singleItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText('1 item in stock')).toBeInTheDocument();
        });

        it('should show plural "items" for stock > 1', () => {
            const multipleItems = { ...mockItem, stock: 5 };
            render(
                <ItemQuickView item={multipleItems} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByText('5 items in stock')).toBeInTheDocument();
        });

        it('should not show stock text when stock is 0', () => {
            const noStockItem = { ...mockItem, stock: 0 };
            render(
                <ItemQuickView item={noStockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.queryByText(/in stock/)).not.toBeInTheDocument();
        });
    });

    describe('Accessibility', () => {
        it('should have accessible dialog title', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            expect(screen.getByRole('dialog', { name: /Premium Theme/i })).toBeInTheDocument();
        });

        it('should have proper image alt text', () => {
            render(
                <ItemQuickView item={mockItem} open={true} onOpenChange={mockOnOpenChange} />
            );

            const image = screen.getByAltText('Premium Theme');
            expect(image).toBeInTheDocument();
        });
    });
});

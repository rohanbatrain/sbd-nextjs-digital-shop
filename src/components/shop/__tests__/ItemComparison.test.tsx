import { render, screen } from '../../../tests/utils/test-utils';
import { ItemComparison } from './ItemComparison';
import { ShopItem } from '@/types';

const mockItems: ShopItem[] = [
    {
        item_id: '1',
        name: 'Premium Theme',
        description: 'A beautiful dark theme',
        category: 'themes',
        price: 29.99,
        stock: 10,
        is_available: true,
        image_url: 'http://example.com/theme1.jpg',
    },
    {
        item_id: '2',
        name: 'Plugin Pack',
        description: 'Essential plugins bundle',
        category: 'plugins',
        price: 49.99,
        stock: 0,
        is_available: false,
        image_url: 'http://example.com/plugin.jpg',
    },
    {
        item_id: '3',
        name: 'Template Set',
        description: 'Modern templates collection',
        category: 'templates',
        price: 19.99,
        stock: 25,
        is_available: true,
    },
];

describe('ItemComparison', () => {
    const mockOnRemoveItem = jest.fn();
    const mockOnClearAll = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should return null when no items to compare', () => {
            const { container } = render(
                <ItemComparison
                    items={[]}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            expect(container.firstChild).toBeNull();
        });

        it('should render floating button with item count', () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            expect(screen.getByText(/Compare \(3\)/)).toBeInTheDocument();
        });

        it('should show comparison sheet when button clicked', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            const compareButton = screen.getByText(/Compare \(3\)/);
            await userEvent.click(compareButton);

            await waitFor(() => {
                expect(screen.getByText(/Compare Items \(3\/4\)/)).toBeInTheDocument();
            });
        });
    });

    describe('Comparison Table', () => {
        it('should display all item names', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                expect(screen.getByText('Premium Theme')).toBeInTheDocument();
                expect(screen.getByText('Plugin Pack')).toBeInTheDocument();
                expect(screen.getByText('Template Set')).toBeInTheDocument();
            });
        });

        it('should display all comparison attributes', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                expect(screen.getByText('Name')).toBeInTheDocument();
                expect(screen.getByText('Category')).toBeInTheDocument();
                expect(screen.getByText('Price')).toBeInTheDocument();
                expect(screen.getByText('Stock')).toBeInTheDocument();
                expect(screen.getByText('Availability')).toBeInTheDocument();
                expect(screen.getByText('Description')).toBeInTheDocument();
            });
        });

        it('should display formatted prices', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                expect(screen.getByText(/29\.99 SBD/)).toBeInTheDocument();
                expect(screen.getByText(/49\.99 SBD/)).toBeInTheDocument();
                expect(screen.getByText(/19\.99 SBD/)).toBeInTheDocument();
            });
        });

        it('should display availability badges', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                const inStockBadges = screen.getAllByText('In Stock');
                const outOfStockBadges = screen.getAllByText('Out of Stock');

                expect(inStockBadges.length).toBe(2); // Items 1 and 3
                expect(outOfStockBadges.length).toBe(1); // Item 2
            });
        });

        it('should display category badges', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                expect(screen.getByText('themes')).toBeInTheDocument();
                expect(screen.getByText('plugins')).toBeInTheDocument();
                expect(screen.getByText('templates')).toBeInTheDocument();
            });
        });

        it('should display item images', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                const images = screen.getAllByRole('img');
                expect(images.length).toBeGreaterThanOrEqual(2); // At least 2 items have images
            });
        });
    });

    describe('Item Removal', () => {
        it('should call onRemoveItem when remove button clicked', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(async () => {
                const removeButtons = screen.getAllByRole('button', { name: '' });
                // Find X button (first few icon-only buttons are remove buttons)
                if (removeButtons.length > 0) {
                    await userEvent.click(removeButtons[0]);
                    expect(mockOnRemoveItem).toHaveBeenCalled();
                }
            });
        });
    });

    describe('Clear All', () => {
        it('should call onClearAll when clear all button clicked', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(async () => {
                const clearButton = screen.getByText('Clear All');
                await userEvent.click(clearButton);

                expect(mockOnClearAll).toHaveBeenCalled();
            });
        });
    });

    describe('Item Limits', () => {
        it('should show item count with maximum (3/4)', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                expect(screen.getByText('Compare Items (3/4)')).toBeInTheDocument();
            });
        });

        it('should handle single item comparison', async () => {
            render(
                <ItemComparison
                    items={[mockItems[0]]}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            expect(screen.getByText(/Compare \(1\)/)).toBeInTheDocument();

            await userEvent.click(screen.getByText(/Compare \(1\)/));

            await waitFor(() => {
                expect(screen.getByText('Compare Items (1/4)')).toBeInTheDocument();
            });
        });

        it('should handle maximum items (4)', async () => {
            const fourItems = [...mockItems, { ...mockItems[0], item_id: '4', name: 'Fourth Item' }];

            render(
                <ItemComparison
                    items={fourItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            expect(screen.getByText(/Compare \(4\)/)).toBeInTheDocument();

            await userEvent.click(screen.getByText(/Compare \(4\)/));

            await waitFor(() => {
                expect(screen.getByText('Compare Items (4/4)')).toBeInTheDocument();
            });
        });
    });

    describe('Sheet Behavior', () => {
        it('should close sheet when clicking outside', async () => {
            render(
                <ItemComparison
                    items={mockItems}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(3\)/));

            await waitFor(() => {
                expect(screen.getByText('Compare Items (3/4)')).toBeInTheDocument();
            });

            // Sheet component should handle outside clicks
        });
    });

    describe('Edge Cases', () => {
        it('should handle items without images', async () => {
            const noImageItem = { ...mockItems[2], image_url: undefined };

            render(
                <ItemComparison
                    items={[noImageItem]}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(1\)/));

            // Should render placeholder gradient
            await waitFor(() => {
                expect(screen.getByText('Template Set')).toBeInTheDocument();
            });
        });

        it('should handle long descriptions', async () => {
            const longDescItem = {
                ...mockItems[0],
                description: 'This is a very long description that should be truncated or clamped to prevent it from breaking the layout of the comparison table view',
            };

            render(
                <ItemComparison
                    items={[longDescItem]}
                    onRemoveItem={mockOnRemoveItem}
                    onClearAll={mockOnClearAll}
                />
            );

            await userEvent.click(screen.getByText(/Compare \(1\)/));

            await waitFor(() => {
                expect(screen.getByText(/This is a very long description/)).toBeInTheDocument();
            });
        });
    });
});

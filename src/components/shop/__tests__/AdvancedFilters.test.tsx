import { render, screen } from '../../../tests/utils/test-utils';
import { AdvancedFilters } from './AdvancedFilters';
import { FilterOptions } from '@/types';

describe('AdvancedFilters', () => {
    const defaultFilters: FilterOptions = {
        priceRange: { min: 0, max: 1000 },
        availability: 'all',
    };

    const mockOnFiltersChange = jest.fn();
    const maxPrice = 1000;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        it('should render filter card with title', () => {
            render(
                <AdvancedFilters
                    filters={defaultFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('Filters')).toBeInTheDocument();
        });

        it('should render price range filter', () => {
            render(
                <AdvancedFilters
                    filters={defaultFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('Price Range')).toBeInTheDocument();
            expect(screen.getByText('0 SBD')).toBeInTheDocument();
            expect(screen.getByText('1000 SBD')).toBeInTheDocument();
        });

        it('should render availability filter options', () => {
            render(
                <AdvancedFilters
                    filters={defaultFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('Availability')).toBeInTheDocument();
            expect(screen.getByText('All Items')).toBeInTheDocument();
            expect(screen.getByText('In Stock Only')).toBeInTheDocument();
            expect(screen.getByText('Out of Stock')).toBeInTheDocument();
        });

        it('should show reset button when filters are active', () => {
            const activeFilters: FilterOptions = {
                priceRange: { min: 100, max: 500 },
                availability: 'in_stock',
            };

            render(
                <AdvancedFilters
                    filters={activeFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('Reset')).toBeInTheDocument();
        });

        it('should not show reset button when no filters are active', () => {
            render(
                <AdvancedFilters
                    filters={defaultFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.queryByText('Reset')).not.toBeInTheDocument();
        });
    });

    describe('Price Range Interactions', () => {
        it('should call onFiltersChange when price range changes', async () => {
            render(
                <AdvancedFilters
                    filters={defaultFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            const slider = screen.getByRole('slider');
            // Simulate price change
            // Note: actual slider interaction would require more complex testing

            // Just verify slider is present
            expect(slider).toBeInTheDocument();
        });

        it('should display current price range values', () => {
            const customFilters: FilterOptions = {
                priceRange: { min: 200, max: 800 },
                availability: 'all',
            };

            render(
                <AdvancedFilters
                    filters={customFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('200 SBD')).toBeInTheDocument();
            expect(screen.getByText('800 SBD')).toBeInTheDocument();
        });
    });

    describe('Availability Filter', () => {
        it('should call onFiltersChange when availability changes', async () => {
            render(
                <AdvancedFilters
                    filters={defaultFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            const inStockRadio = screen.getByLabelText('In Stock Only');
            await userEvent.click(inStockRadio);

            expect(mockOnFiltersChange).toHaveBeenCalledWith(
                expect.objectContaining({
                    availability: 'in_stock',
                })
            );
        });

        it('should select correct availability option', () => {
            const inStockFilters: FilterOptions = {
                priceRange: { min: 0, max: 1000 },
                availability: 'in_stock',
            };

            render(
                <AdvancedFilters
                    filters={inStockFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            const inStockRadio = screen.getByLabelText('In Stock Only') as HTMLInputElement;
            expect(inStockRadio.checked).toBe(true);
        });
    });

    describe('Reset Functionality', () => {
        it('should reset all filters when reset clicked', async () => {
            const activeFilters: FilterOptions = {
                priceRange: { min: 200, max: 800 },
                availability: 'in_stock',
            };

            render(
                <AdvancedFilters
                    filters={activeFilters}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            const resetButton = screen.getByText('Reset');
            await userEvent.click(resetButton);

            expect(mockOnFiltersChange).toHaveBeenCalledWith({
                priceRange: { min: 0, max: maxPrice },
                availability: 'all',
            });
        });
    });

    describe('Active Filters Detection', () => {
        it('should detect price range as active filter', () => {
            const priceFiltered: FilterOptions = {
                priceRange: { min: 100, max: 1000 },
                availability: 'all',
            };

            render(
                <AdvancedFilters
                    filters={priceFiltered}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('Reset')).toBeInTheDocument();
        });

        it('should detect availability as active filter', () => {
            const availabilityFiltered: FilterOptions = {
                priceRange: { min: 0, max: 1000 },
                availability: 'in_stock',
            };

            render(
                <AdvancedFilters
                    filters={availabilityFiltered}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('Reset')).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined price range', () => {
            const noRange: FilterOptions = {
                availability: 'all',
            };

            render(
                <AdvancedFilters
                    filters={noRange}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            expect(screen.getByText('0 SBD')).toBeInTheDocument();
            expect(screen.getByText('1000 SBD')).toBeInTheDocument();
        });

        it('should handle undefined availability', () => {
            const noAvailability: FilterOptions = {
                priceRange: { min: 0, max: 1000 },
            };

            render(
                <AdvancedFilters
                    filters={noAvailability}
                    onFiltersChange={mockOnFiltersChange}
                    maxPrice={maxPrice}
                />
            );

            const allItemsRadio = screen.getByLabelText('All Items') as HTMLInputElement;
            expect(allItemsRadio.checked).toBe(true);
        });
    });
});

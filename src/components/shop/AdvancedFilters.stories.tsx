import type { Meta, StoryObj } from '@storybook/react';
import { AdvancedFilters } from './AdvancedFilters';
import { FilterOptions } from '@/types';

const meta = {
    title: 'Shop/AdvancedFilters',
    component: AdvancedFilters,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AdvancedFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default filters
export const Default: Story = {
    args: {
        filters: {
            priceRange: { min: 0, max: 1000 },
            availability: 'all',
        },
        maxPrice: 1000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

// Active price filter
export const PriceFiltered: Story = {
    args: {
        filters: {
            priceRange: { min: 200, max: 800 },
            availability: 'all',
        },
        maxPrice: 1000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

// In stock only filter
export const InStockOnly: Story = {
    args: {
        filters: {
            priceRange: { min: 0, max: 1000 },
            availability: 'in_stock',
        },
        maxPrice: 1000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

// Out of stock filter
export const OutOfStock: Story = {
    args: {
        filters: {
            priceRange: { min: 0, max: 1000 },
            availability: 'out_of_stock',
        },
        maxPrice: 1000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

// Multiple active filters
export const MultipleFiltersActive: Story = {
    args: {
        filters: {
            priceRange: { min: 100, max: 500 },
            availability: 'in_stock',
        },
        maxPrice: 1000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

// High price range
export const HighPriceRange: Story = {
    args: {
        filters: {
            priceRange: { min: 0, max: 5000 },
            availability: 'all',
        },
        maxPrice: 5000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

// Narrow price range
export const NarrowPriceRange: Story = {
    args: {
        filters: {
            priceRange: { min: 450, max: 550 },
            availability: 'all',
        },
        maxPrice: 1000,
        onFiltersChange: (filters) => console.log('Filters changed:', filters),
    },
};

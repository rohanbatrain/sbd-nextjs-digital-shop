import type { Meta, StoryObj } from '@storybook/react';
import { ItemCard } from './ItemCard';

const meta = {
    title: 'Shop/ItemCard',
    component: ItemCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        onQuickView: { action: 'quick view clicked' },
        onAddToCart: { action: 'added to cart' },
        onCompareToggle: { action: 'compare toggled' },
    },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default item
export const Default: Story = {
    args: {
        item: {
            id: '1',
            name: 'Premium Dark Theme',
            description: 'A beautiful dark theme for modern websites',
            price: 29.99,
            category: 'themes',
            image: 'https://placehold.co/400x300/1a1a1a/white?text=Dark+Theme',
            rating: 4.5,
            reviewCount: 120,
        },
    },
};

// Item on sale
export const OnSale: Story = {
    args: {
        item: {
            ...Default.args.item,
            salePrice: 19.99,
            originalPrice: 29.99,
        },
    },
};

// Highly rated item
export const HighlyRated: Story = {
    args: {
        item: {
            ...Default.args.item,
            name: 'Best Seller Plugin',
            rating: 5.0,
            reviewCount: 500,
            badge: 'Best Seller',
        },
    },
};

// New item
export const NewItem: Story = {
    args: {
        item: {
            ...Default.args.item,
            name: 'New Premium Template',
            badge: 'New',
            reviewCount: 5,
        },
    },
};

// Low stock item
export const LowStock: Story = {
    args: {
        item: {
            ...Default.args.item,
            stock: 3,
            lowStockThreshold: 5,
        },
    },
};

// Already purchased
export const Purchased: Story = {
    args: {
        item: {
            ...Default.args.item,
            isPurchased: true,
        },
    },
};

// Loading state
export const Loading: Story = {
    args: {
        isLoading: true,
    },
};

// Mobile view
export const Mobile: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// With long description
export const LongDescription: Story = {
    args: {
        item: {
            ...Default.args.item,
            description: 'This is a very long description that should be truncated in the card view. It contains lots of information about the item that won\'t fit in the limited space available.',
        },
    },
};

// Free item
export const FreeItem: Story = {
    args: {
        item: {
            ...Default.args.item,
            name: 'Free Starter Template',
            price: 0,
            badge: 'Free',
        },
    },
};

// Expensive premium item
export const PremiumItem: Story = {
    args: {
        item: {
            ...Default.args.item,
            name: 'Enterprise Solution',
            price: 299.99,
            badge: 'Premium',
            rating: 4.8,
            reviewCount: 89,
        },
    },
};

// No reviews yet
export const NoReviews: Story = {
    args: {
        item: {
            ...Default.args.item,
            rating: 0,
            reviewCount: 0,
        },
    },
};

// In comparison mode
export const InComparison: Story = {
    args: {
        item: {
            ...Default.args.item,
        },
        isComparing: true,
        isInComparison: true,
    },
};

// Hover state
export const Hover: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        pseudo: { hover: true },
    },
};

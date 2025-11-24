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
        onCompareToggle: { action: 'compare toggled' },
    },
} satisfies Meta<typeof ItemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default item
export const Default: Story = {
    args: {
        item: {
            item_id: '1',
            name: 'Premium Dark Theme',
            description: 'A beautiful dark theme for modern websites',
            price: 28500000,
            price_sbd: 28500000,
            price_inr: 30,
            category: 'themes',
            image_url: 'https://placehold.co/400x300/1a1a1a/white?text=Dark+Theme',
            stock: 100,
            is_available: true,
        },
    },
};

// Low stock item
export const LowStock: Story = {
    args: {
        item: {
            ...Default.args.item!,
            stock: 3,
        },
    },
};

// Out of stock item
export const OutOfStock: Story = {
    args: {
        item: {
            ...Default.args.item!,
            stock: 0,
            is_available: false,
        },
    },
};

// No image
export const NoImage: Story = {
    args: {
        item: {
            ...Default.args.item!,
            image_url: undefined,
        },
    },
};

// In comparison mode
export const InComparison: Story = {
    args: {
        item: {
            ...Default.args.item!,
        },
        comparisonMode: true,
        isComparing: true,
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

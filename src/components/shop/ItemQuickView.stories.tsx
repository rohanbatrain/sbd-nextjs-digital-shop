import type { Meta, StoryObj } from '@storybook/react';
import { ItemQuickView } from './ItemQuickView';
import { ShopItem } from '@/types';

const meta = {
    title: 'Shop/ItemQuickView',
    component: ItemQuickView,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ItemQuickView>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItem: ShopItem = {
    item_id: '1',
    name: 'Premium Dark Theme',
    description: 'A beautiful, modern dark theme perfect for contemporary websites. Features smooth animations, customizable colors, and responsive design.',
    category: 'themes',
    price: 29.99,
    stock: 15,
    is_available: true,
    image_url: 'https://placehold.co/600x600/1a1a1a/white?text=Dark+Theme',
};

// Default quick view
export const Default: Story = {
    args: {
        item: sampleItem,
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Out of stock item
export const OutOfStock: Story = {
    args: {
        item: {
            ...sampleItem,
            stock: 0,
            is_available: false,
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Low stock warning
export const LowStock: Story = {
    args: {
        item: {
            ...sampleItem,
            stock: 3,
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// No image
export const NoImage: Story = {
    args: {
        item: {
            ...sampleItem,
            image_url: undefined,
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Expensive item
export const ExpensiveItem: Story = {
    args: {
        item: {
            ...sampleItem,
            name: 'Enterprise Solution',
            price: 299.99,
            stock: 5,
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Free item
export const FreeItem: Story = {
    args: {
        item: {
            ...sampleItem,
            name: 'Free Starter Theme',
            price: 0,
            stock: 9999,
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Long description
export const LongDescription: Story = {
    args: {
        item: {
            ...sampleItem,
            description: 'This is an extremely comprehensive and detailed description of an amazing product that includes many features such as responsive design, cross-browser compatibility, modern UI patterns, extensive documentation, regular updates, premium support, and much more. It is designed to test how the component handles lengthy text content.',
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Plugin item
export const PluginItem: Story = {
    args: {
        item: {
            ...sampleItem,
            name: 'Advanced Analytics Plugin',
            description: 'Track user behavior, generate insights, and optimize your site performance.',
            category: 'plugins',
            price: 49.99,
            stock: 8,
            image_url: 'https://placehold.co/600x600/3b82f6/white?text=Plugin',
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Template item
export const TemplateItem: Story = {
    args: {
        item: {
            ...sampleItem,
            name: 'Landing Page Template',
            description: 'Convert visitors into customers with this high-converting landing page template.',
            category: 'tem plates',
            price: 19.99,
            stock: 25,
            image_url: 'https://placehold.co/600x600/8b5cf6/white?text=Template',
        },
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Closed dialog
export const Closed: Story = {
    args: {
        item: sampleItem,
        open: false,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

// Null item
export const NullItem: Story = {
    args: {
        item: null,
        open: true,
        onOpenChange: (open) => console.log('Dialog state:', open),
    },
};

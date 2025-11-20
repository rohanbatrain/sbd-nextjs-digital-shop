export interface ShopItem {
    item_id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image_url?: string;
    stock: number;
    is_available: boolean;
    metadata?: Record<string, any>;
}

export interface ShopCategory {
    category_id: string;
    name: string;
    description?: string;
    icon?: string;
}

export interface InventoryItem {
    inventory_id: string;
    user_id: string;
    item_id: string;
    quantity: number;
    acquired_at: string;
    used_at?: string;
}

export interface Purchase {
    purchase_id: string;
    user_id: string;
    item_id: string;
    quantity: number;
    total_price: number;
    purchased_at: string;
}

export interface UserBalance {
    user_id: string;
    balance: number;
    currency: string;
}

export type SortOption =
    | 'price_asc'
    | 'price_desc'
    | 'newest'
    | 'popular'
    | 'name_asc'
    | 'name_desc';

export interface FilterOptions {
    priceRange?: {
        min: number;
        max: number;
    };
    availability?: 'all' | 'in_stock' | 'out_of_stock';
    rating?: number;
    categories?: string[];
}

export interface ComparisonItem {
    item: ShopItem;
    selected: boolean;
}

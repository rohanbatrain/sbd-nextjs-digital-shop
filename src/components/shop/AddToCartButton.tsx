'use client';

import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
    item: {
        item_id: string;
        item_type: string;
        name: string;
        price: number;
        image_url?: string;
    };
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
    const { items, addItem } = useCartStore();
    const [added, setAdded] = useState(false);

    const isInCart = items.some(i => i.item_id === item.item_id);

    const handleAddToCart = () => {
        addItem(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (added) {
        return (
            <Button disabled className="gap-2">
                <Check className="h-4 w-4" />
                Added to Cart
            </Button>
        );
    }

    return (
        <Button onClick={handleAddToCart} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            {isInCart ? 'Add More' : 'Add to Cart'}
        </Button>
    );
}

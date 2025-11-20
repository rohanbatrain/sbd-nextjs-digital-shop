'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Trash2, ShoppingCart, Coins } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

interface WishlistItem {
    item_id: string;
    item_type: string;
    name: string;
    price: number;
    category: string;
    image_url?: string;
    in_stock: boolean;
    added_at: string;
}

export default function WishlistPage() {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCartStore();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setItems([
                    {
                        item_id: 'emotion_tracker-serenityGreen',
                        item_type: 'theme',
                        name: 'Premium Dark Theme',
                        price: 500,
                        category: 'Themes',
                        in_stock: true,
                        added_at: '2024-03-15T10:00:00Z'
                    },
                    {
                        item_id: 'emotion_tracker-animated-avatar-playful_eye',
                        item_type: 'avatar',
                        name: 'Exclusive Avatar Pack',
                        price: 750,
                        category: 'Avatars',
                        in_stock: true,
                        added_at: '2024-03-10T10:00:00Z'
                    },
                    {
                        item_id: 'emotion_tracker-static-banner-earth-1',
                        item_type: 'banner',
                        name: 'Limited Edition Banner',
                        price: 1000,
                        category: 'Banners',
                        in_stock: false,
                        added_at: '2024-03-05T10:00:00Z'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch wishlist:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const handleAddToCart = (item: WishlistItem) => {
        addItem({
            item_id: item.item_id,
            item_type: item.item_type,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
        });
    };

    const handleRemove = (itemId: string) => {
        setItems(items.filter(i => i.item_id !== itemId));
    };

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[200px]" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[120px] w-full" />
                    ))}
                </div>
            </div>
        );
    }

    const totalValue = items.reduce((sum, item) => sum + item.price, 0);
    const inStockItems = items.filter(i => i.in_stock);
    const outOfStockItems = items.filter(i => !i.in_stock);

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                    <p className="text-muted-foreground">
                        {items.length} items • {totalValue.toLocaleString()} SBD total value
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{items.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Value
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-1 text-3xl font-bold text-primary">
                                <Coins className="h-6 w-6" />
                                <span>{totalValue.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                In Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{inStockItems.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {items.length === 0 ? (
                    <Card>
                        <CardContent className="py-20 text-center">
                            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
                            <p className="text-muted-foreground">
                                Add items you love to your wishlist
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList>
                            <TabsTrigger value="all">All Items ({items.length})</TabsTrigger>
                            <TabsTrigger value="in-stock">In Stock ({inStockItems.length})</TabsTrigger>
                            <TabsTrigger value="out-of-stock">Out of Stock ({outOfStockItems.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="mt-6">
                            <div className="space-y-4">
                                {items.map(item => (
                                    <Card key={item.item_id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge variant="secondary">{item.category}</Badge>
                                                                {!item.in_stock && (
                                                                    <Badge variant="destructive">Out of Stock</Badge>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                            <Coins className="h-5 w-5" />
                                                            <span>{item.price.toLocaleString()} SBD</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-4">
                                                        <Button
                                                            onClick={() => handleAddToCart(item)}
                                                            disabled={!item.in_stock}
                                                            className="gap-2"
                                                        >
                                                            <ShoppingCart className="h-4 w-4" />
                                                            Add to Cart
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => handleRemove(item.item_id)}
                                                            className="gap-2 text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="in-stock" className="mt-6">
                            <div className="space-y-4">
                                {inStockItems.map(item => (
                                    <Card key={item.item_id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                                            <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                            <Coins className="h-5 w-5" />
                                                            <span>{item.price.toLocaleString()} SBD</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-4">
                                                        <Button onClick={() => handleAddToCart(item)} className="gap-2">
                                                            <ShoppingCart className="h-4 w-4" />
                                                            Add to Cart
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => handleRemove(item.item_id)}
                                                            className="gap-2 text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="out-of-stock" className="mt-6">
                            <div className="space-y-4">
                                {outOfStockItems.map(item => (
                                    <Card key={item.item_id} className="opacity-60">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0" />
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <Badge variant="secondary">{item.category}</Badge>
                                                                <Badge variant="destructive">Out of Stock</Badge>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                            <Coins className="h-5 w-5" />
                                                            <span>{item.price.toLocaleString()} SBD</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-4">
                                                        <Button disabled className="gap-2">
                                                            <ShoppingCart className="h-4 w-4" />
                                                            Out of Stock
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => handleRemove(item.item_id)}
                                                            className="gap-2 text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Remove
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </div>
        </div>
    );
}

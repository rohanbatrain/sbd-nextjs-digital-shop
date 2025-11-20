'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShopItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Coins, ShoppingCart, Check, Package } from 'lucide-react';

export default function ItemDetailPage() {
    const params = useParams();
    const itemId = params.id as string;

    const [item, setItem] = useState<ShopItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setItem({
                    item_id: itemId,
                    name: 'Premium Dark Theme',
                    description: 'A beautiful dark theme with customizable colors and modern design. Perfect for creating stunning user interfaces with a professional look. Includes multiple color schemes, responsive layouts, and accessibility features.',
                    category: 'Themes',
                    price: 500,
                    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200',
                    stock: 100,
                    is_available: true,
                    metadata: {
                        features: [
                            'Multiple color schemes',
                            'Responsive design',
                            'Dark mode optimized',
                            'Accessibility compliant',
                            'Regular updates'
                        ],
                        compatibility: ['Next.js', 'React', 'Vue', 'Angular'],
                        version: '2.0.0'
                    }
                });
            } catch (error) {
                console.error('Failed to fetch item', error);
            } finally {
                setLoading(false);
            }
        };

        if (itemId) {
            fetchItem();
        }
    }, [itemId]);

    if (loading) {
        return (
            <div className="container max-w-6xl py-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="h-[500px] w-full rounded-xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!item) return <div>Item not found</div>;

    const totalPrice = item.price * quantity;

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container max-w-6xl py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                            {item.image_url ? (
                                <img
                                    src={item.image_url}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                                    <Package className="h-32 w-32 text-primary/40" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div>
                            <Badge variant="secondary" className="mb-4">
                                {item.category}
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">
                                {item.name}
                            </h1>
                            <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                                <Coins className="h-8 w-8" />
                                <span>{item.price.toLocaleString()} SBD</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-4 border-y">
                            <div className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-muted-foreground" />
                                <span className="text-sm">
                                    {item.stock > 0 ? (
                                        <span className="text-green-600 font-medium">In Stock ({item.stock} available)</span>
                                    ) : (
                                        <span className="text-red-600 font-medium">Out of Stock</span>
                                    )}
                                </span>
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>

                        {/* Features */}
                        {item.metadata?.features && (
                            <div className="space-y-3">
                                <h3 className="font-semibold">Features:</h3>
                                <ul className="space-y-2">
                                    {item.metadata.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm">
                                            <Check className="h-4 w-4 text-green-600" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="font-medium">Quantity:</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        -
                                    </Button>
                                    <span className="w-12 text-center font-semibold">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setQuantity(Math.min(item.stock, quantity + 1))}
                                        disabled={quantity >= item.stock}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>

                            <Card className="bg-muted/50">
                                <CardContent className="p-4 flex items-center justify-between">
                                    <span className="font-medium">Total:</span>
                                    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                                        <Coins className="h-6 w-6" />
                                        <span>{totalPrice.toLocaleString()} SBD</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                size="lg"
                                className="w-full gap-2"
                                disabled={!item.is_available}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {item.is_available ? 'Purchase Now' : 'Out of Stock'}
                            </Button>
                        </div>

                        {/* Compatibility */}
                        {item.metadata?.compatibility && (
                            <div className="space-y-3 pt-6 border-t">
                                <h3 className="font-semibold">Compatible with:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.metadata.compatibility.map((tech: string, idx: number) => (
                                        <Badge key={idx} variant="outline">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

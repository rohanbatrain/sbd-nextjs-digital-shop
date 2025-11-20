'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { api, endpoints } from '@/lib/api';
import { Trash2, Plus, Minus, ShoppingBag, Loader2, Coins } from 'lucide-react';

export default function CartPage() {
    const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Add items to backend cart
            for (const item of items) {
                await api.post(endpoints.cart.add, {
                    item_id: item.item_id,
                    item_type: item.item_type,
                    quantity: item.quantity,
                });
            }

            // Checkout
            await api.post(endpoints.cart.checkout);

            // Clear local cart
            clearCart();

            // Redirect to success page
            router.push('/shop/success');
        } catch (error: any) {
            console.error('Checkout failed:', error);
            alert(error.response?.data?.detail || 'Checkout failed');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
                    <h2 className="text-2xl font-bold">Your cart is empty</h2>
                    <p className="text-muted-foreground">Add some items to get started!</p>
                    <Link href="/shop">
                        <Button>Browse Shop</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const totalPrice = getTotalPrice();

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container max-w-6xl">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <Card key={item.item_id}>
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        <div className="h-24 w-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20" />
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg">{item.name}</h3>
                                            <div className="flex items-center gap-2 mt-2 text-primary font-bold">
                                                <Coins className="h-4 w-4" />
                                                <span>{item.price.toLocaleString()} SBD</span>
                                            </div>

                                            <div className="flex items-center gap-4 mt-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.item_id, Math.max(1, item.quantity - 1))}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => removeItem(item.item_id)}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Subtotal</p>
                                            <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                <Coins className="h-5 w-5" />
                                                <span>{(item.price * item.quantity).toLocaleString()} SBD</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Items ({items.length})</span>
                                    <div className="flex items-center gap-1 font-medium">
                                        <Coins className="h-4 w-4 text-primary" />
                                        <span>{totalPrice.toLocaleString()} SBD</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <div className="flex items-center gap-1 text-primary">
                                        <Coins className="h-5 w-5" />
                                        <span>{totalPrice.toLocaleString()} SBD</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2">
                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleCheckout}
                                    disabled={loading}
                                >
                                    {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                    Proceed to Checkout
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => clearCart()}
                                >
                                    Clear Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

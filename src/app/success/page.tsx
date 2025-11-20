'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';

export default function CheckoutSuccessPage() {
    const router = useRouter();
    const { clearCart } = useCartStore();

    useEffect(() => {
        // Clear cart on success
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
                <CardContent className="p-12 text-center">
                    <div className="mb-6">
                        <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Purchase Successful!</h1>
                        <p className="text-muted-foreground text-lg">
                            Thank you for your purchase. Your items have been added to your inventory.
                        </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-6 mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Package className="h-5 w-5 text-primary" />
                            <span className="font-medium">Your items are ready to use!</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Check your inventory to view and manage your purchased items.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/inventory">
                            <Button size="lg" className="gap-2">
                                View Inventory
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/shop">
                            <Button size="lg" variant="outline">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <p className="text-sm text-muted-foreground">
                            Need help? <Link href="/support" className="text-primary hover:underline">Contact Support</Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

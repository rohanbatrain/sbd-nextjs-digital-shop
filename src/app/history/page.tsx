'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Calendar, Coins } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Purchase {
    purchase_id: string;
    item_name: string;
    item_category: string;
    quantity: number;
    total_price: number;
    purchased_at: string;
    status: 'completed' | 'pending' | 'failed';
}

export default function PurchaseHistoryPage() {
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setPurchases([
                    {
                        purchase_id: 'pur_1',
                        item_name: 'Premium Dark Theme',
                        item_category: 'Themes',
                        quantity: 1,
                        total_price: 500,
                        purchased_at: '2024-03-15T10:00:00Z',
                        status: 'completed'
                    },
                    {
                        purchase_id: 'pur_2',
                        item_name: 'Icon Pack Pro',
                        item_category: 'Icons',
                        quantity: 2,
                        total_price: 300,
                        purchased_at: '2024-03-10T10:00:00Z',
                        status: 'completed'
                    },
                    {
                        purchase_id: 'pur_3',
                        item_name: 'Avatar Bundle',
                        item_category: 'Avatars',
                        quantity: 1,
                        total_price: 750,
                        purchased_at: '2024-03-05T10:00:00Z',
                        status: 'completed'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch purchases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

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

    const totalSpent = purchases.reduce((sum, p) => sum + p.total_price, 0);
    const groupedByCategory = purchases.reduce((acc, purchase) => {
        if (!acc[purchase.item_category]) {
            acc[purchase.item_category] = [];
        }
        acc[purchase.item_category].push(purchase);
        return acc;
    }, {} as Record<string, Purchase[]>);

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Purchase History</h1>
                    <p className="text-muted-foreground">
                        {purchases.length} purchases • {totalSpent.toLocaleString()} SBD total spent
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Purchases
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{purchases.length}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Spent
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-1 text-3xl font-bold text-primary">
                                <Coins className="h-6 w-6" />
                                <span>{totalSpent.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{Object.keys(groupedByCategory).length}</div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="all" className="w-full">
                    <TabsList>
                        <TabsTrigger value="all">All Purchases</TabsTrigger>
                        {Object.keys(groupedByCategory).map(category => (
                            <TabsTrigger key={category} value={category}>
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="space-y-4">
                            {purchases.map(purchase => (
                                <Card key={purchase.purchase_id}>
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-4">
                                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Package className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{purchase.item_name}</h3>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <Badge variant="secondary">{purchase.item_category}</Badge>
                                                        <span className="text-sm text-muted-foreground">
                                                            Qty: {purchase.quantity}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{formatDistanceToNow(new Date(purchase.purchased_at), { addSuffix: true })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                    <Coins className="h-5 w-5" />
                                                    <span>{purchase.total_price.toLocaleString()} SBD</span>
                                                </div>
                                                <Badge variant="outline" className="mt-1">
                                                    {purchase.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {Object.entries(groupedByCategory).map(([category, categoryPurchases]) => (
                        <TabsContent key={category} value={category} className="mt-6">
                            <div className="space-y-4">
                                {categoryPurchases.map(purchase => (
                                    <Card key={purchase.purchase_id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex gap-4">
                                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                        <Package className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{purchase.item_name}</h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-sm text-muted-foreground">
                                                                Qty: {purchase.quantity}
                                                            </span>
                                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                <Calendar className="h-3 w-3" />
                                                                <span>{formatDistanceToNow(new Date(purchase.purchased_at), { addSuffix: true })}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 text-lg font-bold text-primary">
                                                    <Coins className="h-5 w-5" />
                                                    <span>{purchase.total_price.toLocaleString()} SBD</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}

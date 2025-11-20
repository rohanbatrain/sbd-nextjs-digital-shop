'use client';

import { useEffect, useState } from 'react';
import { api, endpoints } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface InventoryItem {
    inventory_id: string;
    item_id: string;
    item_name: string;
    quantity: number;
    acquired_at: string;
    category: string;
}

export default function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                // Mock data - replace with actual API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                setItems([
                    {
                        inventory_id: 'inv_1',
                        item_id: 'item_1',
                        item_name: 'Premium Dark Theme',
                        quantity: 1,
                        acquired_at: '2024-03-15T10:00:00Z',
                        category: 'Themes'
                    },
                    {
                        inventory_id: 'inv_2',
                        item_id: 'item_2',
                        item_name: 'Lucide Icon Pack Pro',
                        quantity: 1,
                        acquired_at: '2024-03-10T10:00:00Z',
                        category: 'Icons'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch inventory:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[300px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-[200px] w-full" />
                    ))}
                </div>
            </div>
        );
    }

    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, InventoryItem[]>);

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">My Inventory</h1>
                        <p className="text-muted-foreground mt-1">
                            {items.length} items in your collection
                        </p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-2">No items yet</h2>
                        <p className="text-muted-foreground">
                            Purchase items from the shop to see them here
                        </p>
                    </div>
                ) : (
                    <Tabs defaultValue={Object.keys(groupedItems)[0]} className="w-full">
                        <TabsList>
                            {Object.keys(groupedItems).map(category => (
                                <TabsTrigger key={category} value={category}>
                                    {category}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {Object.entries(groupedItems).map(([category, categoryItems]) => (
                            <TabsContent key={category} value={category} className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryItems.map(item => (
                                        <Card key={item.inventory_id}>
                                            <CardHeader>
                                                <div className="flex justify-between items-start mb-2">
                                                    <Badge variant="secondary">{item.category}</Badge>
                                                    {item.quantity > 1 && (
                                                        <Badge>x{item.quantity}</Badge>
                                                    )}
                                                </div>
                                                <CardTitle className="text-lg">{item.item_name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        Acquired {formatDistanceToNow(new Date(item.acquired_at), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <Button variant="outline" className="w-full">
                                                    Use Item
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                )}
            </div>
        </div>
    );
}

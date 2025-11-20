'use client';

import { useState } from 'react';
import { ShopItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Coins, GitCompare } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

interface ItemComparisonProps {
    items: ShopItem[];
    onRemoveItem: (itemId: string) => void;
    onClearAll: () => void;
}

export function ItemComparison({ items, onRemoveItem, onClearAll }: ItemComparisonProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (items.length === 0) return null;

    const attributes = [
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price' },
        { key: 'stock', label: 'Stock' },
        { key: 'is_available', label: 'Availability' },
        { key: 'description', label: 'Description' },
    ];

    return (
        <>
            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    size="lg"
                    onClick={() => setIsOpen(true)}
                    className="rounded-full shadow-lg h-14 px-6"
                >
                    <GitCompare className="h-5 w-5 mr-2" />
                    Compare ({items.length})
                </Button>
            </div>

            {/* Comparison Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                    <SheetHeader>
                        <div className="flex items-center justify-between">
                            <SheetTitle className="text-2xl">
                                Compare Items ({items.length}/4)
                            </SheetTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onClearAll}
                            >
                                Clear All
                            </Button>
                        </div>
                        <SheetDescription>
                            Compare up to 4 items side by side
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 overflow-x-auto">
                        <div className="min-w-max">
                            {/* Images Row */}
                            <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}>
                                <div className="font-semibold"></div>
                                {items.map((item) => (
                                    <div key={item.item_id} className="relative">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-background shadow-md"
                                            onClick={() => onRemoveItem(item.item_id)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Comparison Table */}
                            <div className="space-y-2">
                                {attributes.map((attr) => (
                                    <div
                                        key={attr.key}
                                        className="grid gap-4 py-3 border-b"
                                        style={{ gridTemplateColumns: `200px repeat(${items.length}, 1fr)` }}
                                    >
                                        <div className="font-semibold text-sm">
                                            {attr.label}
                                        </div>
                                        {items.map((item) => (
                                            <div key={item.item_id} className="text-sm">
                                                {attr.key === 'price' ? (
                                                    <div className="flex items-center gap-1 text-primary font-semibold">
                                                        <Coins className="h-4 w-4" />
                                                        {item.price.toLocaleString()} SBD
                                                    </div>
                                                ) : attr.key === 'is_available' ? (
                                                    <Badge variant={item.is_available ? 'default' : 'destructive'}>
                                                        {item.is_available ? 'In Stock' : 'Out of Stock'}
                                                    </Badge>
                                                ) : attr.key === 'category' ? (
                                                    <Badge variant="secondary">{item.category}</Badge>
                                                ) : attr.key === 'description' ? (
                                                    <p className="text-muted-foreground line-clamp-3">
                                                        {item.description}
                                                    </p>
                                                ) : (
                                                    <span>{(item as any)[attr.key]}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

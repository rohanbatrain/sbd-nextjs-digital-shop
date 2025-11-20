'use client';

import { ShopItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ItemCard } from './ItemCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface RelatedItemsProps {
    currentItem: ShopItem;
    allItems: ShopItem[];
    maxItems?: number;
}

export function RelatedItems({ currentItem, allItems, maxItems = 6 }: RelatedItemsProps) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;

    // Get related items from same category, excluding current item
    const relatedItems = allItems.filter(
        (item) =>
            item.category === currentItem.category &&
            item.item_id !== currentItem.item_id &&
            item.is_available
    ).slice(0, maxItems);

    if (relatedItems.length === 0) return null;

    const visibleItems = relatedItems.slice(startIndex, startIndex + itemsPerPage);
    const canScrollLeft = startIndex > 0;
    const canScrollRight = startIndex + itemsPerPage < relatedItems.length;

    const handleScrollLeft = () => {
        setStartIndex(Math.max(0, startIndex - itemsPerPage));
    };

    const handleScrollRight = () => {
        setStartIndex(Math.min(relatedItems.length - itemsPerPage, startIndex + itemsPerPage));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">You Might Also Like</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Similar items in {currentItem.category}
                </p>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    {/* Navigation Buttons */}
                    {relatedItems.length > itemsPerPage && (
                        <>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md"
                                onClick={handleScrollLeft}
                                disabled={!canScrollLeft}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-md"
                                onClick={handleScrollRight}
                                disabled={!canScrollRight}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {visibleItems.map((item) => (
                            <ItemCard key={item.item_id} item={item} />
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    {relatedItems.length > itemsPerPage && (
                        <div className="flex justify-center gap-2 mt-4">
                            {Array.from({ length: Math.ceil(relatedItems.length / itemsPerPage) }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`h-2 w-2 rounded-full transition-all ${Math.floor(startIndex / itemsPerPage) === idx
                                            ? 'bg-primary w-4'
                                            : 'bg-muted-foreground/30'
                                        }`}
                                    onClick={() => setStartIndex(idx * itemsPerPage)}
                                    aria-label={`Go to page ${idx + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

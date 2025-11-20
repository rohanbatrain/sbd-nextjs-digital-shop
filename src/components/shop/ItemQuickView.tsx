'use client';

import { ShopItem } from '@/types';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, ShoppingCart, X } from 'lucide-react';
import { AddToCartButton } from './AddToCartButton';

interface ItemQuickViewProps {
    item: ShopItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ItemQuickView({ item, open, onOpenChange }: ItemQuickViewProps) {
    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{item.name}</DialogTitle>
                    <DialogDescription className="sr-only">
                        Quick view of {item.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Image Section */}
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                        {item.image_url ? (
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                                <ShoppingCart className="h-24 w-24 text-primary/40" />
                            </div>
                        )}
                        {!item.is_available && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <Badge variant="destructive" className="text-lg px-4 py-2">
                                    Out of Stock
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{item.category}</Badge>
                            {item.stock < 10 && item.stock > 0 && (
                                <Badge variant="outline" className="text-orange-600 border-orange-600">
                                    Only {item.stock} left
                                </Badge>
                            )}
                        </div>

                        <p className="text-muted-foreground">{item.description}</p>

                        <div className="flex items-center gap-2 text-primary font-bold text-2xl mt-auto">
                            <Coins className="h-6 w-6" />
                            <span>{item.price.toLocaleString()} SBD</span>
                        </div>

                        <div className="flex gap-2">
                            <AddToCartButton
                                item={{
                                    item_id: item.item_id,
                                    item_type: 'shop_item',
                                    name: item.name,
                                    price: item.price,
                                    image_url: item.image_url
                                }}
                            />
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="flex-1"
                            >
                                Close
                            </Button>
                        </div>

                        {item.stock > 0 && (
                            <p className="text-sm text-muted-foreground text-center">
                                {item.stock} {item.stock === 1 ? 'item' : 'items'} in stock
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

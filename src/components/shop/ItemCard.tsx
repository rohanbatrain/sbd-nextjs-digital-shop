import Link from 'next/link';
import { ShopItem } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, ShoppingCart } from 'lucide-react';

interface ItemCardProps {
    item: ShopItem;
}

export function ItemCard({ item }: ItemCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow group">
            <div className="h-48 w-full overflow-hidden rounded-t-xl bg-muted relative">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <ShoppingCart className="h-16 w-16 text-primary/40" />
                    </div>
                )}
                {!item.is_available && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                )}
            </div>

            <CardHeader className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="text-xs">
                        {item.category}
                    </Badge>
                    {item.stock < 10 && item.stock > 0 && (
                        <Badge variant="outline" className="text-xs text-orange-600 border-orange-600">
                            Only {item.stock} left
                        </Badge>
                    )}
                </div>
                <CardTitle className="line-clamp-2 text-lg">{item.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                    {item.description}
                </p>
            </CardHeader>

            <CardFooter className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-1.5 text-primary font-bold text-lg">
                    <Coins className="h-5 w-5" />
                    <span>{item.price.toLocaleString()} SBD</span>
                </div>
                <Link href={`/shop/${item.item_id}`}>
                    <Button size="sm" disabled={!item.is_available}>
                        {item.is_available ? 'View Details' : 'Unavailable'}
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

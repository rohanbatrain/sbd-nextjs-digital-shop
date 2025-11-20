import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Search, User, Coins } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <ShoppingBag className="h-6 w-6" />
                        <span>DigitalShop</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <Link href="/shop" className="hover:text-foreground transition-colors">
                            Browse
                        </Link>
                        <Link href="/categories" className="hover:text-foreground transition-colors">
                            Categories
                        </Link>
                        <Link href="/inventory" className="hover:text-foreground transition-colors">
                            My Items
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                        <Coins className="h-4 w-4" />
                        <span className="font-semibold">2,500 SBD</span>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Link href="/login">
                        <Button variant="ghost" size="sm">Log in</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

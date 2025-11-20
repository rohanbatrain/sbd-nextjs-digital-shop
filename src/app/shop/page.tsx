'use client';

import { useState, useEffect } from 'react';
import { ShopItem, ShopCategory } from '@/types';
import { ItemCard } from '@/components/shop/ItemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

export default function ShopPage() {
    const [items, setItems] = useState<ShopItem[]>([]);
    const [categories, setCategories] = useState<ShopCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setCategories([
                    { category_id: 'cat_1', name: 'Themes', description: 'UI themes and color schemes' },
                    { category_id: 'cat_2', name: 'Icons', description: 'Icon packs and sets' },
                    { category_id: 'cat_3', name: 'Templates', description: 'Ready-to-use templates' },
                    { category_id: 'cat_4', name: 'Plugins', description: 'Extensions and add-ons' }
                ]);

                setItems([
                    {
                        item_id: 'item_1',
                        name: 'Premium Dark Theme',
                        description: 'A beautiful dark theme with customizable colors and modern design.',
                        category: 'Themes',
                        price: 500,
                        image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
                        stock: 100,
                        is_available: true
                    },
                    {
                        item_id: 'item_2',
                        name: 'Lucide Icon Pack Pro',
                        description: 'Extended icon pack with 2000+ premium icons for your projects.',
                        category: 'Icons',
                        price: 300,
                        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
                        stock: 50,
                        is_available: true
                    },
                    {
                        item_id: 'item_3',
                        name: 'Dashboard Template',
                        description: 'Complete admin dashboard template with charts and analytics.',
                        category: 'Templates',
                        price: 750,
                        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                        stock: 8,
                        is_available: true
                    },
                    {
                        item_id: 'item_4',
                        name: 'AI Chat Plugin',
                        description: 'Integrate AI-powered chat into your application.',
                        category: 'Plugins',
                        price: 1000,
                        image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                        stock: 25,
                        is_available: true
                    },
                    {
                        item_id: 'item_5',
                        name: 'Minimalist UI Kit',
                        description: 'Clean and minimal UI components for modern applications.',
                        category: 'Themes',
                        price: 400,
                        image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800',
                        stock: 0,
                        is_available: false
                    },
                    {
                        item_id: 'item_6',
                        name: 'Landing Page Bundle',
                        description: '10 stunning landing page templates for various industries.',
                        category: 'Templates',
                        price: 900,
                        image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                        stock: 15,
                        is_available: true
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="container py-10 space-y-8">
                <Skeleton className="h-12 w-[300px]" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-[400px] w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Digital Shop</h1>
                        <p className="text-muted-foreground mt-1">
                            Browse our collection of digital assets
                        </p>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search items..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(null)}
                    >
                        All Items
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat.category_id}
                            variant={selectedCategory === cat.name ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <ItemCard key={item.item_id} item={item} />
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-lg font-semibold">No items found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

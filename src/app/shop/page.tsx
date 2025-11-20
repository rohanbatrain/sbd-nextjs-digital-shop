'use client';

import { useState, useEffect, useMemo } from 'react';
import { ShopItem, ShopCategory, SortOption, FilterOptions } from '@/types';
import { ItemCard } from '@/components/shop/ItemCard';
import { ItemQuickView } from '@/components/shop/ItemQuickView';
import { AdvancedFilters } from '@/components/shop/AdvancedFilters';
import { ItemComparison } from '@/components/shop/ItemComparison';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, GitCompare, SlidersHorizontal } from 'lucide-react';

export default function ShopPage() {
    const [items, setItems] = useState<ShopItem[]>([]);
    const [categories, setCategories] = useState<ShopCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortOption, setSortOption] = useState<SortOption>('name_asc');
    const [filters, setFilters] = useState<FilterOptions>({
        priceRange: { min: 0, max: 1000 },
        availability: 'all',
    });
    const [quickViewItem, setQuickViewItem] = useState<ShopItem | null>(null);
    const [comparisonMode, setComparisonMode] = useState(false);
    const [comparisonItems, setComparisonItems] = useState<ShopItem[]>([]);
    const [showFilters, setShowFilters] = useState(false);

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

    // Calculate max price for filters
    const maxPrice = useMemo(() => {
        return Math.max(...items.map(item => item.price), 1000);
    }, [items]);

    // Filter and sort items
    const filteredAndSortedItems = useMemo(() => {
        let result = items.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesPrice =
                item.price >= (filters.priceRange?.min ?? 0) &&
                item.price <= (filters.priceRange?.max ?? maxPrice);
            const matchesAvailability =
                filters.availability === 'all' ? true :
                    filters.availability === 'in_stock' ? item.is_available :
                        !item.is_available;

            return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
        });

        // Sort items
        result.sort((a, b) => {
            switch (sortOption) {
                case 'price_asc':
                    return a.price - b.price;
                case 'price_desc':
                    return b.price - a.price;
                case 'name_asc':
                    return a.name.localeCompare(b.name);
                case 'name_desc':
                    return b.name.localeCompare(a.name);
                case 'newest':
                    // For now, maintain original order (newest first)
                    return 0;
                case 'popular':
                    // For now, maintain original order
                    return 0;
                default:
                    return 0;
            }
        });

        return result;
    }, [items, search, selectedCategory, filters, sortOption, maxPrice]);

    const handleCompareToggle = (item: ShopItem, checked: boolean) => {
        if (checked) {
            if (comparisonItems.length < 4) {
                setComparisonItems([...comparisonItems, item]);
            }
        } else {
            setComparisonItems(comparisonItems.filter(i => i.item_id !== item.item_id));
        }
    };

    const handleRemoveFromComparison = (itemId: string) => {
        setComparisonItems(comparisonItems.filter(i => i.item_id !== itemId));
    };

    const handleClearComparison = () => {
        setComparisonItems([]);
        setComparisonMode(false);
    };

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
                {/* Header */}
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

                {/* Toolbar */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                            <SelectItem value="price_asc">Price (Low to High)</SelectItem>
                            <SelectItem value="price_desc">Price (High to Low)</SelectItem>
                            <SelectItem value="newest">Newest First</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant={comparisonMode ? "default" : "outline"}
                        onClick={() => setComparisonMode(!comparisonMode)}
                        className="gap-2"
                    >
                        <GitCompare className="h-4 w-4" />
                        {comparisonMode ? 'Exit Compare' : 'Compare Items'}
                        {comparisonItems.length > 0 && (
                            <Badge variant="secondary" className="ml-1">
                                {comparisonItems.length}
                            </Badge>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setShowFilters(!showFilters)}
                        className="gap-2 md:hidden"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>
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

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                        <AdvancedFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                            maxPrice={maxPrice}
                        />
                    </div>

                    {/* Items Grid */}
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredAndSortedItems.map(item => (
                                <ItemCard
                                    key={item.item_id}
                                    item={item}
                                    onQuickView={setQuickViewItem}
                                    comparisonMode={comparisonMode}
                                    isComparing={comparisonItems.some(i => i.item_id === item.item_id)}
                                    onCompareToggle={handleCompareToggle}
                                />
                            ))}
                        </div>

                        {filteredAndSortedItems.length === 0 && (
                            <div className="text-center py-20">
                                <h3 className="text-lg font-semibold">No items found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <ItemQuickView
                item={quickViewItem}
                open={!!quickViewItem}
                onOpenChange={(open) => !open && setQuickViewItem(null)}
            />

            {/* Comparison Panel */}
            {comparisonItems.length > 0 && (
                <ItemComparison
                    items={comparisonItems}
                    onRemoveItem={handleRemoveFromComparison}
                    onClearAll={handleClearComparison}
                />
            )}
        </div>
    );
}

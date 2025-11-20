'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Package, DollarSign, Users, TrendingUp, Edit, Trash2 } from 'lucide-react';

interface ShopItem {
    item_id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    sold_count: number;
    status: 'active' | 'inactive' | 'out_of_stock';
    created_at: string;
}

interface AdminStats {
    totalItems: number;
    totalRevenue: number;
    totalSales: number;
    activeItems: number;
}

export default function ShopAdminPage() {
    const [items, setItems] = useState<ShopItem[]>([]);
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setStats({
                    totalItems: 45,
                    totalRevenue: 125000,
                    totalSales: 342,
                    activeItems: 42
                });

                setItems([
                    {
                        item_id: 'item_1',
                        name: 'Premium Dark Theme',
                        category: 'Themes',
                        price: 500,
                        stock: 100,
                        sold_count: 45,
                        status: 'active',
                        created_at: '2024-01-15T10:00:00Z'
                    },
                    {
                        item_id: 'item_2',
                        name: 'Icon Pack Pro',
                        category: 'Icons',
                        price: 300,
                        stock: 0,
                        sold_count: 78,
                        status: 'out_of_stock',
                        created_at: '2024-02-01T10:00:00Z'
                    },
                    {
                        item_id: 'item_3',
                        name: 'Avatar Bundle',
                        category: 'Avatars',
                        price: 750,
                        stock: 50,
                        sold_count: 23,
                        status: 'active',
                        created_at: '2024-02-15T10:00:00Z'
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="container py-10 space-y-6">
                <Skeleton className="h-12 w-[200px]" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-[120px] w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Shop Administration</h1>
                        <p className="text-muted-foreground mt-1">Manage items, inventory, and sales</p>
                    </div>
                    <Button>Add New Item</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Items
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats?.totalItems}</div>
                            <p className="text-xs text-green-600 mt-1">
                                {stats?.activeItems} active
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats?.totalRevenue.toLocaleString()} SBD</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                All time
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Sales
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{stats?.totalSales}</div>
                            <p className="text-xs text-green-600 mt-1">
                                +12% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Avg. Price
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stats ? Math.round(stats.totalRevenue / stats.totalSales) : 0} SBD
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Per transaction
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="items" className="w-full">
                    <TabsList>
                        <TabsTrigger value="items">Items</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="sales">Sales</TabsTrigger>
                    </TabsList>

                    <TabsContent value="items" className="mt-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Item Management</CardTitle>
                                    <div className="relative w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search items..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Sold</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredItems.map(item => (
                                            <TableRow key={item.item_id}>
                                                <TableCell className="font-medium">{item.name}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{item.category}</Badge>
                                                </TableCell>
                                                <TableCell>{item.price} SBD</TableCell>
                                                <TableCell>
                                                    <span className={item.stock === 0 ? 'text-destructive' : ''}>
                                                        {item.stock}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{item.sold_count}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            item.status === 'active'
                                                                ? 'default'
                                                                : item.status === 'out_of_stock'
                                                                    ? 'destructive'
                                                                    : 'secondary'
                                                        }
                                                    >
                                                        {item.status.replace('_', ' ')}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-destructive">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="categories" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Category management interface would go here</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="sales" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sales Analytics</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">Sales analytics and charts would go here</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

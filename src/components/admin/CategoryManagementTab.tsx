'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { AddCategoryDialog } from './AddCategoryDialog';
import { EditCategoryDialog } from './EditCategoryDialog';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';

interface Category {
    category_id: string;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
    item_type: string;
    item_count: number;
    created_at: string;
    updated_at?: string;
}

export function CategoryManagementTab() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.item_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setShowEditDialog(true);
    };

    const handleDelete = (category: Category) => {
        setSelectedCategory(category);
        setShowDeleteDialog(true);
    };

    const handleCategoryAdded = (newCategory: Category) => {
        setCategories([...categories, newCategory]);
        setShowAddDialog(false);
    };

    const handleCategoryUpdated = (updatedCategory: Category) => {
        setCategories(categories.map(cat =>
            cat.category_id === updatedCategory.category_id ? updatedCategory : cat
        ));
        setShowEditDialog(false);
        setSelectedCategory(null);
    };

    const handleCategoryDeleted = (categoryId: string) => {
        setCategories(categories.filter(cat => cat.category_id !== categoryId));
        setShowDeleteDialog(false);
        setSelectedCategory(null);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Category Management</CardTitle>
                    <div className="flex items-center gap-4">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button onClick={() => setShowAddDialog(true)} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Category
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {filteredCategories.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No categories found</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchQuery ? 'Try a different search term' : 'Get started by creating your first category'}
                        </p>
                        {!searchQuery && (
                            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Category
                            </Button>
                        )}
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCategories.map(category => (
                                <TableRow key={category.category_id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {category.icon && <span className="text-lg">{category.icon}</span>}
                                            <span>{category.name}</span>
                                            {category.color && (
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{category.item_type}</Badge>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate">
                                        {category.description || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{category.item_count}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(category.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive"
                                                onClick={() => handleDelete(category)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>

            <AddCategoryDialog
                open={showAddDialog}
                onOpenChange={setShowAddDialog}
                onCategoryAdded={handleCategoryAdded}
            />

            {selectedCategory && (
                <>
                    <EditCategoryDialog
                        open={showEditDialog}
                        onOpenChange={setShowEditDialog}
                        category={selectedCategory}
                        onCategoryUpdated={handleCategoryUpdated}
                    />
                    <DeleteCategoryDialog
                        open={showDeleteDialog}
                        onOpenChange={setShowDeleteDialog}
                        category={selectedCategory}
                        onCategoryDeleted={handleCategoryDeleted}
                    />
                </>
            )}
        </Card>
    );
}

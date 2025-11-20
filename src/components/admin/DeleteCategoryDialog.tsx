'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api, endpoints } from '@/lib/api';
import { Loader2, AlertTriangle } from 'lucide-react';

interface DeleteCategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category: any;
    onCategoryDeleted: (categoryId: string) => void;
}

export function DeleteCategoryDialog({ open, onOpenChange, category, onCategoryDeleted }: DeleteCategoryDialogProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            await api.delete(endpoints.shop.categories.delete(category.category_id));
            onCategoryDeleted(category.category_id);
        } catch (error: any) {
            console.error('Failed to delete category:', error);
            alert(error.response?.data?.detail || 'Failed to delete category');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this category? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            {category.icon && <span className="text-xl">{category.icon}</span>}
                            <span className="font-semibold">{category.name}</span>
                        </div>
                        {category.description && (
                            <p className="text-sm text-muted-foreground">{category.description}</p>
                        )}
                    </div>

                    {category.item_count > 0 && (
                        <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                                This category contains {category.item_count} item{category.item_count !== 1 ? 's' : ''}.
                                You must reassign or delete these items before deleting the category.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading || category.item_count > 0}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

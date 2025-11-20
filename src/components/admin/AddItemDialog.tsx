'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { api, endpoints } from '@/lib/api';
import { Loader2 } from 'lucide-react';

interface AddItemDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onItemAdded: (item: any) => void;
}

export function AddItemDialog({ open, onOpenChange, onItemAdded }: AddItemDialogProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        item_type: 'theme',
        category: '',
        featured: false,
        new_arrival: false,
        image_url: '',
        stock: 999,
        available: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/shop/items', formData);
            onItemAdded(response.data);
            setFormData({ name: '', description: '', price: 0, item_type: 'theme', category: '', featured: false, new_arrival: false, image_url: '', stock: 999, available: true });
        } catch (error: any) {
            console.error('Failed to create item:', error);
            alert(error.response?.data?.detail || 'Failed to create item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Item Name *</Label>
                            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div>
                            <Label htmlFor="price">Price (SBD) *</Label>
                            <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })} required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="item_type">Type *</Label>
                            <Select value={formData.item_type} onValueChange={(value) => setFormData({ ...formData, item_type: value })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="theme">Theme</SelectItem>
                                    <SelectItem value="avatar">Avatar</SelectItem>
                                    <SelectItem value="banner">Banner</SelectItem>
                                    <SelectItem value="bundle">Bundle</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="image_url">Image URL</Label>
                            <Input id="image_url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })} />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex items-center space-x-2">
                            <Switch id="featured" checked={formData.featured} onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })} />
                            <Label htmlFor="featured">Featured</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="new_arrival" checked={formData.new_arrival} onCheckedChange={(checked) => setFormData({ ...formData, new_arrival: checked })} />
                            <Label htmlFor="new_arrival">New Arrival</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="available" checked={formData.available} onCheckedChange={(checked) => setFormData({ ...formData, available: checked })} />
                            <Label htmlFor="available">Available</Label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create Item
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

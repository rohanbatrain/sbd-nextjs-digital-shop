'use client';

import { FilterOptions } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Filter } from 'lucide-react';
import { useState } from 'react';

interface AdvancedFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    maxPrice: number;
}

export function AdvancedFilters({ filters, onFiltersChange, maxPrice }: AdvancedFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    const handlePriceChange = (values: number[]) => {
        onFiltersChange({
            ...filters,
            priceRange: {
                min: values[0],
                max: values[1],
            },
        });
    };

    const handleAvailabilityChange = (value: string) => {
        onFiltersChange({
            ...filters,
            availability: value as FilterOptions['availability'],
        });
    };

    const handleReset = () => {
        onFiltersChange({
            priceRange: { min: 0, max: maxPrice },
            availability: 'all',
        });
    };

    const hasActiveFilters =
        (filters.priceRange?.min !== 0 || filters.priceRange?.max !== maxPrice) ||
        filters.availability !== 'all';

    return (
        <Card className="sticky top-4">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <CardTitle className="text-lg">Filters</CardTitle>
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleReset}
                            className="h-8 text-xs"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Reset
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Price Range */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Price Range</Label>
                    <div className="px-2">
                        <Slider
                            min={0}
                            max={maxPrice}
                            step={50}
                            value={[
                                filters.priceRange?.min ?? 0,
                                filters.priceRange?.max ?? maxPrice,
                            ]}
                            onValueChange={handlePriceChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{filters.priceRange?.min ?? 0} SBD</span>
                        <span>{filters.priceRange?.max ?? maxPrice} SBD</span>
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium">Availability</Label>
                    <RadioGroup
                        value={filters.availability ?? 'all'}
                        onValueChange={handleAvailabilityChange}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="all" />
                            <Label htmlFor="all" className="font-normal cursor-pointer">
                                All Items
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in_stock" id="in_stock" />
                            <Label htmlFor="in_stock" className="font-normal cursor-pointer">
                                In Stock Only
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="out_of_stock" id="out_of_stock" />
                            <Label htmlFor="out_of_stock" className="font-normal cursor-pointer">
                                Out of Stock
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </CardContent>
        </Card>
    );
}

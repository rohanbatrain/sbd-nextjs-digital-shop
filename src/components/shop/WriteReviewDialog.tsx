'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Star, Loader2 } from 'lucide-react';

const reviewSchema = z.object({
    rating: z.number().min(1).max(5),
    title: z.string().min(5, 'Title must be at least 5 characters'),
    comment: z.string().min(20, 'Review must be at least 20 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface WriteReviewDialogProps {
    itemId: string;
    itemName: string;
    onReviewSubmitted?: () => void;
}

export function WriteReviewDialog({ itemId, itemName, onReviewSubmitted }: WriteReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);
    const router = useRouter();

    const form = useForm<ReviewFormData>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            title: '',
            comment: '',
        },
    });

    const currentRating = form.watch('rating');

    const onSubmit = async (data: ReviewFormData) => {
        setLoading(true);
        try {
            // API call would go here
            await new Promise(resolve => setTimeout(resolve, 1000));

            setOpen(false);
            form.reset();
            onReviewSubmitted?.();
            router.refresh();
        } catch (error: any) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Write a Review</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                        Share your experience with {itemName}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <button
                                                    key={rating}
                                                    type="button"
                                                    onClick={() => field.onChange(rating)}
                                                    onMouseEnter={() => setHoveredRating(rating)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`h-8 w-8 ${rating <= (hoveredRating || currentRating)
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                            }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Review Title</FormLabel>
                                    <FormControl>
                                        <input
                                            type="text"
                                            placeholder="Sum up your experience"
                                            className="w-full p-2 border rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="comment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Review</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us about your experience with this item..."
                                            className="min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading || currentRating === 0}>
                                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                Submit Review
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

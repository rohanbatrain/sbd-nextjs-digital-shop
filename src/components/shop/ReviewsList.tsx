'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { WriteReviewDialog } from '@/components/shop/WriteReviewDialog';
import { Star, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Review {
    review_id: string;
    user_name: string;
    rating: number;
    title: string;
    comment: string;
    helpful_count: number;
    created_at: string;
    verified_purchase: boolean;
}

interface ReviewsListProps {
    itemId: string;
    itemName: string;
}

export function ReviewsList({ itemId, itemName }: ReviewsListProps) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                setReviews([
                    {
                        review_id: 'rev_1',
                        user_name: 'John Doe',
                        rating: 5,
                        title: 'Amazing theme!',
                        comment: 'This theme completely transformed my profile. The dark mode is perfect and the customization options are endless. Highly recommend!',
                        helpful_count: 12,
                        created_at: '2024-03-15T10:00:00Z',
                        verified_purchase: true
                    },
                    {
                        review_id: 'rev_2',
                        user_name: 'Jane Smith',
                        rating: 4,
                        title: 'Great value',
                        comment: 'Really good theme for the price. Easy to install and looks professional. Only minor issue is the load time.',
                        helpful_count: 8,
                        created_at: '2024-03-10T10:00:00Z',
                        verified_purchase: true
                    },
                    {
                        review_id: 'rev_3',
                        user_name: 'Bob Wilson',
                        rating: 5,
                        title: 'Perfect!',
                        comment: 'Exactly what I was looking for. Clean design and works flawlessly.',
                        helpful_count: 5,
                        created_at: '2024-03-05T10:00:00Z',
                        verified_purchase: false
                    }
                ]);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [itemId]);

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[200px] w-full" />
                ))}
            </div>
        );
    }

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
    }));

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sortBy === 'helpful') return b.helpful_count - a.helpful_count;
        return b.rating - a.rating;
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Customer Reviews</CardTitle>
                        <WriteReviewDialog itemId={itemId} itemName={itemName} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="text-center mb-4">
                                <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-5 w-5 ${star <= Math.round(averageRating)
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Based on {reviews.length} reviews
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {ratingDistribution.map(({ rating, count, percentage }) => (
                                <div key={rating} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-16">
                                        <span className="text-sm">{rating}</span>
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <Progress value={percentage} className="flex-1" />
                                    <span className="text-sm text-muted-foreground w-12 text-right">
                                        {count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{reviews.length} Reviews</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="p-2 border rounded-md"
                >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="rating">Highest Rating</option>
                </select>
            </div>

            <div className="space-y-4">
                {sortedReviews.map(review => (
                    <Card key={review.review_id}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {review.user_name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold">{review.user_name}</span>
                                        {review.verified_purchase && (
                                            <Badge variant="secondary" className="text-xs">
                                                Verified Purchase
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${star <= review.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                                        </span>
                                    </div>

                                    <h4 className="font-semibold mb-2">{review.title}</h4>
                                    <p className="text-muted-foreground mb-4">{review.comment}</p>

                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="sm" className="gap-2">
                                            <ThumbsUp className="h-4 w-4" />
                                            Helpful ({review.helpful_count})
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

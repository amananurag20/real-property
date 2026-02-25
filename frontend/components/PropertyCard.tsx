'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PropertyCardProps {
    id: number;
    image: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    address: string;
    status: string;
    featured: boolean;
    latitude?: number;
    longitude?: number;
}

import Image from 'next/image';

const PropertyCard = ({ id, image, price, beds, baths, sqft, address, status, featured, latitude, longitude }: PropertyCardProps) => {
    const openGoogleMaps = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (latitude && longitude) {
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(url, '_blank');
        }
    };

    return (
        <Link href={`/properties/${id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl">
            <Card className="group rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300 transform hover:-translate-y-1 border-border p-0 bg-card">
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-muted">
                    <Image
                        src={image}
                        alt={address}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge
                            className={`px-3 py-1 text-xs font-semibold shadow-sm ${featured
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                                }`}
                        >
                            {status}
                        </Badge>
                    </div>
                    {/* Favorite Button */}
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="absolute top-4 right-4 w-9 h-9 bg-background/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-sm group/heart"
                    >
                        <svg className="w-4 h-4 text-muted-foreground group-hover/heart:text-destructive transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </Button>
                </div>

                {/* Content Section */}
                <CardContent className="p-5 space-y-4">
                    {/* Price and Sqft Row */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">{price}</h3>
                        <div className="flex items-center gap-1.5 bg-muted/50 px-2 py-1.5 rounded-md border border-border/50">
                            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-xs font-semibold text-foreground">{sqft}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">sqft</span>
                        </div>
                    </div>

                    {/* Beds and Baths Row */}
                    <div className="flex items-center gap-6">
                        {/* Beds */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-foreground">{beds}</span>
                                <span className="text-xs text-muted-foreground">Beds</span>
                            </div>
                        </div>

                        {/* Baths */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm font-bold text-foreground">{baths}</span>
                                <span className="text-xs text-muted-foreground">Baths</span>
                            </div>
                        </div>
                    </div>

                    {/* Location - Clickable */}
                    <button
                        onClick={openGoogleMaps}
                        className="w-full flex items-center gap-2 pt-4 mt-2 border-t border-border/60 hover:text-primary transition-colors group/location text-left"
                    >
                        <svg className="w-4 h-4 text-muted-foreground group-hover/location:text-primary shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-muted-foreground group-hover/location:text-primary font-medium truncate transition-colors">{address}</p>
                    </button>
                </CardContent>
            </Card>
        </Link>
    );
};

export default PropertyCard;

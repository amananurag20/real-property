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
        <Link href={`/properties/${id}`} className="block">
            <Card className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-gray-100 border p-0 bg-white">
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                    <Image
                        src={image}
                        alt={address}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge
                            className={`px-3 py-1 text-xs font-semibold shadow-lg ${featured
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-500 hover:to-red-500'
                                : 'bg-blue-600 text-white hover:bg-blue-600'
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
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg group/heart"
                    >
                        <svg className="w-5 h-5 text-gray-700 group-hover/heart:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </Button>
                </div>

                {/* Content Section */}
                <CardContent className="p-5 space-y-3">
                    {/* Price and Sqft Row */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">{price}</h3>
                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                            <span className="text-sm font-bold text-gray-700">{sqft}</span>
                            <span className="text-xs text-gray-500">sqft</span>
                        </div>
                    </div>

                    {/* Beds and Baths Row */}
                    <div className="flex items-center gap-6">
                        {/* Beds */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-full text-blue-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-gray-900">{beds}</span>
                                <span className="text-sm text-gray-500">Beds</span>
                            </div>
                        </div>

                        {/* Baths */}
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-blue-50 rounded-full text-blue-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-base font-bold text-gray-900">{baths}</span>
                                <span className="text-sm text-gray-500">Baths</span>
                            </div>
                        </div>
                    </div>

                    {/* Location - Clickable */}
                    <button
                        onClick={openGoogleMaps}
                        className="w-full flex items-center gap-2 pt-3 border-t border-gray-100 hover:text-blue-600 transition-colors group/location text-left"
                    >
                        <svg className="w-4 h-4 text-gray-400 group-hover/location:text-blue-600 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-gray-600 group-hover/location:text-blue-600 font-medium truncate transition-colors">{address}</p>
                    </button>
                </CardContent>
            </Card>
        </Link>
    );
};

export default PropertyCard;

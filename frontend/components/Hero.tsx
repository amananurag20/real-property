'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { allProperties } from '@/data/properties';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dynamically import MapSearchModal to avoid SSR issues with Leaflet
const MapSearchModal = dynamic(() => import('./MapSearchModal'), {
    ssr: false,
    loading: () => null
});

interface HeroProps {
    onMapSearch?: (properties: typeof allProperties) => void;
}

const Hero = ({ onMapSearch }: HeroProps) => {
    const router = useRouter();
    const [location, setLocation] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching...', { location, priceMin, priceMax });
        // Navigate to properties page with search term
        if (location) {
            // Note: properties page currently doesn't read 'q' param for location search text, 
            // but we could add it. For now, let's just go to all properties.
            // Or better: update properties page to read 'search' param too. 
            // But let's keep it simple as user asked for Map View All.
            router.push('/properties');
        }
    };

    const handleMapSearch = (properties: typeof allProperties) => {
        console.log('Found properties from map search:', properties);
        if (properties.length > 0) {
            const ids = properties.map(p => p.id).join(',');
            router.push(`/properties?ids=${ids}`);
        }

        if (onMapSearch) {
            onMapSearch(properties);
        }
    };

    return (
        <>
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                    🏆 #1 Platform
                                </span>
                                <span className="text-sm text-gray-500 font-medium">Trusted by millions</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                Find Your
                                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                    Dream Home
                                </span>
                                in India
                            </h1>

                            <p className="text-base text-gray-600 leading-relaxed max-w-lg">
                                Discover verified listings across major Indian cities.
                            </p>

                            {/* Search Form */}
                            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-5 space-y-4 border border-gray-100">
                                <div className="space-y-3">
                                    {/* Location Input with Map Icon */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <Input
                                            type="text"
                                            placeholder="City, Locality, Project"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="pl-10 pr-12 w-full"
                                        />
                                        {/* Map Search Button */}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setIsMapModalOpen(true)}
                                            className="absolute inset-y-0 right-0 h-full px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 z-10 rounded-l-none"
                                            title="Search on Map"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                            </svg>
                                        </Button>
                                    </div>

                                    {/* Price Range */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <Select value={priceMin} onValueChange={setPriceMin}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Min Price" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Min Price</SelectItem>
                                                <SelectItem value="25L">₹25 L</SelectItem>
                                                <SelectItem value="50L">₹50 L</SelectItem>
                                                <SelectItem value="75L">₹75 L</SelectItem>
                                                <SelectItem value="1Cr">₹1 Cr</SelectItem>
                                                <SelectItem value="2Cr">₹2 Cr</SelectItem>
                                                <SelectItem value="5Cr">₹5 Cr</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select value={priceMax} onValueChange={setPriceMax}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Max Price" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Max Price</SelectItem>
                                                <SelectItem value="50L">₹50 L</SelectItem>
                                                <SelectItem value="1Cr">₹1 Cr</SelectItem>
                                                <SelectItem value="2Cr">₹2 Cr</SelectItem>
                                                <SelectItem value="5Cr">₹5 Cr</SelectItem>
                                                <SelectItem value="10Cr">₹10 Cr</SelectItem>
                                                <SelectItem value="10Cr+">₹10 Cr+</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                                    size="lg"
                                >
                                    Search Properties
                                </Button>
                            </form>

                            {/* Popular Cities */}
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 font-medium">Popular Cities:</p>
                                <div className="flex flex-wrap gap-2">
                                    {popularCities.map((city) => (
                                        <Button
                                            key={city}
                                            variant="outline"
                                            size="sm"
                                            className="text-xs font-medium bg-white hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            {city}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="relative hidden lg:flex h-full items-center justify-center">
                            <div className="relative w-full max-w-md mx-auto aspect-square">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                                <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 shadow-inner h-full flex items-center justify-center">
                                    <svg className="w-full h-auto text-blue-600" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M50 300 L350 300" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
                                        <rect x="80" y="160" width="240" height="140" fill="currentColor" opacity="0.1" rx="8" />
                                        <rect x="100" y="180" width="200" height="120" fill="currentColor" opacity="0.1" rx="4" />
                                        <path d="M200 100 L340 180 L340 300 L60 300 L60 180 Z" fill="currentColor" opacity="0.2" />
                                        <rect x="120" y="220" width="60" height="80" fill="white" rx="4" opacity="0.8" />
                                        <rect x="220" y="220" width="60" height="50" fill="white" rx="4" opacity="0.8" />
                                        <circle cx="320" cy="80" r="30" fill="#FCD34D" opacity="0.8" />
                                        <path d="M40 140 Q100 120 160 140" stroke="#10B981" strokeWidth="3" fill="none" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Search Modal */}
            {mounted && (
                <MapSearchModal
                    isOpen={isMapModalOpen}
                    onClose={() => setIsMapModalOpen(false)}
                    onSearch={handleMapSearch}
                />
            )}
        </>
    );
};

export default Hero;

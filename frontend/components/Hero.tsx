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
            <section className="relative overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                                Find a place you will call{' '}
                                <span className="text-gray-900">home</span>
                            </h1>

                            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                                Discover your perfect property from our extensive collection of verified listings across India.
                            </p>

                            <Button
                                onClick={() => router.push('/properties')}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-lg"
                                size="lg"
                            >
                                Search
                            </Button>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <img
                                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop"
                                    alt="Modern Luxury Home"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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

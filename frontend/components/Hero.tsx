'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { allProperties } from '@/data/properties';

// Dynamically import MapSearchModal to avoid SSR issues with Leaflet
const MapSearchModal = dynamic(() => import('./MapSearchModal'), {
    ssr: false,
    loading: () => null
});

interface HeroProps {
    onMapSearch?: (properties: typeof allProperties) => void;
}

const Hero = ({ onMapSearch }: HeroProps) => {
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
    };

    const handleMapSearch = (properties: typeof allProperties) => {
        console.log('Found properties from map search:', properties);
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
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="City, Locality, Project"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full pl-12 pr-14 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                        />
                                        {/* Map Search Button */}
                                        <button
                                            type="button"
                                            onClick={() => setIsMapModalOpen(true)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                                            title="Search on Map"
                                        >
                                            <div className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 group-hover:scale-110 transition-all duration-200">
                                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>

                                    {/* Price Range */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <select
                                                value={priceMin}
                                                onChange={(e) => setPriceMin(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white"
                                            >
                                                <option value="">Min Price</option>
                                                <option value="25L">₹25 L</option>
                                                <option value="50L">₹50 L</option>
                                                <option value="75L">₹75 L</option>
                                                <option value="1Cr">₹1 Cr</option>
                                                <option value="2Cr">₹2 Cr</option>
                                                <option value="5Cr">₹5 Cr</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <select
                                                value={priceMax}
                                                onChange={(e) => setPriceMax(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white"
                                            >
                                                <option value="">Max Price</option>
                                                <option value="50L">₹50 L</option>
                                                <option value="1Cr">₹1 Cr</option>
                                                <option value="2Cr">₹2 Cr</option>
                                                <option value="5Cr">₹5 Cr</option>
                                                <option value="10Cr">₹10 Cr</option>
                                                <option value="10Cr+">₹10 Cr+</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Search Properties
                                </button>
                            </form>

                            {/* Popular Cities */}
                            <div className="space-y-2">
                                <p className="text-xs text-gray-500 font-medium">Popular Cities:</p>
                                <div className="flex flex-wrap gap-2">
                                    {popularCities.map((city) => (
                                        <button
                                            key={city}
                                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 text-xs font-medium transition-all duration-200 shadow-sm hover:shadow"
                                        >
                                            {city}
                                        </button>
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

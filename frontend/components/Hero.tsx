'use client';

import { useState } from 'react';

const Hero = () => {
    const [location, setLocation] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');

    const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching...', { location, priceMin, priceMax });
    };

    return (
        <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-block">
                            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                🏆 India's #1 Real Estate Platform
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Find Your
                            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                                Dream Home
                            </span>
                            in India
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Discover the perfect property from thousands of verified listings across major Indian cities.
                            Your journey to finding the ideal home starts here.
                        </p>

                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl shadow-gray-300/50 p-6 space-y-4 border border-gray-100">
                            <div className="space-y-4">
                                {/* Location Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="City, Locality, Project Name"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                    />
                                </div>

                                {/* Price Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <select
                                            value={priceMin}
                                            onChange={(e) => setPriceMin(e.target.value)}
                                            className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white"
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
                                            className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 appearance-none bg-white"
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
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Search Properties
                            </button>
                        </form>

                        {/* Popular Cities */}
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500 font-medium">Popular Cities:</p>
                            <div className="flex flex-wrap gap-2">
                                {popularCities.map((city) => (
                                    <button
                                        key={city}
                                        className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8">
                                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Modern House Illustration */}
                                    <rect x="80" y="180" width="240" height="160" fill="#3B82F6" opacity="0.1" rx="8" />
                                    <rect x="100" y="200" width="200" height="120" fill="#3B82F6" opacity="0.2" rx="4" />
                                    <path d="M200 120 L340 200 L340 340 L60 340 L60 200 Z" fill="#3B82F6" opacity="0.3" />
                                    <rect x="120" y="240" width="60" height="100" fill="#EFF6FF" rx="4" />
                                    <rect x="220" y="240" width="60" height="60" fill="#EFF6FF" rx="4" />
                                    <circle cx="350" cy="100" r="40" fill="#FCD34D" opacity="0.6" />
                                    <path d="M50 160 Q100 140 150 160" stroke="#10B981" strokeWidth="4" fill="none" />
                                    <circle cx="80" cy="180" r="20" fill="#10B981" opacity="0.3" />
                                    <circle cx="130" cy="175" r="15" fill="#10B981" opacity="0.3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

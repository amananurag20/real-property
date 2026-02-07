'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { allProperties } from '@/data/properties';

function PropertiesContent() {
    const searchParams = useSearchParams();
    const cityParam = searchParams.get('city');
    const idsParam = searchParams.get('ids');

    // Normalize city param or default to 'All'
    // This allows linking like /properties?city=Mumbai
    const initialCity = cityParam
        ? cityParam.charAt(0).toUpperCase() + cityParam.slice(1).toLowerCase()
        : 'All';

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(initialCity);

    // Update if URL changes
    useEffect(() => {
        if (cityParam) {
            setSelectedCity(cityParam.charAt(0).toUpperCase() + cityParam.slice(1).toLowerCase());
        }
    }, [cityParam]);

    const cities = ['All', 'Mumbai', 'Bangalore', 'Pune', 'Delhi'];

    const filteredProperties = allProperties.filter(property => {
        // If IDs are provided (e.g. from map search), filter by them exclusively
        if (idsParam) {
            const ids = idsParam.split(',').map(Number);
            return ids.includes(property.id);
        }

        const matchesSearch = property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.city.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCity = selectedCity === 'All' || property.city === selectedCity;
        return matchesSearch && matchesCity;
    });

    return (
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Properties</h1>
                    <p className="text-gray-600 mt-2">Explore our collection of premium properties across India</p>
                </div>

                {!idsParam && (
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search location, city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* City Filter */}
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                )}

                {idsParam && (
                    <div className="flex items-center">
                        <a href="/properties" className="text-blue-600 hover:text-blue-700 font-medium">
                            Clear map filter
                        </a>
                    </div>
                )}
            </div>

            {filteredProperties.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProperties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No properties found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filter to find what you're looking for.</p>
                    <button
                        onClick={() => { setSearchTerm(''); setSelectedCity('All') }}
                        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </main>
    );
}

export default function PropertiesPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Suspense fallback={<div className="pt-24 text-center">Loading properties...</div>}>
                <PropertiesContent />
            </Suspense>
            <Footer />
        </div>
    );
}

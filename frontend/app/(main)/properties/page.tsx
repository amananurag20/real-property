'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PropertyCard from '@/components/PropertyCard';
import { allProperties } from '@/data/properties';
import { normalizeCity } from '@/utils/string';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

function PropertiesContent() {
    const searchParams = useSearchParams();
    const cityParam = searchParams.get('city');
    const idsParam = searchParams.get('ids');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState(normalizeCity(cityParam));

    // Update if URL changes
    useEffect(() => {
        if (cityParam) {
            setSelectedCity(normalizeCity(cityParam));
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
        <main className="min-h-[calc(100vh-4rem)] bg-muted/30 pt-24 pb-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header & Filters */}
                <div className="mb-12">
                    {/* Simple Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                            Properties
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Find your perfect home from our curated collection
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-4xl mx-auto">
                        {/* Search Bar */}
                        <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-1">
                            <div className="flex flex-col md:flex-row">
                                {/* Search Input */}
                                <div className="flex-1 flex items-center px-4 py-3">
                                    <svg className="w-5 h-5 text-muted-foreground mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <Input
                                        type="text"
                                        placeholder="Search location, city, property type..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="border-0 bg-transparent focus-visible:ring-0 flex-1"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="hidden md:block w-px h-8 bg-border/50"></div>

                                {/* City Filter */}
                                <div className="w-full md:w-56 px-4 py-3">
                                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                                        <SelectTrigger className="w-full border-0 bg-transparent focus-visible:ring-0">
                                            <SelectValue placeholder="All Cities" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities.map(city => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Quick City Filters */}
                        <div className="mt-6">
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm text-muted-foreground">Quick filter:</span>
                                {['Mumbai', 'Bangalore', 'Pune', 'Delhi'].map(city => (
                                    <button
                                        key={city}
                                        onClick={() => setSelectedCity(city)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                            selectedCity === city
                                                ? 'bg-primary text-white'
                                                : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                    >
                                        {city}
                                    </button>
                                ))}
                                {(searchTerm || selectedCity !== 'All') && (
                                    <button
                                        onClick={() => { setSearchTerm(''); setSelectedCity('All'); }}
                                        className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Map Filter Notice */}
                    {idsParam && (
                        <div className="mt-6 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium">Showing properties from map selection</span>
                                <button 
                                    onClick={() => { setSearchTerm(''); setSelectedCity('All'); }}
                                    className="ml-2 text-xs underline hover:no-underline"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Properties Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property.id} {...property} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 px-6 bg-card border border-border rounded-xl shadow-xs">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No properties found</h3>
                        <p className="text-muted-foreground text-center max-w-sm mb-8">Try adjusting your search filters to find what you're looking for.</p>
                        <Button
                            variant="default"
                            onClick={() => { setSearchTerm(''); setSelectedCity('All') }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function PropertiesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Suspense fallback={<div className="pt-24 text-center text-muted-foreground">Loading properties...</div>}>
                <PropertiesContent />
            </Suspense>
        </div>
    );
}

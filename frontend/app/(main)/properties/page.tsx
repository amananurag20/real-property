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
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">Properties</h1>
                            <p className="text-muted-foreground">Explore premium properties across India</p>
                        </div>

                        {!idsParam && (
                            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                                {/* Search Input */}
                                <div className="relative flex-1 sm:flex-initial sm:w-72">
                                    <Input
                                        type="text"
                                        placeholder="Search location, city..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 h-11 bg-background shadow-xs hover:border-primary/50 transition-colors"
                                    />
                                    <svg className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {/* City Filter */}
                                <div className="w-full sm:w-56">
                                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                                        <SelectTrigger className="h-11 bg-background shadow-xs hover:border-primary/50 transition-colors">
                                            <SelectValue placeholder="City" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" className="z-[1001]">
                                            {cities.map(city => (
                                                <SelectItem key={city} value={city}>{city}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>

                    {idsParam && (
                        <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-lg shrink-0">
                            <span className="text-sm font-medium text-primary">Filtered from map</span>
                            <Button variant="ghost" size="sm" onClick={() => { setSearchTerm(''); setSelectedCity('All'); }} className="text-primary hover:text-primary hover:bg-primary/20 h-7 px-3 text-xs">
                                Clear filter
                            </Button>
                        </div>
                    )}
                </div>

                {/* Properties Grid */}
                {filteredProperties.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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

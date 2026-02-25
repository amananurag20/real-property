'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SearchBar = () => {
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching...', { location, propertyType, priceRange });
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        We help you find the home that will be yours
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover your perfect property from our extensive listings
                    </p>
                </div>

                <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <Input
                                    type="text"
                                    placeholder="City, Area"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Property Type
                                </label>
                                <Select value={propertyType} onValueChange={setPropertyType}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="apartment">Apartment</SelectItem>
                                        <SelectItem value="villa">Villa</SelectItem>
                                        <SelectItem value="house">House</SelectItem>
                                        <SelectItem value="studio">Studio</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <Select value={priceRange} onValueChange={setPriceRange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0-50L">₹0 - ₹50 L</SelectItem>
                                        <SelectItem value="50L-1Cr">₹50 L - ₹1 Cr</SelectItem>
                                        <SelectItem value="1Cr-2Cr">₹1 Cr - ₹2 Cr</SelectItem>
                                        <SelectItem value="2Cr+">₹2 Cr+</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="md:col-span-1 flex items-end">
                                <Button
                                    type="submit"
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                                    size="lg"
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SearchBar;

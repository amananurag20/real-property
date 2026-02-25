'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Building2, Filter, Layers } from 'lucide-react';

export default function MapPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const properties = [
        { id: 1, title: 'Sunset Villa', location: 'Mumbai', price: '₹2.5 Cr', type: 'Villa', lat: 19.076, lng: 72.877 },
        { id: 2, title: 'Modern Apartment', location: 'Bangalore', price: '₹85 L', type: 'Apartment', lat: 12.971, lng: 77.594 },
        { id: 3, title: 'Commercial Space', location: 'Delhi', price: '₹3 Cr', type: 'Commercial', lat: 28.613, lng: 77.209 },
        { id: 4, title: 'Eco Heights', location: 'Pune', price: '₹1.2 Cr', type: 'Apartment', lat: 18.520, lng: 73.856 },
    ];

    return (
        <div className="h-[calc(100vh-4rem)] flex">
            {/* Sidebar */}
            <div className="w-96 bg-white border-r overflow-y-auto">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-900 mb-4">Interactive Map</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search location..." className="pl-9" />
                    </div>
                    <div className="flex gap-2 mt-3">
                        <Button 
                            variant={activeFilter === 'all' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => setActiveFilter('all')}
                        >
                            All
                        </Button>
                        <Button 
                            variant={activeFilter === 'sale' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => setActiveFilter('sale')}
                        >
                            Sale
                        </Button>
                        <Button 
                            variant={activeFilter === 'rent' ? 'default' : 'outline'} 
                            size="sm"
                            onClick={() => setActiveFilter('rent')}
                        >
                            Rent
                        </Button>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    {properties.map((property) => (
                        <Card key={property.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                                        <p className="text-sm text-gray-500">{property.location}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary" className="text-xs">{property.type}</Badge>
                                            <span className="text-sm font-medium text-blue-600">{property.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="flex-1 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">Interactive Map</h2>
                        <p className="text-gray-500 mb-4">Map integration with property pins</p>
                        <div className="flex items-center gap-2 justify-center text-sm text-gray-400">
                            <Layers className="w-4 h-4" />
                            <span>Leaflet/Mapbox integration placeholder</span>
                        </div>
                    </div>
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
                    <Button variant="ghost" size="icon">
                        <Layers className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Filter className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

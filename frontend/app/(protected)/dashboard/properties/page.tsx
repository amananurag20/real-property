'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Building2, MapPin, Bed, Bath } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function DashboardPropertiesPage() {
    const properties = [
        {
            id: 1,
            title: 'My Apartment',
            location: 'Mumbai, Maharashtra',
            price: '₹85,00,000',
            beds: 2,
            baths: 2,
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 2,
            title: 'Sea View Villa',
            location: 'Goa',
            price: '₹3,50,00,000',
            beds: 4,
            baths: 3,
            status: 'Under Discussion',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Properties</h1>
                    <p className="text-gray-500 mt-1">Manage your property listings</p>
                </div>
                <Link href="/dashboard/properties/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Property
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900">{property.title}</h3>
                                    <p className="text-sm text-gray-500 flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {property.location}
                                    </p>
                                </div>
                                <Badge variant={property.status === 'Available' ? 'default' : 'secondary'}>
                                    {property.status}
                                </Badge>
                            </div>
                            <p className="text-xl font-bold text-blue-600 mb-3">{property.price}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Bed className="w-4 h-4" />
                                    {property.beds} Beds
                                </span>
                                <span className="flex items-center gap-1">
                                    <Bath className="w-4 h-4" />
                                    {property.baths} Baths
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Building2, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AgentPropertiesPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.LINK_PROPERTY_REQUEST)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const properties = [
        {
            id: 1,
            title: 'Sunset Villa',
            location: 'Mumbai, Maharashtra',
            price: '₹2,50,00,000',
            beds: 4,
            baths: 3,
            sqft: 2500,
            status: 'Available',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 2,
            title: 'Modern Apartment',
            location: 'Bangalore, Karnataka',
            price: '₹85,00,000',
            beds: 2,
            baths: 2,
            sqft: 1200,
            status: 'Under Discussion',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Agent Properties</h1>
                <p className="text-gray-500 mt-1">Properties you are managing as an agent</p>
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
                                <span className="flex items-center gap-1">
                                    <Square className="w-4 h-4" />
                                    {property.sqft} sqft
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

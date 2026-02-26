'use client';

import PropertyCard from './PropertyCard';

interface Property {
    id: number;
    image: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    address: string;
    status: string;
    featured: boolean;
    description: string;
    propertyType: string;
}

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface PropertySectionProps {
    title: string;
    subtitle: string;
    properties: Property[];
    bgColor?: string;
    city?: string;
}

const PropertySection = ({ title, subtitle, properties, bgColor = 'bg-white', city }: PropertySectionProps) => {
    return (
        <section className={`py-16 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                        <p className="text-gray-600">{subtitle}</p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold flex items-center gap-2 group" asChild>
                        <Link href={city ? `/properties?city=${city}` : '/properties'}>
                            <span>View All</span>
                            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {properties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PropertySection;

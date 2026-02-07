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
}

import Link from 'next/link';

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
                    <Link
                        href={city ? `/properties?city=${city}` : '/properties'}
                        className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 group"
                    >
                        <span>View All</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
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

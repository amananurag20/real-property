'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { allProperties } from '@/data/properties';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function PropertyContent() {
    const searchParams = useSearchParams();
    const propertyId = searchParams.get('id');
    const property = allProperties.find(p => p.id === parseInt(propertyId || '0'));

    const [selectedImage, setSelectedImage] = useState(0);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
                    <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link href="/properties" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        ← Back to Properties
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Images and Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image Gallery */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Large Image */}
                            <div className="relative h-96 bg-gray-200">
                                <img
                                    src={property.images[selectedImage]}
                                    alt={property.address}
                                    className="w-full h-full object-cover"
                                />
                                {/* Status Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-4 py-2 rounded-lg text-sm font-semibold ${property.featured
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                        : 'bg-blue-600 text-white'
                                        } shadow-lg`}>
                                        {property.status}
                                    </span>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="p-4 grid grid-cols-4 gap-3">
                                {property.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                            ? 'border-blue-600 ring-2 ring-blue-200'
                                            : 'border-gray-200 hover:border-blue-400'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`View ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Property Overview */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.address}</h1>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-lg">{property.city}</span>
                                </div>
                            </div>

                            {/* Price and Key Details */}
                            <div className="flex items-center justify-between py-4 border-y border-gray-200">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Price</p>
                                    <p className="text-4xl font-bold text-blue-600">{property.price}</p>
                                </div>
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Beds</p>
                                        <p className="text-2xl font-bold text-gray-900">{property.beds}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Baths</p>
                                        <p className="text-2xl font-bold text-gray-900">{property.baths}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Area</p>
                                        <p className="text-2xl font-bold text-gray-900">{property.sqft} sqft</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">About This Property</h2>
                                <p className="text-gray-700 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Property Facts */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Property Type</span>
                                        <span className="font-semibold text-gray-900">{property.propertyType}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Year Built</span>
                                        <span className="font-semibold text-gray-900">{property.yearBuilt}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Parking Spaces</span>
                                        <span className="font-semibold text-gray-900">{property.parking}</span>
                                    </div>
                                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="text-gray-600">Area (sqft)</span>
                                        <span className="font-semibold text-gray-900">{property.sqft}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-sm font-medium text-gray-900">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Location Map */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                                <div className="bg-gray-100 rounded-xl p-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-lg">{property.address}</p>
                                            <p className="text-gray-600">{property.city}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={openGoogleMaps}
                                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        View on Google Maps
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Interested in this property?</h3>
                            <p className="text-gray-600 text-sm">Fill in your details and we'll get back to you</p>

                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all resize-none"
                                        placeholder="I'm interested in this property..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Request Information
                                </button>
                            </form>

                            <div className="pt-4 border-t border-gray-200">
                                <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Contact via WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default function PropertyDetailsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        }>
            <PropertyContent />
        </Suspense>
    );
}

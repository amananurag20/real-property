'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { allProperties } from '@/data/properties';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function PropertyContent({ id }: { id: string }) {
    const property = allProperties.find(p => p.id === parseInt(id || '0'));
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
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/properties"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Images and Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Image Gallery */}
                        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40">
                            {/* Large Image */}
                            <div className="relative h-[500px] bg-muted overflow-hidden">
                                <img
                                    src={property.images[selectedImage]}
                                    alt={property.address}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden="true"></div>
                                
                                {/* Status Badge */}
                                <div className="absolute top-6 left-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-bold text-slate-900 shadow-lg">
                                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                                        {property.status}
                                    </div>
                                </div>

                                {/* Image Count */}
                                <div className="absolute bottom-6 right-6">
                                    <div className="inline-flex items-center rounded-full bg-slate-900/90 backdrop-blur-sm px-4 py-2 text-sm font-bold text-white shadow-lg">
                                        {selectedImage + 1} / {property.images.length}
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail Gallery */}
                            <div className="p-6 grid grid-cols-5 gap-3 bg-white">
                                {property.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                                            selectedImage === index
                                                ? 'border-primary ring-2 ring-primary/30'
                                                : 'border-border hover:border-primary/50'
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

                        {/* Property Header Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-6">
                            <div className="space-y-3">
                                <h1 className="text-4xl font-bold text-foreground">{property.address}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-lg font-medium">{property.city}</span>
                                </div>
                            </div>

                            {/* Price and Key Details */}
                            <div className="grid grid-cols-4 gap-4 py-6 border-y border-border">
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Price</p>
                                    <p className="text-3xl font-bold text-slate-900">{property.price}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Beds</p>
                                    <p className="text-3xl font-bold text-slate-900">{property.beds}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Baths</p>
                                    <p className="text-3xl font-bold text-slate-900">{property.baths}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Area</p>
                                    <p className="text-3xl font-bold text-slate-900">{property.sqft}</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">{property.description}</p>
                            </div>
                        </div>

                        {/* Key Features Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Key Features</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Property Type</p>
                                        <p className="text-sm font-semibold text-foreground">{property.propertyType}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Year Built</p>
                                        <p className="text-sm font-semibold text-foreground">{property.yearBuilt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Parking</p>
                                        <p className="text-sm font-semibold text-foreground">{property.parking} spaces</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Total Area</p>
                                        <p className="text-sm font-semibold text-foreground">{property.sqft} sqft</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Amenities Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Amenities</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                                        <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-sm font-medium text-foreground">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Location</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                                        <p className="text-lg font-semibold text-foreground">{property.address}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{property.city}</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={openGoogleMaps}
                                    className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-sm"
                                >
                                    View on Google Maps
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Agent Card */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-primary/20 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-muted-foreground">Your Agent</p>
                                            <h4 className="text-lg font-bold text-foreground">Sarah Johnson</h4>
                                            <p className="text-xs text-primary font-semibold">Verified Agent</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-border">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            sarah.johnson@realproperty.com
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            +91 98765 43210
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form Card */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground">Interested in this property?</h3>
                                    <p className="text-muted-foreground text-sm">Fill in your details and we'll connect you with the agent</p>
                                </div>

                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-foreground">Full Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            className="rounded-xl border-border/50 focus-visible:ring-primary h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className="rounded-xl border-border/50 focus-visible:ring-primary h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone</Label>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            placeholder="+91 98765 43210"
                                            className="rounded-xl border-border/50 focus-visible:ring-primary h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-semibold text-foreground">Message</Label>
                                        <Textarea
                                            id="message"
                                            rows={3}
                                            className="resize-none rounded-xl border-border/50 focus-visible:ring-primary"
                                            placeholder="Tell us what you're looking for..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-sm"
                                    >
                                        Send Inquiry
                                    </Button>
                                </form>

                                <div className="pt-4 border-t border-border space-y-3">
                                    <p className="text-xs text-muted-foreground text-center">Or contact directly</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button 
                                            size="lg" 
                                            className="h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all shadow-sm gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            WhatsApp
                                        </Button>
                                        <Button 
                                            size="lg" 
                                            className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-sm gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Call
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return (
        <PropertyContent id={id} />
    );
}

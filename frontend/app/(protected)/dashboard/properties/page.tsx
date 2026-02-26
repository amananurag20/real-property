'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Building2, MapPin, Bed, Bath, ChevronLeft, Edit, Eye, MoreVertical } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardPropertiesPage() {
    const properties = [
        {
            id: 1,
            title: 'Luxury 2BHK Apartment',
            location: 'Bandra West, Mumbai, Maharashtra',
            price: '₹85,00,000',
            beds: 2,
            baths: 2,
            sqft: '1,200 sqft',
            status: 'Available',
            type: 'Sale',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            postedDate: '2 days ago',
            views: 45,
        },
        {
            id: 2,
            title: 'Sea View Villa',
            location: 'Candolim, Goa',
            price: '₹3,50,00,000',
            beds: 4,
            baths: 3,
            sqft: '2,800 sqft',
            status: 'Under Discussion',
            type: 'Sale',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
            postedDate: '1 week ago',
            views: 128,
        },
        {
            id: 3,
            title: 'Modern Studio Apartment',
            location: 'Koramangala, Bangalore, Karnataka',
            price: '₹25,000/month',
            beds: 1,
            baths: 1,
            sqft: '650 sqft',
            status: 'Available',
            type: 'Rent',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
            postedDate: '3 days ago',
            views: 32,
        },
    ];

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link 
                        href="/dashboard"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground">My Properties</h1>
                        <p className="text-muted-foreground">Manage your property listings</p>
                    </div>
                    <Link href="/dashboard/properties/form">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Property
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-[24px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Properties</p>
                                <p className="text-2xl font-bold text-foreground">{properties.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[24px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10">
                                <Eye className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Views</p>
                                <p className="text-2xl font-bold text-foreground">{properties.reduce((sum, p) => sum + p.views, 0)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[24px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10">
                                <Building2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Available</p>
                                <p className="text-2xl font-bold text-foreground">{properties.filter(p => p.status === 'Available').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property.id} className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 overflow-hidden hover:shadow-[0_40px_80px_-45px_rgba(15,23,42,0.6)] transition-all duration-300 group">
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge 
                                        variant={property.type === 'Sale' ? 'default' : 'secondary'}
                                        className="rounded-full px-3 py-1"
                                    >
                                        For {property.type}
                                    </Badge>
                                    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold border ${
                                        property.status === 'Available' 
                                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                            : 'bg-orange-50 text-orange-600 border-orange-100'
                                    }`}>
                                        <span className={`inline-block h-2 w-2 rounded-full ${
                                            property.status === 'Available' ? 'bg-emerald-500' : 'bg-orange-500'
                                        }`}></span>
                                        {property.status}
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem asChild>
                                                <Link href={`/properties/${property.id}`} className="flex items-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    View Details
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/dashboard/properties/form/edit/${property.id}`} className="flex items-center gap-2">
                                                    <Edit className="w-4 h-4" />
                                                    Edit Property
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{property.title}</h3>
                                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                                        <MapPin className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-sm line-clamp-1">{property.location}</span>
                                    </div>
                                    <p className="text-2xl font-bold text-primary">{property.price}</p>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-muted-foreground py-3 border-y border-border">
                                    <div className="flex items-center gap-1">
                                        <Bed className="w-4 h-4" />
                                        <span>{property.beds} Beds</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Bath className="w-4 h-4" />
                                        <span>{property.baths} Baths</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Building2 className="w-4 h-4" />
                                        <span>{property.sqft}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Posted {property.postedDate}</span>
                                    <div className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        <span>{property.views} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {properties.length === 0 && (
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
                            <Building2 className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No properties yet</h3>
                        <p className="text-muted-foreground mb-6">Start by adding your first property listing</p>
                        <Link href="/dashboard/properties/form">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Property
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

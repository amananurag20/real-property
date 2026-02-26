'use client';

import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Building2, Home, Filter, Layers, ChevronLeft, Bed, Bath, Maximize, List, X } from 'lucide-react';
import { allProperties } from '@/data/properties';

// Custom marker icon
const propertyIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export default function MapPage() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProperty, setSelectedProperty] = useState<number | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);

    // Filter properties based on search and filter
    const filteredProperties = useMemo(() => {
        return allProperties.filter((property) => {
            const matchesSearch = 
                property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.propertyType.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilter = 
                activeFilter === 'all' || 
                (activeFilter === 'sale' && property.status === 'For Sale') ||
                (activeFilter === 'rent' && property.status === 'For Rent');
            
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, activeFilter]);

    // Calculate center based on filtered properties or default to India center
    const mapCenter = useMemo(() => {
        if (filteredProperties.length > 0) {
            const avgLat = filteredProperties.reduce((sum, p) => sum + p.latitude, 0) / filteredProperties.length;
            const avgLng = filteredProperties.reduce((sum, p) => sum + p.longitude, 0) / filteredProperties.length;
            return [avgLat, avgLng] as [number, number];
        }
        return [20.5937, 78.9629] as [number, number]; // Center of India
    }, [filteredProperties]);

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Back Button & Header */}
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Interactive Map</h1>
                        <p className="text-muted-foreground">Explore properties across India</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[400px_1fr] gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-12rem)]">
                    {/* Backdrop Overlay - Mobile Only */}
                    {showSidebar && (
                        <div 
                            className="fixed inset-0 bg-black/50 z-[1500] lg:hidden backdrop-blur-sm"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}

                    {/* Sidebar - Slides from bottom on mobile */}
                    <div className={`bg-white shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 overflow-hidden flex flex-col transition-transform duration-300 ${
                        showSidebar 
                            ? 'fixed bottom-0 left-0 right-0 z-[2000] rounded-t-[32px] max-h-[85vh] lg:static lg:rounded-[32px] lg:max-h-none' 
                            : 'hidden lg:flex lg:rounded-[32px]'
                    }`}>
                        {/* Search & Filter Section */}
                        <div className="p-4 lg:p-6 border-b border-border">
                            <div className="flex items-center justify-between mb-4 lg:hidden">
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-1.5 bg-muted rounded-full"></div>
                                    <h2 className="text-lg font-bold">Properties</h2>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setShowSidebar(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="relative mb-4">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input 
                                    placeholder="Search location..." 
                                    className="pl-12 h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button 
                                    variant={activeFilter === 'all' ? 'default' : 'outline'} 
                                    size="sm"
                                    onClick={() => setActiveFilter('all')}
                                    className="rounded-full flex-1"
                                >
                                    <Layers className="w-4 h-4 mr-2" />
                                    All
                                </Button>
                                <Button 
                                    variant={activeFilter === 'sale' ? 'default' : 'outline'} 
                                    size="sm"
                                    onClick={() => setActiveFilter('sale')}
                                    className="rounded-full flex-1"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Sale
                                </Button>
                                <Button 
                                    variant={activeFilter === 'rent' ? 'default' : 'outline'} 
                                    size="sm"
                                    onClick={() => setActiveFilter('rent')}
                                    className="rounded-full flex-1"
                                >
                                    <Building2 className="w-4 h-4 mr-2" />
                                    Rent
                                </Button>
                            </div>
                        </div>

                        {/* Property List */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map((property) => (
                                    <div 
                                        key={property.id} 
                                        className={`bg-white rounded-2xl p-4 border-2 cursor-pointer transition-all hover:shadow-md ${
                                            selectedProperty === property.id 
                                                ? 'border-primary ring-2 ring-primary/20' 
                                                : 'border-border/50 hover:border-primary/30'
                                        }`}
                                        onClick={() => setSelectedProperty(property.id)}
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                                                <img 
                                                    src={property.image} 
                                                    alt={property.address}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-bold text-foreground truncate">{property.address}</h3>
                                                    <Badge 
                                                        variant={property.status === 'For Sale' ? 'default' : 'secondary'}
                                                        className="flex-shrink-0 rounded-full text-xs"
                                                    >
                                                        {property.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{property.city}</p>
                                                <p className="text-lg font-bold text-primary">{property.price}</p>
                                                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Bed className="w-3 h-3" />
                                                        {property.beds}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Bath className="w-3 h-3" />
                                                        {property.baths}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Maximize className="w-3 h-3" />
                                                        {property.sqft}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">No properties found</p>
                                    <Button 
                                        variant="outline" 
                                        className="mt-4"
                                        onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                                    >
                                        Clear filters
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Results Count */}
                        <div className="p-4 border-t border-border bg-muted/30">
                            <p className="text-sm text-muted-foreground text-center">
                                Showing <span className="font-bold text-foreground">{filteredProperties.length}</span> properties
                            </p>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="bg-white rounded-[24px] lg:rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 overflow-hidden relative h-[calc(100vh-10rem)] lg:h-auto">
                        {/* Mobile Toggle Sidebar Button */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] lg:hidden">
                            <Button 
                                variant="default"
                                onClick={() => setShowSidebar(true)}
                                className="bg-slate-900 hover:bg-slate-800 text-white shadow-2xl flex items-center gap-2 px-6 py-6 rounded-full"
                            >
                                <List className="w-5 h-5" />
                                <span className="font-semibold">{filteredProperties.length} Properties</span>
                            </Button>
                        </div>

                        <MapContainer
                            center={mapCenter}
                            zoom={5}
                            style={{ height: '100%', width: '100%' }}
                            className="z-0"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {filteredProperties.map((property) => (
                                <Marker
                                    key={property.id}
                                    position={[property.latitude, property.longitude]}
                                    icon={propertyIcon}
                                    eventHandlers={{
                                        click: () => setSelectedProperty(property.id),
                                    }}
                                >
                                    <Popup>
                                        <div className="p-2 min-w-[200px]">
                                            <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                                                <img 
                                                    src={property.image} 
                                                    alt={property.address}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h3 className="font-bold text-sm mb-1">{property.address}</h3>
                                            <p className="text-xs text-muted-foreground mb-2">{property.city}</p>
                                            <p className="font-bold text-primary mb-2">{property.price}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                                <span>{property.beds} beds</span>
                                                <span>{property.baths} baths</span>
                                                <span>{property.sqft}</span>
                                            </div>
                                            <Link href={`/properties/${property.id}`}>
                                                <Button size="sm" className="w-full rounded-lg">
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Map Overlay Controls */}
                        <div className="absolute top-4 right-4 z-[500] flex flex-col gap-2">
                            <Button 
                                variant="secondary" 
                                size="icon"
                                className="bg-white/95 backdrop-blur-sm shadow-lg hover:bg-white w-10 h-10 lg:w-11 lg:h-11"
                            >
                                <Layers className="w-4 h-4 lg:w-5 lg:h-5" />
                            </Button>
                            <Button 
                                variant="secondary" 
                                size="icon"
                                className="bg-white/95 backdrop-blur-sm shadow-lg hover:bg-white w-10 h-10 lg:w-11 lg:h-11"
                            >
                                <Filter className="w-4 h-4 lg:w-5 lg:h-5" />
                            </Button>
                        </div>

                        {/* Legend - Hidden on mobile */}
                        <div className="hidden lg:block absolute bottom-4 left-4 z-[500] bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                            <h4 className="text-sm font-bold mb-2">Property Types</h4>
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span>For Sale</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span>For Rent</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

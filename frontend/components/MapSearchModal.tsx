'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { allProperties } from '@/data/properties';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

interface NominatimResult {
    lat: string;
    lon: string;
    display_name: string;
}

// Fix for default marker icons in Leaflet with Next.js
const UserLocationIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const PropertyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (properties: typeof allProperties) => void;
}

// Component to handle map click
function ClickHandler({ onLocationSelect }: { onLocationSelect: (pos: [number, number]) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect([e.latlng.lat, e.latlng.lng]);
        },
    });
    return null;
}

// Component to fix map size issues and handle fly to location
function MapController({ flyToLocation }: { flyToLocation: [number, number] | null }) {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);

    useEffect(() => {
        if (flyToLocation) {
            map.flyTo(flyToLocation, 12, { duration: 1.5 });
        }
    }, [flyToLocation, map]);

    return null;
}

// Calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MapSearchModal({ isOpen, onClose, onSearch }: MapSearchModalProps) {
    const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
    const [flyToLocation, setFlyToLocation] = useState<[number, number] | null>(null);
    const [radius, setRadius] = useState<number>(10);
    const [propertiesInRadius, setPropertiesInRadius] = useState<typeof allProperties>([]);

    // Search states
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<NominatimResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Location states
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const searchRef = useRef<HTMLDivElement>(null);

    // Default center - India
    const defaultCenter: [number, number] = [20.5937, 78.9629];

    // Close search results when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search for places using OpenStreetMap Nominatim
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        setShowResults(true);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in&limit=5`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    // Handle search result selection
    const handleResultSelect = (result: NominatimResult) => {
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        const newLocation: [number, number] = [lat, lon];
        setSelectedLocation(newLocation);
        setFlyToLocation(newLocation);
        setShowResults(false);
        setSearchQuery(result.display_name.split(',')[0]);
    };

    // Get current location
    const getCurrentLocation = () => {
        setIsLocating(true);
        setLocationError(null);

        if (!navigator.geolocation) {
            setLocationError('Geolocation not supported');
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
                setSelectedLocation(newPos);
                setFlyToLocation(newPos);
                setIsLocating(false);
                setLocationError(null); // Clear any previous error on success
            },
            (error) => {
                console.error('Location error:', error);
                setIsLocating(false);
                if (error.code === 1) {
                    setLocationError('Location access denied');
                } else if (error.code === 2) {
                    setLocationError('Location unavailable');
                } else {
                    setLocationError('Location timeout');
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    // Handle location selection from map click
    const handleLocationSelect = (pos: [number, number]) => {
        setSelectedLocation(pos);
        setFlyToLocation(null); // Don't fly, already clicked there
    };

    // Calculate properties within radius when location or radius changes
    useEffect(() => {
        if (selectedLocation) {
            const filtered = allProperties.filter(property => {
                const distance = calculateDistance(
                    selectedLocation[0],
                    selectedLocation[1],
                    property.latitude,
                    property.longitude
                );
                return distance <= radius;
            });
            setPropertiesInRadius(filtered);
        } else {
            setPropertiesInRadius([]);
        }
    }, [selectedLocation, radius]);

    const handleSearchProperties = () => {
        onSearch(propertiesInRadius);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
            <div className="bg-card rounded-xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col border border-border" style={{ height: '95vh', maxHeight: '900px' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-border shrink-0 bg-background">
                    <div>
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                            <span className="opacity-80">🗺️</span> Search Properties on Map
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">Search a location, use your current location, or click on the map</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-md shrink-0 text-muted-foreground hover:text-foreground">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>

                {/* Controls */}
                <div className="p-5 bg-muted/20 border-b border-border shrink-0">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search Input */}
                        <div className="flex-1 min-w-[250px] relative" ref={searchRef}>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="Search city, locality, or address..."
                                        className="pl-10 h-10 bg-background"
                                    />
                                    <svg className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                    className="h-10 px-6"
                                >
                                    {isSearching ? 'Searching...' : 'Search'}
                                </Button>
                            </div>

                            {/* Search Results Dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-md z-50 max-h-60 overflow-y-auto">
                                    {searchResults.map((result, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleResultSelect(result)}
                                            className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border/50 last:border-0 transition-colors"
                                        >
                                            <p className="font-medium text-foreground text-sm">{result.display_name.split(',')[0]}</p>
                                            <p className="text-xs text-muted-foreground truncate leading-relaxed mt-0.5">{result.display_name}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                            {showResults && searchResults.length === 0 && !isSearching && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-md z-50 p-4 text-center text-muted-foreground text-sm">
                                    No results found
                                </div>
                            )}
                        </div>

                        {/* Current Location Button */}
                        <Button
                            variant={locationError && !selectedLocation ? 'destructive' : 'outline'}
                            onClick={getCurrentLocation}
                            disabled={isLocating}
                            className={`flex items-center gap-2 whitespace-nowrap h-10 bg-background ${!locationError || selectedLocation ? 'hover:bg-accent hover:text-accent-foreground' : ''}`}
                        >
                            {isLocating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    Locating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {locationError && !selectedLocation ? 'Retry' : 'My Location'}
                                </>
                            )}
                        </Button>

                        {/* Radius Selector */}
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-muted-foreground whitespace-nowrap">Radius:</label>
                            <Select value={radius.toString()} onValueChange={(val) => setRadius(Number(val))}>
                                <SelectTrigger className="w-[120px] h-10 bg-background">
                                    <SelectValue placeholder="Select radius" />
                                </SelectTrigger>
                                <SelectContent className="z-[1001]">
                                    <SelectItem value="5">5 km</SelectItem>
                                    <SelectItem value="10">10 km</SelectItem>
                                    <SelectItem value="25">25 km</SelectItem>
                                    <SelectItem value="50">50 km</SelectItem>
                                    <SelectItem value="100">100 km</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Properties Count */}
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border ${propertiesInRadius.length > 0 ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-transparent'
                            }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>{propertiesInRadius.length} properties</span>
                        </div>
                    </div>

                    {/* Error Message - Only show if no location is selected */}
                    {locationError && !selectedLocation && (
                        <p className="mt-3 text-sm text-destructive font-medium flex items-center gap-1.5"><span className="text-lg">⚠️</span> {locationError} - Click on the map instead</p>
                    )}
                </div>

                {/* Map Container */}
                <div className="flex-1 relative" style={{ minHeight: '400px' }}>
                    <MapContainer
                        center={defaultCenter}
                        zoom={5}
                        style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
                    >
                        <MapController flyToLocation={flyToLocation} />
                        <ClickHandler onLocationSelect={handleLocationSelect} />

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Selected Location Marker */}
                        {selectedLocation && (
                            <>
                                <Marker position={selectedLocation} icon={UserLocationIcon}>
                                    <Popup>📍 Selected Location</Popup>
                                </Marker>
                                <Circle
                                    center={selectedLocation}
                                    radius={radius * 1000}
                                    pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.15, weight: 2 }}
                                />
                            </>
                        )}

                        {/* Property Markers */}
                        {propertiesInRadius.map((property) => (
                            <Marker
                                key={property.id}
                                position={[property.latitude, property.longitude]}
                                icon={PropertyIcon}
                            >
                                <Popup>
                                    <div className="min-w-[200px]">
                                        <div className="relative w-full h-24 mb-2">
                                            <Image src={property.image} alt={property.address} fill className="object-cover rounded" sizes="200px" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">{property.address}</h3>
                                        <p className="text-blue-600 font-bold">{property.price}</p>
                                        <p className="text-sm text-gray-500">{property.beds} beds • {property.baths} baths</p>
                                        <a href={`/properties/${property.id}`} className="mt-2 inline-block text-sm text-blue-600 font-medium hover:underline">
                                            View Details →
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {/* Instructions Overlay */}
                    {!selectedLocation && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-background/95 px-6 py-3 rounded-lg shadow-sm border border-border z-[1000] backdrop-blur-sm pointer-events-none">
                            <p className="text-sm text-foreground font-medium">👆 Search above, use your location, or click on the map</p>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-6 left-6 bg-background/95 rounded-lg shadow-sm border border-border p-4 z-[1000] backdrop-blur-sm pointer-events-none min-w-[140px]">
                        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Legend</p>
                        <div className="flex items-center gap-2.5 text-sm text-muted-foreground mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full shrink-0 shadow-sm border border-white/50"></div>
                            <span>Your Location</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                            <div className="w-3 h-3 bg-red-500 rounded-full shrink-0 shadow-sm border border-white/50"></div>
                            <span>Properties</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10 shrink-0">
                    <p className="text-sm font-medium text-muted-foreground hidden md:block">
                        {selectedLocation
                            ? `🎯 Searching within ${radius}km radius • ${propertiesInRadius.length} properties found`
                            : '📍 Select a location to find nearby properties'
                        }
                    </p>
                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        {selectedLocation && (
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSelectedLocation(null);
                                    setFlyToLocation(null);
                                }}
                            >
                                Clear Selection
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSearchProperties}
                            disabled={propertiesInRadius.length === 0}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <span className="opacity-70 mr-1.5">🔍</span> Search {propertiesInRadius.length} Properties
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

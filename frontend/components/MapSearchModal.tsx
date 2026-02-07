'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { allProperties } from '@/data/properties';

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
    const [searchResults, setSearchResults] = useState<any[]>([]);
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
    const handleResultSelect = (result: any) => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col" style={{ height: '95vh' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0 bg-gradient-to-r from-blue-600 to-blue-700">
                    <div>
                        <h2 className="text-xl font-bold text-white">🗺️ Search Properties on Map</h2>
                        <p className="text-sm text-blue-100">Search a location, use your current location, or click on the map</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Controls */}
                <div className="p-4 bg-gray-50 border-b border-gray-200 shrink-0">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Search Input */}
                        <div className="flex-1 min-w-[250px] relative" ref={searchRef}>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="Search city, locality, or address..."
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearching}
                                    className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isSearching ? 'Searching...' : 'Search'}
                                </button>
                            </div>

                            {/* Search Results Dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                                    {searchResults.map((result, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleResultSelect(result)}
                                            className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors"
                                        >
                                            <p className="font-medium text-gray-900 text-sm">{result.display_name.split(',')[0]}</p>
                                            <p className="text-xs text-gray-500 truncate">{result.display_name}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                            {showResults && searchResults.length === 0 && !isSearching && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
                                    No results found
                                </div>
                            )}
                        </div>

                        {/* Current Location Button */}
                        <button
                            onClick={getCurrentLocation}
                            disabled={isLocating}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap ${locationError
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                } disabled:opacity-50`}
                        >
                            {isLocating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                    Locating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {locationError ? 'Retry' : 'My Location'}
                                </>
                            )}
                        </button>

                        {/* Radius Selector */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Radius:</label>
                            <select
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                                className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option value={5}>5 km</option>
                                <option value={10}>10 km</option>
                                <option value={25}>25 km</option>
                                <option value={50}>50 km</option>
                                <option value={100}>100 km</option>
                            </select>
                        </div>

                        {/* Properties Count */}
                        <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium ${propertiesInRadius.length > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span>{propertiesInRadius.length} properties</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {locationError && (
                        <p className="mt-2 text-sm text-red-600">⚠️ {locationError} - Click on the map instead</p>
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
                                        <img src={property.image} alt={property.address} className="w-full h-24 object-cover rounded mb-2" />
                                        <h3 className="font-semibold text-gray-900">{property.address}</h3>
                                        <p className="text-blue-600 font-bold">{property.price}</p>
                                        <p className="text-sm text-gray-500">{property.beds} beds • {property.baths} baths</p>
                                        <a href={`/property?id=${property.id}`} className="mt-2 inline-block text-sm text-blue-600 font-medium hover:underline">
                                            View Details →
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {/* Instructions Overlay */}
                    {!selectedLocation && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 px-6 py-3 rounded-xl shadow-lg z-[1000] backdrop-blur-sm">
                            <p className="text-sm text-gray-700 font-medium">👆 Search above, use your location, or click on the map</p>
                        </div>
                    )}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/95 rounded-lg shadow-lg p-3 z-[1000] backdrop-blur-sm">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Legend</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span>Your Location</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>Properties</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white shrink-0">
                    <p className="text-sm text-gray-600">
                        {selectedLocation
                            ? `🎯 Searching within ${radius}km radius • ${propertiesInRadius.length} properties found`
                            : '📍 Select a location to find nearby properties'
                        }
                    </p>
                    <div className="flex gap-3">
                        {selectedLocation && (
                            <button
                                onClick={() => {
                                    setSelectedLocation(null);
                                    setFlyToLocation(null);
                                }}
                                className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Clear Selection
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSearchProperties}
                            disabled={propertiesInRadius.length === 0}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                        >
                            🔍 Search {propertiesInRadius.length} Properties
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

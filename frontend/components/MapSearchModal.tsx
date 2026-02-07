'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { allProperties } from '@/data/properties';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

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

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (properties: typeof allProperties) => void;
}

// Component to handle map click and set location
function LocationMarker({ position, setPosition }: {
    position: [number, number] | null;
    setPosition: (pos: [number, number]) => void;
}) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? (
        <Marker position={position} icon={UserLocationIcon}>
            <Popup>Your selected location</Popup>
        </Marker>
    ) : null;
}

// Component to recenter map
function RecenterMap({ position }: { position: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
}

// Calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function MapSearchModal({ isOpen, onClose, onSearch }: MapSearchModalProps) {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
    const [radius, setRadius] = useState<number>(5); // Default 5km radius
    const [isLocating, setIsLocating] = useState(false);
    const [propertiesInRadius, setPropertiesInRadius] = useState<typeof allProperties>([]);

    // Default center (India)
    const defaultCenter: [number, number] = [20.5937, 78.9629];

    const getCurrentLocation = useCallback(() => {
        setIsLocating(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
                    setUserLocation(newPos);
                    setSelectedLocation(newPos);
                    setIsLocating(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsLocating(false);
                    // allow user to manually select
                },
                { enableHighAccuracy: true }
            );
        } else {
            setIsLocating(false);
            console.warn('Geolocation is not supported by your browser');
        }
    }, []);

    // Removed auto-location useEffect to prevent errors on load

    // Calculate properties within radius
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
        }
    }, [selectedLocation, radius]);

    const handleSearch = () => {
        onSearch(propertiesInRadius);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Search Properties on Map</h2>
                        <p className="text-sm text-gray-600">Click on the map or use your location to find nearby properties</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Controls */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Get Location Button */}
                        <button
                            onClick={getCurrentLocation}
                            disabled={isLocating}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {isLocating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Locating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Use My Location
                                </>
                            )}
                        </button>

                        {/* Radius Selector */}
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-700">Search Radius:</label>
                            <select
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={1}>1 km</option>
                                <option value={2}>2 km</option>
                                <option value={5}>5 km</option>
                                <option value={10}>10 km</option>
                                <option value={25}>25 km</option>
                                <option value={50}>50 km</option>
                                <option value={100}>100 km</option>
                            </select>
                        </div>

                        {/* Properties Found */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-semibold">{propertiesInRadius.length}</span>
                            <span>properties found</span>
                        </div>
                    </div>
                </div>

                {/* Map Container */}
                <div className="flex-1 min-h-[400px] relative">
                    <MapContainer
                        center={selectedLocation || userLocation || defaultCenter}
                        zoom={selectedLocation ? 12 : 5}
                        style={{ height: '100%', width: '100%' }}
                        className="z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* User/Selected Location Marker */}
                        <LocationMarker
                            position={selectedLocation}
                            setPosition={setSelectedLocation}
                        />

                        {/* Recenter map when location changes */}
                        {selectedLocation && <RecenterMap position={selectedLocation} />}

                        {/* Radius Circle */}
                        {selectedLocation && (
                            <Circle
                                center={selectedLocation}
                                radius={radius * 1000} // Convert km to meters
                                pathOptions={{
                                    color: '#2563eb',
                                    fillColor: '#3b82f6',
                                    fillOpacity: 0.1,
                                    weight: 2
                                }}
                            />
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
                                        <img
                                            src={property.image}
                                            alt={property.address}
                                            className="w-full h-24 object-cover rounded-lg mb-2"
                                        />
                                        <h3 className="font-semibold text-gray-900">{property.address}</h3>
                                        <p className="text-blue-600 font-bold">{property.price}</p>
                                        <p className="text-sm text-gray-600">{property.beds} beds • {property.baths} baths • {property.sqft} sqft</p>
                                        <a
                                            href={`/property?id=${property.id}`}
                                            className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            View Details →
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Legend</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <span>Your Location</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            <span>Properties</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                    <p className="text-sm text-gray-600">
                        {selectedLocation
                            ? `Showing properties within ${radius}km of selected location`
                            : 'Click on the map to select a location'
                        }
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSearch}
                            disabled={propertiesInRadius.length === 0}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Search {propertiesInRadius.length} Properties
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

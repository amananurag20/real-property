'use client';

import { useState, useEffect } from 'react';
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

// Component to fix map size issues in modals
function MapResizer() {
    const map = useMap();
    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);
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
    const [radius, setRadius] = useState<number>(10);
    const [propertiesInRadius, setPropertiesInRadius] = useState<typeof allProperties>([]);

    // Default center - Mumbai, India
    const defaultCenter: [number, number] = [19.0760, 72.8777];

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

    const handleSearch = () => {
        onSearch(propertiesInRadius);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col" style={{ height: '80vh' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Search Properties on Map</h2>
                        <p className="text-sm text-gray-600">Click anywhere on the map to search nearby properties</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Controls */}
                <div className="p-4 bg-gray-50 border-b border-gray-200 shrink-0">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-700">Radius:</label>
                            <select
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value={5}>5 km</option>
                                <option value={10}>10 km</option>
                                <option value={25}>25 km</option>
                                <option value={50}>50 km</option>
                                <option value={100}>100 km</option>
                            </select>
                        </div>

                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${propertiesInRadius.length > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            <span className="font-semibold">{propertiesInRadius.length}</span>
                            <span>properties found</span>
                        </div>

                        {selectedLocation && (
                            <button
                                onClick={() => setSelectedLocation(null)}
                                className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                Clear Selection
                            </button>
                        )}
                    </div>
                </div>

                {/* Map Container */}
                <div className="flex-1 relative" style={{ minHeight: '400px' }}>
                    <MapContainer
                        center={defaultCenter}
                        zoom={10}
                        style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
                    >
                        <MapResizer />
                        <ClickHandler onLocationSelect={setSelectedLocation} />

                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Selected Location Marker */}
                        {selectedLocation && (
                            <>
                                <Marker position={selectedLocation} icon={UserLocationIcon}>
                                    <Popup>Selected Location</Popup>
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
                                    <div className="min-w-[180px]">
                                        <img src={property.image} alt={property.address} className="w-full h-20 object-cover rounded mb-2" />
                                        <h3 className="font-semibold text-gray-900 text-sm">{property.address}</h3>
                                        <p className="text-blue-600 font-bold text-sm">{property.price}</p>
                                        <a href={`/property?id=${property.id}`} className="text-xs text-blue-600 font-medium">
                                            View Details →
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>

                    {/* Instructions Overlay */}
                    {!selectedLocation && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-[1000]">
                            <p className="text-sm text-gray-700 font-medium">👆 Click on the map to select a location</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white shrink-0">
                    <p className="text-sm text-gray-600">
                        {selectedLocation
                            ? `Searching within ${radius}km radius`
                            : 'Select a location on the map to search'
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
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Search {propertiesInRadius.length} Properties
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

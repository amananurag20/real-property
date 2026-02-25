'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Phone, Building2 } from 'lucide-react';

export default function AgentsPage() {
    const agents = [
        { id: 1, name: 'Rajesh Kumar', agency: 'Elite Properties', location: 'Mumbai', experience: 8, rating: 4.8, verified: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
        { id: 2, name: 'Priya Sharma', agency: 'City Homes', location: 'Bangalore', experience: 5, rating: 4.5, verified: true, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
        { id: 3, name: 'Amit Patel', agency: 'Prime Realty', location: 'Delhi', experience: 3, rating: 4.2, verified: false, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
        { id: 4, name: 'Sneha Gupta', agency: 'Dream Homes', location: 'Pune', experience: 10, rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Real Estate Agents</h1>
                <p className="text-gray-600">Connect with verified agents in your area</p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search by name, agency, or location..." className="pl-9" />
                    </div>
                    <Button>Search</Button>
                </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                    <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-lg text-gray-900">{agent.name}</h3>
                                        {agent.verified && (
                                            <Badge variant="default" className="text-xs">Verified</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Building2 className="w-3 h-3" />
                                        {agent.agency}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {agent.location}
                                    </p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-sm text-gray-500">{agent.experience} years exp.</span>
                                        <span className="flex items-center gap-1 text-sm">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            {agent.rating}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" className="flex-1" size="sm">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact
                                </Button>
                                <Button className="flex-1" size="sm">View Profile</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

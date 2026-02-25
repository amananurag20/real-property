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
        <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-3">Real Estate Agents</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">Connect with verified, experienced agents across India</p>
                </div>

                {/* Search */}
                <div className="max-w-2xl mx-auto mb-12">
                    <div className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                            <Input placeholder="Search by name, agency, or location..." className="pl-10 h-11" />
                        </div>
                        <Button size="lg" className="px-6">Search</Button>
                    </div>
                </div>

                {/* Agents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                        <Card key={agent.id} className="overflow-hidden hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-900/50 transition-all duration-200 border-neutral-100 dark:border-neutral-700">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-3 mb-4">
                                    <img
                                        src={agent.image}
                                        alt={agent.name}
                                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-neutral-900 dark:text-white truncate">{agent.name}</h3>
                                            {agent.verified && (
                                                <span className="flex-shrink-0 px-2 py-0.5 bg-secondary-100 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 rounded text-xs font-medium">Verified</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 truncate">
                                            <Building2 className="w-3 h-3 flex-shrink-0" />
                                            {agent.agency}
                                        </p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 truncate">
                                            <MapPin className="w-3 h-3 flex-shrink-0" />
                                            {agent.location}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="space-y-3 border-t border-neutral-100 dark:border-neutral-700 pt-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{agent.experience} years experience</span>
                                        <span className="flex items-center gap-1 text-sm font-medium text-neutral-900 dark:text-white">
                                            <Star className="w-4 h-4 fill-accent-400 text-accent-400" />
                                            {agent.rating}
                                        </span>
                                    </div>
                                    
                                    <div className="flex gap-2 pt-2">
                                        <Button variant="outline" className="flex-1" size="sm" className="gap-2">
                                            <Phone className="w-4 h-4" />
                                            Contact
                                        </Button>
                                        <Button className="flex-1" size="sm">View Profile</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

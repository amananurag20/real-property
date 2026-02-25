'use client';

import { useState } from 'react';
import AgentCard from '@/components/AgentCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AgentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');

    const agents = [
        { id: 1, name: 'Rajesh Kumar', agency: 'Premium Properties', experience: '8 years', specialization: 'Luxury Homes', serviceAreas: 'South Mumbai', verified: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
        { id: 2, name: 'Priya Sharma', agency: 'Urban Realty', experience: '5 years', specialization: 'Commercial Properties', serviceAreas: 'Bangalore Central', verified: true, image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
        { id: 3, name: 'Amit Patel', agency: 'Metro Homes', experience: '12 years', specialization: 'Investment Properties', serviceAreas: 'Gurgaon & Noida', verified: true, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
        { id: 4, name: 'Sneha Gupta', agency: 'Dream Realty', experience: '10 years', specialization: 'Residential', serviceAreas: 'Pune', verified: true, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
        { id: 5, name: 'Vikram Singh', agency: 'Elite Properties', experience: '7 years', specialization: 'Luxury Villas', serviceAreas: 'Delhi', verified: true, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
        { id: 6, name: 'Neha Verma', agency: 'City Homes', experience: '6 years', specialization: 'Apartments', serviceAreas: 'Mumbai', verified: false, image: 'https://images.unsplash.com/photo-1517841905240-74f5b1b4e5f5?w=150&h=150&fit=crop&crop=face' },
    ];

    const cities = ['All', 'Mumbai', 'Bangalore', 'Delhi', 'Pune'];

    const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.serviceAreas.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = selectedCity === 'All' || agent.serviceAreas.toLowerCase().includes(selectedCity.toLowerCase());
        return matchesSearch && matchesCity;
    });

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-muted/30 pt-24 pb-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Verified Real Estate Agents
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Connect with experienced professionals across India
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="max-w-4xl mx-auto mb-12">
                    <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-1">
                        <div className="flex flex-col md:flex-row">
                            {/* Search Input */}
                            <div className="flex-1 flex items-center px-4 py-3">
                                <svg className="w-5 h-5 text-muted-foreground mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <Input
                                    type="text"
                                    placeholder="Search by name, agency, or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-0 bg-transparent focus-visible:ring-0 flex-1"
                                />
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-8 bg-border/50"></div>

                            {/* City Filter */}
                            <div className="w-full md:w-48 px-4 py-3">
                                <Select value={selectedCity} onValueChange={setSelectedCity}>
                                    <SelectTrigger className="w-full border-0 bg-transparent focus-visible:ring-0">
                                        <SelectValue placeholder="All Cities" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map(city => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Quick City Filters */}
                    <div className="mt-6">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <span className="text-sm text-muted-foreground">Quick filter:</span>
                            {['Mumbai', 'Bangalore', 'Delhi', 'Pune'].map(city => (
                                <button
                                    key={city}
                                    onClick={() => setSelectedCity(city)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        selectedCity === city
                                            ? 'bg-primary text-white'
                                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    {city}
                                </button>
                            ))}
                            {selectedCity !== 'All' && (
                                <Button
                                    onClick={() => setSelectedCity('All')}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Agents Grid */}
                {filteredAgents.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAgents.map((agent) => (
                            <AgentCard
                                key={agent.id}
                                id={agent.id}
                                name={agent.name}
                                agency={agent.agency}
                                experience={agent.experience}
                                specialization={agent.specialization}
                                serviceAreas={agent.serviceAreas}
                                verified={agent.verified}
                                image={agent.image}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32 px-6 bg-card border border-border rounded-xl shadow-xs">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No agents found</h3>
                        <p className="text-muted-foreground text-center max-w-sm mb-8">Try adjusting your search filters to find the right agent.</p>
                        <Button
                            variant="default"
                            onClick={() => { setSearchTerm(''); setSelectedCity('All'); }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}

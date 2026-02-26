'use client';

import { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import { allServices } from '@/data/services';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    const serviceTypes = ['All', 'Lawyer', 'CA', 'Notary', 'Loan Advisor', 'Company Secretary'];

    const filteredServices = allServices.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.type.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || service.type === selectedType;
        return matchesSearch && matchesType;
    });

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-muted/30 pt-24 pb-24 px-6 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Professional Services
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Connect with verified CA, Lawyers, Notaries, and Loan Advisors
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
                                    placeholder="Search by name, type, or location..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border-0 bg-transparent focus-visible:ring-0 flex-1"
                                />
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-8 bg-border/50"></div>

                            {/* Type Filter */}
                            <div className="w-full md:w-56 px-4 py-3">
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="w-full border-0 bg-transparent focus-visible:ring-0">
                                        <SelectValue placeholder="All Types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceTypes.map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Quick Type Filters */}
                    <div className="mt-6">
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <span className="text-sm text-muted-foreground">Quick filter:</span>
                            {['Lawyer', 'CA', 'Notary', 'Loan Advisor'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                        selectedType === type
                                            ? 'bg-primary text-white'
                                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                            {selectedType !== 'All' && (
                                <button
                                    onClick={() => setSelectedType('All')}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                {filteredServices.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                            <ServiceCard
                                key={service.id}
                                id={service.id}
                                name={service.name}
                                type={service.type}
                                location={service.location}
                                experience={service.experience}
                                verified={service.verified}
                                phone={service.phone}
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
                        <h3 className="text-xl font-bold text-foreground mb-2">No services found</h3>
                        <p className="text-muted-foreground text-center max-w-sm mb-8">Try adjusting your search filters to find the right service.</p>
                        <Button
                            variant="default"
                            onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}

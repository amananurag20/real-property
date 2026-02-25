'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Phone, Mail, Briefcase } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        { id: 1, name: 'Legal Solutions', type: 'Lawyer', location: 'Mumbai', experience: 15, verified: true, phone: '+91 98765 43210' },
        { id: 2, name: 'Tax Experts CA', type: 'CA', location: 'Delhi', experience: 12, verified: true, phone: '+91 98765 43211' },
        { id: 3, name: 'Notary Plus', type: 'Notary', location: 'Bangalore', experience: 8, verified: false, phone: '+91 98765 43212' },
        { id: 4, name: 'Loan Assist', type: 'Loan Advisor', location: 'Pune', experience: 10, verified: true, phone: '+91 98765 43213' },
        { id: 5, name: 'Corporate CS', type: 'Company Secretary', location: 'Chennai', experience: 6, verified: true, phone: '+91 98765 43214' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'Lawyer': return '⚖️';
            case 'CA': return '📊';
            case 'Notary': return '📝';
            case 'Loan Advisor': return '💰';
            case 'Company Secretary': return '🏢';
            default: return '🔧';
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Services</h1>
                <p className="text-gray-600">Connect with verified CA, Lawyers, Notaries, and Loan Advisors</p>
            </div>

            {/* Search & Filters */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search services..." className="pl-9" />
                    </div>
                    <select className="border rounded-md px-3">
                        <option>All Services</option>
                        <option>CA</option>
                        <option>Lawyer</option>
                        <option>Notary</option>
                        <option>Loan Advisor</option>
                        <option>Company Secretary</option>
                    </select>
                    <Button>Search</Button>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="text-4xl">{getIcon(service.type)}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg text-gray-900">{service.name}</h3>
                                        {service.verified && (
                                            <Badge variant="default" className="text-xs">Verified</Badge>
                                        )}
                                    </div>
                                    <Badge variant="secondary" className="mt-1">{service.type}</Badge>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm text-gray-500 mb-4">
                                <p className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {service.location}
                                </p>
                                <p className="flex items-center gap-1">
                                    <Briefcase className="w-4 h-4" />
                                    {service.experience} years experience
                                </p>
                                <p className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {service.phone}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1" size="sm">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                </Button>
                                <Button className="flex-1" size="sm">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Contact
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

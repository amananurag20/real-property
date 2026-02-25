'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Briefcase, Award, Clock, CheckCircle, Building2 } from 'lucide-react';

export default function ServiceDetailPage() {
    const params = useParams();
    const serviceId = params.id;

    const provider = {
        id: serviceId,
        name: 'Legal Solutions',
        type: 'Lawyer',
        location: 'Mumbai, Maharashtra',
        experience: 15,
        verified: true,
        phone: '+91 98765 43210',
        email: 'contact@legalsolutions.com',
        address: '123 Legal Tower, Nariman Point, Mumbai',
        about: 'Full-service law firm specializing in real estate transactions, property disputes, and legal documentation. Over 15 years of experience handling property matters.',
        services: ['Property Registration', 'Title Verification', 'Legal Opinion', 'Dispute Resolution', 'RERA Compliance'],
        timings: 'Mon-Sat: 10:00 AM - 6:00 PM',
        image: '⚖️',
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <Card className="mb-8">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="text-8xl mx-auto md:mx-0">{provider.image}</div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                                {provider.verified && (
                                    <Badge className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            <Badge variant="secondary" className="mb-3">{provider.type}</Badge>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2">
                                <MapPin className="w-4 h-4" />
                                {provider.location}
                            </p>
                            <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-4">
                                <Building2 className="w-4 h-4" />
                                {provider.address}
                            </p>
                            
                            <div className="flex gap-3 justify-center md:justify-start">
                                <Button>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Now
                                </Button>
                                <Button variant="outline">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Email
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600">{provider.about}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h2>
                            <div className="flex flex-wrap gap-2">
                                {provider.services.map((service) => (
                                    <Badge key={service} variant="outline" className="text-sm py-1 px-3">
                                        {service}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Award className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Experience</p>
                                        <p className="font-medium">{provider.experience} years</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Business Hours</p>
                                        <p className="font-medium">{provider.timings}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Service Type</p>
                                        <p className="font-medium">{provider.type}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Contact</h2>
                            <div className="space-y-3">
                                <Button className="w-full">
                                    <Phone className="w-4 h-4 mr-2" />
                                    {provider.phone}
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

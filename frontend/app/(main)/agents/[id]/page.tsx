'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Building2, Star, CheckCircle, Award, TrendingUp } from 'lucide-react';

export default function AgentDetailPage() {
    const params = useParams();
    const agentId = params.id;

    // Mock agent data
    const agent = {
        id: agentId,
        name: 'Rajesh Kumar',
        agency: 'Elite Properties',
        location: 'Mumbai, Maharashtra',
        experience: 8,
        rating: 4.8,
        reviews: 124,
        verified: true,
        phone: '+91 98765 43210',
        email: 'rajesh@eliteproperties.com',
        specialization: 'Residential, Commercial',
        serviceAreas: ['Mumbai', 'Thane', 'Navi Mumbai'],
        about: 'Experienced real estate professional with 8+ years in the Mumbai property market. Specialized in luxury residential and commercial properties.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        properties: 24,
        dealsClosed: 156,
    };

    const properties = [
        { id: 1, title: 'Luxury Villa', price: '₹5 Cr', location: 'Bandra', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop' },
        { id: 2, title: 'Modern Apartment', price: '₹1.5 Cr', location: 'Andheri', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop' },
        { id: 3, title: 'Penthouse', price: '₹8 Cr', location: 'Worli', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header Card */}
            <Card className="mb-8">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <img
                            src={agent.image}
                            alt={agent.name}
                            className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                                {agent.verified && (
                                    <Badge className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start gap-2 mb-2">
                                <Building2 className="w-4 h-4" />
                                {agent.agency}
                            </p>
                            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 mb-4">
                                <MapPin className="w-4 h-4" />
                                {agent.location}
                            </p>
                            
                            <div className="flex items-center justify-center md:justify-start gap-6 mb-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{agent.rating}</p>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        Rating
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{agent.reviews}</p>
                                    <p className="text-sm text-gray-500">Reviews</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{agent.properties}</p>
                                    <p className="text-sm text-gray-500">Listings</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-gray-900">{agent.dealsClosed}</p>
                                    <p className="text-sm text-gray-500">Deals</p>
                                </div>
                            </div>

                            <div className="flex gap-3 justify-center md:justify-start">
                                <Button>
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Now
                                </Button>
                                <Button variant="outline">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                            <p className="text-gray-600">{agent.about}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Listings</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {properties.map((prop) => (
                                    <div key={prop.id} className="border rounded-lg overflow-hidden">
                                        <img src={prop.image} alt={prop.title} className="w-full h-40 object-cover" />
                                        <div className="p-3">
                                            <h3 className="font-medium text-gray-900">{prop.title}</h3>
                                            <p className="text-sm text-gray-500">{prop.location}</p>
                                            <p className="font-bold text-blue-600 mt-1">{prop.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Specialization</h2>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Award className="w-5 h-5" />
                                {agent.specialization}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Service Areas</h2>
                            <div className="flex flex-wrap gap-2">
                                {agent.serviceAreas.map((area) => (
                                    <Badge key={area} variant="secondary">{area}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Experience</h2>
                            <div className="flex items-center gap-2 text-gray-600">
                                <TrendingUp className="w-5 h-5" />
                                {agent.experience} years
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

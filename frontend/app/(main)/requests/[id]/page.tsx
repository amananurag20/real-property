'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Calendar, User, Building2, FileText, CheckCircle, Clock } from 'lucide-react';

export default function RequestDetailPage() {
    const params = useParams();
    const requestId = params.id;

    const request = {
        id: requestId,
        type: 'Buy',
        title: 'Looking for 3BHK Apartment in Mumbai',
        location: 'Mumbai, Maharashtra',
        budgetMin: '₹2 Crore',
        budgetMax: '₹3 Crore',
        timeline: 'Within 3 months',
        propertyType: 'Apartment',
        user: 'John Doe',
        postedDate: '2 days ago',
        description: 'Looking for a spacious 3BHK apartment in a good locality with modern amenities. Preferred areas: Bandra, Andheri, Juhu. Should have parking, gym, and security.',
        requirements: ['3 Bedrooms', '2 Bathrooms', 'Parking', 'Gym', 'Security', 'Lift'],
        status: 'Open',
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <Card className="mb-8">
                <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <Badge variant={request.type === 'Buy' ? 'default' : 'secondary'} className="text-sm">
                                    {request.type}
                                </Badge>
                                <Badge variant={request.status === 'Open' ? 'outline' : 'default'} className="flex items-center gap-1">
                                    {request.status === 'Open' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                                    {request.status}
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">{request.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-600">
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {request.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    {request.budgetMin} - {request.budgetMax}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {request.timeline}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    {request.propertyType}
                                </span>
                            </div>
                        </div>
                        <Button size="lg">Connect with Request</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-600 leading-relaxed">{request.description}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
                            <div className="flex flex-wrap gap-2">
                                {request.requirements.map((req) => (
                                    <Badge key={req} variant="secondary" className="text-sm py-1 px-3">
                                        {req}
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
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Request Details</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Posted By</p>
                                        <p className="font-medium">{request.user}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Request ID</p>
                                        <p className="font-medium">#{request.id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Posted</p>
                                        <p className="font-medium">{request.postedDate}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Are you an Agent?</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                If you have a matching property, connect with this request to help the buyer.
                            </p>
                            <Button className="w-full">
                                Link Your Property
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

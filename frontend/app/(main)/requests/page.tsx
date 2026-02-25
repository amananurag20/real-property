'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, DollarSign, Calendar, User } from 'lucide-react';

export default function RequestsPage() {
    const requests = [
        { id: 1, type: 'Buy', title: 'Looking for 3BHK in Mumbai', location: 'Mumbai, Maharashtra', budget: '₹2-3 Crores', timeline: 'Within 3 months', user: 'John D.', posted: '2 days ago' },
        { id: 2, type: 'Rent', title: 'Budget apartment in Bangalore', location: 'Bangalore, Karnataka', budget: '₹25,000/month', timeline: 'Immediate', user: 'Jane S.', posted: '1 day ago' },
        { id: 3, type: 'Buy', title: 'Commercial space in Delhi NCR', location: 'Delhi NCR', budget: '₹5+ Crores', timeline: 'Within 6 months', user: 'Raj K.', posted: '3 days ago' },
        { id: 4, type: 'Rent', title: 'Family house in Pune', location: 'Pune, Maharashtra', budget: '₹40,000/month', timeline: 'Within 1 month', user: 'Priya M.', posted: '5 hours ago' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Property Requests</h1>
                <p className="text-gray-600">Browse buyer and tenant requirements</p>
            </div>

            {/* Search & Filters */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="Search requests..." className="pl-9" />
                    </div>
                    <select className="border rounded-md px-3">
                        <option>All Types</option>
                        <option>Buy</option>
                        <option>Rent</option>
                    </select>
                    <Button>Search</Button>
                </div>
            </div>

            {/* Requests List */}
            <div className="max-w-4xl mx-auto space-y-4">
                {requests.map((request) => (
                    <Card key={request.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant={request.type === 'Buy' ? 'default' : 'secondary'}>
                                            {request.type}
                                        </Badge>
                                        <span className="text-sm text-gray-400">{request.posted}</span>
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-900">{request.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {request.location}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" />
                                            {request.budget}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {request.timeline}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-400 flex items-center gap-1">
                                        <User className="w-3 h-3" />
                                        Posted by {request.user}
                                    </p>
                                </div>
                                <Button>Connect</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

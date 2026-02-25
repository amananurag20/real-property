'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, User, DollarSign, Calendar, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

export default function DashboardRequestsPage() {
    const requests = [
        {
            id: 1,
            type: 'Buy',
            title: 'Looking for 2BHK in Bangalore',
            budget: '₹80L - 1Cr',
            timeline: 'Within 3 months',
            status: 'Open',
        },
        {
            id: 2,
            type: 'Rent',
            title: 'Need furnished apartment in Mumbai',
            budget: '₹40k/month',
            timeline: 'Immediate',
            status: 'Matched',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
                    <p className="text-gray-500 mt-1">Manage your property requests</p>
                </div>
                <Link href="/dashboard/requests/new">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Post Request
                    </Button>
                </Link>
            </div>

            <div className="space-y-4">
                {requests.map((request) => (
                    <Card key={request.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant={request.type === 'Buy' ? 'default' : 'secondary'}>
                                            {request.type}
                                        </Badge>
                                        <Badge variant={request.status === 'Open' ? 'outline' : 'default'}>
                                            {request.status}
                                        </Badge>
                                    </div>
                                    <h3 className="font-semibold text-lg text-gray-900">{request.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-4 h-4" />
                                            {request.budget}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {request.timeline}
                                        </span>
                                    </div>
                                </div>
                                <FileText className="w-8 h-8 text-gray-300" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link2, Building2, FileText, User, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function DashboardMatchesPage() {
    const matches = [
        {
            id: 1,
            property: 'Sunset Villa, Mumbai',
            request: 'Looking for 3BHK villa',
            agent: 'Rajesh Kumar',
            status: 'Connected',
            date: '2024-01-15',
        },
        {
            id: 2,
            property: 'Modern Apartment, Bangalore',
            request: 'Budget 2BHK rental',
            agent: 'Priya Sharma',
            status: 'Pending',
            date: '2024-01-14',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Matches</h1>
                <p className="text-gray-500 mt-1">Property-request connections made by agents</p>
            </div>

            <div className="space-y-4">
                {matches.map((match) => (
                    <Card key={match.id}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Link2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Match #{match.id}</p>
                                        <p className="text-sm text-gray-500">Created: {match.date}</p>
                                    </div>
                                </div>
                                <Badge variant={match.status === 'Connected' ? 'default' : 'secondary'} className="flex items-center gap-1">
                                    {match.status === 'Connected' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                    {match.status}
                                </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Building2 className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-700">Property</span>
                                    </div>
                                    <p className="text-gray-900">{match.property}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-700">Agent</span>
                                    </div>
                                    <p className="text-gray-900">{match.agent}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <div className="flex-1 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-gray-700">Request</span>
                                    </div>
                                    <p className="text-gray-900">{match.request}</p>
                                </div>
                            </div>

                            {match.status === 'Pending' && (
                                <div className="flex gap-2 mt-4">
                                    <Button className="flex-1">Confirm Interest</Button>
                                    <Button variant="outline" className="flex-1">Decline</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

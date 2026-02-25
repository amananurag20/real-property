'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, CheckCircle, XCircle } from 'lucide-react';

export default function AdminRequestsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.MODERATE_REQUESTS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const requests = [
        { id: 1, title: 'Looking for 3BHK', type: 'Buy', budget: '₹2-3 Cr', status: 'Pending', user: 'John Doe' },
        { id: 2, title: 'Budget apartment', type: 'Rent', budget: '₹25k/month', status: 'Approved', user: 'Jane Smith' },
        { id: 3, title: 'Commercial space', type: 'Buy', budget: '₹5+ Cr', status: 'Pending', user: 'Bob Wilson' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Request Moderation</h1>
                <p className="text-gray-500 mt-1">Approve or reject property requests</p>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input placeholder="Search requests..." className="pl-9" />
                        </div>
                        <Button variant="outline">Filter</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Property Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {requests.map((req) => (
                            <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{req.title}</p>
                                        <p className="text-sm text-gray-500">{req.type} • {req.budget}</p>
                                        <p className="text-sm text-gray-400">By: {req.user}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={req.status === 'Approved' ? 'default' : 'secondary'}>{req.status}</Badge>
                                    {req.status === 'Pending' && (
                                        <>
                                            <Button variant="ghost" size="sm" className="text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-600">
                                                <XCircle className="w-4 h-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

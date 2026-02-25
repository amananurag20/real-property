'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Calendar, DollarSign } from 'lucide-react';

export default function AgentRequestsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.LINK_PROPERTY_REQUEST)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const requests = [
        {
            id: 1,
            type: 'Buy',
            title: 'Looking for 3BHK in Mumbai',
            buyer: 'John Doe',
            budget: '₹2-3 Crores',
            timeline: 'Within 3 months',
            status: 'Open',
        },
        {
            id: 2,
            type: 'Rent',
            title: 'Budget apartment in Bangalore',
            buyer: 'Jane Smith',
            budget: '₹25,000/month',
            timeline: 'Immediate',
            status: 'Matched',
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
                <p className="text-gray-500 mt-1">Requests from buyers you are connected with</p>
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
                                            <User className="w-4 h-4" />
                                            {request.buyer}
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

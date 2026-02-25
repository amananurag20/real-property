'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, ArrowRight, CheckCircle, Clock } from 'lucide-react';

export default function AdminLinksPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_ADMIN_DASHBOARD)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const links = [
        { id: 1, property: 'Sunset Villa', request: '3BHK in Mumbai', agent: 'Rajesh Kumar', buyer: 'John Doe', status: 'Connected', date: '2024-01-15' },
        { id: 2, property: 'Modern Apartment', request: 'Budget rental', agent: 'Priya Sharma', buyer: 'Jane Smith', status: 'Pending', date: '2024-01-14' },
        { id: 3, property: 'Commercial Space', request: 'Office space', agent: 'Amit Patel', buyer: 'Bob Wilson', status: 'Connected', date: '2024-01-13' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Triangle Link Monitor</h1>
                <p className="text-gray-500 mt-1">Monitor all property-request-agent connections</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Triangle Links</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {links.map((link) => (
                            <div key={link.id} className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Link2 className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Link #{link.id}</p>
                                            <p className="text-sm text-gray-500">Created: {link.date}</p>
                                        </div>
                                    </div>
                                    <Badge variant={link.status === 'Connected' ? 'default' : 'secondary'} className="flex items-center gap-1">
                                        {link.status === 'Connected' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {link.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex-1 p-3 bg-white rounded border">
                                        <p className="text-gray-500">Property</p>
                                        <p className="font-medium">{link.property}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <div className="flex-1 p-3 bg-white rounded border">
                                        <p className="text-gray-500">Agent</p>
                                        <p className="font-medium">{link.agent}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-400" />
                                    <div className="flex-1 p-3 bg-white rounded border">
                                        <p className="text-gray-500">Buyer/Request</p>
                                        <p className="font-medium">{link.buyer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

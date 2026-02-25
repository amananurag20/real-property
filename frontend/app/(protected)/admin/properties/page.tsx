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
import { Building2, Search, CheckCircle, XCircle } from 'lucide-react';

export default function AdminPropertiesPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.MODERATE_PROPERTIES)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const properties = [
        { id: 1, title: 'Luxury Villa', location: 'Mumbai', price: '₹5,00,00,000', status: 'Pending', owner: 'John Doe' },
        { id: 2, title: 'Modern Apartment', location: 'Bangalore', price: '₹1,20,00,000', status: 'Approved', owner: 'Jane Smith' },
        { id: 3, title: 'Commercial Space', location: 'Delhi', price: '₹3,00,00,000', status: 'Rejected', owner: 'Bob Wilson' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Property Moderation</h1>
                    <p className="text-gray-500 mt-1">Approve, reject, or manage property listings</p>
                </div>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input placeholder="Search properties..." className="pl-9" />
                        </div>
                        <Button variant="outline">Filter</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Properties List */}
            <Card>
                <CardHeader>
                    <CardTitle>Property Listings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {properties.map((prop) => (
                            <div key={prop.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{prop.title}</p>
                                        <p className="text-sm text-gray-500">{prop.location} • {prop.price}</p>
                                        <p className="text-sm text-gray-400">Owner: {prop.owner}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={
                                        prop.status === 'Approved' ? 'default' : 
                                        prop.status === 'Pending' ? 'secondary' : 'destructive'
                                    }>
                                        {prop.status}
                                    </Badge>
                                    {prop.status === 'Pending' && (
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

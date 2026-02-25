'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link2, Plus, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AgentLinksPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.LINK_PROPERTY_REQUEST)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const links = [
        { id: 1, property: 'Sunset Villa', request: 'Looking for 3BHK', status: 'Pending', buyer: 'John Doe' },
        { id: 2, property: 'Modern Apartment', request: 'Budget apartment', status: 'Connected', buyer: 'Jane Smith' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Link Management</h1>
                    <p className="text-gray-500 mt-1">Manage your property-request connections</p>
                </div>
                <Link href="/agent/links/create">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Link
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {links.map((link) => (
                    <Card key={link.id}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Link2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{link.property}</h3>
                                        <p className="text-sm text-gray-500">Linked to: {link.request}</p>
                                        <p className="text-sm text-gray-500">Buyer: {link.buyer}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        link.status === 'Connected' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {link.status}
                                    </span>
                                    <Button variant="ghost" size="sm">
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

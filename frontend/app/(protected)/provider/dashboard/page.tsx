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
import { Briefcase, Eye, Phone, Mail, TrendingUp, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ProviderDashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.EDIT_OWN_SERVICE_PROFILE)) {
            router.push('/403');
        }
    }, [userRole, router]);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
                    <p className="text-gray-500 mt-1">Manage your professional service profile</p>
                </div>
                <Link href="/provider/profile/edit">
                    <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Profile Views</p>
                                <p className="text-3xl font-bold text-gray-900">248</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Eye className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Inquiries</p>
                                <p className="text-3xl font-bold text-gray-900">12</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Phone className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">This Week</p>
                                <p className="text-3xl font-bold text-gray-900">+18%</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Inquiries</CardTitle>
                    <CardDescription>People who contacted you recently</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">Contact Name {i + 1}</p>
                                    <p className="text-sm text-gray-500">Looking for legal consultation</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm">
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        <Mail className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

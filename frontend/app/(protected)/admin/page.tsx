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
import { Button } from '@/components/ui/button';
import {
    Users,
    Building2,
    FileText,
    Briefcase,
    UserCircle,
    Link2,
    Shield,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_ADMIN_DASHBOARD)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const stats = [
        { title: 'Total Users', value: '1,248', icon: Users, color: 'bg-blue-500', link: '/admin/users' },
        { title: 'Properties', value: '856', icon: Building2, color: 'bg-green-500', link: '/admin/properties' },
        { title: 'Requests', value: '432', icon: FileText, color: 'bg-purple-500', link: '/admin/requests' },
        { title: 'Agents', value: '128', icon: UserCircle, color: 'bg-orange-500', link: '/admin/agents' },
        { title: 'Services', value: '64', icon: Briefcase, color: 'bg-pink-500', link: '/admin/services' },
        { title: 'Links', value: '256', icon: Link2, color: 'bg-teal-500', link: '/admin/links' },
    ];

    const quickActions = [
        { label: 'Manage Users', href: '/admin/users', icon: Users },
        { label: 'Moderate Properties', href: '/admin/properties', icon: Building2 },
        { label: 'Review Requests', href: '/admin/requests', icon: FileText },
        { label: 'View Analytics', href: '/admin/analytics', icon: Shield },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Platform overview and management</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.link}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Pending Approvals */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <span className="font-medium">Properties awaiting approval</span>
                            <span className="text-2xl font-bold text-yellow-600">12</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <span className="font-medium">Requests awaiting approval</span>
                            <span className="text-2xl font-bold text-yellow-600">8</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <span className="font-medium">Service providers awaiting approval</span>
                            <span className="text-2xl font-bold text-yellow-600">5</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                    <Link key={action.href} href={action.href}>
                        <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2">
                            <action.icon className="w-6 h-6" />
                            <span>{action.label}</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role, ROLE_LABELS } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import {
    Building2,
    FileText,
    Link2,
    UserCircle,
    Bell,
    ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
    const { user } = useAuth();
    const userRole = user?.role || Role.USER;

    const stats = [
        {
            title: 'My Properties',
            value: '3',
            icon: Building2,
            color: 'bg-blue-500',
            link: '/dashboard/properties',
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            title: 'My Requests',
            value: '2',
            icon: FileText,
            color: 'bg-green-500',
            link: '/dashboard/requests',
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            title: 'Matches',
            value: '5',
            icon: Link2,
            color: 'bg-purple-500',
            link: '/dashboard/matches',
            permission: PERMISSIONS.VIEW_LINKS,
        },
        {
            title: 'Profile Views',
            value: '128',
            icon: UserCircle,
            color: 'bg-orange-500',
            link: '/dashboard/profile',
            permission: PERMISSIONS.EDIT_OWN_PROFILE,
        },
    ];

    const filteredStats = stats.filter(stat => 
        !stat.permission || hasPermission(userRole, stat.permission)
    );

    const quickActions = [
        {
            label: 'Post New Property',
            href: '/dashboard/properties/new',
            icon: Building2,
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            label: 'Post New Request',
            href: '/dashboard/requests/new',
            icon: FileText,
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            label: 'Setup Agent Profile',
            href: '/dashboard/agent-profile',
            icon: UserCircle,
            permission: PERMISSIONS.CREATE_AGENT_PROFILE,
        },
    ];

    const filteredActions = quickActions.filter(action => 
        hasPermission(userRole, action.permission)
    );

    return (
        <div className="p-6 space-y-6">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, {user?.name || 'User'}!
                    </h1>
                    <p className="text-gray-500 mt-1">
                        You are signed in as {ROLE_LABELS[userRole as Role]}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredStats.map((stat) => (
                    <Link key={stat.title} href={stat.link}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {stat.title}
                                        </p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">
                                            {stat.value}
                                        </p>
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

            {/* Quick Actions */}
            {filteredActions.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Get started with these common actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {filteredActions.map((action) => (
                                <Link key={action.href} href={action.href}>
                                    <Button
                                        variant="outline"
                                        className="w-full h-auto py-4 justify-start gap-3"
                                    >
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <action.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium">{action.label}</p>
                                            <p className="text-sm text-gray-500">Click to start</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 ml-auto text-gray-400" />
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Recent Activity Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                        Your latest interactions and updates
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                            >
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">
                                        Activity item {i + 1}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Description of the activity...
                                    </p>
                                </div>
                                <span className="text-sm text-gray-400">2h ago</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

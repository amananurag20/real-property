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
    TrendingUp,
    Clock,
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
            color: 'primary',
            link: '/dashboard/properties',
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            title: 'My Requests',
            value: '2',
            icon: FileText,
            color: 'secondary',
            link: '/dashboard/requests',
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            title: 'Matches',
            value: '5',
            icon: Link2,
            color: 'accent',
            link: '/dashboard/matches',
            permission: PERMISSIONS.VIEW_LINKS,
        },
        {
            title: 'Profile Views',
            value: '128',
            icon: UserCircle,
            color: 'primary',
            link: '/dashboard/profile',
            permission: PERMISSIONS.EDIT_OWN_PROFILE,
        },
    ];

    const filteredStats = stats.filter(stat => 
        !stat.permission || hasPermission(userRole, stat.permission)
    );

    const quickActions = [
        {
            label: 'Post Property',
            description: 'List a new property',
            href: '/dashboard/properties/new',
            icon: Building2,
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            label: 'Post Request',
            description: 'Create a new request',
            href: '/dashboard/requests/new',
            icon: FileText,
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            label: 'Agent Profile',
            description: 'Set up your profile',
            href: '/dashboard/agent-profile',
            icon: UserCircle,
            permission: PERMISSIONS.CREATE_AGENT_PROFILE,
        },
    ];

    const filteredActions = quickActions.filter(action => 
        hasPermission(userRole, action.permission)
    );

    const colorMap = {
        primary: 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400',
        secondary: 'bg-secondary-100 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400',
        accent: 'bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400',
    };

    return (
        <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                                Welcome back, {user?.name || 'User'}
                            </h1>
                            <p className="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">
                                {ROLE_LABELS[userRole as Role]} • Last login 2 hours ago
                            </p>
                        </div>
                        <Button variant="outline" size="lg" className="gap-2 w-fit">
                            <Bell className="w-4 h-4" />
                            <span className="hidden sm:inline">Notifications</span>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {filteredStats.map((stat) => (
                        <Link key={stat.title} href={stat.link}>
                            <Card className="hover:shadow-md hover:border-primary-200 dark:hover:border-primary-900/50 transition-all duration-200 cursor-pointer">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                                                {stat.title}
                                            </p>
                                            <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`w-10 h-10 ${colorMap[stat.color as keyof typeof colorMap]} rounded-lg flex items-center justify-center`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                {filteredActions.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary-700 dark:text-primary-400" />
                                <div>
                                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                                    <CardDescription>Get started with common tasks</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {filteredActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <Link key={action.href} href={action.href}>
                                            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-lg hover:border-primary-200 dark:hover:border-primary-900/50 hover:shadow-sm transition-all cursor-pointer group">
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-10 h-10 ${colorMap.primary} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-neutral-900 dark:text-white text-sm">{action.label}</p>
                                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{action.description}</p>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors flex-shrink-0 mt-0.5" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                            <div>
                                <CardTitle className="text-xl">Recent Activity</CardTitle>
                                <CardDescription>Your latest interactions and updates</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-100 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-600 transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-neutral-900 dark:text-white text-sm">
                                            Activity item {i + 1}
                                        </p>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                            Description of the activity
                                        </p>
                                    </div>
                                    <span className="text-xs text-neutral-500 dark:text-neutral-400 flex-shrink-0 whitespace-nowrap">2h ago</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

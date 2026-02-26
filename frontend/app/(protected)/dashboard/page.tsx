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
    ChevronLeft,
    Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const { user } = useAuth();
    const userRole = user?.role || Role.USER;

    const stats = [
        {
            title: 'My Properties',
            value: '3',
            icon: Building2,
            link: '/dashboard/properties',
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            title: 'My Requests',
            value: '2',
            icon: FileText,
            link: '/dashboard/requests',
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            title: 'Matches',
            value: '5',
            icon: Link2,
            link: '/dashboard/matches',
            permission: PERMISSIONS.VIEW_LINKS,
        },
        {
            title: 'Profile Views',
            value: '128',
            icon: UserCircle,
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
            description: 'List a new property for sale or rent',
            href: '/dashboard/properties/form',
            icon: Building2,
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            label: 'Post Request',
            description: 'Create a new property request',
            href: '/dashboard/requests/form',
            icon: FileText,
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            label: 'Agent Profile',
            description: 'Set up your agent profile',
            href: '/dashboard/agent-profile',
            icon: UserCircle,
            permission: PERMISSIONS.CREATE_AGENT_PROFILE,
        },
        {
            label: 'Service Provider',
            description: 'Set up your service provider profile',
            href: '/provider/profile/edit',
            icon: UserCircle,
            permission: PERMISSIONS.CREATE_SERVICE_PROFILE,
        },
    ];

    const filteredActions = quickActions.filter(action =>
        hasPermission(userRole, action.permission)
    );

    const recentActivities = [
        {
            title: 'Property listing approved',
            description: 'Your 2BHK apartment in Mumbai is now live',
            time: '2 hours ago',
            type: 'success'
        },
        {
            title: 'New match found',
            description: 'A buyer is interested in your Pune property',
            time: '4 hours ago',
            type: 'info'
        },
        {
            title: 'Request updated',
            description: 'Your Bangalore property request was updated',
            time: '1 day ago',
            type: 'neutral'
        }
    ];

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name || 'User'}</h1>
                        <p className="text-muted-foreground">{ROLE_LABELS[userRole as Role]} • Last login 2 hours ago</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {filteredStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Link key={stat.title} href={stat.link}>
                                <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6 hover:shadow-[0_40px_80px_-45px_rgba(15,23,42,0.6)] transition-all duration-300 cursor-pointer group">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                    <TrendingUp className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
                                    <p className="text-muted-foreground">Get started with common tasks</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {filteredActions.map((action) => {
                                    const Icon = action.icon;
                                    return (
                                        <Link key={action.href} href={action.href}>
                                            <div className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer group border border-border/20">
                                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-foreground mb-1">{action.label}</h3>
                                                    <p className="text-sm text-muted-foreground">{action.description}</p>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

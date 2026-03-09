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
    Activity,
    Star
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
            change: '+1',
            icon: Building2,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            link: '/dashboard/properties',
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            title: 'My Requests',
            value: '2',
            change: '+2',
            icon: FileText,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            link: '/dashboard/requests',
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            title: 'Matches',
            value: '5',
            change: '+3',
            icon: Link2,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            link: '/dashboard/matches',
            permission: PERMISSIONS.VIEW_LINKS,
        },
        {
            title: 'Profile Views',
            value: '128',
            change: '+24%',
            icon: UserCircle,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
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
            href: '/dashboard/properties/form',
            icon: Building2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            permission: PERMISSIONS.CREATE_PROPERTY,
        },
        {
            label: 'Post Request',
            href: '/dashboard/requests/form',
            icon: FileText,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            permission: PERMISSIONS.CREATE_REQUEST,
        },
        {
            label: 'Agent Profile',
            href: '/dashboard/agent-profile',
            icon: UserCircle,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            permission: PERMISSIONS.CREATE_AGENT_PROFILE,
        },
        {
            label: 'Service Provider',
            href: '/provider/profile/edit',
            icon: BriefcaseIcon,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            permission: PERMISSIONS.CREATE_SERVICE_PROFILE,
        },
    ];

    function BriefcaseIcon(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        )
    }

    const filteredActions = quickActions.filter(action =>
        hasPermission(userRole, action.permission)
    );



    function CheckCircleIcon(props: any) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        )
    }

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">

                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                                Welcome back, {user?.name || 'User'}
                            </h1>

                        </div>
                    </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredStats.map((stat) => (
                        <Link key={stat.title} href={stat.link}>
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6 hover:shadow-[0_40px_80px_-45px_rgba(15,23,42,0.6)] transition-all duration-300 cursor-pointer group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${stat.bg}`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content Area (Analytics & Action) */}
                    <div className="lg:col-span-2 space-y-8 ">

                        {/* Profile Activity Chart */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">Profile Activity</h2>
                                    <p className="text-sm text-muted-foreground">Property views vs Profile views</p>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                        <span className="text-slate-600">Profile Views</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-slate-600">Property Views</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-64 w-full flex items-end justify-between gap-2 sm:gap-4 md:gap-8 pt-6">
                                {/* Y-axis grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-slate-400 text-xs">
                                    {[100, 75, 50, 25, 0].map((tick, i) => (
                                        <div key={i} className="flex items-center w-full gap-4">
                                            <div className="w-6 text-right font-medium">{tick * 2}</div>
                                            <div className="flex-1 border-b border-dashed border-slate-200 h-px"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart Bars */}
                                <div className="relative z-10 flex w-full h-full pl-10 justify-between items-end pb-8">
                                    {
                                        [
                                            { month: 'Jan', profile: 40, property: 25 },
                                            { month: 'Feb', profile: 60, property: 45 },
                                            { month: 'Mar', profile: 90, property: 70 },
                                            { month: 'Apr', profile: 130, property: 110 },
                                            { month: 'May', profile: 160, property: 140 },
                                            { month: 'Jun', profile: 190, property: 180 },
                                        ].map((data, index) => {
                                            const maxScale = 200; // max Y-axis value
                                            const profileHeight = (data.profile / maxScale) * 100;
                                            const propertyHeight = (data.property / maxScale) * 100;

                                            return (
                                                <div key={index} className="flex flex-col items-center flex-1 group h-full justify-end">
                                                    <div className="flex items-end justify-center w-full gap-1 sm:gap-2 h-full">
                                                        {/* Profile Bar */}
                                                        <div
                                                            className="w-full max-w-[20px] bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-md relative hover:brightness-110 transition-all cursor-pointer shadow-sm"
                                                            style={{ height: `${profileHeight}%` }}
                                                            title={`${data.profile} Profile Views in ${data.month}`}
                                                        >
                                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap pointer-events-none transition-opacity z-20">
                                                                {data.profile}
                                                            </div>
                                                        </div>

                                                        {/* Property Bar */}
                                                        <div
                                                            className="w-full max-w-[20px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md relative hover:brightness-110 transition-all cursor-pointer shadow-sm"
                                                            style={{ height: `${propertyHeight}%` }}
                                                            title={`${data.property} Property Views in ${data.month}`}
                                                        >
                                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap pointer-events-none transition-opacity z-20">
                                                                {data.property}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                                {/* X-axis labels */}
                                <div className="absolute bottom-0 pl-10 left-0 right-0 flex justify-between px-2 text-slate-500 font-medium text-xs sm:text-sm">
                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                                        <div key={i} className="flex-1 text-center">{month}</div>
                                    ))}
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Sidebar Area (Quick Actions) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10">
                                    <Activity className="w-5 h-5 text-indigo-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
                                    <p className="text-sm text-muted-foreground">Fast access tools</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex flex-col">
                                {filteredActions.map((action, index) => (
                                    <Link key={index} href={action.href}>
                                        <div className={`flex flex-col gap-2 p-4 rounded-2xl ${action.bg} hover:brightness-95 transition-all cursor-pointer border border-transparent hover:border-black/5`}>
                                            <div className="flex items-center justify-between">
                                                <div className={`p-2 rounded-lg bg-white/60 ${action.color}`}>
                                                    <action.icon className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-sm font-medium text-slate-700">{action.label}</span>
                                                <ArrowRight className={`w-4 h-4 ${action.color} opacity-50`} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

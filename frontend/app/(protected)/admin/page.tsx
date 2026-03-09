'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
    Users,
    Building2,
    FileText,
    Briefcase,
    UserCircle,
    Link2,
    DollarSign,
    TrendingUp,
    BarChart3,
    ArrowRight,
    ShieldCheck,
    AlertCircle
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
        { title: 'Total Users', value: '1,248', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/admin/users' },
        { title: 'Properties', value: '856', change: '+5%', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', link: '/admin/properties' },
        { title: 'Requests', value: '432', change: '+18%', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/admin/requests' },
    ];

    const additionalStats = [
        { title: 'Agents', value: '128', icon: UserCircle, link: '/admin/agents' },
        { title: 'Services', value: '64', icon: Briefcase, link: '/admin/services' },
        { title: 'Links', value: '256', icon: Link2, link: '/admin/links' },
        { title: 'Conversion', value: '3.2%', icon: TrendingUp, link: '#' },
    ];

    const pendingApprovals = [
        { label: 'Properties awaiting approval', count: 12, href: '/admin/approvals/properties', color: 'text-orange-600', bg: 'bg-orange-50', icon: Building2 },
        { label: 'Service providers awaiting approval', count: 5, href: '/admin/approvals/service-providers', color: 'text-blue-600', bg: 'bg-blue-50', icon: Briefcase },
        { label: 'Agent profiles awaiting approval', count: 8, href: '/admin/approvals/agents', color: 'text-purple-600', bg: 'bg-purple-50', icon: ShieldCheck },
    ];

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Platform overview, analytics, and management</p>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
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
                    <div className="lg:col-span-2 space-y-8">

                        {/* Platform Activity Chart */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">Platform Activity</h2>
                                    <p className="text-sm text-muted-foreground">User registrations vs new properties</p>
                                </div>
                                <div className="flex items-center gap-4 text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        <span className="text-slate-600">New Users</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                        <span className="text-slate-600">New Properties</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-64 w-full flex items-end justify-between gap-2 sm:gap-4 md:gap-8 pt-6">
                                {/* Y-axis grid lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-slate-400 text-xs">
                                    {[100, 75, 50, 25, 0].map((tick, i) => (
                                        <div key={i} className="flex items-center w-full gap-4">
                                            <div className="w-6 text-right font-medium">{tick * 4}</div>
                                            <div className="flex-1 border-b border-dashed border-slate-200 h-px"></div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart Bars */}
                                <div className="relative z-10 flex w-full h-full pl-10 justify-between items-end pb-8">
                                    {
                                        [
                                            { month: 'Jan', users: 120, properties: 85 },
                                            { month: 'Feb', users: 150, properties: 110 },
                                            { month: 'Mar', users: 180, properties: 140 },
                                            { month: 'Apr', users: 220, properties: 165 },
                                            { month: 'May', users: 280, properties: 190 },
                                            { month: 'Jun', users: 340, properties: 250 },
                                        ].map((data, index) => {
                                            const maxScale = 400; // max Y-axis value
                                            const userHeight = (data.users / maxScale) * 100;
                                            const propertyHeight = (data.properties / maxScale) * 100;

                                            return (
                                                <div key={index} className="flex flex-col items-center flex-1 group h-full justify-end">
                                                    <div className="flex items-end justify-center w-full gap-1 sm:gap-2 h-full">
                                                        {/* Users Bar */}
                                                        <div
                                                            className="w-full max-w-[20px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md relative hover:brightness-110 transition-all cursor-pointer shadow-sm"
                                                            style={{ height: `${userHeight}%` }}
                                                            title={`${data.users} Users in ${data.month}`}
                                                        >
                                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap pointer-events-none transition-opacity z-20">
                                                                {data.users}
                                                            </div>
                                                        </div>

                                                        {/* Properties Bar */}
                                                        <div
                                                            className="w-full max-w-[20px] bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md relative hover:brightness-110 transition-all cursor-pointer shadow-sm"
                                                            style={{ height: `${propertyHeight}%` }}
                                                            title={`${data.properties} Properties in ${data.month}`}
                                                        >
                                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap pointer-events-none transition-opacity z-20">
                                                                {data.properties}
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

                        {/* Secondary Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {additionalStats.map((stat) => (
                                <Link key={stat.title} href={stat.link}>
                                    <div className="bg-white rounded-2xl shadow-sm border border-border/40 p-5 hover:border-primary/30 transition-colors cursor-pointer text-center group">
                                        <stat.icon className="w-6 h-6 mx-auto mb-3 text-slate-400 group-hover:text-primary transition-colors" />
                                        <p className="text-xl font-bold text-slate-700">{stat.value}</p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mt-1">{stat.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Area (Pending Approvals) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10">
                                    <AlertCircle className="w-5 h-5 text-orange-500" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">Action Required</h2>
                                    <p className="text-sm text-muted-foreground">Pending approvals</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex flex-col ">
                                {pendingApprovals.map((item, index) => (
                                    <Link key={index} href={item.href}>
                                        <div className={`flex flex-col gap-2 p-4 rounded-2xl ${item.bg} hover:brightness-95 transition-all cursor-pointer border border-transparent hover:border-black/5`}>
                                            <div className="flex items-center justify-between">
                                                <div className={`p-2 rounded-lg bg-white/60 ${item.color}`}>
                                                    <item.icon className="w-4 h-4" />
                                                </div>
                                                <span className={`text-2xl font-bold ${item.color}`}>{item.count}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-1">
                                                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                                                <ArrowRight className={`w-4 h-4 ${item.color} opacity-50`} />
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

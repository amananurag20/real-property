'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Building2, DollarSign } from 'lucide-react';

export default function AdminAnalyticsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_ANALYTICS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const metrics = [
        { title: 'Total Revenue', value: '₹12.5M', change: '+15%', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { title: 'Active Users', value: '8,432', change: '+8%', icon: Users, color: 'bg-blue-100 text-blue-600' },
        { title: 'New Listings', value: '456', change: '+12%', icon: Building2, color: 'bg-purple-100 text-purple-600' },
        { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-500 mt-1">Platform performance metrics and insights</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <Card key={metric.title}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{metric.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                                    <p className="text-sm text-green-600 mt-1">{metric.change} this month</p>
                                </div>
                                <div className={`p-3 rounded-lg ${metric.color}`}>
                                    <metric.icon className="w-5 h-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>User Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center text-gray-400">
                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                            <p>User growth chart placeholder</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                        <div className="text-center text-gray-400">
                            <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                            <p>Revenue trend chart placeholder</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

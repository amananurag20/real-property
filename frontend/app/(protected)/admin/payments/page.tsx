'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, FileText, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminPaymentsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_PAYMENT_LOGS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const payments = [
        { id: 'pay_001', user: 'John Doe', amount: '₹5,000', type: 'Featured Listing', status: 'Success', date: '2024-01-15' },
        { id: 'pay_002', user: 'Jane Smith', amount: '₹2,500', type: 'Agent Subscription', status: 'Success', date: '2024-01-14' },
        { id: 'pay_003', user: 'Bob Wilson', amount: '₹1,000', type: 'Boost', status: 'Failed', date: '2024-01-13' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Payment Logs</h1>
                <p className="text-gray-500 mt-1">View and monitor all payment transactions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Revenue</p>
                                <p className="text-3xl font-bold text-gray-900">₹8,500</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <CreditCard className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Transactions</p>
                                <p className="text-3xl font-bold text-gray-900">156</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Success Rate</p>
                                <p className="text-3xl font-bold text-gray-900">94%</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Recent Transactions</span>
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {payments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">{payment.user}</p>
                                    <p className="text-sm text-gray-500">{payment.type} • {payment.date}</p>
                                    <p className="text-xs text-gray-400">ID: {payment.id}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900">{payment.amount}</p>
                                    <Badge variant={payment.status === 'Success' ? 'default' : 'destructive'} className="mt-1">
                                        {payment.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

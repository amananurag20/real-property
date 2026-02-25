'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, User, Shield, FileText, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminLogsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_ADMIN_LOGS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const logs = [
        { id: 1, action: 'User suspended', target: 'john@example.com', by: 'Admin', time: '2 hours ago', type: 'user' },
        { id: 2, action: 'Property approved', target: 'Property #1234', by: 'Admin', time: '3 hours ago', type: 'property' },
        { id: 3, action: 'Agent verified', target: 'Rajesh Kumar', by: 'Admin', time: '5 hours ago', type: 'agent' },
        { id: 4, action: 'Request rejected', target: 'Request #567', by: 'Admin', time: '1 day ago', type: 'request' },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'user': return <User className="w-4 h-4" />;
            case 'property': return <FileText className="w-4 h-4" />;
            case 'agent': return <Shield className="w-4 h-4" />;
            default: return <Database className="w-4 h-4" />;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
                <p className="text-gray-500 mt-1">Admin activity and system events</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Admin Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    {getIcon(log.type)}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{log.action}</p>
                                    <p className="text-sm text-gray-500">Target: {log.target}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-900">{log.by}</p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {log.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

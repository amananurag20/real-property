'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Ban, CheckCircle } from 'lucide-react';

export default function AdminUsersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.MANAGE_USERS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'USER', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'AGENT', status: 'Active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'SERVICE_PROVIDER', status: 'Suspended' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'USER', status: 'Active' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage platform users and their permissions</p>
                </div>
            </div>

            {/* Search */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input placeholder="Search users..." className="pl-9" />
                        </div>
                        <Button variant="outline">Filter</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Users List */}
            <Card>
                <CardHeader>
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {users.map((u) => (
                            <div key={u.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                        {u.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{u.name}</p>
                                        <p className="text-sm text-gray-500">{u.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={u.role === 'AGENT' ? 'default' : 'secondary'}>{u.role}</Badge>
                                    <Badge variant={u.status === 'Active' ? 'outline' : 'destructive'}>{u.status}</Badge>
                                    <Button variant="ghost" size="sm">
                                        {u.status === 'Active' ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
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

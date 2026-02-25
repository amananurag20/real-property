'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Star, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

export default function AdminAgentsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VERIFY_AGENT)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const agents = [
        { id: 1, name: 'Rajesh Kumar', agency: 'Elite Properties', experience: 8, properties: 24, verified: true, rating: 4.8 },
        { id: 2, name: 'Priya Sharma', agency: 'City Homes', experience: 5, properties: 12, verified: true, rating: 4.5 },
        { id: 3, name: 'Amit Patel', agency: 'Prime Realty', experience: 3, properties: 8, verified: false, rating: 0 },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Agent Management</h1>
                <p className="text-gray-500 mt-1">Verify and manage real estate agents</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Agents</p>
                                <p className="text-3xl font-bold text-gray-900">128</p>
                            </div>
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <UserCircle className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Verified</p>
                                <p className="text-3xl font-bold text-gray-900">112</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Pending</p>
                                <p className="text-3xl font-bold text-gray-900">16</p>
                            </div>
                            <div className="bg-yellow-100 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Agent Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {agents.map((agent) => (
                            <div key={agent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                        {agent.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{agent.name}</p>
                                        <p className="text-sm text-gray-500">{agent.agency} • {agent.experience} years exp.</p>
                                        <p className="text-sm text-gray-400">{agent.properties} active listings</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {agent.verified ? (
                                        <Badge variant="default" className="flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            Verified
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">Pending</Badge>
                                    )}
                                    {agent.rating > 0 && (
                                        <Badge variant="outline" className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-yellow-400" />
                                            {agent.rating}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

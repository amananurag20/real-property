'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, Download, Users, Building2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminExportPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.EXPORT_DATA)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const exportOptions = [
        { label: 'Users Data', description: 'Export all user records', icon: Users, records: '1,248' },
        { label: 'Properties', description: 'Export all property listings', icon: Building2, records: '856' },
        { label: 'Requests', description: 'Export all property requests', icon: FileText, records: '432' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Export</h1>
                <p className="text-gray-500 mt-1">Export platform data in CSV format</p>
            </div>

            <div className="grid gap-4">
                {exportOptions.map((option) => (
                    <Card key={option.label}>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <option.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{option.label}</p>
                                        <p className="text-sm text-gray-500">{option.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant="secondary">{option.records} records</Badge>
                                    <Button>
                                        <Download className="w-4 h-4 mr-2" />
                                        Export CSV
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Export History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { date: '2024-01-15', type: 'Users Data', records: '1,200', by: 'Admin' },
                            { date: '2024-01-10', type: 'Properties', records: '800', by: 'Admin' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="font-medium text-gray-900">{item.type}</p>
                                        <p className="text-sm text-gray-500">{item.date} by {item.by}</p>
                                    </div>
                                </div>
                                <Badge variant="outline">{item.records} records</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link2, Search, Building2, FileText, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function CreateLinkPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.LINK_PROPERTY_REQUEST)) {
            router.push('/403');
        }
    }, [userRole, router]);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Create Property-Request Link</h1>
                <p className="text-gray-500 mt-1">Connect a property with a buyer request</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Property Selection */}
                    <div className="space-y-2">
                        <Label>Select Property</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a property to link" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Sunset Villa - Mumbai</SelectItem>
                                <SelectItem value="2">Modern Apartment - Bangalore</SelectItem>
                                <SelectItem value="3">Eco Heights - Pune</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Request Selection */}
                    <div className="space-y-2">
                        <Label>Select Request</Label>
                        <div className="flex gap-2">
                            <Input placeholder="Search requests..." />
                            <Button variant="outline" size="icon">
                                <Search className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Triangle Visualization */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Building2 className="w-8 h-8 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium">Property</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className="text-center">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Link2 className="w-8 h-8 text-purple-600" />
                                </div>
                                <p className="text-sm font-medium">You (Agent)</p>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <FileText className="w-8 h-8 text-green-600" />
                                </div>
                                <p className="text-sm font-medium">Request</p>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label>Notes for Buyer</Label>
                        <Input placeholder="Add a message to the buyer..." />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => router.push('/agent/links')}>
                            Cancel
                        </Button>
                        <Button className="flex-1">
                            Create Link
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

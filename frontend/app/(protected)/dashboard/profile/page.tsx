'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, Building2, Save } from 'lucide-react';

export default function DashboardProfilePage() {
    const { user } = useAuth();

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-500 mt-1">Manage your personal information</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Profile Picture</p>
                            <p className="text-sm text-gray-500 mb-2">Update your profile photo</p>
                            <Button variant="outline" size="sm">Change Photo</Button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Full Name
                        </Label>
                        <Input defaultValue={user?.name || ''} placeholder="Your full name" />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </Label>
                        <Input type="email" defaultValue={user?.email || ''} placeholder="your@email.com" />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                        </Label>
                        <Input defaultValue={user?.phone || ''} placeholder="+91 98765 43210" />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            City
                        </Label>
                        <Input placeholder="Your city" />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

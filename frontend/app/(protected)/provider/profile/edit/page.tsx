'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Briefcase, MapPin, Phone, Mail } from 'lucide-react';

export default function ProviderProfileEditPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.EDIT_OWN_SERVICE_PROFILE)) {
            router.push('/403');
        }
    }, [userRole, router]);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Edit Service Provider Profile</h1>
                <p className="text-gray-500 mt-1">Update your professional service information</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Service Type */}
                    <div className="space-y-2">
                        <Label>Service Type</Label>
                        <Select defaultValue="ca">
                            <SelectTrigger>
                                <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ca">Chartered Accountant (CA)</SelectItem>
                                <SelectItem value="lawyer">Lawyer</SelectItem>
                                <SelectItem value="cs">Company Secretary (CS)</SelectItem>
                                <SelectItem value="notary">Notary</SelectItem>
                                <SelectItem value="loan">Loan Advisor</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Business Name */}
                    <div className="space-y-2">
                        <Label>Business/Practice Name</Label>
                        <Input placeholder="Enter your business name" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>About Your Services</Label>
                        <Textarea placeholder="Describe your services and expertise..." rows={4} />
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Service Location
                        </Label>
                        <Input placeholder="City, State" />
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Phone
                            </Label>
                            <Input placeholder="Contact number" />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email
                            </Label>
                            <Input placeholder="Email address" />
                        </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2">
                        <Label>Years of Experience</Label>
                        <Input type="number" placeholder="e.g., 10" />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => router.push('/provider/dashboard')}>
                            Cancel
                        </Button>
                        <Button className="flex-1">
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

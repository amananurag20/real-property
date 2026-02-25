'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Building2, MapPin, Award, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';

export default function AgentProfilePage() {
    const { user } = useAuth();
    const isAgent = user?.role === Role.AGENT;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    {isAgent ? 'Agent Profile' : 'Create Agent Profile'}
                </h1>
                <p className="text-gray-500 mt-1">
                    {isAgent 
                        ? 'Manage your agent profile and public information'
                        : 'Set up your agent profile to start connecting properties with buyers'
                    }
                </p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Status Badge */}
                    {isAgent && (
                        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-green-700">
                                Your agent profile is active and visible to buyers
                            </span>
                        </div>
                    )}

                    {/* Photo */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-medium">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Profile Photo</p>
                            <p className="text-sm text-gray-500 mb-2">Add a professional photo</p>
                            <Button variant="outline" size="sm">Upload Photo</Button>
                        </div>
                    </div>

                    {/* Name & Agency */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <UserCircle className="w-4 h-4" />
                                Full Name
                            </Label>
                            <Input defaultValue={user?.name || ''} placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Agency/Brokerage
                            </Label>
                            <Input placeholder="Agency name" />
                        </div>
                    </div>

                    {/* Experience & Specialization */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Years of Experience
                            </Label>
                            <Input type="number" placeholder="e.g., 5" />
                        </div>
                        <div className="space-y-2">
                            <Label>Specialization</Label>
                            <Input placeholder="e.g., Residential, Commercial" />
                        </div>
                    </div>

                    {/* Service Areas */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Service Areas
                        </Label>
                        <Input placeholder="Cities or regions you serve (comma separated)" />
                    </div>

                    {/* About */}
                    <div className="space-y-2">
                        <Label>About Me</Label>
                        <Textarea 
                            placeholder="Describe your experience and expertise..." 
                            rows={4} 
                        />
                    </div>

                    {/* Verification Badge */}
                    {isAgent && (
                        <div className="flex items-center gap-2">
                            <Badge variant="default" className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Verified Agent
                            </Badge>
                            <span className="text-sm text-gray-500">Verified by EstateIndia</span>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <Button className="flex-1">
                            <Save className="w-4 h-4 mr-2" />
                            {isAgent ? 'Update Profile' : 'Create Profile'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

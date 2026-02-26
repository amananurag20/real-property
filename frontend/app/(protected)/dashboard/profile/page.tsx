'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, Building2, Save, ChevronLeft, Camera, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function DashboardProfilePage() {
    const { user } = useAuth();

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link 
                        href="/dashboard"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
                        <p className="text-muted-foreground">Manage your personal information</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Photo Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-bold mx-auto">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <button className="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{user?.name || 'User Name'}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{user?.email || 'user@example.com'}</p>
                            <Button variant="outline" className="w-full rounded-xl">
                                <Camera className="w-4 h-4 mr-2" />
                                Change Photo
                            </Button>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
                                <p className="text-muted-foreground">Update your personal details and contact information</p>
                            </div>

                            <form className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <User className="w-4 h-4 text-primary" />
                                                Full Name
                                            </Label>
                                            <Input 
                                                defaultValue={user?.name || ''} 
                                                placeholder="Enter your full name" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Mail className="w-4 h-4 text-primary" />
                                                Email Address
                                            </Label>
                                            <Input 
                                                type="email" 
                                                defaultValue={user?.email || ''} 
                                                placeholder="your@email.com" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Phone className="w-4 h-4 text-primary" />
                                                Phone Number
                                            </Label>
                                            <Input 
                                                defaultValue={user?.phone || ''} 
                                                placeholder="+91 98765 43210" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                Date of Birth
                                            </Label>
                                            <Input 
                                                type="date" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Location Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Building2 className="w-4 h-4 text-primary" />
                                                City
                                            </Label>
                                            <Input 
                                                placeholder="Your city" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <MapPin className="w-4 h-4 text-primary" />
                                                State
                                            </Label>
                                            <Input 
                                                placeholder="Your state" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-foreground">
                                            Complete Address
                                        </Label>
                                        <Textarea 
                                            placeholder="Enter your complete address..." 
                                            rows={3}
                                            className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                        />
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">About You</h3>
                                    
                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-foreground">
                                            Bio
                                        </Label>
                                        <Textarea 
                                            placeholder="Tell us about yourself..." 
                                            rows={4}
                                            className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                                    <Button variant="outline" className="flex-1 h-12 rounded-xl">
                                        Cancel
                                    </Button>
                                    <Button className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
    UserCircle, 
    Building2, 
    MapPin, 
    Award, 
    Save, 
    CheckCircle, 
    ChevronLeft, 
    Camera, 
    Eye, 
    Edit,
    Phone,
    Mail,
    Star,
    Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import Link from 'next/link';

export default function AgentProfilePage() {
    const { user } = useAuth();
    const isAgent = user?.role === Role.AGENT;
    const [showPreview, setShowPreview] = useState(false);

    // Dummy data for preview
    const previewData = {
        name: 'Rajesh Kumar',
        agency: 'Prime Properties India',
        experience: 8,
        specialization: 'Residential, Commercial',
        serviceAreas: 'Mumbai, Pune, Nashik',
        about: 'Experienced real estate agent with 8+ years in Mumbai market. Specialized in residential and commercial properties with a track record of 200+ successful transactions. Known for personalized service and market expertise.',
        phone: '+91 98765 43210',
        email: 'rajesh@primeproperties.com',
        rating: 4.8,
        reviews: 156,
        totalSales: 200,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    };

    if (showPreview) {
        return (
            <main className="min-h-screen bg-muted/30 pt-10 pb-16">
                <div className="max-w-4xl mx-auto px-6 md:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Button 
                            onClick={() => setShowPreview(false)}
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 rounded-full"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-foreground">Agent Profile Preview</h1>
                            <p className="text-muted-foreground">How your profile will appear to clients</p>
                        </div>
                        <Button onClick={() => setShowPreview(false)} variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Agent Profile Card */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 overflow-hidden">
                        {/* Header Section */}
                        <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-8 pb-16">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <div className="relative">
                                    <img 
                                        src={previewData.image} 
                                        alt={previewData.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold text-foreground">{previewData.name}</h1>
                                        <Badge className="bg-emerald-500 hover:bg-emerald-600">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Verified Agent
                                        </Badge>
                                    </div>
                                    <p className="text-lg text-muted-foreground mb-3">{previewData.agency}</p>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="font-semibold">{previewData.rating}</span>
                                            <span className="text-muted-foreground">({previewData.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span>{previewData.totalSales}+ Sales</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Quick Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4 rounded-2xl bg-muted/30">
                                    <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-foreground">{previewData.experience}</p>
                                    <p className="text-sm text-muted-foreground">Years Experience</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-muted/30">
                                    <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <p className="text-lg font-bold text-foreground">{previewData.specialization}</p>
                                    <p className="text-sm text-muted-foreground">Specialization</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-muted/30">
                                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <p className="text-lg font-bold text-foreground">{previewData.serviceAreas}</p>
                                    <p className="text-sm text-muted-foreground">Service Areas</p>
                                </div>
                            </div>

                            {/* About Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">About Me</h2>
                                <p className="text-muted-foreground leading-relaxed">{previewData.about}</p>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30">
                                        <Phone className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="font-semibold">{previewData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30">
                                        <Mail className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-semibold">{previewData.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                                <Button className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Contact Agent
                                </Button>
                                <Button variant="outline" className="flex-1 h-12 rounded-xl">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

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
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground">
                            {isAgent ? 'Agent Profile' : 'Create Agent Profile'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isAgent 
                                ? 'Manage your agent profile and public information'
                                : 'Set up your agent profile to start connecting properties with buyers'
                            }
                        </p>
                    </div>
                    <Button onClick={() => setShowPreview(true)} variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Profile Photo Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 text-center">
                            {/* Status Badge */}
                            {isAgent && (
                                <div className="flex items-center justify-center gap-2 p-3 bg-emerald-50 rounded-2xl mb-6">
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                    <span className="text-sm text-emerald-700 font-medium">
                                        Profile Active
                                    </span>
                                </div>
                            )}

                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-bold mx-auto">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                                </div>
                                <button className="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{user?.name || 'Agent Name'}</h3>
                            <p className="text-sm text-muted-foreground mb-4">Professional Agent</p>
                            <Button variant="outline" className="w-full rounded-xl">
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Photo
                            </Button>

                            {/* Verification Badge */}
                            {isAgent && (
                                <div className="mt-6 p-4 bg-muted/30 rounded-2xl">
                                    <Badge variant="default" className="flex items-center gap-1 w-fit mx-auto">
                                        <CheckCircle className="w-3 h-3" />
                                        Verified Agent
                                    </Badge>
                                    <p className="text-xs text-muted-foreground mt-2">Verified by EstateIndia</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Agent Information</h2>
                                <p className="text-muted-foreground">Complete your professional profile to attract more clients</p>
                            </div>

                            <form className="space-y-6">
                                {/* Basic Information */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Basic Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <UserCircle className="w-4 h-4 text-primary" />
                                                Full Name
                                            </Label>
                                            <Input 
                                                defaultValue={user?.name || ''} 
                                                placeholder="Your full name" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Building2 className="w-4 h-4 text-primary" />
                                                Agency/Brokerage
                                            </Label>
                                            <Input 
                                                placeholder="Agency name" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Award className="w-4 h-4 text-primary" />
                                                Years of Experience
                                            </Label>
                                            <Input 
                                                type="number" 
                                                placeholder="e.g., 5" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium text-foreground">
                                                Specialization
                                            </Label>
                                            <Input 
                                                placeholder="e.g., Residential, Commercial" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Service Areas */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Service Information</h3>
                                    
                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            Service Areas
                                        </Label>
                                        <Input 
                                            placeholder="Cities or regions you serve (comma separated)" 
                                            className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-foreground">
                                            About Me
                                        </Label>
                                        <Textarea 
                                            placeholder="Describe your experience, expertise, and what makes you unique..." 
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
                                        {isAgent ? 'Update Profile' : 'Create Profile'}
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

'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { 
    Briefcase, 
    MapPin, 
    Phone, 
    Mail, 
    ChevronLeft, 
    Camera, 
    Eye, 
    Edit,
    Save,
    Award,
    CheckCircle,
    Star,
    Users,
    Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function ProviderProfileEditPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.EDIT_OWN_SERVICE_PROFILE)) {
            router.push('/403');
        }
    }, [userRole, router]);

    // Dummy data for preview
    const previewData = {
        name: 'Priya Sharma',
        businessName: 'Sharma & Associates',
        serviceType: 'Chartered Accountant (CA)',
        about: 'Experienced CA with 12+ years in taxation, auditing, and financial consulting. Specialized in real estate transactions, GST compliance, and investment advisory. Helping clients navigate complex financial regulations with personalized solutions.',
        location: 'Bandra West, Mumbai, Maharashtra',
        phone: '+91 98765 43210',
        email: 'priya@sharmaassociates.com',
        experience: 12,
        rating: 4.9,
        reviews: 89,
        totalClients: 300,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80'
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
                            <h1 className="text-3xl font-bold text-foreground">Service Provider Preview</h1>
                            <p className="text-muted-foreground">How your profile will appear to clients</p>
                        </div>
                        <Button onClick={() => setShowPreview(false)} variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Service Provider Profile Card */}
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
                                            Verified Provider
                                        </Badge>
                                    </div>
                                    <p className="text-lg text-muted-foreground mb-1">{previewData.businessName}</p>
                                    <p className="text-md text-muted-foreground mb-3">{previewData.serviceType}</p>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="font-semibold">{previewData.rating}</span>
                                            <span className="text-muted-foreground">({previewData.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span>{previewData.totalClients}+ Clients</span>
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
                                    <Briefcase className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <p className="text-lg font-bold text-foreground">{previewData.serviceType}</p>
                                    <p className="text-sm text-muted-foreground">Service Type</p>
                                </div>
                                <div className="text-center p-4 rounded-2xl bg-muted/30">
                                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <p className="text-lg font-bold text-foreground">Mumbai</p>
                                    <p className="text-sm text-muted-foreground">Service Location</p>
                                </div>
                            </div>

                            {/* About Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-4">About My Services</h2>
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
                                    Contact Provider
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
                        href="/provider/dashboard"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground">Service Provider Profile</h1>
                        <p className="text-muted-foreground">Update your professional service information</p>
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
                            <div className="relative inline-block mb-6">
                                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-bold mx-auto">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'S'}
                                </div>
                                <button className="absolute bottom-2 right-2 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-colors shadow-lg">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">{user?.name || 'Service Provider'}</h3>
                            <p className="text-sm text-muted-foreground mb-4">Professional Service Provider</p>
                            <Button variant="outline" className="w-full rounded-xl">
                                <Camera className="w-4 h-4 mr-2" />
                                Upload Photo
                            </Button>

                            {/* Verification Badge */}
                            <div className="mt-6 p-4 bg-muted/30 rounded-2xl">
                                <Badge variant="default" className="flex items-center gap-1 w-fit mx-auto">
                                    <CheckCircle className="w-3 h-3" />
                                    Verified Provider
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-2">Verified by EstateIndia</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-2">Service Information</h2>
                                <p className="text-muted-foreground">Complete your professional profile to attract more clients</p>
                            </div>

                            <form className="space-y-6">
                                {/* Service Details */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Service Details</h3>
                                    
                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <Briefcase className="w-4 h-4 text-primary" />
                                            Service Type
                                        </Label>
                                        <Select defaultValue="ca">
                                            <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                                <SelectValue placeholder="Select service type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ca">Chartered Accountant (CA)</SelectItem>
                                                <SelectItem value="lawyer">Lawyer</SelectItem>
                                                <SelectItem value="cs">Company Secretary (CS)</SelectItem>
                                                <SelectItem value="notary">Notary</SelectItem>
                                                <SelectItem value="loan">Loan Advisor</SelectItem>
                                                <SelectItem value="architect">Architect</SelectItem>
                                                <SelectItem value="interior">Interior Designer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-foreground">
                                            Business/Practice Name
                                        </Label>
                                        <Input 
                                            placeholder="Enter your business name" 
                                            className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <Award className="w-4 h-4 text-primary" />
                                            Years of Experience
                                        </Label>
                                        <Input 
                                            type="number" 
                                            placeholder="e.g., 10" 
                                            className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        />
                                    </div>
                                </div>

                                {/* Location & Contact */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">Location & Contact</h3>
                                    
                                    <div className="space-y-3">
                                        <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                            <MapPin className="w-4 h-4 text-primary" />
                                            Service Location
                                        </Label>
                                        <Input 
                                            placeholder="City, State" 
                                            className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Phone className="w-4 h-4 text-primary" />
                                                Phone Number
                                            </Label>
                                            <Input 
                                                placeholder="Contact number" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                                <Mail className="w-4 h-4 text-primary" />
                                                Email Address
                                            </Label>
                                            <Input 
                                                placeholder="Email address" 
                                                className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* About Services */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">About Your Services</h3>
                                    
                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium text-foreground">
                                            Service Description
                                        </Label>
                                        <Textarea 
                                            placeholder="Describe your services, expertise, and what makes you unique..." 
                                            rows={4}
                                            className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                                    <Button 
                                        variant="outline" 
                                        className="flex-1 h-12 rounded-xl"
                                        onClick={() => router.push('/provider/dashboard')}
                                    >
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

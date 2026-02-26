'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
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
import { ChevronLeft, FileText, Save, MapPin, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function RequestFormPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    // Determine if this is edit mode
    const paramsArray = params.params as string[] | undefined;
    const isEditMode = paramsArray?.[0] === 'edit' && paramsArray?.[1];
    const requestId = isEditMode ? paramsArray?.[1] : null;

    // Mock data for edit mode
    const mockRequestData = {
        type: 'buy',
        propertyType: 'apartment',
        title: 'Looking for 2BHK Apartment in Bangalore',
        minBudget: '8000000',
        maxBudget: '10000000',
        location: 'Koramangala, Bangalore, Karnataka',
        timeline: '3months',
        bedrooms: '2',
        bathrooms: '2',
        minArea: '1000',
        maxArea: '1500',
        requirements: 'Looking for a spacious apartment with modern amenities, good connectivity, and parking space. Prefer properties near IT corridors.',
        amenities: 'Gym, Swimming Pool, Security, Parking'
    };

    const [formData, setFormData] = useState(isEditMode ? mockRequestData : {
        type: '',
        propertyType: '',
        title: '',
        minBudget: '',
        maxBudget: '',
        location: '',
        timeline: '',
        bedrooms: '',
        bathrooms: '',
        minArea: '',
        maxArea: '',
        requirements: '',
        amenities: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard/requests');
        }, 1000);
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link 
                        href="/dashboard/requests"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {isEditMode ? `Edit Request #${requestId}` : 'Post New Request'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditMode ? 'Update your property request' : 'Submit a property request to connect with agents'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Request Type & Property Details */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Request Details</h2>
                            <p className="text-muted-foreground">What type of property are you looking for?</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Request Type</Label>
                                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                                        <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                            <SelectValue placeholder="Select request type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="buy">Buy Property</SelectItem>
                                            <SelectItem value="rent">Rent Property</SelectItem>
                                            <SelectItem value="invest">Investment Opportunity</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Property Type</Label>
                                    <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                                        <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                            <SelectValue placeholder="Select property type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="house">House</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="commercial">Commercial</SelectItem>
                                            <SelectItem value="plot">Plot/Land</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Request Title</Label>
                                <Input 
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Looking for 2BHK Apartment in Bangalore" 
                                    className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Bedrooms</Label>
                                    <Select value={formData.bedrooms} onValueChange={(value) => handleInputChange('bedrooms', value)}>
                                        <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                            <SelectValue placeholder="Number of bedrooms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Bedroom</SelectItem>
                                            <SelectItem value="2">2 Bedrooms</SelectItem>
                                            <SelectItem value="3">3 Bedrooms</SelectItem>
                                            <SelectItem value="4">4 Bedrooms</SelectItem>
                                            <SelectItem value="5">5+ Bedrooms</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Bathrooms</Label>
                                    <Select value={formData.bathrooms} onValueChange={(value) => handleInputChange('bathrooms', value)}>
                                        <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                            <SelectValue placeholder="Number of bathrooms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Bathroom</SelectItem>
                                            <SelectItem value="2">2 Bathrooms</SelectItem>
                                            <SelectItem value="3">3 Bathrooms</SelectItem>
                                            <SelectItem value="4">4+ Bathrooms</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Budget & Area */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Budget & Size Requirements</h2>
                            <p className="text-muted-foreground">Specify your budget range and preferred property size</p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        Min Budget (₹)
                                    </Label>
                                    <Input 
                                        type="number" 
                                        value={formData.minBudget}
                                        onChange={(e) => handleInputChange('minBudget', e.target.value)}
                                        placeholder="Minimum budget" 
                                        className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        Max Budget (₹)
                                    </Label>
                                    <Input 
                                        type="number" 
                                        value={formData.maxBudget}
                                        onChange={(e) => handleInputChange('maxBudget', e.target.value)}
                                        placeholder="Maximum budget" 
                                        className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Min Area (sq ft)</Label>
                                    <Input 
                                        type="number" 
                                        value={formData.minArea}
                                        onChange={(e) => handleInputChange('minArea', e.target.value)}
                                        placeholder="Minimum area" 
                                        className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Max Area (sq ft)</Label>
                                    <Input 
                                        type="number" 
                                        value={formData.maxArea}
                                        onChange={(e) => handleInputChange('maxArea', e.target.value)}
                                        placeholder="Maximum area" 
                                        className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location & Timeline */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Location & Timeline</h2>
                            <p className="text-muted-foreground">Where and when do you need the property?</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Preferred Location
                                </Label>
                                <Input 
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    placeholder="City, Area or Locality" 
                                    className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Timeline</Label>
                                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                                    <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                        <SelectValue placeholder="When do you need it?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="immediate">Immediate</SelectItem>
                                        <SelectItem value="1month">Within 1 month</SelectItem>
                                        <SelectItem value="3months">Within 3 months</SelectItem>
                                        <SelectItem value="6months">Within 6 months</SelectItem>
                                        <SelectItem value="flexible">Flexible</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Additional Requirements */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Additional Requirements</h2>
                            <p className="text-muted-foreground">Specify any additional preferences or requirements</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Detailed Requirements</Label>
                                <Textarea 
                                    value={formData.requirements}
                                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                                    placeholder="Describe any specific requirements, preferences, or features you're looking for..." 
                                    rows={4}
                                    className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Preferred Amenities</Label>
                                <Textarea 
                                    value={formData.amenities}
                                    onChange={(e) => handleInputChange('amenities', e.target.value)}
                                    placeholder="List preferred amenities (e.g., Gym, Swimming Pool, Security, Parking)" 
                                    rows={3}
                                    className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1 h-12 rounded-xl"
                                onClick={() => router.push('/dashboard/requests')}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                ) : (
                                    <Save className="w-4 h-4 mr-2" />
                                )}
                                {isEditMode ? 'Save Changes' : 'Submit Request'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

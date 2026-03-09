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
import { ChevronLeft, Building2, Save, Upload, X } from 'lucide-react';
import Link from 'next/link';

export default function PropertyFormPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Determine if this is edit mode
    const paramsArray = params.params as string[] | undefined;
    const isEditMode = paramsArray?.[0] === 'edit' && paramsArray?.[1];
    const propertyId = isEditMode ? paramsArray?.[1] : null;

    // Mock data for edit mode
    const mockPropertyData = {
        title: 'Luxury 2BHK Apartment',
        type: 'apartment',
        category: 'sale',
        price: '8500000',
        area: '1200',
        bedrooms: '2',
        bathrooms: '2',
        location: 'Bandra West, Mumbai, Maharashtra',
        description: 'Beautiful apartment with modern amenities, sea view, and excellent connectivity to business districts.',
        amenities: 'Swimming Pool, Gym, Security, Parking',
        address: 'Tower A, Seaside Residency, Bandra West, Mumbai - 400050'
    };

    const [formData, setFormData] = useState(isEditMode ? mockPropertyData : {
        title: '',
        type: '',
        category: '',
        price: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        location: '',
        description: '',
        amenities: '',
        address: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.back();
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
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            {isEditMode ? `Edit Property #${propertyId}` : 'Post New Property'}
                        </h1>
                        <p className="text-muted-foreground">
                            {isEditMode ? 'Update your property listing' : 'Add a new property listing to the platform'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
                            <p className="text-muted-foreground">Essential details about your property</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Property Title</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Modern 3BHK Apartment with Sea View"
                                    className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Property Type</Label>
                                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
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

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                                        <SelectTrigger className="h-12 rounded-xl border-border/50 focus:ring-primary">
                                            <SelectValue placeholder="Sale or Rent" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sale">For Sale</SelectItem>
                                            <SelectItem value="rent">For Rent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Price (₹)</Label>
                                    <Input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => handleInputChange('price', e.target.value)}
                                        placeholder="Enter price"
                                        className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-medium text-foreground">Area (sq ft)</Label>
                                    <Input
                                        type="number"
                                        value={formData.area}
                                        onChange={(e) => handleInputChange('area', e.target.value)}
                                        placeholder="Enter area"
                                        className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                        required
                                    />
                                </div>
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

                    {/* Location Details */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Location Details</h2>
                            <p className="text-muted-foreground">Property location and address information</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Location</Label>
                                <Input
                                    value={formData.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    placeholder="City, State"
                                    className="h-12 rounded-xl border-border/50 focus-visible:ring-primary"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Complete Address</Label>
                                <Textarea
                                    value={formData.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    placeholder="Enter complete address with landmarks..."
                                    rows={3}
                                    className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Property Details</h2>
                            <p className="text-muted-foreground">Additional information about the property</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Description</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Describe the property, its features, and what makes it special..."
                                    rows={4}
                                    className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-3">
                                <Label className="text-sm font-medium text-foreground">Amenities</Label>
                                <Textarea
                                    value={formData.amenities}
                                    onChange={(e) => handleInputChange('amenities', e.target.value)}
                                    placeholder="List amenities (e.g., Swimming Pool, Gym, Security, Parking)"
                                    rows={3}
                                    className="rounded-xl border-border/50 focus-visible:ring-primary resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Property Images</h2>
                            <p className="text-muted-foreground">Upload high-quality images of your property</p>
                        </div>

                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-border/50 rounded-2xl p-12 text-center hover:border-primary/50 transition-colors">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                                    <Upload className="w-8 h-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">Upload Property Images</h3>
                                <p className="text-sm text-muted-foreground mb-4">Drag & drop images or click to browse</p>
                                <Button variant="outline" type="button" className="rounded-xl">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose Files
                                </Button>
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
                                onClick={() => router.back()}
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
                                {isEditMode ? 'Save Changes' : 'Submit for Approval'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </main >
    );
}

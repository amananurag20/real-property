'use client';

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
import { ArrowLeft, Building2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreatePropertyPage() {
    const router = useRouter();

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/properties">
                    <Button variant="ghost" size="sm" className="mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Properties
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Post New Property</h1>
                <p className="text-gray-500 mt-1">Add a new property listing to the platform</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label>Property Title</Label>
                        <Input placeholder="e.g., Modern 3BHK Apartment" />
                    </div>

                    {/* Type & Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Property Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                    <SelectItem value="house">House</SelectItem>
                                    <SelectItem value="villa">Villa</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sale/Rent" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sale">For Sale</SelectItem>
                                    <SelectItem value="rent">For Rent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Price & Area */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Price (₹)</Label>
                            <Input type="number" placeholder="Enter price" />
                        </div>
                        <div className="space-y-2">
                            <Label>Area (sq ft)</Label>
                            <Input type="number" placeholder="Enter area" />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label>Location</Label>
                        <Input placeholder="City, State" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Describe the property..." rows={4} />
                    </div>

                    {/* Images */}
                    <div className="space-y-2">
                        <Label>Images</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                            <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Drag & drop images or click to browse</p>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => router.push('/dashboard/properties')}>
                            Cancel
                        </Button>
                        <Button className="flex-1">
                            Submit for Approval
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

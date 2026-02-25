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
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateRequestPage() {
    const router = useRouter();

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/requests">
                    <Button variant="ghost" size="sm" className="mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Requests
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Post New Request</h1>
                <p className="text-gray-500 mt-1">Submit a property request to connect with agents</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    {/* Request Type */}
                    <div className="space-y-2">
                        <Label>Request Type</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buy">Buy Property</SelectItem>
                                <SelectItem value="rent">Rent Property</SelectItem>
                                <SelectItem value="invest">Investment Opportunity</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Property Type */}
                    <div className="space-y-2">
                        <Label>Preferred Property Type</Label>
                        <Select>
                            <SelectTrigger>
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

                    {/* Budget */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Min Budget (₹)</Label>
                            <Input type="number" placeholder="Minimum" />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Budget (₹)</Label>
                            <Input type="number" placeholder="Maximum" />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label>Preferred Location</Label>
                        <Input placeholder="City, Area or Locality" />
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2">
                        <Label>Timeline</Label>
                        <Select>
                            <SelectTrigger>
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

                    {/* Additional Notes */}
                    <div className="space-y-2">
                        <Label>Additional Requirements</Label>
                        <Textarea placeholder="Describe any specific requirements..." rows={4} />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => router.push('/dashboard/requests')}>
                            Cancel
                        </Button>
                        <Button className="flex-1">
                            Submit Request
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

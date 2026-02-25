'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
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
import { ArrowLeft, FileText, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditRequestPage() {
    const params = useParams();
    const router = useRouter();
    const requestId = params.id;

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/requests">
                    <Button variant="ghost" size="sm" className="mb-2">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Requests
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Edit Request #{requestId}</h1>
                <p className="text-gray-500 mt-1">Update your property request</p>
            </div>

            <Card>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label>Request Type</Label>
                        <Select defaultValue="buy">
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="buy">Buy Property</SelectItem>
                                <SelectItem value="rent">Rent Property</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input defaultValue="Looking for 2BHK in Bangalore" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Min Budget (₹)</Label>
                            <Input type="number" defaultValue="8000000" />
                        </div>
                        <div className="space-y-2">
                            <Label>Max Budget (₹)</Label>
                            <Input type="number" defaultValue="10000000" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Preferred Location</Label>
                        <Input defaultValue="Bangalore, Karnataka" />
                    </div>

                    <div className="space-y-2">
                        <Label>Additional Requirements</Label>
                        <Textarea defaultValue="Looking for a spacious apartment..." rows={4} />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button variant="outline" className="flex-1" onClick={() => router.push('/dashboard/requests')}>
                            Cancel
                        </Button>
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

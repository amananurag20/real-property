'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Have questions? We are here to help. Reach out to our team for assistance.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Form */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input placeholder="Your first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input placeholder="Your last name" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone</Label>
                                <Input placeholder="+91 98765 43210" />
                            </div>
                            <div className="space-y-2">
                                <Label>Message</Label>
                                <Textarea placeholder="How can we help you?" rows={4} />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                    <p className="text-gray-600">
                        Our team is available Monday to Saturday, 9:00 AM to 6:00 PM IST.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Phone className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Phone</h3>
                                <p className="text-gray-600">+91 1800-123-4567</p>
                                <p className="text-sm text-gray-500">Toll-free number</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-600">support@estateindia.com</p>
                                <p className="text-sm text-gray-500">For general inquiries</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Address</h3>
                                <p className="text-gray-600">
                                    123 Business Park, Tower A<br />
                                    Mumbai, Maharashtra 400001<br />
                                    India
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                <p className="text-gray-600">Monday - Saturday</p>
                                <p className="text-sm text-gray-500">9:00 AM - 6:00 PM IST</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

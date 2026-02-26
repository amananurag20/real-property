'use client';

import { use } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Star, CheckCircle2, Briefcase, GraduationCap, ChevronLeft, Globe, Users, Clock } from 'lucide-react';
import { allServices, getServiceImage } from '@/data/services';

function ServiceContent({ id }: { id: string }) {
    const service = allServices.find(s => s.id === parseInt(id));

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Provider Not Found</h1>
                    <Link href="/services" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    const serviceImage = service.image || getServiceImage(service.type);

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/services"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Service Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Profile Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            {/* Header Background with Image */}
                            <div className="h-48 w-full rounded-2xl overflow-hidden mb-8 relative">
                                <img
                                    src={serviceImage}
                                    alt={service.type}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-4 left-4">
                                    <Badge className="bg-white/90 text-slate-900 font-bold rounded-full px-4 py-1.5">
                                        {service.type}
                                    </Badge>
                                </div>
                            </div>

                            {/* Service Info */}
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h1 className="text-3xl font-bold text-foreground">{service.name}</h1>
                                        {service.verified && (
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-full px-3 py-1">
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span>{service.location}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating & Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border mt-6">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                        <span className="text-2xl font-bold text-slate-900">{service.rating}</span>
                                    </div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Rating</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{service.reviews}</p>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Reviews</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{service.clientsServed}</p>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Clients Served</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{service.experience}+</p>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Years Exp.</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="pt-6">
                                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">{service.description}</p>
                            </div>
                        </div>

                        {/* Services Offered Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Services Offered</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.services?.map((svc, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                                        <div className="w-6 h-6 text-primary flex-shrink-0">
                                            <Briefcase className="w-full h-full" />
                                        </div>
                                        <span className="text-sm font-semibold text-foreground">{svc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education Card */}
                        {service.education && service.education.length > 0 && (
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Qualifications</h2>
                                <div className="space-y-4">
                                    {service.education.map((edu, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                                <GraduationCap className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-lg font-semibold text-foreground">{edu}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Languages Card */}
                        {service.languages && service.languages.length > 0 && (
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Languages</h2>
                                <div className="flex flex-wrap gap-3">
                                    {service.languages.map((lang, index) => (
                                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                                            <Globe className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-semibold text-foreground">{lang}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Contact Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Contact Info Card */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-4">
                                <h3 className="text-xl font-bold text-foreground">Contact Information</h3>
                                
                                {service.phone && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Phone</p>
                                            <p className="font-semibold text-foreground">{service.phone}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {service.email && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Email</p>
                                            <p className="font-semibold text-foreground text-sm">{service.email}</p>
                                        </div>
                                    </div>
                                )}

                                {service.availability && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Availability</p>
                                            <p className="font-semibold text-foreground">{service.availability}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Contact Form */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-6 bg-gradient-to-br from-white to-slate-50">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
                                    <p className="text-muted-foreground text-sm">Request a consultation with {service.name}</p>
                                </div>

                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold text-foreground">Your Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            className="rounded-xl border-border/50 focus-visible:ring-primary h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className="rounded-xl border-border/50 focus-visible:ring-primary h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground">Phone</Label>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            placeholder="+91 98765 43210"
                                            className="rounded-xl border-border/50 focus-visible:ring-primary h-11"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-sm font-semibold text-foreground">Message</Label>
                                        <Textarea
                                            id="message"
                                            rows={3}
                                            className="resize-none rounded-xl border-border/50 focus-visible:ring-primary"
                                            placeholder={`I'm looking for ${service.type.toLowerCase()} services...`}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md"
                                    >
                                        <Users className="w-5 h-5 mr-2" />
                                        Request Consultation
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <ServiceContent id={id} />;
}

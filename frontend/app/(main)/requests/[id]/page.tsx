'use client';

import { use } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, DollarSign, Calendar, User, Building2, FileText, CheckCircle, Clock, ChevronLeft } from 'lucide-react';

import { allRequests } from '@/data/requests';

function RequestContent({ id }: { id: string }) {
    const request = allRequests.find(r => r.id === parseInt(id));

    if (!request) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Request Not Found</h1>
                    <Link href="/requests" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Requests
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Back Button */}
                <div className="mb-8">
                    <Link
                        href="/requests"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Request Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Title & Header Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant={request.type === 'Buy' ? 'default' : 'secondary'} className="rounded-full px-4 py-1">
                                        {request.type}
                                    </Badge>
                                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-xs font-bold text-emerald-600 border border-emerald-100">
                                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                                        {request.status}
                                    </div>
                                </div>
                                <h1 className="text-4xl font-bold text-foreground leading-tight">{request.title}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span className="text-lg font-medium">{request.location}</span>
                                </div>
                            </div>

                            {/* Budget & Timeline Card */}
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 text-white">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Budget Range</h2>
                                        <p className="text-white/70 text-sm">Expected investment amount</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="text-center">
                                        <p className="text-4xl font-bold text-white mb-2">
                                            {request.budgetMin} - {request.budgetMax}
                                        </p>
                                        <p className="text-white/70">Negotiable within this range</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline & Property Type Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Key Requirements</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100">
                                            <Calendar className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                                            <p className="text-xl font-bold text-foreground">{request.timeline}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-100">
                                            <Building2 className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Property Type</p>
                                            <p className="text-xl font-bold text-foreground">{request.propertyType}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Requirement Details</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">{request.description}</p>
                        </div>

                        {/* Essential Requirements */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Essential Requirements</h2>
                            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {request.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                                        <div className="w-6 h-6 text-primary flex-shrink-0">
                                            <CheckCircle className="w-full h-full" />
                                        </div>
                                        <span className="text-sm font-semibold text-foreground">{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location Details Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Preferred Location</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Target Area</p>
                                        <p className="text-lg font-semibold text-foreground">{request.location}</p>
                                        <p className="text-sm text-muted-foreground mt-1">Primary Interest Area</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - User Info & Action Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* User Info Card */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-primary/20 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                                <User className="w-8 h-8 text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-muted-foreground">Request Poster</p>
                                            <h4 className="text-lg font-bold text-foreground">{request.user}</h4>
                                            <p className="text-xs text-primary font-semibold">Verified User</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 pt-2 border-t border-border">
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-primary" />
                                                Posted
                                            </span>
                                            <span className="font-medium text-foreground">{request.postedDate}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <span className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-primary" />
                                                Request ID
                                            </span>
                                            <span className="font-medium text-foreground">#{request.id}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Card for Agents */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-6 bg-gradient-to-br from-white to-slate-50">
                                <div className="space-y-2 text-center">
                                    <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold text-foreground">Are you an Agent?</h3>
                                    <p className="text-muted-foreground text-sm">
                                        If you have a matching property, connect with this request to help the buyer.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        size="lg"
                                        className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md"
                                    >
                                        Link Your Property
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full h-12 rounded-xl border-border/50 font-semibold hover:bg-muted/50 transition-all"
                                    >
                                        Contact User
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <RequestContent id={id} />;
}

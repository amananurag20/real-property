'use client';

import { use } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, CheckCircle2, Mail, Phone, Star, Home, Award, MessageSquare, ChevronLeft, TrendingUp } from 'lucide-react';
import { allAgents } from '@/data/agents';

function AgentContent({ id }: { id: string }) {
    const agent = allAgents.find(a => a.id === parseInt(id));

    if (!agent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Agent Not Found</h1>
                    <Link href="/agents" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Agents
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
                        href="/agents"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Agent Profile */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Main Profile Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            {/* Header Background */}
                            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl mb-8 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"></div>
                            </div>

                            {/* Profile Info */}
                            <div className="flex flex-col md:flex-row gap-6 items-start -mt-20 mb-6">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="h-40 w-40 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-white">
                                        <img
                                            src={agent.image}
                                            alt={agent.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    {agent.verified && (
                                        <div className="absolute -bottom-2 -right-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-lg border-4 border-white">
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Basic Info */}
                                <div className="flex-1 pt-4 md:pt-20 space-y-2">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h1 className="text-3xl font-bold text-foreground">{agent.name}</h1>
                                        {agent.verified && (
                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-full px-3 py-1">
                                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-lg font-medium text-primary">{agent.agency}</p>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span>{agent.serviceAreas}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Rating & Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-border">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-1 mb-1">
                                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                        <span className="text-2xl font-bold text-slate-900">{agent.rating}</span>
                                    </div>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Rating</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{agent.reviews}</p>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Reviews</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{agent.successfulDeals}</p>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Deals Closed</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-slate-900">{agent.activeListings}</p>
                                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Active Listings</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="pt-6">
                                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed text-lg">{agent.bio}</p>
                            </div>
                        </div>

                        {/* Specialization & Experience Card */}
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Expertise</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                        <Award className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Specialization</p>
                                        <p className="text-xl font-bold text-foreground">{agent.specialization}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100">
                                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Experience</p>
                                        <p className="text-xl font-bold text-foreground">{agent.experience}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Languages Card */}
                        {agent.languages && agent.languages.length > 0 && (
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                                <h2 className="text-2xl font-bold text-foreground mb-6">Languages</h2>
                                <div className="flex flex-wrap gap-3">
                                    {agent.languages.map((lang, index) => (
                                        <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
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
                                
                                {agent.phone && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500">
                                            <Phone className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Phone</p>
                                            <p className="font-semibold text-foreground">{agent.phone}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {agent.email && (
                                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500">
                                            <Mail className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Email</p>
                                            <p className="font-semibold text-foreground text-sm">{agent.email}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Quick Contact Form */}
                            <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 space-y-6 bg-gradient-to-br from-white to-slate-50">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
                                    <p className="text-muted-foreground text-sm">Send a message to {agent.name}</p>
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
                                            placeholder="I'm interested in working with you..."
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-12 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md"
                                    >
                                        <MessageSquare className="w-5 h-5 mr-2" />
                                        Send Message
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

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    return <AgentContent id={id} />;
}

'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, DollarSign, Calendar, ChevronLeft, Edit, Eye, MoreVertical, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function DashboardRequestsPage() {
    const requests = [
        {
            id: 1,
            type: 'Buy',
            title: 'Looking for 2BHK Apartment in Bangalore',
            description: 'Seeking a well-maintained 2BHK apartment in prime locations of Bangalore with good connectivity and amenities.',
            location: 'Koramangala, Bangalore, Karnataka',
            budgetMin: '₹80,00,000',
            budgetMax: '₹1,00,00,000',
            timeline: 'Within 3 months',
            status: 'Open',
            propertyType: 'Apartment',
            postedDate: '3 days ago',
            matches: 12,
        },
        {
            id: 2,
            type: 'Rent',
            title: 'Need Furnished Apartment in Mumbai',
            description: 'Looking for a fully furnished 1-2BHK apartment in Mumbai with modern amenities and good transport links.',
            location: 'Bandra West, Mumbai, Maharashtra',
            budgetMin: '₹35,000',
            budgetMax: '₹45,000',
            timeline: 'Immediate',
            status: 'Matched',
            propertyType: 'Apartment',
            postedDate: '1 week ago',
            matches: 8,
        },
        {
            id: 3,
            type: 'Buy',
            title: 'Villa with Garden in Goa',
            description: 'Searching for a spacious villa with garden and sea view in North Goa for vacation home.',
            location: 'Candolim, Goa',
            budgetMin: '₹2,50,00,000',
            budgetMax: '₹4,00,00,000',
            timeline: 'Within 6 months',
            status: 'Open',
            propertyType: 'Villa',
            postedDate: '5 days ago',
            matches: 3,
        },
    ];

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link 
                        href="/dashboard"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground">My Requests</h1>
                        <p className="text-muted-foreground">Manage your property requests</p>
                    </div>
                    <Link href="/dashboard/requests/form">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Post Request
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-[24px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                <FileText className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Requests</p>
                                <p className="text-2xl font-bold text-foreground">{requests.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[24px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10">
                                <Eye className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Matches</p>
                                <p className="text-2xl font-bold text-foreground">{requests.reduce((sum, r) => sum + r.matches, 0)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-[24px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-500/10">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Active</p>
                                <p className="text-2xl font-bold text-foreground">{requests.filter(r => r.status === 'Open').length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Requests List */}
                <div className="space-y-6">
                    {requests.map((request) => (
                        <div key={request.id} className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 hover:shadow-[0_40px_80px_-45px_rgba(15,23,42,0.6)] transition-all duration-300">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10">
                                        <FileText className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant={request.type === 'Buy' ? 'default' : 'secondary'} className="rounded-full px-4 py-1">
                                            {request.type}
                                        </Badge>
                                        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-bold border ${
                                            request.status === 'Open' 
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                                : 'bg-blue-50 text-blue-600 border-blue-100'
                                        }`}>
                                            <span className={`inline-block h-2 w-2 rounded-full ${
                                                request.status === 'Open' ? 'bg-emerald-500' : 'bg-blue-500'
                                            }`}></span>
                                            {request.status}
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="w-8 h-8">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={`/requests/${request.id}`} className="flex items-center gap-2">
                                                <Eye className="w-4 h-4" />
                                                View Details
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/requests/form/edit/${request.id}`} className="flex items-center gap-2">
                                                <Edit className="w-4 h-4" />
                                                Edit Request
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{request.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{request.description}</p>
                                </div>

                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm">{request.location}</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border">
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Budget Range</p>
                                        <p className="font-bold text-foreground">{request.budgetMin} - {request.budgetMax}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Timeline</p>
                                        <p className="font-bold text-foreground">{request.timeline}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Property Type</p>
                                        <p className="font-bold text-foreground">{request.propertyType}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Matches Found</p>
                                        <p className="font-bold text-primary">{request.matches} properties</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>Posted {request.postedDate}</span>
                                    <div className="flex items-center gap-4">
                                        <span>{request.matches} matches found</span>
                                        <Link href={`/requests/${request.id}`}>
                                            <Button variant="outline" size="sm" className="rounded-lg">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {requests.length === 0 && (
                    <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 mb-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">No requests yet</h3>
                        <p className="text-muted-foreground mb-6">Start by posting your first property request</p>
                        <Link href="/dashboard/requests/form">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                Post Your First Request
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

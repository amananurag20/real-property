'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link2, Building2, FileText, User, ArrowRight, CheckCircle, Clock, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardMatchesPage() {
    const router = useRouter();
    const matches = [
        {
            id: 1,
            property: 'Sunset Villa, Mumbai',
            request: 'Looking for 3BHK villa',
            agent: 'Rajesh Kumar',
            status: 'Connected',
            date: '2024-01-15',
        },
        {
            id: 2,
            property: 'Modern Apartment, Bangalore',
            request: 'Budget 2BHK rental',
            agent: 'Priya Sharma',
            status: 'Pending',
            date: '2024-01-14',
        },
    ];

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-5xl mx-auto px-6 md:px-8">
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
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            My Matches
                        </h1>
                        <p className="text-muted-foreground mt-1">Property-request connections made by agents</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {matches.map((match) => (
                        <div key={match.id} className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                            {/* Card Background Glow */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50/20 blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-colors">
                                        <Link2 className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800">Match #{match.id}</h3>
                                        <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {match.date}
                                        </p>
                                    </div>
                                </div>
                                <Badge
                                    className={`px-3 py-1.5 flex items-center gap-1.5 w-fit rounded-full font-medium ${match.status === 'Connected' ? 'bg-emerald-100 py-1.5 text-emerald-700 hover:bg-emerald-200 border-none shadow-sm shadow-emerald-500/10' : 'bg-amber-100 py-1.5 text-amber-700 hover:bg-amber-200 border-none shadow-sm shadow-amber-500/10'}`}
                                >
                                    {match.status === 'Connected' ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                    {match.status}
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">
                                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 group-hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</span>
                                    </div>
                                    <p className="text-slate-900 font-medium whitespace-normal break-words">{match.property}</p>
                                </div>

                                <div className="hidden md:flex justify-center items-center py-2 h-full">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-[0_4px_12px_rgb(0,0,0,0.03)] z-10 group-hover:-rotate-45 transition-transform duration-300">
                                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 group-hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Request</span>
                                    </div>
                                    <p className="text-slate-900 font-medium whitespace-normal break-words">{match.request}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 relative z-10">
                                <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full border border-slate-100 w-fit">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-medium border border-slate-200 shadow-inner">
                                        {match.agent.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">Assigned Agent</p>
                                        <p className="text-sm font-semibold text-slate-800 leading-none">{match.agent}</p>
                                    </div>
                                </div>

                                {match.status === 'Pending' && (
                                    <div className="flex gap-3">
                                        <Button variant="outline" className="flex-1 sm:flex-none border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl px-6 h-11 font-semibold">
                                            Decline
                                        </Button>
                                        <Button className="flex-1 sm:flex-none bg-slate-900 hover:bg-slate-800 text-white shadow-[0_8px_16px_-4px_rgba(15,23,42,0.3)] hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.4)] transition-all rounded-xl px-6 h-11 font-semibold">
                                            Confirm Interest
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

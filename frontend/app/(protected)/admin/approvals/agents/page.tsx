'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShieldCheck, ChevronLeft } from 'lucide-react';

export default function AdminAgentApprovalsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VERIFY_AGENT)) {
            router.push('/403');
        }
    }, [userRole, router]);

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Agent Approvals</h1>
                        <p className="text-muted-foreground mt-1">Review and verify new agent profiles</p>
                    </div>
                </div>

                <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                            <ShieldCheck className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No pending verifications</h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            All agent profiles have been reviewed. New verifications will appear here.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

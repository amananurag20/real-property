'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentServiceApi } from '@/services/payment.service';
import { extractData, extractError } from '@/utils/apiResponse';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    CreditCard,
    FileText,
    CheckCircle,
    RefreshCw,
    Loader2,
    AlertCircle,
    Clock,
    XCircle,
    RotateCcw,
    ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

const STATUS_CONFIG: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ReactNode }> = {
    INITIATED: { label: 'Initiated', variant: 'outline', icon: <Clock className="w-3 h-3" /> },
    PENDING: { label: 'Pending', variant: 'secondary', icon: <Clock className="w-3 h-3" /> },
    SUCCESS: { label: 'Success', variant: 'default', icon: <CheckCircle className="w-3 h-3" /> },
    FAILED: { label: 'Failed', variant: 'destructive', icon: <XCircle className="w-3 h-3" /> },
    REFUNDED: { label: 'Refunded', variant: 'outline', icon: <RotateCcw className="w-3 h-3" /> },
};

const PAYMENT_TYPE_LABELS: Record<string, string> = {
    FEATURED_LISTING: 'Featured Listing',
    AGENT_SUBSCRIPTION: 'Agent Subscription',
    SERVICE_FEE: 'Service Fee',
    OTHER: 'Other',
};

export default function AdminPaymentsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();
    const userRole = user?.role || Role.USER;
    const [page, setPage] = useState(1);
    const [syncingId, setSyncingId] = useState<string | null>(null);

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_PAYMENT_LOGS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['admin-payments', page],
        queryFn: async () => {
            const res = await paymentServiceApi.listAll({ page, limit: 20 });
            return res.data;
        },
    });

    const payments = data?.data?.data || [];
    const meta = data?.data?.meta;

    // Calculate summary stats from current data
    const totalRevenue = payments
        .filter((p: any) => p.status === 'SUCCESS')
        .reduce((sum: number, p: any) => sum + parseFloat(p.amount), 0);
    const successCount = payments.filter((p: any) => p.status === 'SUCCESS').length;
    const failedCount = payments.filter((p: any) => p.status === 'FAILED').length;

    const syncMutation = useMutation({
        mutationFn: (paymentId: string) => paymentServiceApi.syncStatus(paymentId),
        onMutate: (paymentId) => {
            setSyncingId(paymentId);
        },
        onSuccess: () => {
            toast.success('Payment status synced successfully');
            queryClient.invalidateQueries({ queryKey: ['admin-payments'] });
        },
        onError: (err) => {
            toast.error(extractError(err, 'Failed to sync payment status'));
        },
        onSettled: () => {
            setSyncingId(null);
        },
    });

    const canSync = (status: string) => {
        return status === 'INITIATED' || status === 'PENDING';
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatAmount = (amount: string | number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
    };

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50 w-10 h-10"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                            Payment Orders
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            View and monitor all platform payment transactions.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                                <CreditCard className="w-7 h-7 text-emerald-600" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-800 tracking-tight mb-1">
                                {isLoading ? '...' : formatAmount(totalRevenue)}
                            </p>
                            <p className="text-sm font-medium text-slate-500">Revenue (this page)</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5">
                                <FileText className="w-7 h-7 text-blue-600" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-800 tracking-tight mb-1">
                                {isLoading ? '...' : (meta?.total ?? 0)}
                            </p>
                            <p className="text-sm font-medium text-slate-500">Total Records</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                                <CheckCircle className="w-7 h-7 text-purple-600" />
                            </div>
                        </div>
                        <div>
                            <p className="text-3xl font-black text-slate-800 tracking-tight mb-1">
                                {isLoading ? '...' : `${successCount} / ${failedCount}`}
                            </p>
                            <p className="text-sm font-medium text-slate-500">Success / Failed</p>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-700">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold tracking-tight text-slate-900">Payment Transactions</h2>
                                <p className="text-sm text-slate-500">View and manage orders</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2 rounded-xl text-sm font-semibold"
                            onClick={() => queryClient.invalidateQueries({ queryKey: ['admin-payments'] })}
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh Data
                        </Button>
                    </div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary/50 mb-4" />
                            <span className="text-slate-500 font-medium">Loading payments...</span>
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50/50 rounded-2xl border border-red-100">
                            <AlertCircle className="w-8 h-8 mb-4 text-red-400" />
                            <span className="font-medium">{extractError(error, 'Failed to load payments')}</span>
                        </div>
                    ) : payments.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                            <CreditCard className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                            <p className="font-medium text-lg text-slate-700 mb-1">No payment records found</p>
                            <p className="text-sm">There are no transactions to display yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {payments.map((payment: any) => {
                                const statusConfig = STATUS_CONFIG[payment.status] || STATUS_CONFIG.INITIATED;
                                return (
                                    <div
                                        key={payment.id}
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-900 text-lg mb-1">
                                                {payment.user?.name || 'Unknown User'}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-600">
                                                <span className="font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                                    {PAYMENT_TYPE_LABELS[payment.paymentType] || payment.paymentType}
                                                </span>
                                                {payment.description && (
                                                    <span className="text-slate-500 hidden md:inline">• {payment.description}</span>
                                                )}
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 text-xs text-slate-400 font-medium">
                                                <span className="flex items-center gap-1.5 min-w-max">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {formatDate(payment.createdAt)}
                                                </span>
                                                {payment.razorpayOrderId && (
                                                    <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-50 border border-slate-100">
                                                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Ref:</span>
                                                        <span className="text-slate-600 tracking-wide">{payment.razorpayOrderId}</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0 sm:pl-6 sm:border-l border-slate-100">
                                            <div className="text-left sm:text-right">
                                                <p className="font-black text-slate-900 text-xl tracking-tight">
                                                    {formatAmount(payment.amount)}
                                                </p>
                                                <Badge
                                                    variant={statusConfig.variant}
                                                    className={`mt-2 gap-1.5 px-2.5 py-1 ${payment.status === 'SUCCESS' ? 'bg-emerald-500 border-none text-white shadow-sm' :
                                                        payment.status === 'FAILED' ? 'bg-red-500 border-none text-white shadow-sm' : ''
                                                        }`}
                                                >
                                                    {statusConfig.icon}
                                                    {statusConfig.label}
                                                </Badge>
                                            </div>

                                            {canSync(payment.status) && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => syncMutation.mutate(payment.id)}
                                                    disabled={syncingId === payment.id}
                                                    title="Sync payment status from Razorpay"
                                                    className="rounded-xl h-10 w-10 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                                >
                                                    {syncingId === payment.id ? (
                                                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                                                    ) : (
                                                        <RefreshCw className="w-5 h-5" />
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {meta && meta.totalPages > 1 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                            <p className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                                Page {meta.page} of {meta.totalPages} ({meta.total} total)
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!meta.hasPreviousPage}
                                    onClick={() => setPage((p) => p - 1)}
                                    className="rounded-lg shadow-sm"
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={!meta.hasNextPage}
                                    onClick={() => setPage((p) => p + 1)}
                                    className="rounded-lg shadow-sm"
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

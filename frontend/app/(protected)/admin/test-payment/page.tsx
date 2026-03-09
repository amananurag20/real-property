'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/constants/roles';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { paymentServiceApi } from '@/services/payment.service';
import { extractData, extractError } from '@/utils/apiResponse';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CreditCard, IndianRupee, CheckCircle, XCircle, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PAYMENT_TYPES = [
    { value: 'FEATURED_LISTING', label: 'Featured Listing' },
    { value: 'AGENT_SUBSCRIPTION', label: 'Agent Subscription' },
    { value: 'SERVICE_FEE', label: 'Service Fee' },
    { value: 'OTHER', label: 'Other' },
];

export default function TestPaymentPage() {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role || Role.USER;

    const [amount, setAmount] = useState('100');
    const [paymentType, setPaymentType] = useState('OTHER');
    const [description, setDescription] = useState('Test payment');
    const [lastResult, setLastResult] = useState<any>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (!hasPermission(userRole, PERMISSIONS.VIEW_PAYMENT_LOGS)) {
            router.push('/403');
        }
    }, [userRole, router]);

    // Fetch Razorpay config (key ID)
    const { data: configData } = useQuery({
        queryKey: ['payment-config'],
        queryFn: async () => {
            const res = await paymentServiceApi.getConfig();
            return extractData<{ keyId: string }>(res);
        },
    });

    // Load Razorpay checkout script
    useEffect(() => {
        if (typeof window !== 'undefined' && !window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            document.body.appendChild(script);
        } else {
            setScriptLoaded(true);
        }
    }, []);

    const createOrderMutation = useMutation({
        mutationFn: () =>
            paymentServiceApi.createOrder({
                amount: parseFloat(amount),
                paymentType,
                description,
            }),
        onSuccess: (res) => {
            const orderData = extractData<{
                paymentId: string;
                razorpayOrderId: string;
                amount: number;
                currency: string;
            }>(res);

            if (!orderData?.razorpayOrderId) {
                toast.error('Failed to create order');
                return;
            }

            openRazorpayCheckout(orderData);
        },
        onError: (error) => {
            toast.error(extractError(error, 'Failed to create payment order'));
        },
    });

    const verifyMutation = useMutation({
        mutationFn: (data: {
            razorpayOrderId: string;
            razorpayPaymentId: string;
            razorpaySignature: string;
        }) => paymentServiceApi.verifyPayment(data),
        onSuccess: (res) => {
            const payment = extractData(res);
            setLastResult({ success: true, payment });
            toast.success('Payment verified successfully!');
        },
        onError: (error) => {
            setLastResult({ success: false, error: extractError(error) });
            toast.error(extractError(error, 'Payment verification failed'));
        },
    });

    const openRazorpayCheckout = (orderData: {
        paymentId: string;
        razorpayOrderId: string;
        amount: number;
        currency: string;
    }) => {
        if (!window.Razorpay) {
            toast.error('Razorpay SDK not loaded. Please refresh and try again.');
            return;
        }

        const options = {
            key: configData?.keyId,
            amount: Math.round(parseFloat(amount) * 100),
            currency: 'INR',
            name: 'EstateIndia',
            description: description || 'Test Payment',
            order_id: orderData.razorpayOrderId,
            handler: (response: {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
            }) => {
                verifyMutation.mutate({
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                });
            },
            prefill: {
                name: user?.name || '',
                email: user?.email || '',
                contact: user?.phone || '',
            },
            theme: {
                color: '#0f172a',
            },
            modal: {
                ondismiss: () => {
                    setLastResult({ success: false, error: 'Payment cancelled by user' });
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (response: any) => {
            setLastResult({
                success: false,
                error: response.error?.description || 'Payment failed',
            });
            toast.error(response.error?.description || 'Payment failed');
        });
        rzp.open();
    };

    const isProcessing = createOrderMutation.isPending || verifyMutation.isPending;

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-3xl mx-auto px-6 md:px-8 space-y-8">
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
                            Test Payment
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            Validate your Razorpay integration using test card details.
                        </p>
                    </div>
                </div>

                {/* Test card info */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-[28px] border border-blue-100/50 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100/50 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-blue-900 text-lg">Razorpay Test Cards</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-blue-800/80">
                        <div className="space-y-3">
                            <p className="flex justify-between items-center"><span className="font-medium">Card Number:</span> <code className="bg-white/60 text-blue-900 px-2 py-1 rounded font-mono text-xs shadow-sm">4111 1111 1111 1111</code></p>
                            <p className="flex justify-between items-center"><span className="font-medium">Expiry:</span> <span className="text-sm">Any future date</span></p>
                        </div>
                        <div className="space-y-3">
                            <p className="flex justify-between items-center"><span className="font-medium">CVV:</span> <span className="text-sm">Any 3 digits</span></p>
                            <p className="flex justify-between items-center"><span className="font-medium">OTP:</span> <span className="text-sm">Any valid value</span></p>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 space-y-6">
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-50 text-slate-700">
                            <IndianRupee className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">Create Order</h2>
                            <p className="text-sm text-slate-500">Configure your test checkout</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                Amount (INR)
                            </label>
                            <div className="relative">
                                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="number"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-11 h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20"
                                    placeholder="Enter amount"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                Payment Type
                            </label>
                            <select
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="w-full h-12 bg-slate-50/50 border border-slate-200 rounded-xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-slate-800"
                            >
                                {PAYMENT_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">
                                Description
                            </label>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Payment description"
                                className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus-visible:ring-primary/20"
                            />
                        </div>

                        <Button
                            onClick={() => createOrderMutation.mutate()}
                            disabled={isProcessing || !scriptLoaded || !amount || parseFloat(amount) < 1}
                            className="w-full h-14 bg-slate-900 text-white hover:bg-slate-800 rounded-xl mt-4 shadow-lg shadow-slate-900/10 transition-all font-semibold text-base"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-5 h-5 mr-3" />
                                    Pay {amount ? `₹${parseFloat(amount).toLocaleString('en-IN')}` : ''}
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Result */}
                {lastResult && (
                    <div className={`rounded-[28px] border p-6 shadow-sm transition-all duration-500 animate-in slide-in-from-bottom-4 flex flex-col items-center justify-center text-center space-y-4 ${lastResult.success ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'
                        }`}>
                        {lastResult.success ? (
                            <>
                                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-emerald-900 mb-1">Payment Successful!</h3>
                                    <p className="text-sm text-emerald-700/80">Your test transaction has been verified.</p>
                                </div>
                                <div className="w-full bg-white rounded-2xl p-4 text-left border border-emerald-100 shadow-sm mt-4 space-y-2">
                                    <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                                        <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Order ID</span>
                                        <span className="text-sm font-medium text-slate-800">{lastResult.payment.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-slate-50 pt-2">
                                        <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Status</span>
                                        <Badge variant="default" className="bg-emerald-500">{lastResult.payment.status}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Razorpay Ref</span>
                                        <span className="text-sm font-medium text-slate-800">{lastResult.payment.razorpayPaymentId}</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                                    <XCircle className="w-8 h-8 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-900 mb-1">Payment Failed</h3>
                                    <p className="text-sm text-red-700/80">{lastResult.error || 'The test checkout process failed or was cancelled.'}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}

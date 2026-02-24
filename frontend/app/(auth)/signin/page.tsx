'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/api-client';

const SignInPage = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, authLoading, router]);

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await api.post('/auth/send-otp', { phone });
            setStep('otp');
        } catch (error: any) {
            console.error('Failed to send OTP:', error);
            alert(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await api.post('/auth/verify-otp', { phone, otp });
            // Extract from nested data wrapper
            const { accessToken, user } = response.data.data;

            login(user, accessToken);
            router.push('/dashboard');
        } catch (error: any) {
            console.error('Failed to verify OTP:', error);
            alert(error.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            EstateIndia
                        </span>
                    </Link>
                    <p className="mt-3 text-gray-600">
                        {step === 'phone' ? 'Sign in with your phone number' : 'Verify your phone number'}
                    </p>
                </div>

                {/* Sign In Card */}
                <div className="bg-white rounded-2xl shadow-2xl shadow-gray-300/50 p-8 border border-gray-100">
                    {step === 'phone' ? (
                        <form onSubmit={handlePhoneSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 font-medium">
                                        +91
                                    </div>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="98765 43210"
                                        className="pl-12"
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">We'll send you an OTP for verification</p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Get OTP'}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleOtpSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="otp">Enter OTP</Label>
                                    <button
                                        type="button"
                                        onClick={() => setStep('phone')}
                                        className="text-xs text-blue-600 hover:underline"
                                    >
                                        Change Number
                                    </button>
                                </div>
                                <Input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="••••••"
                                    className="text-center text-2xl tracking-[1em] font-bold"
                                    required
                                    maxLength={6}
                                />
                                <p className="text-xs text-center text-gray-500">OTP sent to +91 {phone}</p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                            </Button>

                            <div className="text-center">
                                <button type="button" className="text-sm text-gray-600 hover:text-blue-600">
                                    Didn't receive code? <span className="font-semibold">Resend OTP</span>
                                </button>
                            </div>
                        </form>
                    )}



                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                            Sign up for free
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;

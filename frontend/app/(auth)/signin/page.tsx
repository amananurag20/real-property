'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { signinPhoneSchema, otpVerificationSchema } from '@/constants/validations';
import { authServiceApi } from '@/services/auth.service';
import { extractData, extractError } from '@/utils/apiResponse';

import { toast } from 'sonner';

const SignInPage = () => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const router = useRouter();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();

    // Form for Phone Step
    const phoneForm = useForm({
        resolver: yupResolver(signinPhoneSchema),
        defaultValues: { phone: '' }
    });

    // Form for OTP Step
    const otpForm = useForm({
        resolver: yupResolver(otpVerificationSchema),
        defaultValues: { phone: '', otp: '' }
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, authLoading, router]);

    const phoneMutation = useMutation({
        mutationFn: (data: { phone: string }) => authServiceApi.sendOtp(data),
        onSuccess: (_, variables) => {
            otpForm.setValue('phone', variables.phone); // Pass phone to next step
            setStep('otp');
            toast.success('OTP sent successfully!');
        },
        onError: (error) => {
            console.error('Failed to send OTP:', error);
            toast.error(extractError(error, 'Failed to send OTP. Please try again.'));
        }
    });

    const otpMutation = useMutation({
        mutationFn: (data: { phone: string; otp: string }) => authServiceApi.verifyOtp(data),
        onSuccess: (response: any) => {
            const data = extractData<any>(response);
            login(data.user, data.accessToken);
            toast.success('Successfully logged in!');
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Failed to verify OTP:', error);
            toast.error(extractError(error, 'Invalid OTP. Please try again.'));
        }
    });

    const handlePhoneSubmit = phoneForm.handleSubmit((data) => {
        phoneMutation.mutate(data);
    });

    const handleOtpSubmit = otpForm.handleSubmit((data) => {
        otpMutation.mutate(data);
    });

    const isLoadingPhone = phoneMutation.isPending;
    const isLoadingOtp = otpMutation.isPending;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans">
            {/* Left Image Section */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-gray-900 overflow-hidden lg:sticky lg:top-0 lg:h-screen shrink-0 border-r border-gray-800">
                <div className="absolute inset-0 z-0 h-full w-full">
                    <img
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2075&q=80"
                        alt="Modern Home"
                        className="w-full h-full object-cover opacity-50 transition-transform duration-[20s] ease-linear hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col justify-between p-12 w-full h-full">
                    <Link href="/" className="inline-flex items-center space-x-3 text-white hover:opacity-80 transition-opacity w-max">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight">EstateIndia</span>
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-[1.1]">
                            Welcome back to <br /><span className="text-blue-400">EstateIndia</span>.
                        </h1>
                        <p className="text-lg text-gray-300 max-w-lg leading-relaxed font-light">
                            Sign in to access your properties, connect with clients, and manage your real estate portfolio.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col p-4 sm:p-8 xl:p-12 relative min-h-screen lg:min-h-0 lg:h-screen lg:overflow-y-auto">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-6 sm:left-12">
                    <Link href="/" className="inline-flex items-center space-x-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">EstateIndia</span>
                    </Link>
                </div>

                <div className="w-full max-w-[400px] m-auto pt-16 lg:pt-0 pb-6">
                    <div className="mb-6 text-left">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {step === 'phone' ? 'Sign in to your account' : 'Verify your number'}
                        </h2>
                        <p className="mt-2 text-base text-gray-500">
                            {step === 'phone' ? 'Enter your registered phone number.' : 'Enter the verification code we just sent your way.'}
                        </p>
                    </div>

                    {step === 'phone' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <form onSubmit={handlePhoneSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                                    <div className="relative border border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium border-r border-gray-200 pr-3 bg-gray-50">
                                            +91
                                        </div>
                                        <Input
                                            type="tel"
                                            id="phone"
                                            placeholder="98765 43210"
                                            className={`h-12 border-0 pl-[72px] rounded-none focus-visible:ring-0 ${phoneForm.formState.errors.phone ? 'bg-red-50/50' : ''}`}
                                            maxLength={10}
                                            {...phoneForm.register('phone')}
                                        />
                                    </div>
                                    {phoneForm.formState.errors.phone && (
                                        <p className="text-sm text-red-500 mt-1">{phoneForm.formState.errors.phone.message}</p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-2">We will send you an OTP for secure login.</p>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                                    disabled={isLoadingPhone}
                                >
                                    {isLoadingPhone ? 'Sending OTP...' : 'Continue'}
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <form onSubmit={handleOtpSubmit} className="space-y-5">
                                <div className="p-3.5 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Sent to</p>
                                            <p className="font-semibold text-gray-900">+91 {otpForm.getValues('phone')}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep('phone')}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline underline-offset-2 px-2"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="otp" className="sr-only">Enter OTP</Label>
                                    <Input
                                        type="text"
                                        id="otp"
                                        placeholder="••••"
                                        className={`text-center text-4xl tracking-[0.5em] font-bold h-16 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600 ${otpForm.formState.errors.otp ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                        maxLength={4}
                                        {...otpForm.register('otp')}
                                    />
                                    {otpForm.formState.errors.otp && (
                                        <p className="text-sm text-red-500 text-center mt-1">{otpForm.formState.errors.otp.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                                    disabled={isLoadingOtp}
                                >
                                    {isLoadingOtp ? 'Verifying...' : 'Secure Sign In'}
                                </Button>

                                <div className="text-center mt-4">
                                    <button type="button" className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-colors">
                                        Didn't receive the code? <span className="text-blue-600 font-semibold">Resend OTP</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            New here?{' '}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline underline-offset-2">Create an account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;

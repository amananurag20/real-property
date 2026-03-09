'use client';

import { useState, useEffect } from 'react';
import { Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { registerDetailsSchema, otpVerificationSchema } from '@/constants/validations';
import { authServiceApi } from '@/services/auth.service';
import { extractData, extractError } from '@/utils/apiResponse';
import { Role } from '@/constants/roles';

import { toast } from 'sonner';

type UserType = 'owner' | 'broker' | 'tenant' | 'developer' | 'service_provider' | '';

const RegisterPage = () => {
    const [step, setStep] = useState<'details' | 'otp'>('details');
    const router = useRouter();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();

    // Form for Details Step
    const detailsForm = useForm({
        resolver: yupResolver(registerDetailsSchema),
        defaultValues: { phone: '', name: '', email: '', agreeTerms: false }
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


    const registerMutation = useMutation({
        mutationFn: (data: { phone: string; name: string; email: string; role: Role }) =>
            authServiceApi.register(data),
        onSuccess: (_, variables) => {
            otpForm.setValue('phone', variables.phone); // Pass phone to next step
            setStep('otp');
            toast.success('OTP sent successfully!');
        },
        onError: (error) => {
            console.error('Failed to initiate signup:', error);
            toast.error(extractError(error, 'Failed to initiate signup. Please try again.'));
        }
    });

    const verifyOtpMutation = useMutation({
        mutationFn: (data: { phone: string; otp: string }) =>
            authServiceApi.verifyOtp(data),
        onSuccess: (response: any) => {
            const data = extractData<any>(response);
            login(data.user, data.accessToken, data.refreshToken);
            toast.success('Registration completed successfully!');
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Failed to verify OTP:', error);
            toast.error(extractError(error, 'Invalid OTP. Please try again.'));
        }
    });

    const handleDetailsSubmit = detailsForm.handleSubmit((data) => {
        registerMutation.mutate({
            phone: data.phone,
            name: data.name,
            email: data.email,
            role: Role.USER // Default all new users to USER role
        });
    });

    const handleOtpVerify = otpForm.handleSubmit((data) => {
        verifyOtpMutation.mutate(data);
    });

    const isLoadingRegister = registerMutation.isPending;
    const isLoadingVerify = verifyOtpMutation.isPending;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-muted/30 font-sans">
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
                    <Link href="/" className="text-white hover:opacity-80 transition-opacity w-max">
                        <span className="text-2xl font-bold text-white tracking-tight font-serif italic">EstateIndia</span>
                    </Link>

                    <div className="mb-12">
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 leading-[1.1]">
                            Join India's premium <br /><span className="text-blue-400">real estate</span> network.
                        </h1>
                        <p className="text-lg text-gray-300 max-w-lg leading-relaxed font-light">
                            Connect seamlessly with buyers, sellers, and top-tier professionals. Create your account and get started in minutes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col p-4 sm:p-8 xl:p-12 relative min-h-screen lg:min-h-0 lg:h-screen lg:overflow-y-auto">
                {/* Mobile Logo */}
                <div className="lg:hidden absolute top-8 left-6 sm:left-12">
                    <Link href="/">
                        <span className="text-xl font-bold text-slate-900 tracking-tight font-serif italic">EstateIndia</span>
                    </Link>
                </div>

                <div className="w-full max-w-[480px] m-auto pt-16 lg:pt-0 pb-6">
                    <div className="mb-8 text-left">
                        <h2 className="text-3xl font-bold text-foreground tracking-tight">
                            {step === 'details' ? 'Create your account' : 'Verify your number'}
                        </h2>
                        <p className="mt-2 text-base text-muted-foreground">
                            {step === 'details' ? 'Tell us a bit about yourself to get started with EstateIndia.' : 'Enter the verification code we just sent your way.'}
                        </p>
                    </div>


                    {step === 'details' && (
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <form onSubmit={handleDetailsSubmit} className="space-y-6">

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="e.g. John Doe"
                                            className={`h-12 rounded-xl border-border/50 focus-visible:ring-primary ${detailsForm.formState.errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            {...detailsForm.register('name')}
                                        />
                                        {detailsForm.formState.errors.name && (
                                            <p className="text-sm text-red-500">{detailsForm.formState.errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="you@example.com"
                                            className={`h-12 rounded-xl border-border/50 focus-visible:ring-primary ${detailsForm.formState.errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            {...detailsForm.register('email')}
                                        />
                                        {detailsForm.formState.errors.email && (
                                            <p className="text-sm text-red-500">{detailsForm.formState.errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                                        <div className="relative border border-border/50 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground font-medium border-r border-border/50 pr-3 bg-muted/30">
                                                +91
                                            </div>
                                            <Input
                                                type="tel"
                                                id="phone"
                                                placeholder="98765 43210"
                                                className={`h-12 border-0 pl-[72px] rounded-none focus-visible:ring-0 ${detailsForm.formState.errors.phone ? 'bg-red-50/50' : ''}`}
                                                maxLength={10}
                                                {...detailsForm.register('phone')}
                                            />
                                        </div>
                                        {detailsForm.formState.errors.phone && (
                                            <p className="text-sm text-red-500">{detailsForm.formState.errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-start">
                                        <Checkbox
                                            id="agreeTerms"
                                            className="mt-1 mr-3 flex-shrink-0 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900"
                                            checked={detailsForm.watch('agreeTerms')}
                                            onCheckedChange={(checked) => {
                                                detailsForm.setValue('agreeTerms', checked as boolean, { shouldValidate: true });
                                            }}
                                        />
                                        <Label htmlFor="agreeTerms" className="font-normal text-sm text-muted-foreground leading-relaxed max-w-full inline-block">
                                            By creating an account, I agree to the{' '}
                                            <Link href="#" className="text-slate-900 hover:text-slate-700 font-medium hover:underline underline-offset-2">Terms of Service</Link>{' '}
                                            and{' '}
                                            <Link href="#" className="text-slate-900 hover:text-slate-700 font-medium hover:underline underline-offset-2">Privacy Policy</Link>
                                        </Label>
                                    </div>
                                    {detailsForm.formState.errors.agreeTerms && (
                                        <p className="text-sm text-red-500 ml-7">{detailsForm.formState.errors.agreeTerms.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-base shadow-lg transition-all active:scale-[0.98]"
                                    disabled={isLoadingRegister}
                                >
                                    {isLoadingRegister ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    ) : null}
                                    {isLoadingRegister ? 'Sending Code...' : 'Continue'}
                                </Button>
                            </form>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8">
                            <form onSubmit={handleOtpVerify} className="space-y-6">
                                <div className="p-4 bg-muted/30 rounded-2xl border border-border/40 flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-border/40">
                                            <Smartphone className="w-5 h-5 text-slate-900" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Sent to</p>
                                            <p className="font-semibold text-foreground">+91 {otpForm.getValues('phone')}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep('details')}
                                        className="text-sm text-slate-900 hover:text-slate-700 font-medium hover:underline underline-offset-2 px-2"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="otp" className="sr-only">Enter OTP Code</Label>
                                    <Input
                                        type="text"
                                        id="otp"
                                        placeholder="••••"
                                        className={`text-center text-4xl tracking-[0.5em] font-bold h-16 rounded-xl border-border/50 focus-visible:ring-primary ${otpForm.formState.errors.otp ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                        maxLength={4}
                                        {...otpForm.register('otp')}
                                    />
                                    {otpForm.formState.errors.otp && (
                                        <p className="text-sm text-red-500 text-center">{otpForm.formState.errors.otp.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-base shadow-lg transition-all active:scale-[0.98]"
                                    disabled={isLoadingVerify}
                                >
                                    {isLoadingVerify ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                    ) : null}
                                    {isLoadingVerify ? 'Verifying...' : 'Complete Registration'}
                                </Button>

                                <div className="text-center mt-4">
                                    <button type="button" className="text-sm text-muted-foreground hover:text-slate-900 font-medium transition-colors">
                                        Didn't receive the code? <span className="text-slate-900 font-semibold">Resend OTP</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-slate-900 hover:text-slate-700 font-semibold hover:underline underline-offset-2">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

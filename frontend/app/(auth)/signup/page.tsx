'use client';

import { useState, useEffect } from 'react';
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
import { signupDetailsSchema, otpVerificationSchema } from '@/constants/validations';
import { authServiceApi } from '@/services/auth.service';
import { extractData, extractError } from '@/utils/apiResponse';
import { Role } from '@/constants/roles';

import { toast } from 'sonner';

type UserType = 'owner' | 'broker' | 'tenant' | 'developer' | 'service_provider' | '';

const SignUpPage = () => {
    const [step, setStep] = useState<'type' | 'details' | 'otp'>('type');
    const router = useRouter();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();

    // Form for Details Step
    const detailsForm = useForm({
        resolver: yupResolver(signupDetailsSchema),
        defaultValues: { phone: '', name: '', email: '', userType: '', agreeTerms: false }
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

    const userTypes = [
        {
            id: 'owner' as UserType,
            title: 'Property Owner',
            description: 'I want to list my property',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            id: 'broker' as UserType,
            title: 'Broker/Agent',
            description: 'I help people find properties',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: 'tenant' as UserType,
            title: 'Tenant/Buyer',
            description: 'I\'m looking for a property',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            id: 'developer' as UserType,
            title: 'Developer/Builder',
            description: 'I build and sell properties',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            id: 'service_provider' as UserType,
            title: 'Service Provider',
            description: 'Provide Home/Legal Services',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
        },
    ];

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
            login(data.user, data.accessToken);
            toast.success('Registration completed successfully!');
            router.push('/dashboard');
        },
        onError: (error) => {
            console.error('Failed to verify OTP:', error);
            toast.error(extractError(error, 'Invalid OTP. Please try again.'));
        }
    });

    const handleDetailsSubmit = detailsForm.handleSubmit((data) => {
        const roleMap: Record<UserType, Role> = {
            'owner': Role.OWNER,
            'tenant': Role.TENANT,
            'broker': Role.AGENT,
            'developer': Role.SERVICE_PROVIDER,
            'service_provider': Role.SERVICE_PROVIDER,
            '': Role.USER
        };

        registerMutation.mutate({
            phone: data.phone,
            name: data.name,
            email: data.email,
            role: roleMap[data.userType as UserType]
        });
    });

    const handleOtpVerify = otpForm.handleSubmit((data) => {
        verifyOtpMutation.mutate(data);
    });

    const isLoadingRegister = registerMutation.isPending;
    const isLoadingVerify = verifyOtpMutation.isPending;

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
                    <Link href="/" className="inline-flex items-center space-x-3">
                        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">EstateIndia</span>
                    </Link>
                </div>

                <div className="w-full max-w-[480px] m-auto pt-16 lg:pt-0 pb-6">
                    <div className="mb-6 text-left">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {step === 'type' ? 'Create an account' : step === 'details' ? 'Account details' : 'Verify your number'}
                        </h2>
                        <p className="mt-2 text-base text-gray-500">
                            {step === 'type' ? 'Select your role to get started with EstateIndia.' : step === 'details' ? 'Tell us a bit about yourself so we can personalize your experience.' : 'Enter the verification code we just sent your way.'}
                        </p>
                    </div>

                    {step === 'type' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {userTypes.map((type) => (
                                    <Button
                                        key={type.id}
                                        variant="outline"
                                        type="button"
                                        onClick={() => {
                                            detailsForm.setValue('userType', type.id, { shouldValidate: true });
                                            setStep('details');
                                        }}
                                        className="h-auto p-4 flex flex-col items-start text-left space-y-3 hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-300 group rounded-2xl border-gray-200"
                                    >
                                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md transition-all duration-300">
                                            {type.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-sm">
                                                {type.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed font-normal whitespace-normal">{type.description}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'details' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <form onSubmit={handleDetailsSubmit} className="space-y-5">
                                <input type="hidden" {...detailsForm.register('userType')} />

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white shadow-sm border border-gray-100 rounded-xl text-blue-600">
                                            {userTypes.find(t => t.id === detailsForm.watch('userType'))?.icon}
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Signing up as</p>
                                            <p className="font-semibold text-gray-900 text-sm">{userTypes.find(t => t.id === detailsForm.watch('userType'))?.title}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        type="button"
                                        size="sm"
                                        onClick={() => setStep('type')}
                                        className="text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 rounded-xl h-8"
                                    >
                                        Change
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="e.g. John Doe"
                                            className={`h-12 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600 ${detailsForm.formState.errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                            {...detailsForm.register('name')}
                                        />
                                        {detailsForm.formState.errors.name && (
                                            <p className="text-sm text-red-500">{detailsForm.formState.errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="you@example.com"
                                            className={`h-12 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600 ${detailsForm.formState.errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                            {...detailsForm.register('email')}
                                        />
                                        {detailsForm.formState.errors.email && (
                                            <p className="text-sm text-red-500">{detailsForm.formState.errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 font-medium">
                                                +91
                                            </div>
                                            <Input
                                                type="tel"
                                                id="phone"
                                                placeholder="98765 43210"
                                                className={`h-12 pl-14 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600 ${detailsForm.formState.errors.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                                maxLength={10}
                                                {...detailsForm.register('phone')}
                                            />
                                        </div>
                                        {detailsForm.formState.errors.phone && (
                                            <p className="text-sm text-red-500">{detailsForm.formState.errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4 pt-2">
                                    <div className="flex items-start">
                                        <Checkbox
                                            id="agreeTerms"
                                            className="mt-1 mr-3 flex-shrink-0 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                            checked={detailsForm.watch('agreeTerms')}
                                            onCheckedChange={(checked) => {
                                                detailsForm.setValue('agreeTerms', checked as boolean, { shouldValidate: true });
                                            }}
                                        />
                                        <Label htmlFor="agreeTerms" className="font-normal text-sm text-gray-600 leading-relaxed max-w-full inline-block">
                                            By creating an account, I agree to the{' '}
                                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline underline-offset-2">Terms of Service</Link>{' '}
                                            and{' '}
                                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium hover:underline underline-offset-2">Privacy Policy</Link>
                                        </Label>
                                    </div>
                                    {detailsForm.formState.errors.agreeTerms && (
                                        <p className="text-sm text-red-500 ml-7">{detailsForm.formState.errors.agreeTerms.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                                    disabled={isLoadingRegister}
                                >
                                    {isLoadingRegister ? 'Sending Code...' : 'Continue'}
                                </Button>
                            </form>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <form onSubmit={handleOtpVerify} className="space-y-5">
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
                                        onClick={() => setStep('details')}
                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline underline-offset-2 px-2"
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
                                        className={`text-center text-4xl tracking-[0.5em] font-bold h-16 rounded-xl border-gray-200 focus:ring-blue-600 focus:border-blue-600 ${otpForm.formState.errors.otp ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                                        maxLength={4}
                                        {...otpForm.register('otp')}
                                    />
                                    {otpForm.formState.errors.otp && (
                                        <p className="text-sm text-red-500 text-center">{otpForm.formState.errors.otp.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                                    disabled={isLoadingVerify}
                                >
                                    {isLoadingVerify ? 'Verifying...' : 'Complete Registration'}
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
                            Already have an account?{' '}
                            <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline underline-offset-2">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

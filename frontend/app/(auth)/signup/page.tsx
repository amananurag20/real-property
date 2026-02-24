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
import { Role } from '@/constants/roles';

type UserType = 'owner' | 'broker' | 'tenant' | 'developer' | '';

const SignUpPage = () => {
    const [step, setStep] = useState<'type' | 'details' | 'otp'>('type');
    const [userType, setUserType] = useState<UserType>('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const router = useRouter();
    const { login, isAuthenticated, isLoading: authLoading } = useAuth();

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
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            id: 'broker' as UserType,
            title: 'Broker/Agent',
            description: 'I help people find properties',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: 'tenant' as UserType,
            title: 'Tenant/Buyer',
            description: 'I&apos;m looking for a property',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            id: 'developer' as UserType,
            title: 'Developer/Builder',
            description: 'I build and sell properties',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
    ];

    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Map frontend UserType to backend Role
        const roleMap: Record<UserType, Role> = {
            'owner': Role.USER,
            'tenant': Role.USER,
            'broker': Role.AGENT,
            'developer': Role.SERVICE_PROVIDER,
            '': Role.USER
        };

        try {
            await api.post('/auth/register', {
                phone,
                name: fullName,
                email,
                role: roleMap[userType]
            });
            setStep('otp');
        } catch (error: any) {
            console.error('Failed to initiate signup:', error);
            alert(error.response?.data?.message || 'Failed to initiate signup. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerify = async (e: React.FormEvent) => {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-2xl">
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
                        {step === 'type' ? 'Choose your account type' : step === 'details' ? 'Complete your registration' : 'Verify your phone number'}
                    </p>
                </div>

                {/* Sign Up Card */}
                <div className="bg-white rounded-2xl shadow-2xl shadow-gray-300/50 p-8 border border-gray-100">
                    {step === 'type' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">I am a...</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {userTypes.map((type) => (
                                    <Button
                                        key={type.id}
                                        variant="outline"
                                        onClick={() => {
                                            setUserType(type.id);
                                            setStep('details');
                                        }}
                                        className="h-auto p-6 flex flex-col items-center text-center space-y-3 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group relative"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-1 bg-transparent group-hover:bg-blue-500 rounded-t-lg transition-colors" />
                                        <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {type.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {type.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 'details' && (
                        <form onSubmit={handleDetailsSubmit} className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                                        {userTypes.find(t => t.id === userType)?.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Signing up as</p>
                                        <p className="font-semibold text-gray-900">{userTypes.find(t => t.id === userType)?.title}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setStep('type')}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-100/50"
                                >
                                    Change
                                </Button>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

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
                            </div>

                            <div className="flex items-start space-x-2 mt-2">
                                <Checkbox
                                    id="terms"
                                    checked={agreeTerms}
                                    onCheckedChange={(c) => setAgreeTerms(c as boolean)}
                                    required
                                />
                                <Label htmlFor="terms" className="font-normal text-muted-foreground leading-snug">
                                    I agree to the{' '}
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</Link> and{' '}
                                    <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</Link>
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending OTP...' : 'Get OTP'}
                            </Button>
                        </form>
                    )}

                    {step === 'otp' && (
                        <form onSubmit={handleOtpVerify} className="space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-xl font-bold text-gray-900">Enter OTP</h2>
                                <p className="text-sm text-gray-600">
                                    Verification code sent to <span className="font-semibold">+91 {phone}</span>
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStep('details')}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Change details
                                </button>
                            </div>

                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="••••••"
                                    className="text-center text-3xl tracking-[1em] font-bold h-16"
                                    required
                                    maxLength={6}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 shadow-lg"
                                size="lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Verifying...' : 'Complete Registration'}
                            </Button>

                            <div className="text-center">
                                <button type="button" className="text-sm text-gray-600 hover:text-blue-600 font-medium">
                                    Didn't receive code? <span className="font-bold">Resend OTP</span>
                                </button>
                            </div>
                        </form>
                    )}



                    <p className="text-center text-sm text-gray-600 mt-6">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in</Link>
                    </p>
                </div>

                <div className="text-center mt-6">
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium">← Back to Home</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;

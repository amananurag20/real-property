'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading, logout, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/signin?callbackUrl=/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Basic Sidebar placeholder */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-blue-600">User Dashboard</h2>
                </div>
                <nav className="px-4 space-y-1">
                    <Link href="/dashboard" className="block px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                        Overview
                    </Link>
                    <Link href="/properties" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                        My Listings
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                        Saved Properties
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                        Settings
                    </Link>
                </nav>
            </aside>

            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-lg font-semibold text-gray-800">Welcome Back{user?.name ? `, ${user.name}` : ''}!</h1>
                    <button
                        onClick={logout}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                        Log Out
                    </button>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}

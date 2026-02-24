'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                            EstateIndia
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/properties" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                            Buy
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        {['Rent', 'Sell', 'PG/Co-living'].map((type) => (
                            <button
                                key={type}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                            >
                                {type}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                            </button>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-2 sm:space-x-4">
                                <Link href="/dashboard" className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-full transition-colors group">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border border-blue-200 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                                        {user?.name || 'User'}
                                    </span>
                                </Link>
                                <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500 hover:text-red-600 hover:bg-red-50">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button variant="ghost" className="hidden sm:inline-flex text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                                    <Link href="/signin">
                                        Sign In
                                    </Link>
                                </Button>
                                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-0.5" asChild>
                                    <Link href="/signup">
                                        Post Property
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

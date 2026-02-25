'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { Role, ROLE_LABELS } from '@/constants/roles';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Building2,
    Home,
    MapPin,
    Users,
    Briefcase,
    Menu,
    User,
    LogOut,
    LayoutDashboard,
    Plus,
    Shield,
    Bell,
    Search,
    X,
} from 'lucide-react';

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    permission?: string;
    activePattern?: string;
}

export function Header() {
    const { user, isAuthenticated, logout } = useAuth();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const userRole = user?.role || Role.VISITOR;

    const mainNavItems: NavItem[] = [
        {
            label: 'Home',
            href: '/',
            icon: <Home className="w-4 h-4" />,
            activePattern: '^/$',
        },
        {
            label: 'Properties',
            href: '/properties',
            icon: <Building2 className="w-4 h-4" />,
            permission: PERMISSIONS.BROWSE_PROPERTIES,
            activePattern: '^/properties',
        },
        {
            label: 'Requests',
            href: '/requests',
            icon: <Search className="w-4 h-4" />,
            permission: PERMISSIONS.BROWSE_REQUESTS,
            activePattern: '^/requests',
        },
        {
            label: 'Agents',
            href: '/agents',
            icon: <Users className="w-4 h-4" />,
            permission: PERMISSIONS.BROWSE_AGENTS,
            activePattern: '^/agents',
        },
        {
            label: 'Services',
            href: '/services',
            icon: <Briefcase className="w-4 h-4" />,
            permission: PERMISSIONS.BROWSE_SERVICES,
            activePattern: '^/services',
        },
        {
            label: 'Map',
            href: '/map',
            icon: <MapPin className="w-4 h-4" />,
            permission: PERMISSIONS.VIEW_MAP,
            activePattern: '^/map',
        },
    ];

    const filteredNavItems = mainNavItems.filter(item => {
        if (!item.permission) return true;
        return hasPermission(userRole, item.permission);
    });

    const isActive = (pattern?: string) => {
        if (!pattern) return false;
        return new RegExp(pattern).test(pathname);
    };

    const getDashboardLink = () => {
        if (userRole === Role.ADMIN) return '/admin';
        if (userRole === Role.SERVICE_PROVIDER) return '/provider/dashboard';
        return '/dashboard';
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                            EstateIndia
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {filteredNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(item.activePattern)
                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-2">
                        {/* Quick Actions for Authenticated Users */}
                        {isAuthenticated && (
                            <>
                                {hasPermission(userRole, PERMISSIONS.CREATE_PROPERTY) && (
                                    <Link href="/dashboard/properties/new" className="hidden md:flex">
                                        <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Post Property
                                        </Button>
                                    </Link>
                                )}
                                {hasPermission(userRole, PERMISSIONS.CREATE_REQUEST) && (
                                    <Link href="/dashboard/requests/new" className="hidden md:flex">
                                        <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
                                            <Plus className="w-4 h-4 mr-1" />
                                            Post Request
                                        </Button>
                                    </Link>
                                )}
                            </>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between py-4 border-b">
                                        <span className="font-semibold text-lg">Menu</span>
                                    </div>
                                    <nav className="flex-1 py-4 space-y-1">
                                        {filteredNavItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                                                    isActive(item.activePattern)
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                {item.icon}
                                                <span>{item.label}</span>
                                            </Link>
                                        ))}
                                    </nav>
                                    <div className="border-t py-4 space-y-2">
                                        {isAuthenticated ? (
                                            <>
                                                <Link
                                                    href={getDashboardLink()}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Sign Out</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/signin"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                                                >
                                                    <User className="w-4 h-4" />
                                                    <span>Sign In</span>
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center justify-center px-3 py-3 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                                                >
                                                    <span>Sign Up</span>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* User Menu */}
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">{user?.name}</p>
                                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 w-fit mt-1">
                                                {ROLE_LABELS[userRole as Role]}
                                            </span>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href={getDashboardLink()} className="cursor-pointer flex items-center">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile" className="cursor-pointer flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    {userRole === Role.ADMIN && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin" className="cursor-pointer flex items-center">
                                                <Shield className="mr-2 h-4 w-4" />
                                                Admin Panel
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link href="/signin">
                                    <Button variant="ghost" size="sm">Sign In</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

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
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
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
                    <Link href="/" className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block tracking-tight">
                            EstateIndia
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center">
                        <div className="bg-muted/50 rounded-full p-1.5 flex items-center">
                            {filteredNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive(item.activePattern)
                                            ? 'bg-white text-slate-900 shadow-md'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                                    }`}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
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
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
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
                                                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.activePattern)
                                                        ? 'bg-accent text-foreground'
                                                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
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
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent"
                                                >
                                                    <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setMobileMenuOpen(false);
                                                    }}
                                                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 w-full"
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
                                                    className="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent border border-border"
                                                >
                                                    <span>Sign In</span>
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
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
                                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-medium">
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
                                    <Button variant="outline" size="sm" className="hidden border-border bg-background lg:flex">Sign In</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

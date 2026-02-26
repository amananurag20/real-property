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
    FileText,
    ChevronDown,
    Settings,
    Link2,
    UserCircle,
    BarChart3,
    Bell,
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
    const [exploreOpen, setExploreOpen] = useState(false);

    const userRole = user?.role || Role.VISITOR;

    const exploreItems: NavItem[] = [
        {
            label: 'Properties',
            href: '/properties',
            icon: <Building2 className="w-4 h-4" />,
            permission: PERMISSIONS.BROWSE_PROPERTIES,
            activePattern: '^/properties',
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

    const filteredExploreItems = exploreItems.filter(item => {
        if (!item.permission) return true;
        return hasPermission(userRole, item.permission);
    });

    const isActive = (pattern?: string) => {
        if (!pattern) return false;
        return new RegExp(pattern).test(pathname);
    };

    const isExploreActive = filteredExploreItems?.some(item => isActive(item?.activePattern));

    const getDashboardLink = () => {
        if (userRole === Role.ADMIN) return '/admin';
        if (userRole === Role.SERVICE_PROVIDER) return '/provider/dashboard';
        return '/dashboard';
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-[60px] items-center justify-between gap-8">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-[22px] font-bold text-slate-900 tracking-tight font-serif italic">
                            EstateIndia
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-0">
                        <Link
                            href="/"
                            className={`px-3.5 py-1.5 text-[14px] font-medium transition-colors ${isActive('^/$') ? 'text-slate-900' : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            Home
                        </Link>

                        {/* Explore Dropdown */}
                        <DropdownMenu open={exploreOpen} onOpenChange={setExploreOpen}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={`flex items-center gap-1 px-3.5 py-1.5 text-[14px] font-medium transition-colors outline-none ${isExploreActive ? 'text-slate-900' : 'text-gray-500 hover:text-gray-900'
                                        }`}
                                >
                                    Explore
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${exploreOpen ? 'rotate-180' : ''}`} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="start"
                                sideOffset={12}
                                className="w-52 rounded-xl shadow-xl border border-gray-100 p-2"
                            >
                                {filteredExploreItems.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[14px] text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium"
                                        >
                                            <span className="text-gray-400">{item.icon}</span>
                                            {item.label}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {hasPermission(userRole, PERMISSIONS.BROWSE_REQUESTS) && (
                            <Link
                                href="/requests"
                                className={`px-3.5 py-1.5 text-[14px] font-medium transition-colors ${isActive('^/requests') ? 'text-slate-900' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Requests
                            </Link>
                        )}

                        {isAuthenticated && (
                            <Link
                                href={getDashboardLink()}
                                className={`px-3.5 py-1.5 text-[14px] font-medium transition-colors ${isActive('^/dashboard') || isActive('^/admin') || isActive('^/agent') || isActive('^/provider')
                                    ? 'text-slate-900'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-2">
                        {/* Post CTA for authenticated users */}
                        {isAuthenticated && (
                            <div className="hidden md:flex items-center gap-1">
                                {hasPermission(userRole, PERMISSIONS.CREATE_PROPERTY) && (
                                    <Link href="/dashboard/properties/new">
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-[13px] font-medium h-8 px-3">
                                            <Plus className="w-3.5 h-3.5 mr-1" />
                                            Post Property
                                        </Button>
                                    </Link>
                                )}
                                {hasPermission(userRole, PERMISSIONS.CREATE_REQUEST) && (
                                    <Link href="/dashboard/requests/new">
                                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-[13px] font-medium h-8 px-3">
                                            <Plus className="w-3.5 h-3.5 mr-1" />
                                            Post Request
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}

                        {/* Notification Bell */}
                        {isAuthenticated && (
                            <Link href="/notifications" className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors ml-1 hidden md:block">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </Link>
                        )}

                        {/* User Avatar Dropdown */}
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center gap-2 rounded-full hover:opacity-80 transition-opacity outline-none ml-1">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-[13px] font-semibold">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" sideOffset={10} className="w-60 rounded-xl shadow-xl border border-gray-100 p-2">
                                    <div className="px-3 py-3 border-b border-gray-100 mb-1">
                                        <p className="text-[14px] font-semibold text-gray-900">{user?.name}</p>
                                        <p className="text-[12px] text-gray-400 mt-0.5">{user?.email}</p>
                                        <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                                            {ROLE_LABELS[userRole as Role]}
                                        </span>
                                    </div>
                                    <DropdownMenuItem asChild>
                                        <Link href={getDashboardLink()} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                            <LayoutDashboard className="w-4 h-4 text-gray-400" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    {hasPermission(userRole, PERMISSIONS.CREATE_PROPERTY) && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/properties" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                <Building2 className="w-4 h-4 text-gray-400" />
                                                My Properties
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {hasPermission(userRole, PERMISSIONS.CREATE_REQUEST) && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/requests" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                <FileText className="w-4 h-4 text-gray-400" />
                                                My Requests
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {hasPermission(userRole, PERMISSIONS.VIEW_LINKS) && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/matches" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                <Link2 className="w-4 h-4 text-gray-400" />
                                                Matches
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {hasPermission(userRole, PERMISSIONS.CREATE_AGENT_PROFILE) && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/agent-profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                <UserCircle className="w-4 h-4 text-gray-400" />
                                                Agent Profile
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    {hasPermission(userRole, PERMISSIONS.CREATE_SERVICE_PROFILE) && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/provider/profile/edit" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                <Briefcase className="w-4 h-4 text-gray-400" />
                                                Service Provider
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                            <Settings className="w-4 h-4 text-gray-400" />
                                            Profile Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    {userRole === Role.ADMIN && (
                                        <>
                                            <DropdownMenuSeparator className="my-1" />
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                    <Shield className="w-4 h-4 text-gray-400" />
                                                    Admin Panel
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-gray-700 hover:bg-gray-50 font-medium">
                                                    <BarChart3 className="w-4 h-4 text-gray-400" />
                                                    Analytics
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    <DropdownMenuItem onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-[13px] text-red-500 hover:bg-red-50 font-medium">
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="hidden md:flex items-center gap-2 ml-2">
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-[14px] font-medium h-9 px-4">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button size="sm" className="bg-slate-900 text-white hover:bg-slate-700 text-[14px] font-medium h-9 px-5 rounded-full">
                                        Register
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden w-9 h-9 ml-1">
                                    <Menu className="h-5 w-5 text-gray-600" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] p-0">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <div className="flex flex-col h-full">
                                    {/* Mobile Header */}
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                        <span className="text-[18px] font-bold text-slate-900 italic font-serif">EstateIndia</span>
                                    </div>

                                    <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                                        {/* Home */}
                                        <Link
                                            href="/"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-colors ${isActive('^/$') ? 'bg-slate-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Home className="w-4 h-4" />
                                            Home
                                        </Link>

                                        {/* Explore divider */}
                                        <div className="pt-3 pb-1 px-3">
                                            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Explore</p>
                                        </div>
                                        {filteredExploreItems.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-colors ${isActive(item.activePattern) ? 'bg-slate-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </Link>
                                        ))}

                                        {/* Activity divider */}
                                        {hasPermission(userRole, PERMISSIONS.BROWSE_REQUESTS) && (
                                            <>
                                                <div className="pt-3 pb-1 px-3">
                                                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Activity</p>
                                                </div>
                                                <Link
                                                    href="/requests"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium transition-colors ${isActive('^/requests') ? 'bg-slate-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Requests
                                                </Link>
                                            </>
                                        )}

                                        {/* Account divider */}
                                        {isAuthenticated && (
                                            <>
                                                <div className="pt-3 pb-1 px-3">
                                                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Account</p>
                                                </div>
                                                <Link
                                                    href={getDashboardLink()}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    Dashboard
                                                </Link>
                                                {hasPermission(userRole, PERMISSIONS.CREATE_PROPERTY) && (
                                                    <Link href="/dashboard/properties" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-100">
                                                        <Building2 className="w-4 h-4" />
                                                        My Properties
                                                    </Link>
                                                )}
                                                {hasPermission(userRole, PERMISSIONS.CREATE_REQUEST) && (
                                                    <Link href="/dashboard/requests" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-100">
                                                        <FileText className="w-4 h-4" />
                                                        My Requests
                                                    </Link>
                                                )}
                                                <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-100">
                                                    <Settings className="w-4 h-4" />
                                                    Profile Settings
                                                </Link>
                                                <Link href="/notifications" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-100">
                                                    <Bell className="w-4 h-4" />
                                                    Notifications
                                                </Link>
                                            </>
                                        )}
                                    </div>

                                    {/* Bottom auth actions */}
                                    <div className="border-t border-gray-100 px-3 py-4 space-y-2">
                                        {isAuthenticated ? (
                                            <>
                                                <div className="flex items-center gap-3 px-3 py-2">
                                                    <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white text-[13px] font-semibold flex-shrink-0">
                                                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[13px] font-semibold text-gray-900 truncate">{user?.name}</p>
                                                        <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                                                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-[14px] font-medium text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Sign Out
                                                </button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col gap-2">
                                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                                    <Button variant="outline" className="w-full rounded-xl h-11 text-[14px] font-medium">Login</Button>
                                                </Link>
                                                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                                    <Button className="w-full bg-slate-900 text-white hover:bg-slate-700 rounded-xl h-11 text-[14px] font-medium">Register</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { hasPermission, PERMISSIONS } from '@/constants/permissions';
import { Role, ROLE_LABELS } from '@/constants/roles';
import {
    LayoutDashboard,
    Building2,
    FileText,
    Users,
    Briefcase,
    Link2,
    Settings,
    Shield,
    BarChart3,
    UserCircle,
    Plus,
    MapPin,
    Bell,
    CreditCard,
    Database,
    FileSpreadsheet,
    CheckSquare,
    ChevronRight,
    TestTube,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    permission?: string;
    badge?: string | number;
    children?: SidebarItem[];
}

interface SidebarGroup {
    title: string;
    items: SidebarItem[];
}

export function Sidebar({ className }: { className?: string }) {
    const { user } = useAuth();
    const pathname = usePathname();
    const userRole = user?.role || Role.VISITOR;

    const getSidebarGroups = (): SidebarGroup[] => {
        // Common items for all authenticated users
        const commonItems: SidebarItem[] = [
            {
                label: 'Dashboard',
                href: '/dashboard',
                icon: <LayoutDashboard className="w-5 h-5" />,
            },
            {
                label: 'My Properties',
                href: '/dashboard/properties',
                icon: <Building2 className="w-5 h-5" />,
                permission: PERMISSIONS.CREATE_PROPERTY,
            },
            {
                label: 'My Requests',
                href: '/dashboard/requests',
                icon: <FileText className="w-5 h-5" />,
                permission: PERMISSIONS.CREATE_REQUEST,
            },
            {
                label: 'Matches',
                href: '/dashboard/matches',
                icon: <Link2 className="w-5 h-5" />,
                permission: PERMISSIONS.VIEW_LINKS,
            },
            {
                label: 'Agent Profile',
                href: '/dashboard/agent-profile',
                icon: <UserCircle className="w-5 h-5" />,
                permission: PERMISSIONS.CREATE_AGENT_PROFILE,
            },
            {
                label: 'Profile Settings',
                href: '/dashboard/profile',
                icon: <Settings className="w-5 h-5" />,
                permission: PERMISSIONS.EDIT_OWN_PROFILE,
            },
        ];

        // Agent-specific items
        const agentItems: SidebarItem[] = [
            {
                label: 'Link Management',
                href: '/agent/links',
                icon: <Link2 className="w-5 h-5" />,
                permission: PERMISSIONS.LINK_PROPERTY_REQUEST,
            },
            {
                label: 'Create Link',
                href: '/agent/links/create',
                icon: <Plus className="w-5 h-5" />,
                permission: PERMISSIONS.LINK_PROPERTY_REQUEST,
            },
            {
                label: 'Agent Properties',
                href: '/agent/properties',
                icon: <Building2 className="w-5 h-5" />,
                permission: PERMISSIONS.LINK_PROPERTY_REQUEST,
            },
            {
                label: 'My Requests',
                href: '/agent/requests',
                icon: <FileText className="w-5 h-5" />,
                permission: PERMISSIONS.LINK_PROPERTY_REQUEST,
            },
        ];

        // Service Provider items
        const providerItems: SidebarItem[] = [
            {
                label: 'Provider Dashboard',
                href: '/provider/dashboard',
                icon: <LayoutDashboard className="w-5 h-5" />,
                permission: PERMISSIONS.EDIT_OWN_SERVICE_PROFILE,
            },
            {
                label: 'Edit Profile',
                href: '/provider/profile/edit',
                icon: <Settings className="w-5 h-5" />,
                permission: PERMISSIONS.EDIT_OWN_SERVICE_PROFILE,
            },
        ];

        // Admin items
        const adminItems: SidebarItem[] = [
            {
                label: 'Admin Dashboard',
                href: '/admin',
                icon: <Shield className="w-5 h-5" />,
                permission: PERMISSIONS.VIEW_ADMIN_DASHBOARD,
            },
            {
                label: 'Users',
                href: '/admin/users',
                icon: <Users className="w-5 h-5" />,
                permission: PERMISSIONS.MANAGE_USERS,
            },
            {
                label: 'Properties',
                href: '/admin/properties',
                icon: <Building2 className="w-5 h-5" />,
                permission: PERMISSIONS.MODERATE_PROPERTIES,
            },
            {
                label: 'Requests',
                href: '/admin/requests',
                icon: <FileText className="w-5 h-5" />,
                permission: PERMISSIONS.MODERATE_REQUESTS,
            },
            {
                label: 'Service Providers',
                href: '/admin/services',
                icon: <Briefcase className="w-5 h-5" />,
                permission: PERMISSIONS.MODERATE_SERVICES,
            },
            {
                label: 'Agents',
                href: '/admin/agents',
                icon: <UserCircle className="w-5 h-5" />,
                permission: PERMISSIONS.VERIFY_AGENT,
            },
            {
                label: 'Links Monitor',
                href: '/admin/links',
                icon: <Link2 className="w-5 h-5" />,
                permission: PERMISSIONS.VIEW_ADMIN_DASHBOARD,
            },
            {
                label: 'Analytics',
                href: '/admin/analytics',
                icon: <BarChart3 className="w-5 h-5" />,
                permission: PERMISSIONS.VIEW_ANALYTICS,
            },
            {
                label: 'Payment Logs',
                href: '/admin/payments',
                icon: <CreditCard className="w-5 h-5" />,
                permission: PERMISSIONS.VIEW_PAYMENT_LOGS,
            },
            {
                label: 'Test Payment',
                href: '/admin/test-payment',
                icon: <TestTube className="w-5 h-5" />,
                permission: PERMISSIONS.VIEW_PAYMENT_LOGS,
            },
            {
                label: 'Data Export',
                href: '/admin/export',
                icon: <FileSpreadsheet className="w-5 h-5" />,
                permission: PERMISSIONS.EXPORT_DATA,
            },
        ];

        // Filter items based on permissions
        const filterItems = (items: SidebarItem[]): SidebarItem[] => {
            return items.filter(item => {
                if (!item.permission) return true;
                return hasPermission(userRole, item.permission);
            });
        };

        const groups: SidebarGroup[] = [];

        // Main Dashboard Group
        const mainItems = filterItems(commonItems);
        if (mainItems.length > 0) {
            groups.push({
                title: 'Main',
                items: mainItems,
            });
        }

        // Agent Group
        if (userRole === Role.AGENT) {
            const filteredAgentItems = filterItems(agentItems);
            if (filteredAgentItems.length > 0) {
                groups.push({
                    title: 'Agent Tools',
                    items: filteredAgentItems,
                });
            }
        }

        // Provider Group
        if (userRole === Role.SERVICE_PROVIDER) {
            const filteredProviderItems = filterItems(providerItems);
            if (filteredProviderItems.length > 0) {
                groups.push({
                    title: 'Service Provider',
                    items: filteredProviderItems,
                });
            }
        }

        // Admin Group
        if (userRole === Role.ADMIN) {
            const filteredAdminItems = filterItems(adminItems);
            if (filteredAdminItems.length > 0) {
                groups.push({
                    title: 'Administration',
                    items: filteredAdminItems,
                });
            }
        }

        return groups;
    };

    const sidebarGroups = getSidebarGroups();

    const isActive = (href: string) => {
        if (href === '/dashboard' && pathname === '/dashboard') return true;
        if (href !== '/dashboard' && pathname.startsWith(href)) return true;
        return false;
    };

    if (sidebarGroups.length === 0) return null;

    return (
        <aside className={cn("w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto", className)}>
            <div className="p-4 space-y-6">
                {/* User Info Card */}
                {user && (
                    <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-medium">
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border mt-1">
                                    {ROLE_LABELS[userRole as Role]}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Groups */}
                {sidebarGroups.map((group, groupIndex) => (
                    <div key={group.title}>
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            {group.title}
                        </h3>
                        <nav className="space-y-1">
                            {group.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
                                        isActive(item.href)
                                            ? "bg-accent/50 text-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                    )}
                                >
                                    <span className={cn(
                                        "transition-colors",
                                        isActive(item.href) ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                    )}>
                                        {item.icon}
                                    </span>
                                    <span className="flex-1">{item.label}</span>
                                    {item.badge && (
                                        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full min-w-[1.25rem]">
                                            {item.badge}
                                        </span>
                                    )}
                                    {isActive(item.href) && (
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </Link>
                            ))}
                        </nav>
                    </div>
                ))}
            </div>
        </aside>
    );
}

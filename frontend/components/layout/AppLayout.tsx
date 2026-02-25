'use client';

import { Header } from './Header';
import { Sidebar } from './Sidebar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
    children: React.ReactNode;
    showSidebar?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
    className?: string;
    mainClassName?: string;
}

export function AppLayout({
    children,
    showSidebar = true,
    showHeader = true,
    showFooter = true,
    className,
    mainClassName,
}: AppLayoutProps) {
    return (
        <div className={cn("min-h-screen bg-background", className)}>
            {showHeader && <Header />}

            <div className="flex">
                {showSidebar && <Sidebar className="hidden lg:block" />}

                <main className={cn(
                    "flex-1 min-h-[calc(100vh-4rem)]",
                    mainClassName
                )}>
                    {children}
                </main>
            </div>

            {showFooter && (
                <div className={cn("bg-background border-t border-border", showSidebar && "lg:ml-64")}>
                    <Footer />
                </div>
            )}
        </div>
    );
}

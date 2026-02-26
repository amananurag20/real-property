'use client';

import { useAuth } from '@/contexts/AuthContext';
import {
    Bell,
    CheckCircle2,
    Info,
    AlertCircle,
    Clock,
    Check,
    Trash2,
    ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

// Mocked Notifications Data
const initialNotifications = [
    {
        id: '1',
        title: 'Property listing approved',
        description: 'Your 2BHK apartment in Mumbai is now live and visible to buyers.',
        time: '2 hours ago',
        type: 'success',
        read: false,
    },
    {
        id: '2',
        title: 'New match found',
        description: 'A buyer is interested in your Pune property matching their criteria.',
        time: '4 hours ago',
        type: 'info',
        read: false,
    },
    {
        id: '3',
        title: 'Request updated',
        description: 'Your Bangalore property request was updated with new matches.',
        time: '1 day ago',
        type: 'neutral',
        read: true,
    },
    {
        id: '4',
        title: 'System Maintenance',
        description: 'Scheduled maintenance will occur tonight at 2:00 AM IST.',
        time: '2 days ago',
        type: 'warning',
        read: true,
    }
];

export default function NotificationsPage() {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
            case 'info': return <Info className="w-5 h-5 text-blue-500" />;
            case 'neutral': return <Clock className="w-5 h-5 text-gray-500" />;
            default: return <Clock className="w-5 h-5 text-gray-500" />;
        }
    };

    const getBgColor = (type: string, read: boolean) => {
        if (read) return 'bg-white';
        switch (type) {
            case 'success': return 'bg-emerald-50/50';
            case 'warning': return 'bg-amber-50/50';
            case 'info': return 'bg-blue-50/50';
            case 'neutral': return 'bg-gray-50/50';
            default: return 'bg-gray-50/50';
        }
    };

    return (
        <main className="min-h-screen bg-muted/30 pt-10 pb-16">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                        <p className="text-muted-foreground">
                            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}.
                        </p>
                    </div>
                    
                    {unreadCount > 0 && (
                        <Button
                            variant="outline"
                            onClick={markAllAsRead}
                            className="text-sm rounded-xl"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <div className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-4">
                                <Bell className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No notifications yet</h3>
                            <p className="text-muted-foreground">We'll let you know when there's an update on your account.</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="bg-white rounded-[32px] shadow-[0_30px_70px_-45px_rgba(15,23,42,0.45)] border border-border/40 p-8 transition-all duration-300 hover:shadow-[0_40px_80px_-45px_rgba(15,23,42,0.6)]"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Icon Container */}
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-muted/30 flex items-center justify-center">
                                        {getIcon(notification.type)}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h3 className={`text-lg font-semibold ${notification.read ? 'text-foreground/70' : 'text-foreground'}`}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap flex-shrink-0">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${notification.read ? 'text-muted-foreground' : 'text-foreground/80'}`}>
                                            {notification.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                    {!notification.read && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-slate-900" />
                                            <span className="text-xs font-medium text-slate-900">Unread</span>
                                        </div>
                                    )}
                                    <div className={`flex items-center gap-3 ${!notification.read ? '' : 'ml-auto'}`}>
                                        {!notification.read && (
                                            <Button
                                                onClick={() => markAsRead(notification.id)}
                                                className="h-9 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/50 text-sm font-medium transition-colors"
                                                title="Mark as read"
                                            >
                                                <Check className="w-4 h-4 mr-2" />
                                                Mark as read
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            onClick={() => deleteNotification(notification.id)}
                                            className="h-9 px-4 rounded-xl text-red-600 hover:bg-red-50 border border-red-200/50 text-sm font-medium transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { Role } from '@/constants/roles';

// Define the User interface based on what the app needs
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    permissions?: string[];
    phone: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (userData: User, token?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initialize user from local storage on mount
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse user from local storage:', error);
                localStorage.removeItem('user'); // Clean up invalid data
            }
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, token?: string) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        if (token) {
            localStorage.setItem('access_token', token);
            // Ensure middleware detection works by setting a cookie
            document.cookie = `token=${token}; path=/; Max-Age=86400; SameSite=Lax`; // 1 day
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Clear token cookie

        // It's safer to redirect via window.location here to fully force context/middleware reset
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

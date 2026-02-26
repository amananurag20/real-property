'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRequestPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to the new unified form
        router.replace('/dashboard/requests/form');
    }, [router]);

    return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Redirecting to request form...</p>
            </div>
        </div>
    );
}

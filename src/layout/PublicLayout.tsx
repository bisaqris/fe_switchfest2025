import React, { useEffect } from 'react';
import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/router';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && router.pathname.startsWith('/auth')) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router]);

    if (isAuthenticated && router.pathname.startsWith('/auth')) {
        return <div>Mengarahkan ke dasbor...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            <PublicNavbar />
            <main className="flex-grow">
                {children}
            </main>
            <PublicFooter />
        </div>
    )
}
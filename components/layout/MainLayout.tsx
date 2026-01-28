'use client';

import { useEffect, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    // ... (existing state code)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // ... (existing useEffects)
    useEffect(() => {
        // ... (auth logic)
        // Check for token in URL (OAuth redirect)
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            try {
                localStorage.setItem('token', tokenFromUrl);

                // Decode token manually
                const base64Url = tokenFromUrl.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                const decoded = JSON.parse(jsonPayload);
                const userObj = {
                    id: decoded.userId,
                    name: decoded.name,
                    email: decoded.email,
                    avatar: decoded.picture
                };

                localStorage.setItem('user', JSON.stringify(userObj));
                setIsLoggedIn(true);

                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
                console.error("Error parsing token", error);
            }
        } else {
            const token = localStorage.getItem('token');
            if (token) {
                setIsLoggedIn(true);
            }
        }

        setIsLoading(false);
    }, []);

    const router = useRouter();
    const pathname = usePathname();

    // Define routes that should show the sidebar
    const isDashboardRoute = pathname?.startsWith('/buyer') || pathname?.startsWith('/seller');

    useEffect(() => {
        if (!isLoading && !isLoggedIn && isDashboardRoute) {
            router.push('/');
        }
    }, [isLoading, isLoggedIn, isDashboardRoute, router]);

    if (isLoading) {
        return null;
    }

    // Only show sidebar if logged in AND on a dashboard route
    if (isLoggedIn && isDashboardRoute) {
        return (
            <div className="flex h-screen font-jost overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col ml-64 min-w-0">
                    <DashboardHeader />
                    <main className="flex-1 overflow-y-auto p-8">
                        <div className="container mx-auto max-w-9xl">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-jost">
            <Header />
            <main className="flex-1 bg-white">{children}</main>
            <Footer />
        </div>
    );
}

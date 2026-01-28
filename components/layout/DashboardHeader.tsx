'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardHeader() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Helper to get page title from path
    const getPageTitle = (path: string) => {
        const segments = path.split('/').filter(Boolean);
        if (segments.length < 2) return 'Dashboard';

        // e.g., 'buyer/profile' -> 'Profile'
        // 'seller/my-ads' -> 'My Ads'
        const lastSegment = segments[segments.length - 1];

        // Convert kebab-case to Title Case
        return lastSegment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const title = getPageTitle(pathname);

    return (
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-40">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back, {user?.name || 'User'}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className="p-2 text-gray-500 hover:text-brand-orange hover:bg-orange-50 rounded-full transition"
                        title="Go to Marketplace Home"
                    >
                        <i className="ri-home-line text-xl"></i>
                    </Link>

                    {/* Notifications (Placeholder) */}
                    <button className="p-2 text-gray-500 hover:text-brand-orange hover:bg-orange-50 rounded-full transition relative">
                        <i className="ri-notification-3-line text-xl"></i>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    {/* User Avatar (Mini) */}
                    {user && (
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                            {(pathname.startsWith('/seller') && user.brand_logo) || user.avatar ? (
                                <img src={(pathname.startsWith('/seller') && user.brand_logo) ? user.brand_logo : user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                            ) : (
                                <div className="w-9 h-9 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange border border-brand-orange/20 font-bold text-sm">
                                    {user.name?.charAt(0) || 'U'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

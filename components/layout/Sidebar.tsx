'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const BUYER_SIDEBAR_ITEMS = [
    { label: 'Profile', icon: 'ri-user-line', link: '/buyer/profile' },
    { label: 'Wishlist', icon: 'ri-heart-line', link: '/buyer/wishlist' },
    { label: 'Inquiries', icon: 'ri-chat-1-line', link: '/buyer/inquiries' },
    { label: 'Messages', icon: 'ri-message-3-line', link: '/buyer/messages' },
    { label: 'Browse', icon: 'ri-layout-grid-line', link: '/categories' },
    { label: 'Settings', icon: 'ri-settings-3-line', link: '/buyer/settings' },
];

const SELLER_SIDEBAR_ITEMS = [
    { label: 'Dashboard', icon: 'ri-dashboard-line', link: '/seller/dashboard' },
    { label: 'My Ads', icon: 'ri-file-list-3-line', link: '/seller/my-ads' },
    { label: 'Post Ad', icon: 'ri-add-circle-line', link: '/seller/place-ad' },
    { label: 'Messages', icon: 'ri-message-2-line', link: '/seller/messages' },
    { label: 'Settings', icon: 'ri-settings-4-line', link: '/seller/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [currentMode, setCurrentMode] = useState<'buyer' | 'seller'>('buyer');
    const [user, setUser] = useState<any>(null);
    const [isRealSeller, setIsRealSeller] = useState(false);

    useEffect(() => {
        // 1. Initial Load from LocalStorage
        const storedUserRaw = localStorage.getItem('user');
        if (storedUserRaw) {
            const parsed = JSON.parse(storedUserRaw);
            setUser(parsed);

            // Set initial seller status from local storage to avoid flash
            if (parsed.is_seller) {
                setIsRealSeller(true);
            }

            if (parsed.current_mode) {
                setCurrentMode(parsed.current_mode);
            } else if (pathname.startsWith('/seller')) {
                setCurrentMode('seller');
            }
        }

        // 2. Background Check with API (Fresh Data)
        const checkSellerStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await fetch('/api/user/status', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setIsRealSeller(data.isSeller);

                        // Sync to local storage for next time
                        const currentUserRaw = localStorage.getItem('user');
                        if (currentUserRaw) {
                            const currentUser = JSON.parse(currentUserRaw);
                            // Only write if changed
                            if (currentUser.is_seller !== data.isSeller) {
                                currentUser.is_seller = data.isSeller;
                                localStorage.setItem('user', JSON.stringify(currentUser));
                                setUser(currentUser); // Update state
                            }
                        }
                    }
                } catch (e) {
                    console.error("Error checking seller status", e);
                }
            }
        };

        checkSellerStatus();
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const handleSwitchMode = async (mode: 'buyer' | 'seller') => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/switch-mode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ mode })
            });

            if (res.ok) {
                const data = await res.json();
                // Update local storage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    parsed.current_mode = mode;
                    localStorage.setItem('user', JSON.stringify(parsed));
                    setCurrentMode(mode);

                    // Redirect based on mode
                    if (mode === 'seller') {
                        window.location.href = '/seller/dashboard';
                    } else {
                        window.location.href = '/buyer/profile'; // Or home '/'
                    }
                }
            } else {
                console.error("Failed to switch mode");
            }
        } catch (error) {
            console.error("Error switching mode", error);
        }
    };

    // Use currentMode to determine sidebar items, fallback to pathname for guest/initial load
    const isSellerContext = currentMode === 'seller' || pathname.startsWith('/seller');
    const navItems = isSellerContext ? SELLER_SIDEBAR_ITEMS : BUYER_SIDEBAR_ITEMS;

    return (
        <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-200 shadow-sm fixed top-0 left-0 z-50">
            {/* Logo */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="XYZ Finders" className="h-10 w-auto" />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {navItems.map((item) => {
                    // Highlight active based on path
                    const isActive = pathname === item.link || pathname.startsWith(item.link + '/');
                    return (
                        <Link
                            key={item.link}
                            href={item.link}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive
                                ? 'bg-brand-orange text-white shadow-md shadow-orange-200'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-brand-orange'
                                }`}
                        >
                            <i className={`${item.icon} text-xl`}></i>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                <div className="mt-4 pt-4 border-t border-gray-100 px-4">
                    {isSellerContext ? (
                        <button
                            onClick={() => handleSwitchMode('buyer')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                        >
                            <i className="ri-shopping-bag-3-line text-xl"></i>
                            <span>Switch to Buying</span>
                        </button>
                    ) : isRealSeller ? (
                        <button
                            onClick={() => handleSwitchMode('seller')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-purple-600 bg-purple-50 hover:bg-purple-100"
                        >
                            <i className="ri-store-2-line text-xl"></i>
                            <span>Switch to Selling</span>
                        </button>
                    ) : (
                        <Link
                            href="/buyer/become-seller"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-blue-600 bg-blue-50 hover:bg-blue-100"
                        >
                            <i className="ri-briefcase-line text-xl"></i>
                            <span>Become a Seller</span>
                        </Link>
                    )}
                </div>
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-gray-100">
                {user && (
                    <div className="bg-gray-50 rounded-xl p-3 mb-3 flex items-center gap-3">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                        ) : (
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange border border-brand-orange/20 font-bold">
                                {user.name?.charAt(0) || 'U'}
                            </div>
                        )}
                        <div className="overflow-hidden">
                            <h4 className="font-bold text-gray-900 text-sm truncate">{user.name}</h4>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl font-medium hover:bg-red-100 transition"
                >
                    <i className="ri-logout-box-line"></i>
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

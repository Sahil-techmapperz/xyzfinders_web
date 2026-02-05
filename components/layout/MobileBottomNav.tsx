'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import AuthModal from '../auth/AuthModal';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Check for token in localStorage to handle auth state without hydration mismatch
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const navItems = [
        {
            label: 'Home',
            icon: 'ri-home-5-fill',
            iconOutline: 'ri-home-5-line',
            href: '/',
        },
        {
            label: 'Search',
            icon: 'ri-search-2-fill',
            iconOutline: 'ri-search-2-line',
            href: '/categories',
        },
        {
            label: 'Post',
            icon: 'ri-add-line',
            iconOutline: 'ri-add-line',
            href: '/seller/place-ad',
            isSpecial: true,
        },
        {
            label: 'Chats',
            icon: 'ri-chat-3-fill',
            iconOutline: 'ri-chat-3-line',
            href: '/buyer/messages',
        },
        {
            label: 'Menu',
            icon: 'ri-menu-fill',
            iconOutline: 'ri-menu-line',
            href: '#menu',
            isMenu: true,
        },
    ];

    const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
        if (item.isMenu) {
            e.preventDefault();
            setShowMobileMenu(!showMobileMenu);
        } else if (item.href === '/seller/place-ad' || item.href === '/buyer/messages') {
            if (!isLoggedIn) {
                e.preventDefault();
                setIsAuthModalOpen(true);
            }
        }
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname?.startsWith(href);
    };

    return (
        <>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Mobile Bottom Navigation - Only visible on small screens */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
                <div className="flex items-center justify-around py-2 px-4">
                    {navItems.map((item, index) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={(e) => handleNavClick(item, e)}
                                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all duration-200 ${item.isSpecial
                                    ? 'relative'
                                    : active
                                        ? 'text-brand-orange'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {item.isSpecial ? (
                                    /* Special "Post an Ads" button with orange circle */
                                    <div className="relative -mt-6">
                                        <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/30">
                                            <i className="ri-add-line text-white text-3xl"></i>
                                        </div>
                                        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-medium text-gray-600 whitespace-nowrap">
                                            Sell
                                        </span>
                                    </div>
                                ) : (
                                    <>
                                        <i className={`${active ? item.icon : item.iconOutline} text-xl`}></i>
                                        <span className={`text-[10px] font-medium ${active ? 'text-brand-orange' : 'text-gray-600'}`}>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Safe area padding for devices with home indicator */}
                <div className="h-safe-area-inset-bottom bg-white"></div>
            </nav>

            {/* Mobile Menu Overlay */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-40 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowMobileMenu(false)}
                    ></div>

                    {/* Menu Panel */}
                    <div className="absolute bottom-16 left-0 right-0 bg-white rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 max-h-[70vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Handle bar */}
                            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

                            <h3 className="text-lg font-bold text-gray-800 mb-4">Browse Categories</h3>

                            {/* Category Grid */}
                            <div className="grid grid-cols-3 gap-4 mb-6">
                                {[
                                    { name: 'Properties', icon: '/categories/properties.png', href: '/real-estate' },
                                    { name: 'Mobiles', icon: '/categories/mobiles.png', href: '/mobiles' },
                                    { name: 'Automobiles', icon: '/categories/cars.png', href: '/automobiles' },
                                    { name: 'Education', icon: '/categories/education.png', href: '/education' },
                                    { name: 'Electronics', icon: '/categories/electronics.png', href: '/gadgets' },
                                    { name: 'Pets', icon: '/categories/pets.png', href: '/pets' },
                                    { name: 'Beauty', icon: '/categories/beauty.png', href: '/beauty-wellbeing' },
                                    { name: 'Furniture', icon: '/categories/furniture.png', href: '/furniture' },
                                    { name: 'Jobs', icon: '/categories/jobs.png', href: '/jobs' },
                                ].map((cat, idx) => (
                                    <Link
                                        key={idx}
                                        href={cat.href}
                                        onClick={() => setShowMobileMenu(false)}
                                        className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-orange-50 transition-all"
                                    >
                                        <div className="w-12 h-12 bg-[#FFF5EE] rounded-xl flex items-center justify-center border border-orange-100">
                                            <img src={cat.icon} alt={cat.name} className="w-8 h-8 object-contain" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 text-center">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Store & Shop Actions - Moved from Header */}
                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <Link
                                    href={isLoggedIn ? "/seller/settings" : "#"}
                                    onClick={(e) => {
                                        if (!isLoggedIn) {
                                            e.preventDefault();
                                            /* @ts-ignore */
                                            import('react-hot-toast').then((toast) => {
                                                toast.default.error("Please login to setup your store");
                                                setIsAuthModalOpen(true);
                                            });
                                        } else {
                                            setShowMobileMenu(false);
                                        }
                                    }}
                                    className="flex items-center justify-center gap-2 py-2.5 bg-white text-brand-orange border border-brand-orange rounded-xl font-semibold text-xs hover:bg-orange-50 transition"
                                >
                                    <i className="ri-store-2-line"></i>
                                    <span>Setup Store</span>
                                </Link>
                                <Link
                                    href={isLoggedIn ? "/seller/place-ad" : "#"}
                                    onClick={(e) => {
                                        if (!isLoggedIn) {
                                            e.preventDefault();
                                            /* @ts-ignore */
                                            import('react-hot-toast').then((toast) => {
                                                toast.default.error("Please login to list your shop");
                                                setIsAuthModalOpen(true);
                                            });
                                        } else {
                                            setShowMobileMenu(false);
                                        }
                                    }}
                                    className="flex items-center justify-center gap-2 py-2.5 bg-brand-orange text-white rounded-xl font-semibold text-xs hover:bg-[#e07a46] transition shadow-md"
                                >
                                    <i className="ri-add-circle-line"></i>
                                    <span>List Shop</span>
                                </Link>
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <Link
                                    href="/categories"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-brand-orange/10 text-brand-orange rounded-xl font-semibold hover:bg-brand-orange/20 transition"
                                >
                                    <span>View All Categories</span>
                                    <i className="ri-arrow-right-line"></i>
                                </Link>
                            </div>

                            {/* Quick Links */}
                            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
                                <Link
                                    href="/buyer/wishlist"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                                >
                                    <i className="ri-heart-line text-xl text-gray-600"></i>
                                    <span className="text-sm font-medium text-gray-700">My Wishlist</span>
                                </Link>
                                <Link
                                    href="/buyer/profile"
                                    onClick={() => setShowMobileMenu(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition"
                                >
                                    <i className="ri-user-line text-xl text-gray-600"></i>
                                    <span className="text-sm font-medium text-gray-700">My Profile</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Spacer to prevent content from being hidden behind the bottom nav */}
            <div className="h-20 md:hidden"></div>
        </>
    );
}

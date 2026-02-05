'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

import NotificationBell from './NotificationBell';

export default function SellerNav() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const navLinks = [
        { label: 'Dashboard', href: '/seller/dashboard', icon: 'ri-dashboard-3-line' },
        { label: 'Post Ad', href: '/seller/place-ad', icon: 'ri-add-circle-line' },
        { label: 'Messages', href: '/seller/messages', icon: 'ri-message-3-line' },
        { label: 'Profile', href: '/seller/profile', icon: 'ri-user-settings-line' },
        { label: 'Browse', href: '/', icon: 'ri-home-5-line' },
    ];

    return (
        <nav className="bg-linear-to-r from-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/seller/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-linear-to-br from-brand-orange to-orange-600 rounded-lg flex items-center justify-center">
                            <i className="ri-store-3-line text-white text-xl"></i>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white">XYZ<span className="text-brand-orange">Finders</span></span>
                            <span className="text-[10px] text-gray-400 -mt-1">Seller Dashboard</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${pathname === link.href
                                    ? 'bg-brand-orange text-white shadow-lg'
                                    : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                <i className={`${link.icon} text-lg`}></i>
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <div className="text-white">
                            <NotificationBell />
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600">
                            {user?.brand_logo || user?.avatar ? (
                                <img
                                    src={user.brand_logo || user.avatar}
                                    alt="Seller"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center text-white text-sm font-bold">
                                    {user?.name?.charAt(0) || 'S'}
                                </div>
                            )}
                            <span className="text-sm font-medium text-gray-200">{user?.name || 'Seller'}</span>
                        </div>
                        <button className="text-gray-400 hover:text-white transition">
                            <i className="ri-logout-box-r-line text-xl"></i>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-300">
                        <i className="ri-menu-line text-2xl"></i>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden border-t border-slate-700 py-2">
                    <div className="grid grid-cols-5 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition ${pathname === link.href
                                    ? 'bg-brand-orange text-white'
                                    : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                <i className={`${link.icon} text-xl`}></i>
                                <span className="text-xs font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

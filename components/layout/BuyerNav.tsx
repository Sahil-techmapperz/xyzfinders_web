'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BuyerNav() {
    const pathname = usePathname();

    const navLinks = [
        { label: 'Browse', href: '/', icon: 'ri-home-5-line' },
        { label: 'Messages', href: '/buyer/messages', icon: 'ri-message-3-line' },
        { label: 'Wishlist', href: '/buyer/wishlist', icon: 'ri-heart-line' },
        { label: 'Inquiries', href: '/buyer/inquiries', icon: 'ri-question-answer-line' },
        { label: 'Profile', href: '/buyer/profile', icon: 'ri-user-3-line' },
        { label: 'Settings', href: '/buyer/settings', icon: 'ri-settings-3-line' },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-brand-orange to-orange-600 rounded-lg flex items-center justify-center">
                            <i className="ri-shopping-bag-3-line text-white text-xl"></i>
                        </div>
                        <span className="text-xl font-bold text-gray-900">XYZ<span className="text-brand-orange">Finders</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${pathname === link.href
                                        ? 'bg-brand-orange text-white'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-brand-orange'
                                    }`}
                            >
                                <i className={`${link.icon} text-lg`}></i>
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                U
                            </div>
                            <span className="text-sm font-medium text-gray-700">User</span>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                            <i className="ri-logout-box-r-line text-xl"></i>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-600">
                        <i className="ri-menu-line text-2xl"></i>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden border-t border-gray-100 py-2">
                    <div className="grid grid-cols-3 gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition ${pathname === link.href
                                        ? 'bg-brand-orange text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
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

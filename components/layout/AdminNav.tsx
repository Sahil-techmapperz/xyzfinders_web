'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
    const pathname = usePathname();

    const navLinks = [
        { label: 'Dashboard', href: '/admin/dashboard', icon: 'ri-dashboard-3-line' },
        { label: 'Users', href: '/admin/users', icon: 'ri-user-settings-line' },
        { label: 'Products', href: '/admin/products', icon: 'ri-shopping-bag-line' },
        { label: 'Analytics', href: '/admin/analytics', icon: 'ri-line-chart-line' },
        { label: 'Site', href: '/', icon: 'ri-home-5-line' },
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-b border-indigo-700 sticky top-0 z-50 shadow-xl">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                            <i className="ri-shield-star-line text-white text-xl"></i>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white">XYZ<span className="text-yellow-400">Finders</span></span>
                            <span className="text-[10px] text-indigo-300 -mt-1">Admin Panel</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${pathname === link.href
                                        ? 'bg-yellow-500 text-gray-900 shadow-lg font-semibold'
                                        : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
                                    }`}
                            >
                                <i className={`${link.icon} text-lg`}></i>
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-indigo-800/50 rounded-lg border border-indigo-600">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-gray-900 text-sm font-bold shadow-lg">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-white">Admin</span>
                                <span className="text-[10px] text-indigo-300">Super User</span>
                            </div>
                        </div>
                        <button className="text-indigo-300 hover:text-white transition">
                            <i className="ri-logout-box-r-line text-xl"></i>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-indigo-200">
                        <i className="ri-menu-line text-2xl"></i>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden border-t border-indigo-700 py-2">
                    <div className="grid grid-cols-5 gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition ${pathname === link.href
                                        ? 'bg-yellow-500 text-gray-900'
                                        : 'text-indigo-300 hover:bg-indigo-800 hover:text-white'
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

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NAV_ITEMS } from '../../data/navigation';
import AuthModal from '../auth/AuthModal';

export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ name: string; email: string; avatar?: string } | null>(null);

    // Check for token in URL (OAuth redirect) or localStorage
    useEffect(() => {
        // Handle OAuth Token
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            try {
                localStorage.setItem('token', tokenFromUrl);

                // Decode token manually to avoid external dependencies
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
                setUser(userObj);
                setIsLoggedIn(true);

                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
                console.error("Error parsing token", error);
            }
            return;
        }

        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search functionality
        console.log('Searching for:', searchQuery);
    };

    const handleLocationSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (locationQuery.trim()) {
                router.push(`/categories?location=${encodeURIComponent(locationQuery)}`);
            }
        }
    };

    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [showUserDropdown, setShowUserDropdown] = useState(false);

    return (
        <header className="font-jost w-full bg-white relative z-50">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Top Bar */}
            <div className="bg-brand-teal text-white py-2 text-center text-sm font-medium">
                25,000 Active Ads No. 1 Classified Market Place
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/logo.png" alt="XYZFinders Logo" className="h-12 w-auto" />
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-xl bg-gray-100 rounded-full flex items-center p-1 pl-4 lg:pl-6 gap-2 border border-gray-200">
                    <input
                        type="text"
                        placeholder="Search Anything"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 w-full text-gray-600 placeholder-gray-400 text-sm lg:text-base"
                    />
                    <button
                        type="submit"
                        className="bg-brand-orange text-white px-6 py-2 rounded-full font-medium hover:bg-[#e07a46] transition shadow-sm"
                    >
                        Search
                    </button>
                </form>

                {/* Location */}
                <div className="hidden xl:flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 text-sm text-gray-700 border border-gray-200">
                    <i className="ri-map-pin-line text-brand-orange text-lg"></i>
                    <input
                        type="text"
                        placeholder="Location"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        onKeyDown={handleLocationSearch}
                        className="bg-transparent border-none outline-none w-[150px] text-gray-700 placeholder-gray-500 font-medium"
                    />
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4 lg:gap-6">
                    {isLoggedIn && user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full pr-4 transition border border-transparent hover:border-gray-100"
                            >
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                ) : (
                                    <div className="w-10 h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange overflow-hidden border border-brand-orange/20">
                                        <i className="ri-user-smile-line text-xl"></i>
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {user.name?.split(' ')[0] || user.email?.split('@')[0]}
                                </span>
                                <i className={`ri-arrow-down-s-line text-gray-400 transition ${showUserDropdown ? 'rotate-180' : ''}`}></i>
                            </button>

                            {/* Dropdown Menu */}
                            {showUserDropdown && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in duration-200">
                                    <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                        <p className="font-bold text-gray-800 truncate">{user.name || 'User'}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <Link href="/buyer/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                            <i className="ri-user-line text-lg"></i>
                                            <span>My Profile</span>
                                        </Link>
                                        <Link href="/buyer/messages" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                            <i className="ri-message-3-line text-lg"></i>
                                            <span>Messages</span>
                                        </Link>
                                        <div className="h-px bg-gray-100 my-0.5 mx-2"></div>
                                        <Link href="/buyer/wishlist" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                            <i className="ri-heart-line text-lg"></i>
                                            <span>Wishlist</span>
                                        </Link>
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <Link href="/seller/register" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                            <i className="ri-store-2-line text-lg"></i>
                                            <span>Become a Seller</span>
                                        </Link>
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition font-medium"
                                        >
                                            <i className="ri-logout-box-r-line text-lg"></i>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            className="flex items-center gap-2 text-gray-800 font-bold text-sm hover:text-brand-orange transition-colors"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 overflow-hidden border border-blue-200">
                                <i className="ri-user-smile-line text-xl"></i>
                            </div>
                            <span className="hidden sm:inline">Log In \ Sign Up</span>
                        </button>
                    )}

                    <Link
                        href="/seller/place-ad"
                        className="bg-brand-orange text-white px-5 py-2.5 rounded shadow-md hover:bg-[#e07a46] transition font-semibold text-sm sm:text-base"
                    >
                        Place Your Ads
                    </Link>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="border-t border-gray-200 bg-[#FFFBF7] shadow-sm relative z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
                    {/* Browser Categories */}
                    <div className="relative group">
                        <Link
                            href="/categories"
                            className="bg-brand-orange text-white px-5 py-2 rounded-full flex items-center gap-2 font-medium shadow-sm hover:bg-[#e07a46] transition"
                        >
                            <i className="ri-menu-line"></i>
                            <span>Browse Categories</span>
                        </Link>
                    </div>

                    {/* Nav Links mapping */}
                    <nav className="hidden xl:flex items-center gap-8 text-gray-700 font-medium text-sm absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {NAV_ITEMS.map((item, index) => (
                            <div
                                key={index}
                                className="relative group py-3"
                                onMouseEnter={() => setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link href={item.link} className="flex items-center gap-1 hover:text-brand-orange transition ">
                                    {item.label}
                                    {item.badge && (
                                        <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>
                                    )}
                                    {item.dropdown && <i className="ri-arrow-down-s-line text-xs ml-0.5 opacity-50"></i>}
                                </Link>

                                {/* Dropdown Menu - Nav Items */}
                                {item.dropdown && activeDropdown === item.label && (
                                    <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50">
                                        <div className="p-4 space-y-5">
                                            {item.dropdown.cols.map((col, cIdx) => (
                                                <div key={cIdx}>
                                                    {col.title && (
                                                        <h4 className="font-bold text-gray-900 text-xs mb-2 uppercase tracking-wide">{col.title}</h4>
                                                    )}
                                                    <ul className="space-y-2">
                                                        {col.items.map((subItem, sIdx) => (
                                                            <li key={sIdx}>
                                                                <Link href={subItem.link} className="text-gray-600 hover:text-brand-orange text-sm block transition-colors">
                                                                    {subItem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        {item.dropdown.footerLink && (
                                            <div className="bg-gray-50 p-3 border-t border-gray-100">
                                                <Link href={item.dropdown.footerLink.link} className="flex items-center justify-between text-gray-800 hover:text-brand-orange font-bold text-sm">
                                                    {item.dropdown.footerLink.label}
                                                    {item.dropdown.footerLink.badge && (
                                                        <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">{item.dropdown.footerLink.badge}</span>
                                                    )}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-3 text-gray-500">
                        <Link
                            href="/buyer/wishlist"
                            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white transition hover:border-brand-orange"
                        >
                            <i className="ri-heart-line text-lg"></i>
                        </Link>
                        <Link
                            href="/buyer/messages"
                            className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white transition hover:border-brand-orange"
                        >
                            <i className="ri-message-3-line text-lg"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);

    // Check login status on mount
    useState(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser) {
                setIsLoggedIn(true);
                setUser(JSON.parse(storedUser));
            }
        }
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        window.location.href = '/auth?mode=login';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search functionality
        console.log('Searching for:', searchQuery);
    };

    const [showCategories, setShowCategories] = useState(false);

    const categories = [
        { name: "Real Estate", icon: "ri-building-line", link: "/real-estate" },
        { name: "Automobiles", icon: "ri-car-line", link: "/automobiles" },
        { name: "Mobiles", icon: "ri-smartphone-line", link: "/mobiles" },
        { name: "Furniture", icon: "ri-sofa-line", link: "/furniture" },
        { name: "Electronics", icon: "ri-macbook-line", link: "/gadgets" },
        { name: "Beauty", icon: "ri-sparkling-line", link: "/beauty" },
        { name: "Services", icon: "ri-service-line", link: "/seller/place-ad/services/create" }, // Linking to form as listing doesn't exist yet
        { name: "Education", icon: "ri-book-open-line", link: "/seller/place-ad/education/create" },
    ];

    return (
        <header className="font-jost relative">
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
                    <span className="truncate max-w-[150px] font-medium">New Delhi Road, Kot...</span>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-4 lg:gap-6">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                Hi, {user?.name?.split(' ')[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-gray-800 font-bold text-sm hover:text-red-500 transition"
                            >
                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500 overflow-hidden border border-red-100">
                                    <i className="ri-logout-box-r-line text-xl"></i>
                                </div>
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link href="/auth?mode=login" className="flex items-center gap-2 text-gray-800 font-bold text-sm">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 overflow-hidden border border-blue-200">
                                <i className="ri-user-smile-line text-xl"></i>
                            </div>
                            <span className="hidden sm:inline">Log In \ Sign Up</span>
                        </Link>
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
                        <button
                            onClick={() => setShowCategories(!showCategories)}
                            className="bg-brand-orange text-white px-5 py-2 rounded-full flex items-center gap-2 font-medium shadow-sm hover:bg-[#e07a46] transition"
                        >
                            <i className="ri-menu-line"></i>
                            <span>Browser Categories</span>
                            <i className={`ri-arrow-down-s-line ml-1 transition-transform ${showCategories ? 'rotate-180' : ''}`}></i>
                        </button>

                        {/* Dropdown Menu */}
                        {showCategories && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowCategories(false)}
                                ></div>
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2">
                                    {categories.map((cat, index) => (
                                        <Link
                                            key={index}
                                            href={cat.link}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-gray-700 hover:text-[#FF8A65]"
                                            onClick={() => setShowCategories(false)}
                                        >
                                            <i className={`${cat.icon} text-lg w-6 flex justify-center text-gray-400 group-hover:text-[#FF8A65]`}></i>
                                            <span className="font-medium text-sm">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden xl:flex items-center gap-8 text-gray-700 font-medium text-sm absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Link href="/real-estate" className="flex items-center gap-1 hover:text-brand-orange transition">
                            Property
                            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">New</span>
                        </Link>
                        <Link href="/automobiles" className="hover:text-brand-orange transition">
                            Automobiles
                        </Link>
                        <Link href="/mobiles" className="hover:text-brand-orange transition">
                            Mobile & Tablet
                        </Link>
                        <Link href="/furniture" className="flex items-center gap-1 hover:text-brand-orange transition">
                            Furniture & Appliance
                            <span className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">New</span>
                        </Link>
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

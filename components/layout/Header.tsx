'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { NAV_ITEMS, BROWSE_CATEGORIES } from '../../data/navigation';
import AuthModal from '../auth/AuthModal';
import toast from 'react-hot-toast';

export default function Header() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentMode, setCurrentMode] = useState('buyer');
    const [user, setUser] = useState<any>(null);

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
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    parsed.current_mode = mode;
                    localStorage.setItem('user', JSON.stringify(parsed));
                    setCurrentMode(mode);

                    if (mode === 'seller') {
                        window.location.href = '/seller/dashboard';
                    } else {
                        window.location.href = '/buyer/profile';
                    }
                }
            }
        } catch (error) {
            console.error("Error switching mode", error);
        }
    };

    // Check for token in URL (OAuth redirect) or localStorage
    useEffect(() => {
        // Handle OAuth Token
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            // ... (existing OAuth logic - omit for brevity if not changing, but cleaner to replace whole block)
            // Actually, let's keep the existing structure but add the seller check at the end
            try {
                localStorage.setItem('token', tokenFromUrl);
                // ... (decode logic)
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
                window.history.replaceState({}, document.title, window.location.pathname);
            } catch (error) {
                console.error("Error parsing token", error);
            }
        } else {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (token && storedUser) {
                setIsLoggedIn(true);
                const parsed = JSON.parse(storedUser);
                setUser(parsed);
                if (parsed.current_mode) {
                    setCurrentMode(parsed.current_mode);
                } else if (window.location.pathname.startsWith('/seller')) {
                    setCurrentMode('seller');
                }

                // Background check for seller status to keep UI in sync
                fetch('/api/user/status', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(data => {
                        let shouldUpdate = false;
                        const updatedUser = { ...parsed };

                        if (data.isSeller !== parsed.is_seller) {
                            updatedUser.is_seller = data.isSeller;
                            shouldUpdate = true;
                        }

                        // Sync Seller Logo
                        if (data.brand_logo !== undefined && data.brand_logo !== parsed.brand_logo) {
                            updatedUser.brand_logo = data.brand_logo;
                            shouldUpdate = true;
                        }

                        // Sync Buyer Avatar
                        if (data.avatar !== undefined && data.avatar !== parsed.avatar) {
                            updatedUser.avatar = data.avatar;
                            shouldUpdate = true;
                        }

                        if (shouldUpdate) {
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                            setUser(updatedUser);
                        }
                    })
                    .catch(err => console.error("Header status check warning", err));
            }
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
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    return (
        <header className="font-jost w-full bg-white relative z-50">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Top Bar */}
            <div className="bg-brand-teal text-white py-2 text-center text-sm font-medium">
                25,000 Active Ads No. 1 Classified Market Place
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-2 md:px-4 py-3 md:py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <img src="/logo.png" alt="XYZFinders Logo" className="h-8 md:h-10 lg:h-12 w-auto" />
                </Link>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="order-last md:order-0 w-full md:w-auto flex-1 max-w-xl bg-gray-100 rounded-full flex items-center p-1 pl-3 lg:pl-6 gap-2 border border-gray-200 mt-2 md:mt-0">
                    <input
                        type="text"
                        placeholder="Search Anything"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 w-full text-gray-600 placeholder-gray-400 text-xs md:text-sm lg:text-base min-w-0"
                    />
                    <button
                        type="submit"
                        className="bg-brand-orange text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-medium hover:bg-[#e07a46] transition shadow-sm whitespace-nowrap text-xs md:text-sm lg:text-base"
                    >
                        Search
                    </button>
                </form>

                {/* Location - Hidden on small, visible on xl */}
                <div className="hidden xl:flex items-center bg-gray-100 rounded-full px-3 py-1.5 lg:px-4 lg:py-2 gap-2 text-xs lg:text-sm text-gray-700 border border-gray-200">
                    <i className="ri-map-pin-line text-brand-orange text-base lg:text-lg"></i>
                    <input
                        type="text"
                        placeholder="Location"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        onKeyDown={handleLocationSearch}
                        className="bg-transparent border-none outline-none w-[100px] lg:w-[150px] text-gray-700 placeholder-gray-500 font-medium"
                    />
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-2 md:gap-4 lg:gap-6 shrink-0">
                    {isLoggedIn && user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-full pr-2 md:pr-4 transition border border-transparent hover:border-gray-100"
                            >
                                {(currentMode === 'seller' && user.brand_logo) || user.avatar ? (
                                    <img src={(currentMode === 'seller' && user.brand_logo) ? user.brand_logo : user.avatar} alt={user.name} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border border-gray-200" />
                                ) : (
                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange overflow-hidden border border-brand-orange/20">
                                        <i className="ri-user-smile-line text-lg md:text-xl"></i>
                                    </div>
                                )}
                                <span className="text-xs md:text-sm font-medium text-gray-700 hidden sm:block max-w-[80px] md:max-w-[120px] truncate">
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
                                        {currentMode === 'seller' ? (
                                            <span className="inline-block mt-1 text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Seller Mode</span>
                                        ) : (
                                            <span className="inline-block mt-1 text-[10px] font-bold bg-orange-100 text-brand-orange px-2 py-0.5 rounded-full uppercase tracking-wider">Buyer Mode</span>
                                        )}
                                    </div>
                                    <div className="p-2 space-y-1">
                                        {currentMode === 'seller' ? (
                                            <>
                                                <Link href="/seller/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition">
                                                    <i className="ri-dashboard-line text-lg"></i>
                                                    <span>Dashboard</span>
                                                </Link>
                                                <Link href="/seller/my-ads" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition">
                                                    <i className="ri-file-list-3-line text-lg"></i>
                                                    <span>My Ads</span>
                                                </Link>
                                                <Link href="/seller/place-ad" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition">
                                                    <i className="ri-add-circle-line text-lg"></i>
                                                    <span>Post Ad</span>
                                                </Link>
                                                <Link href="/seller/messages" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition">
                                                    <i className="ri-message-3-line text-lg"></i>
                                                    <span>Messages</span>
                                                </Link>
                                                <Link href="/seller/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition">
                                                    <i className="ri-settings-4-line text-lg"></i>
                                                    <span>Settings</span>
                                                </Link>
                                                <div className="h-px bg-gray-100 my-1"></div>
                                                <button
                                                    onClick={() => handleSwitchMode('buyer')}
                                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                                                >
                                                    <i className="ri-shopping-bag-3-line text-lg"></i>
                                                    <span>Switch to Buying</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link href="/buyer/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                                    <i className="ri-user-line text-lg"></i>
                                                    <span>My Profile</span>
                                                </Link>
                                                <Link href="/buyer/inquiries" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                                    <i className="ri-chat-1-line text-lg"></i>
                                                    <span>My Inquiries</span>
                                                </Link>
                                                <Link href="/buyer/messages" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                                    <i className="ri-message-3-line text-lg"></i>
                                                    <span>Messages</span>
                                                </Link>
                                                <Link href="/buyer/wishlist" className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-brand-orange rounded-lg transition">
                                                    <i className="ri-heart-line text-lg"></i>
                                                    <span>Wishlist</span>
                                                </Link>
                                                <div className="h-px bg-gray-100 my-1"></div>

                                                {/* Check if user is seller (using is_seller flag or fallback to user_type if older session) */}
                                                {(user.is_seller || user.user_type === 'seller') ? (
                                                    <button
                                                        onClick={() => handleSwitchMode('seller')}
                                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                                    >
                                                        <i className="ri-store-2-line text-lg"></i>
                                                        <span>Switch to Selling</span>
                                                    </button>
                                                ) : (
                                                    <Link href="/buyer/become-seller" className="flex items-center gap-3 px-3 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                        <i className="ri-briefcase-line text-lg"></i>
                                                        <span>Become a Seller</span>
                                                    </Link>
                                                )}
                                            </>
                                        )}

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
                            className="flex items-center gap-2 text-gray-800 font-bold text-xs md:text-sm hover:text-brand-orange transition-colors"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 overflow-hidden border border-blue-200">
                                <i className="ri-user-smile-line text-lg md:text-xl"></i>
                            </div>
                            <span className="hidden sm:inline">Log In \ Sign Up</span>
                        </button>
                    )}

                    {(currentMode === 'seller' || !isLoggedIn) && (
                        <>
                            <Link
                                href={isLoggedIn ? "/seller/settings" : "#"}
                                onClick={(e) => {
                                    if (!isLoggedIn) {
                                        e.preventDefault();
                                        toast.error("Please login to setup your store");
                                        setIsAuthModalOpen(true);
                                    }
                                }}
                                className="bg-white text-brand-orange border border-brand-orange px-3 md:px-5 py-2 md:py-2.5 rounded shadow-sm hover:bg-orange-50 transition font-semibold text-xs md:text-sm whitespace-nowrap"
                            >
                                Setup Store
                            </Link>
                            <Link
                                href={isLoggedIn ? "/seller/place-ad" : "#"}
                                onClick={(e) => {
                                    if (!isLoggedIn) {
                                        e.preventDefault();
                                        toast.error("Please login to list your shop");
                                        setIsAuthModalOpen(true);
                                    }
                                }}
                                className="bg-brand-orange text-white px-3 md:px-5 py-2 md:py-2.5 rounded shadow-md hover:bg-[#e07a46] transition font-semibold text-xs md:text-sm whitespace-nowrap"
                            >
                                List Your Shop
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="border-t border-gray-200 bg-[#FFFBF7] shadow-sm relative z-40">
                <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 flex items-center justify-between gap-4 relative">
                    {/* Browser Categories */}
                    <div className="group shrink-0">
                        <button
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            onBlur={() => setTimeout(() => setShowCategoryDropdown(false), 200)}
                            className="bg-brand-orange text-white px-3 md:px-5 py-1.5 md:py-2 rounded-full flex items-center gap-2 font-medium shadow-sm hover:bg-[#e07a46] transition text-xs md:text-sm"
                        >
                            <span>See All Categories</span>
                            <i className={`ri-arrow-down-s-line transition-transform duration-300 ${showCategoryDropdown ? 'rotate-180' : ''}`}></i>
                        </button>

                        {/* Categories Dropdown */}
                        {showCategoryDropdown && (
                            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="p-4 lg:p-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-4 gap-x-2 lg:gap-6">
                                    {BROWSE_CATEGORIES.map((cat, idx) => (
                                        <Link key={idx} href={cat.link} className="flex flex-col items-center gap-2 group/item p-2 rounded-lg hover:bg-gray-50 transition">
                                            <div className="w-10 h-10 lg:w-16 lg:h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300 border border-gray-100 p-1.5 lg:p-2">
                                                {/* @ts-ignore - isImage property handling */}
                                                {cat.isImage ? (
                                                    <img src={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <i className={`${cat.icon} text-lg lg:text-2xl text-gray-600 group-hover/item:text-brand-orange transition`}></i>
                                                )}
                                            </div>
                                            <span className="text-[10px] lg:text-sm font-bold text-gray-700 group-hover/item:text-brand-orange text-center leading-tight line-clamp-2">{cat.name}</span>
                                        </Link>
                                    ))}
                                </div>
                                <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                                    <Link href="/categories" className="text-xs lg:text-sm font-bold text-brand-orange hover:underline">
                                        View All Categories
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Nav Links mapping - Flex layout instead of absolute centering to prevent overlap */}
                    <nav className="hidden lg:flex flex-1 justify-center items-center gap-4 lg:gap-6 xl:gap-8 text-gray-700 font-medium text-xs md:text-sm">
                        {NAV_ITEMS.slice(0, 8).map((item, index) => (
                            <div
                                key={index}
                                className={`relative group py-2 
                                    ${index > 3 ? 'hidden xl:block' : ''} 
                                    ${index > 5 ? 'xl:hidden 2xl:block' : ''}
                                `}
                                onMouseEnter={() => setActiveDropdown(item.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link href={item.link} className="flex items-center gap-1 hover:text-brand-orange transition whitespace-nowrap">
                                    {item.label}
                                    {item.badge && (
                                        <span className="bg-red-600 text-white text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>
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
                    <div className="flex items-center gap-2 md:gap-3 text-gray-500 shrink-0">
                        <Link
                            href="/buyer/wishlist"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white transition hover:border-brand-orange"
                        >
                            <i className="ri-heart-line text-base md:text-lg"></i>
                        </Link>
                        <Link
                            href="/buyer/messages"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-brand-orange hover:text-white transition hover:border-brand-orange"
                        >
                            <i className="ri-message-3-line text-base md:text-lg"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

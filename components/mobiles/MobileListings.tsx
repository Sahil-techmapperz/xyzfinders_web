"use client";

import MobileCard, { MobileData } from './MobileCard';

const MOBILE_DATA: MobileData[] = [
    {
        id: 1,
        title: "iPhone 15 Pro Max 256 GB Storage Desert Titanium",
        category: "iOS",
        brand: "APPLE",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
        description: "EXCELLENT CONDITION 256GB STORAGE WITH ALL ACCESSORIES...",
        specs: {
            age: "6 MONTHS",
            model: "iPhone 15 Pro Max",
            storage: "256 GB",
            colour: "Desert Titanium"
        },
        price: "₹ 95,000/-",
        location: "Connaught Place, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra 12GB RAM, 512GB Storage",
        category: "Android",
        brand: "SAMSUNG",
        image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=2070&auto=format&fit=crop",
        description: "FLAGSHIP SMARTPHONE WITH AI FEATURES AND S-PEN INCLUDED...",
        specs: {
            age: "3 MONTHS",
            model: "Galaxy S24 Ultra",
            storage: "512 GB",
            colour: "Titanium Black"
        },
        price: "₹ 89,000/-",
        location: "Saket, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "OnePlus 12 Pro 16GB RAM 256GB Storage",
        category: "Android",
        brand: "ONEPLUS",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
        description: "HASSELBLAD CAMERA SYSTEM WITH FAST CHARGING SUPPORT...",
        specs: {
            age: "1 YEAR",
            model: "OnePlus 12 Pro",
            storage: "256 GB",
            colour: "Midnight Black"
        },
        price: "₹ 52,000/-",
        location: "Rohini, New Delhi, Delhi",
        postedTime: "Posted 8 hr ago",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "Google Pixel 8 Pro 12GB RAM 256GB Storage",
        category: "Android",
        brand: "GOOGLE",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop",
        description: "PURE ANDROID EXPERIENCE WITH GOOGLE TENSOR G3 CHIP...",
        specs: {
            age: "BRAND NEW",
            model: "Pixel 8 Pro",
            storage: "256 GB",
            colour: "Obsidian"
        },
        price: "₹ 74,000/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 1 day ago",
        verified: false,
        premium: false
    }
];

const LOCATIONS = [
    { name: "Sarjoni Nagar", active: true },
    { name: "Greater Kailash", active: false },
    { name: "Vasant Kunj", active: false },
    { name: "Defence Colony", active: false },
    { name: "Hauz Khas", active: false },
    { name: "Shanti Niketan", active: false },
    { name: "Gurugram", active: false },
    { name: "Old Delhi", active: false },
    { name: "Chanakyapuri", active: false },
];

export default function MobileListings() {
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header / Titles */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        New and Used Mobile Phones for sale in New Delhi - <span className="text-gray-500 font-normal">8465 available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Brand / Location Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Brand :</span>
                    <div className="flex flex-wrap gap-2">
                        {LOCATIONS.map((loc, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${loc.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#FF8A65]"
                                    }`}
                            >
                                {loc.name}
                                {loc.active && <i className="ri-close-line"></i>}
                            </button>
                        ))}
                        <button className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#FF8A65] text-[#FF8A65] hover:bg-[#FF8A65] hover:text-white transition-colors">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {MOBILE_DATA.map(mobile => (
                        <MobileCard key={mobile.id} item={mobile} />
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-left-double-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white font-bold rounded-lg shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">3</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">4</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">5</button>
                        <span className="text-gray-300">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">10</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-right-double-line"></i></button>
                    </div>
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">HALFPAGE BANNER</div>
                            <div className="text-xs text-gray-400 mb-8">Digital Marketing</div>

                            {/* Styled Ad Content Placeholder similar to image */}
                            <div className="bg-[#FF8A65] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-gray-900 drop-shadow-sm">
                                    click,<br />Grow,<br />Repeat
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#FF8A65] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#FF8A65] transition-colors">
                                        Get Started!
                                    </button>
                                </div>

                                {/* Abstract shapes/image placeholder */}
                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#B39DDB] to-[#9575CD]">
                                        {/* Mock Person Image */}
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

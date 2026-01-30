"use client";

import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

export default function MobileDetail({ id }: { id?: string }) {
    // Mock Data matching the image content
    const item = {
        title: "iPHONE 15 PRO MAX 12 GB RAM, 256 GB STORAGE Desert Titanium",
        price: "₹ 95,000/-",
        postedTime: "Posted 2hr ago",
        specs: [
            { label: "AGE", value: "6 Months" },
            { label: "MODEL", value: "iPhone 15 Pro Max" },
            { label: "STORAGE", value: "256 GB" },
            { label: "COLOUR", value: "Desert Titanium" },
        ],
        details: [
            { label: "Warranty", value: "In Warranty" },
            { label: "Memory", value: "256 GB" },
            { label: "Condition", value: "Like New" },
            { label: "Version", value: "Global" },
            { label: "Battery Health", value: "95%" },
            { label: "Damage on Device", value: "None" },
        ],
        description: `I'm selling my brand new Apple iPhone 15 Pro Max in stunning Desert Titanium color. This device has been sparingly used and is just 6 months old, making it practically like new. With a generous storage capacity of 256 GB, you'll have plenty of space for apps, photos, and videos. It comes equipped with 12 GB of RAM for smooth multitasking.

Additionally, this phone is covered by warranty, ensuring peace of mind for any potential issues. There are no damages on the device, and it has been well taken care of. Battery health is excellent at 95%. If you're looking for a powerful and elegant smartphone, this iPhone 15 Pro Max is the perfect choice!`,
        productSpecs: [
            "- Model : iPhone 15 Pro Max",
            "- Color : Desert Titanium",
            "- Storage Capacity : 256 GB",
            "- Memory RAM : 12 GB",
            "- Warranty : Yes",
        ],
        seller: {
            name: "Rahul Sharma",
            verified: true,
            memberSince: "December 2023",
            image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff",
            id: 1 // Default or from API
        },
        images: [
            "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1592286927505-c6d9c79346c7?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop"
        ]
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section - 3 Images (Matches Property/Auto layout) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image (Left) */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src={item.images[0]}
                            alt="Main View"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Side Images (Right Column, Stacked) */}
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={item.images[1]}
                                alt="Side View 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={item.images[2]}
                                alt="Side View 2"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Title & Specs ROW */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">
                            {item.title}
                        </h1>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-sm">
                                <i className="ri-heart-fill text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition shadow-sm">
                                <i className="ri-share-line text-sm"></i>
                            </button>
                        </div>
                    </div>

                    {/* Specs Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl">
                        {item.specs.map((spec, i) => (
                            <div key={i} className="bg-white border-b-2 border-gray-100 rounded-xl p-3 text-center shadow-sm">
                                <span className="block text-[10px] uppercase font-bold text-gray-800 mb-1">{spec.label}</span>
                                <span className="block text-xs text-gray-500 font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price & Posted Time */}
                    <div className="flex items-center gap-4">
                        <span className="text-[#FF2D55] text-2xl font-bold">{item.price}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {item.postedTime}
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* 3. Main Layout: Details (Left) + Sidebar (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Details */}
                    <div className="xl:col-span-2">

                        {/* Item Details Table */}
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Item Details</h2>

                            <div className="space-y-4">
                                {item.details.map((detail, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">{detail.label}</span>
                                        <span className="text-sm font-bold text-gray-900">{detail.value || '-'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description & Specs */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {item.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Product Specification</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {item.productSpecs.map((spec, i) => (
                                        <li key={i}>{spec}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#FFF0F0] text-[#FF6E40] text-xs font-medium px-3 py-1 rounded">
                                    Face Lens
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller & Banner */}
                    <div className="xl:col-span-1 space-y-6">

                        {/* Seller Card */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-1">Posted By:</p>
                                    <div className="flex items-center gap-3">
                                        <img src={item.seller.image} alt={item.seller.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.seller.name}</h3>
                                            {item.seller.verified && (
                                                <span className="text-[10px] text-blue-500 flex items-center gap-1">
                                                    <i className="ri-checkbox-circle-fill"></i> Verified User
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 mb-4">Member Since from {item.seller.memberSince}</p>

                            <button className="w-full bg-[#D50000] hover:bg-[#b50000] text-white text-xs font-bold py-2.5 rounded-lg mb-2 flex items-center justify-center gap-2 transition-colors">
                                <i className="ri-phone-fill"></i> Call
                            </button>
                            <ContactSellerButton
                                productId={id || 1}
                                sellerId={item.seller.id}
                            />
                        </div>

                        {/* Google Ads Vertical Banner */}
                        <div className="bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px] relative overflow-hidden">
                            <span className="transform -rotate-90 whitespace-nowrap">Google Ads</span>
                        </div>

                    </div>
                </div>

                {/* 4. Similar Properties (Carousel) */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Similar Properties</h2>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition" onClick={() => {
                                const container = document.getElementById('similar-carousel');
                                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                            }}>
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition" onClick={() => {
                                const container = document.getElementById('similar-carousel');
                                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                            }}>
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "Samsung Galaxy S24 Ultra", price: "₹ 89,000/-", image: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "OnePlus 12 Pro", price: "₹ 52,000/-", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop" },
                            { id: 4, title: "Google Pixel 8 Pro", price: "₹ 74,000/-", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop" },
                            { id: 5, title: "iPhone 14 Pro Max", price: "₹ 82,000/-", image: "https://images.unsplash.com/photo-1663499482523-1c0d7e9c07c7?q=80&w=2070&auto=format&fit=crop" },
                            { id: 6, title: "Xiaomi 14 Pro", price: "₹ 48,000/-", image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=2128&auto=format&fit=crop" },
                            { id: 7, title: "Vivo X100 Pro", price: "₹ 65,000/-", image: "https://images.unsplash.com/photo-1592286927505-c6d9c79346c7?q=80&w=2070&auto=format&fit=crop" },
                        ].map((mobile) => (
                            <div key={mobile.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                <div className="h-48 bg-gray-100 relative">
                                    <img src={mobile.image} alt={mobile.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{mobile.title}</h3>
                                    <div className="text-[#FF6E40] font-bold text-sm">{mobile.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

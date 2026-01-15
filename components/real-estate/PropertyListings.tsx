"use client";

import { useState, Suspense, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import GoogleAdBanner from '@/components/home/GoogleAdBanner';
import Link from 'next/link';

interface Property {
    id: number;
    title: string;
    category: string;
    type: string; // e.g., Apartment, House
    price: string;
    location: string;
    specs: {
        bedroom?: number;
        kitchen?: number;
        bathroom?: number;
        sharing?: string; // For PG
    };
    tags: string[];
    image: string;
    verified: boolean;
    premium: boolean;
}

const properties: Property[] = [
    {
        id: 1,
        title: "Premium 4BHK Apartment for Rent",
        category: "Apartment",
        type: "Apartment",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 4, kitchen: 1, bathroom: 2 },
        tags: ["Spacious Plot", "Unfurnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Premium 2BHK Apartment for Rent",
        category: "House",
        type: "House",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 2, kitchen: 1, bathroom: 1 },
        tags: ["Room with Partition", "Fullfurnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "High-End Executive Female Bed Space |",
        category: "Girls PG",
        type: "Girls PG",
        price: "₹ 5,500",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { sharing: "4 Bed Sharing" },
        tags: ["Spacious Plot", "Unfurnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 4,
        title: "Premium 3BHK Apartment for Rent",
        category: "Apartment",
        type: "Apartment",
        price: "₹ 9,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 3, kitchen: 1, bathroom: 2 },
        tags: ["Spacious Plot", "Semi-furnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1522771753035-4a53c9f13185?w=800&q=80",
        verified: true,
        premium: true
    },
    {
        id: 5,
        title: "Premium 5BHK Apartment for Rent",
        category: "Apartment",
        type: "Apartment",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        specs: { bedroom: 5, kitchen: 2, bathroom: 3 },
        tags: ["Spacious Plot", "Fully-furnished", "Ready to Shift"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
        verified: true,
        premium: true
    }
];

const locations = [
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

function PropertyListingsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const typeParam = searchParams.get('type');

    // Filter properties based on query params
    const filteredProperties = properties.filter(property => {
        const matchesCategory = categoryParam
            ? property.category.toLowerCase().includes(categoryParam.toLowerCase())
            : true;
        const matchesType = typeParam
            ? property.type.toLowerCase().includes(typeParam.toLowerCase())
            : true;

        return matchesCategory && matchesType;
    });

    return (
        <section className="container mx-auto px-4 py-8 font-jost">
            {/* Breadcrumb & Title */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Real Estate {typeParam ? `for ${typeParam}` : ''} {categoryParam ? `in ${categoryParam}` : ''}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {categoryParam || 'Real Estate'} {typeParam ? `for ${typeParam}` : ''} in New Delhi - <span className="font-bold">{filteredProperties.length}</span> <span className="text-gray-500 font-normal text-xl">available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Sort By :</span>
                        <div className="relative">
                            <button className="text-brand-orange text-sm font-medium flex items-center gap-1 border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 rounded">
                                Popular <i className="ri-arrow-down-s-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <span className="font-bold text-sm text-gray-800">Location :-</span>
                <div className="flex flex-wrap gap-2">
                    {locations.map((loc, idx) => (
                        <button
                            key={idx}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${loc.active
                                ? "bg-brand-orange text-white flex items-center gap-2"
                                : "bg-white text-gray-600 hover:text-brand-orange hover:bg-orange-50 border border-transparent"
                                }`}
                        >
                            {loc.name}
                            {loc.active && <i className="ri-close-line bg-white/20 rounded-full p-0.5"></i>}
                        </button>
                    ))}
                    <button className="px-4 py-1.5 rounded-full text-xs font-medium text-brand-orange border border-brand-orange hover:bg-brand-orange hover:text-white transition-all">
                        View More
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Listings */}
                <div className="lg:col-span-3 flex flex-col gap-6">

                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property, index) => (
                            <Fragment key={property.id}>
                                <PropertyCard property={property} />

                                {/* In-feed Banner Ad (Inserted after 2nd item) */}
                                {index === 1 && (
                                    <GoogleAdBanner />
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
                            <i className="ri-home-search-line text-4xl text-gray-300 mb-3 block"></i>
                            <h3 className="text-xl font-bold text-gray-700">No properties found</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your filters.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:border-brand-orange hover:text-brand-orange bg-white">
                            <i className="ri-arrow-left-double-line"></i>
                        </button>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
                            <button
                                key={page}
                                className={`w-8 h-8 flex items-center justify-center border rounded text-xs font-semibold ${page === 1
                                    ? "border-brand-orange bg-brand-orange text-white"
                                    : "border-gray-200 bg-white text-gray-500 hover:border-brand-orange hover:text-brand-orange"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-500 hover:border-brand-orange hover:text-brand-orange bg-white">
                            <i className="ri-arrow-right-double-line"></i>
                        </button>
                    </div>

                </div>

                {/* Right Column: Google Ads */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                </div>
            </div>
        </section>
    );
}

function PropertyCard({ property }: { property: Property }) {
    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-72">

            {/* Image Section */}
            <div className="relative w-full md:w-[45%] h-56 md:h-full bg-gray-100 overflow-hidden cursor-pointer">
                <Link href={`/real-estate/${property.id}`}>
                    <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Verified Badge */}
                {property.verified && (
                    <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white">
                        <i className="ri-check-line text-sm font-bold"></i>
                    </div>
                )}

                {/* Premium Badge */}
                {property.premium && (
                    <div className="absolute top-4 right-0 z-10 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-2 py-0.5 shadow-sm border-l border-b border-[#FFE082] uppercase tracking-wide">
                        Premium
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 lg:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight mb-1">
                            {property.title}
                        </h3>
                    </div>

                    <p className="text-gray-500 text-xs font-medium mb-3">{property.category}</p>

                    {/* Specs Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                        {property.specs.sharing ? (
                            <div className="flex items-center gap-1.5"><i className="ri-hotel-bed-line text-gray-400 text-sm"></i> {property.specs.sharing}</div>
                        ) : (
                            <>
                                <div className="flex items-center gap-1.5"><i className="ri-hotel-bed-line text-gray-400 text-sm"></i> {property.specs.bedroom} Bedroom</div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1.5"><i className="ri-restaurant-line text-gray-400 text-sm"></i> {property.specs.kitchen} Kitchen</div>
                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-1.5"><i className="ri-drop-line text-gray-400 text-sm"></i> {property.specs.bathroom} Bathroom</div>
                            </>
                        )}
                    </div>

                    {/* Tags Row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 font-medium mb-4">
                        {property.tags.map((tag, i) => (
                            <span key={i} className="flex items-center">
                                {tag}
                                {i < property.tags.length - 1 && <span className="mx-2 text-gray-300 font-light">|</span>}
                            </span>
                        ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-gray-400 mb-4">
                        <i className="ri-map-pin-line mt-0.5"></i>
                        <span className="line-clamp-1">{property.location}</span>
                    </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <span className="text-[#FF4D4D] text-lg md:text-xl font-bold">{property.price}</span>
                        <span className="text-gray-500 text-xs font-medium">/Monthly</span>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFF0F0] text-[#FF4D4D] text-xs font-bold hover:bg-[#FF4D4D] hover:text-white transition-all shadow-sm border border-[#FFCDD2]/50">
                            <i className="ri-phone-line text-sm"></i> Call
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#E3F2FD] text-[#2196F3] text-xs font-bold hover:bg-[#2196F3] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50">
                            <i className="ri-chat-3-line text-sm"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PropertyListings() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PropertyListingsContent />
        </Suspense>
    );
}

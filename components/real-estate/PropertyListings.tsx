"use client";

import { useState, Suspense, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import GoogleAdBanner from '@/components/home/GoogleAdBanner';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

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

    images: string[];
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
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
        ],
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
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
        ],
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
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=60"
        ],
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
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=60",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"
        ],
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
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"
        ],
        verified: true,
        premium: true
    }
];

const initialLocations = [
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
    const [locations, setLocations] = useState(initialLocations);

    const toggleLocation = (index: number) => {
        setLocations(prev => prev.map((loc, i) =>
            i === index ? { ...loc, active: !loc.active } : loc
        ));
    };

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
                <div className="flex flex-col gap-3">
                    {/* Mobile: Title & Count Combined */}
                    <div className="md:hidden">
                        <h1 className="text-base font-bold text-gray-900 leading-tight">
                            {categoryParam || 'Property'} {typeParam ? `for ${typeParam}` : 'for Rent'} in New Delhi
                            <span className="text-xs font-normal text-gray-500 ml-1">
                                - {filteredProperties.length}(Available)
                            </span>
                        </h1>
                    </div>

                    {/* Desktop Title */}
                    <h1 className="hidden md:block text-3xl font-bold text-gray-900 leading-tight">
                        {categoryParam || 'Real Estate'} {typeParam ? `for ${typeParam}` : ''} in New Delhi
                        <span className="ml-2 text-xl font-normal text-gray-500">
                            - <span className="font-bold text-gray-900">{filteredProperties.length}</span> available
                        </span>
                    </h1>

                    {/* Desktop Sort (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center justify-end w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">Sort By:</span>
                            <div className="relative">
                                <button className="text-brand-orange text-sm font-medium flex items-center gap-1 border border-brand-orange/20 bg-brand-orange/5 px-3 py-1.5 rounded-lg active:bg-brand-orange/10">
                                    Popular <i className="ri-arrow-down-s-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location Tags */}
            <div className="mb-6 pb-4 md:border-b md:border-gray-100">
                <div className="hidden md:flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-gray-800">Popular Locations</span>
                    <span className="text-xs text-brand-orange font-medium">View All</span>
                </div>
                <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {locations.map((loc, idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleLocation(idx)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${loc.active
                                ? "bg-brand-orange text-white flex items-center gap-2 shadow-sm"
                                : "bg-white border border-gray-200 text-gray-600"
                                }`}
                        >
                            {loc.name}
                            {loc.active && <i className="ri-close-line bg-white/20 rounded-full p-0.5"></i>}
                        </button>
                    ))}
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



export default function PropertyListings() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PropertyListingsContent />
        </Suspense>
    );
}

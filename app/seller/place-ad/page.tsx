"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function PlaceAdPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        {
            name: "Property",
            subtitle: "Rent or Sell Properties",
            icon: "ri-building-4-line",
            gradient: "from-purple-500 to-purple-600",
            active: false,
            href: "/seller/place-ad/property/create"
        },
        {
            name: "Gadgets & Electronics",
            subtitle: "Laptops, Cameras, Gaming",
            icon: "ri-cpu-line",
            gradient: "from-blue-500 to-cyan-500",
            active: true,
            href: "/seller/place-ad/gadgets/create"
        },
        {
            name: "Automobiles",
            subtitle: "Cars, Bikes, Scooters",
            icon: "ri-car-line",
            gradient: "from-red-500 to-orange-500",
            active: false,
            href: "/seller/place-ad/automobiles/create"
        },
        {
            name: "Mobiles & Tablets",
            subtitle: "Smartphones, iPads, Accessories",
            icon: "ri-smartphone-line",
            gradient: "from-green-500 to-emerald-500",
            active: false,
            href: "/seller/place-ad/mobiles/create"
        },
        {
            name: "Furniture & Appliances",
            subtitle: "Home & Kitchen Essentials",
            icon: "ri-sofa-line",
            gradient: "from-amber-500 to-yellow-500",
            active: false,
            href: "/seller/place-ad/furniture/create"
        },
        {
            name: "Services",
            subtitle: "Professional Services",
            icon: "ri-customer-service-2-line",
            gradient: "from-indigo-500 to-blue-500",
            active: false,
            href: "/seller/place-ad/services/create"
        },
        {
            name: "Education & Learning",
            subtitle: "Courses, Tutoring, Books",
            icon: "ri-book-open-line",
            gradient: "from-teal-500 to-cyan-500",
            active: false,
            href: "/seller/place-ad/education/create"
        },
        {
            name: "Beauty & Wellness",
            subtitle: "Cosmetics, Spa, Salon",
            icon: "ri-heart-pulse-line",
            gradient: "from-pink-500 to-rose-500",
            active: false,
            href: "/seller/place-ad/beauty/create"
        },
        {
            name: "Pets & Accessories",
            subtitle: "Pet Food, Toys, Grooming",
            icon: "ri-bear-smile-line",
            gradient: "from-orange-500 to-red-500",
            active: false,
            href: "/seller/place-ad/pets/create"
        },
        {
            name: "Events",
            subtitle: "Organize & List Events",
            icon: "ri-calendar-event-line",
            gradient: "from-violet-500 to-purple-500",
            active: false,
            href: "/seller/place-ad/events/create"
        },
        {
            name: "Jobs & Career",
            subtitle: "Employment, Hiring, Opportunities",
            icon: "ri-briefcase-line",
            gradient: "from-sky-500 to-blue-600",
            active: false,
            href: "/seller/place-ad/jobs/create"
        },
        {
            name: "Fashion & Lifestyle",
            subtitle: "Clothing, Accessories, Fashion",
            icon: "ri-shirt-line",
            gradient: "from-fuchsia-500 to-pink-600",
            active: false,
            href: "/seller/place-ad/fashion/create"
        },
    ];

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen font-jost  from-orange-50 via-white to-purple-50">
            {/* Header */}
            {/* <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4 py-4 max-w-6xl">
                    <Link href="/seller/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-orange transition">
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span className="font-medium">Back to Dashboard</span>
                    </Link>
                </div>
            </div> */}

            <div className="container mx-auto px-4 py-12 max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-orange to-orange-600 rounded-full mb-6 shadow-lg">
                        <i className="ri-add-circle-line text-4xl text-white"></i>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        What Are You Listing Today?
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Choose a category below to start creating your ad. Reach millions of buyers across India.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-5 py-4 pl-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition shadow-sm"
                        />
                        <i className="ri-search-line text-2xl text-gray-400 absolute left-5 top-1/2 -translate-y-1/2"></i>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <i className="ri-close-circle-fill text-xl"></i>
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories Grid */}
                {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCategories.map((cat, index) => (
                            <Link
                                href={cat.href}
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                                {/* Active Badge */}
                                {cat.active && (
                                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                        <i className="ri-check-line"></i>
                                        <span>Active</span>
                                    </div>
                                )}

                                <div className="p-6 relative">
                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <i className={`${cat.icon} text-3xl text-white`}></i>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-orange transition">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {cat.subtitle}
                                    </p>

                                    {/* CTA */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-brand-orange group-hover:underline">
                                            Create Ad
                                        </span>
                                        <i className="ri-arrow-right-line text-xl text-brand-orange group-hover:translate-x-1 transition-transform"></i>
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className={`h-1 bg-gradient-to-r ${cat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <i className="ri-search-line text-6xl text-gray-300 mb-4 block"></i>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
                        <p className="text-gray-400">Try a different search term</p>
                    </div>
                )}

                {/* Help Section */}
                <div className="mt-16 bg-gradient-to-r from-brand-orange to-orange-600 rounded-2xl p-8 md:p-12 text-center shadow-xl">
                    <i className="ri-question-line text-5xl text-white mb-4 block"></i>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Need Help Posting Your Ad?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                        Our team is here to assist you. Get tips on creating effective ads and reaching more buyers.
                    </p>
                    <button className="bg-white text-brand-orange px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition shadow-lg inline-flex items-center gap-2">
                        <i className="ri-customer-service-2-line text-xl"></i>
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
}

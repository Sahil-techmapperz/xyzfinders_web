"use client";

import { useState } from 'react';
import FilterPopup from './FilterPopup';

export default function BeautyHero() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            {/* Mobile Header (Visible only on mobile) */}
            <div className="md:hidden bg-white border-b border-gray-100 pb-2">
                <div className="px-4 pt-4 pb-2">
                    {/* Mobile Filters Scroll */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => setShowFilters(true)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange text-brand-orange bg-orange-50 text-sm font-medium whitespace-nowrap shrink-0"
                        >
                            <i className="ri-equalizer-line"></i>
                            View More
                        </button>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>City</option>
                            <option>New Delhi</option>
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                        </select>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>Price Range</option>
                            <option>Under ₹500</option>
                            <option>₹500 - ₹2000</option>
                            <option>Above ₹2000</option>
                        </select>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>Service</option>
                            <option>Haircut</option>
                            <option>Facial</option>
                            <option>Massage</option>
                            <option>Makeup</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Filter Popup */}
            {showFilters && <FilterPopup onClose={() => setShowFilters(false)} />}

            {/* Desktop Hero (Hidden on mobile) */}
            <section className="hidden md:flex relative w-full h-[350px] items-center justify-center bg-cover bg-center z-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2074&auto=format&fit=crop')" }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                    <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-md font-jost">
                        Find Beauty & Wellness Services Near You
                    </h1>

                    {/* Search Bar Container */}
                    <div className="bg-white rounded-2xl shadow-2xl p-4 mx-auto max-w-5xl font-jost">
                        <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">

                            {/* City */}
                            <div className="w-full md:w-[20%] p-3">
                                <label className="block text-sm font-bold text-gray-900 mb-1">City</label>
                                <div className="flex items-center justify-between cursor-pointer group">
                                    <input type="text" placeholder="Search the city" className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                                </div>
                            </div>

                            {/* Service */}
                            <div className="w-full md:w-[25%] p-3">
                                <label className="block text-sm font-bold text-gray-900 mb-1">Service</label>
                                <div className="flex items-center justify-between cursor-pointer group">
                                    <input type="text" placeholder="Salon, Spa, Massage..." className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="w-full md:w-[20%] p-3">
                                <label className="block text-sm font-bold text-gray-900 mb-1">Price Range</label>
                                <div className="flex items-center justify-between cursor-pointer">
                                    <span className="text-xs text-gray-500">Select</span>
                                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="w-full md:w-[20%] p-3">
                                <label className="block text-sm font-bold text-gray-900 mb-1">Filters</label>
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => setShowFilters(true)}
                                >
                                    <span className="text-xs text-gray-500 truncate">Gender, Rating, ...</span>
                                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="w-full md:w-[15%] p-2 flex justify-end">
                                <button className="w-full bg-[#FF8A65] hover:bg-[#FF7043] text-white font-bold text-sm py-3 px-4 rounded-lg shadow-md transition-all">
                                    Search Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

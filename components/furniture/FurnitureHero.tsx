"use client";

import { useState } from 'react';
import FilterPopup from './FilterPopup';

export default function FurnitureHero() {
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
                            <option>Under ₹5000</option>
                            <option>₹5000 - ₹20000</option>
                            <option>Above ₹20000</option>
                        </select>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>Category</option>
                            <option>Sofa</option>
                            <option>Bed</option>
                            <option>Dining</option>
                            <option>Office</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Desktop Hero (Hidden on mobile) */}
            <section className="hidden md:flex relative w-full h-[350px] items-center justify-center bg-cover bg-center z-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop')" }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                    <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-md font-jost">
                        Find Furniture & Appliances for Sale or Buy
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

                            {/* Category */}
                            <div className="w-full md:w-[25%] p-3">
                                <label className="block text-sm font-bold text-gray-900 mb-1">Category</label>
                                <div className="flex items-center justify-between cursor-pointer group">
                                    <input type="text" placeholder="Sofa, Bed, Table..." className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
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
                            <div className="w-full md:w-[20%] p-3" onClick={() => setShowFilters(true)}>
                                <label className="block text-sm font-bold text-gray-900 mb-1">Filters</label>
                                <div className="flex items-center justify-between cursor-pointer">
                                    <span className="text-xs text-gray-500 truncate">Condition, Material, ...</span>
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

            {/* Filter Popup */}
            {showFilters && (
                <FilterPopup onClose={() => setShowFilters(false)} />
            )}
        </>
    );
}

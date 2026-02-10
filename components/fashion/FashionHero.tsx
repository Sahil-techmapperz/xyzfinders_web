"use client";

import { useState } from 'react';
import FilterPopup from './FilterPopup';

export default function FashionHero() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full min-h-[400px] flex items-center justify-center bg-cover bg-center z-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')" }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl py-12 md:py-0">

                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-2 drop-shadow-md px-4">
                        Discover Your Style
                    </h1>
                    <p className="text-white text-center mb-8 text-base md:text-lg opacity-90 font-medium px-4">
                        Find the best fashion deals in your city
                    </p>

                    {/* Search Bar Container */}
                    <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mx-auto w-full max-w-5xl">
                        <div className="flex flex-col lg:flex-row items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 gap-y-4 lg:gap-y-0">

                            {/* City */}
                            <div className="w-full lg:w-[15%] p-2 lg:px-4">
                                <label className="block text-sm font-extrabold text-gray-800 mb-1">City</label>
                                <div className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-xs text-gray-500 font-medium group-hover:text-brand-orange transition-colors">New Delhi</span>
                                    <i className="ri-arrow-down-s-line text-gray-300 group-hover:text-brand-orange transition-colors"></i>
                                </div>
                            </div>

                            {/* Keywords */}
                            <div className="w-full lg:w-[30%] p-2 lg:px-4">
                                <label className="block text-sm font-extrabold text-gray-800 mb-1">Search</label>
                                <div className="flex items-center justify-between bg-gray-50 lg:bg-transparent rounded-lg lg:rounded-none px-3 lg:px-0 py-2 lg:py-0">
                                    <input
                                        type="text"
                                        placeholder="Search for brands, items..."
                                        className="w-full text-xs text-gray-600 font-medium focus:outline-none placeholder-gray-400 bg-transparent"
                                    />
                                    <i className="ri-search-line text-gray-400"></i>
                                </div>
                            </div>

                            {/* Category */}
                            <div className="w-full lg:w-[15%] p-2 lg:px-4">
                                <label className="block text-sm font-extrabold text-gray-800 mb-1">Category</label>
                                <div className="flex items-center justify-between cursor-pointer group">
                                    <span className="text-xs text-gray-500 font-medium group-hover:text-brand-orange transition-colors">All</span>
                                    <i className="ri-arrow-down-s-line text-gray-300 group-hover:text-brand-orange transition-colors"></i>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="w-full lg:w-[20%] p-2 lg:px-4 relative">
                                <label className="block text-sm font-extrabold text-gray-800 mb-1">Filters</label>
                                <div
                                    className="flex items-center justify-between cursor-pointer group"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <span className="text-xs text-gray-500 font-medium truncate group-hover:text-brand-orange transition-colors">More Filters...</span>
                                    <i className="ri-sound-module-line text-gray-300 group-hover:text-brand-orange transition-colors"></i>
                                </div>

                                {/* Popup */}
                                {showFilters && (
                                    <FilterPopup onClose={() => setShowFilters(false)} />
                                )}
                            </div>

                            {/* Search Button */}
                            <div className="w-full lg:w-[20%] p-2 flex justify-end">
                                <button className="w-full bg-[#FF8A65] hover:bg-[#FF7043] text-white font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95">
                                    <i className="ri-search-2-line"></i>
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

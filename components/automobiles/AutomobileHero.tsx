"use client";

import { useState } from 'react';
import FilterPopup from './FilterPopup';

export default function AutomobileHero() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <section className="relative w-full h-[400px] flex items-center justify-center bg-cover bg-center z-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')" }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-md">
                    Get Fast a Apartment for Sale or Buy ?
                </h1>

                {/* Search Bar Container */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 mx-auto">
                    <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">

                        {/* City */}
                        <div className="w-full md:w-[15%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">City</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500 font-medium">Rent</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Make & Model */}
                        <div className="w-full md:w-[20%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Make & Model</label>
                            <div className="flex items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Search make & model"
                                    className="w-full text-xs text-gray-500 font-medium focus:outline-none placeholder-gray-400"
                                />
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="w-full md:w-[15%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Price Range</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500 font-medium">Select</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Year */}
                        <div className="w-full md:w-[10%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Year</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500 font-medium">Select</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Kilometers */}
                        <div className="w-full md:w-[13%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Kilometers</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500 font-medium">Any</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="w-full md:w-[15%] p-2 md:px-4 relative">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Filters</label>
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <span className="text-xs text-gray-500 font-medium truncate">Specification, Keywords, ...</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>

                            {/* Popup */}
                            {showFilters && (
                                <FilterPopup onClose={() => setShowFilters(false)} />
                            )}
                        </div>

                        {/* Search Button */}
                        <div className="w-full md:w-[12%] p-2 flex justify-end">
                            <button className="w-full bg-[#FF8A65] hover:bg-[#FF7043] text-white font-bold text-sm py-3 px-4 rounded-lg shadow-md transition-all">
                                Search Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

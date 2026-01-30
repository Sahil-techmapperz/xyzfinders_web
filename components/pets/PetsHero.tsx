"use client";

import { useState } from 'react';

export default function PetsHero() {
    return (
        <section className="relative w-full h-[350px] flex items-center justify-center bg-cover bg-center z-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2086&auto=format&fit=crop')" }}>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                <h1 className="text-2xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-md font-jost">
                    Pets & Animals Accessories
                </h1>

                {/* Search Bar Container */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 mx-auto max-w-5xl font-jost">
                    <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        {/* City */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">City</label>
                            <div className="flex items-center justify-between cursor-pointer group">
                                <input type="text" placeholder="Search city" className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                <i className="ri-arrow-down-s-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Pet Type */}
                        <div className="w-full md:w-[25%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Looking For?</label>
                            <div className="flex items-center justify-between cursor-pointer group">
                                <input type="text" placeholder="Dog, Cat, Food, etc." className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                <i className="ri-arrow-down-s-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Price Range</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500">Any Price</span>
                                <i className="ri-arrow-down-s-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Filters</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500 truncate">Breed, Age, Gender...</span>
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
    );
}

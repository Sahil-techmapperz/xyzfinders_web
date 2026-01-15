"use client";

import Link from 'next/link';
import { useState } from 'react';
import JobFilterPopup from './JobFilterPopup';

export default function JobsHero() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <section className="relative w-full bg-[#EA580C] min-h-[500px] z-20">
            {/* Background Wrapper (Clipped) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                </div>

                {/* Background Decorations - Abstract overlay */}
                <div className="absolute inset-0 opacity-10 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    {/* Floating Icons (Simulating the 'flying papers' in design) */}
                    <i className="ri-file-list-3-line absolute top-10 left-[10%] text-6xl text-white transform -rotate-12 opacity-20"></i>
                    <i className="ri-briefcase-4-line absolute bottom-20 right-[15%] text-8xl text-white transform rotate-12 opacity-20"></i>
                    <i className="ri-search-eye-line absolute top-20 right-[30%] text-5xl text-white transform -rotate-45 opacity-20"></i>
                </div>

                {/* Bottom Curve/Wave (Optional, using simple CSS shape or SVG) */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-[#FFFBF0] rounded-t-[50%] scale-x-150 translate-y-6"></div>
            </div>

            <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10 flex flex-col items-center">
                {/* Logo */}
                <div className="mb-8 p-3 bg-white rounded-lg shadow-lg">
                    <img src="/logo.png" alt="XYZ Finders" className="h-12 w-auto" />
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-md">
                    Get Fast a Job !
                </h1>

                {/* Search Bar Container */}
                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-3 md:p-4 mx-auto transform translate-y-8 md:translate-y-12">
                    <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">

                        {/* Job Role */}
                        <div className="w-full md:w-[20%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Job Role</label>
                            <div className="flex items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    className="w-full text-xs text-gray-500 font-medium focus:outline-none placeholder-gray-400"
                                />
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="w-full md:w-[20%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Location</label>
                            <div className="flex items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full text-xs text-gray-500 font-medium focus:outline-none placeholder-gray-400"
                                />
                                <i className="ri-map-pin-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Qualification */}
                        <div className="w-full md:w-[20%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Qualification</label>
                            <div className="flex items-center justify-between">
                                <input
                                    type="text"
                                    placeholder="Enter Qualification"
                                    className="w-full text-xs text-gray-500 font-medium focus:outline-none placeholder-gray-400"
                                />
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Job Type */}
                        <div className="w-full md:w-[15%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Job type</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-400 font-medium truncate">Enter Job type</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="w-full md:w-[13%] p-2 md:px-4">
                            <label className="block text-sm font-extrabold text-gray-800 mb-1">Experience</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-400 font-medium truncate">Any</span>
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
                                <span className="text-xs text-gray-500 font-medium truncate">More...</span>
                                <i className="ri-arrow-down-s-line text-gray-300"></i>
                            </div>
                            {showFilters && <JobFilterPopup onClose={() => setShowFilters(false)} />}
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

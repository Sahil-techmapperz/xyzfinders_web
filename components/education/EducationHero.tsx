"use client";

import { useState } from 'react';

export default function EducationHero() {
    return (
        <section className="relative w-full h-[350px] flex items-center justify-center bg-white z-20">
            {/* Background Image - now distinct from container content */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop')" }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                {/* Hero Content with Image - Optional Split or Centered */}
                <div className="relative z-10 text-center mb-8">
                    {/* OPTIONAL: If user wants a specific 'image' IN the section, I'll add a small icon/image above the text or make it more prominent */}
                    {/* The prompt said "put a image in the hero section". A background is already there. Maybe they want a visible ILLUSTRATION or ICON. */}
                    {/* I will add a floating icon/book image for "School/College" vibe above title to make it distinct. */}
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                        <i className="ri-graduation-cap-fill text-4xl text-white"></i>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md font-jost">
                        Find Best Tutors, Coaching & Courses
                    </h1>
                </div>

                {/* Search Bar Container */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 mx-auto max-w-5xl font-jost">
                    <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        {/* Location */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Location</label>
                            <div className="flex items-center justify-between cursor-pointer group">
                                <input type="text" placeholder="Search Area" className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                <i className="ri-arrow-down-s-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Subject/Course */}
                        <div className="w-full md:w-[25%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Subject / Course</label>
                            <div className="flex items-center justify-between cursor-pointer group">
                                <input type="text" placeholder="Maths, English, Coding..." className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                <i className="ri-arrow-down-s-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Level */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Level</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500">School / College</span>
                                <i className="ri-arrow-down-s-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Mode */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Mode</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500 truncate">Online / Offline</span>
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

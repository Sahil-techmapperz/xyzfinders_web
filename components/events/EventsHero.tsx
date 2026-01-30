"use client";

import { useState } from 'react';

export default function EventsHero() {
    return (
        <section className="relative w-full h-[350px] flex items-center justify-center bg-white z-20">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')" }}>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                <div className="relative z-10 text-center mb-8">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                        <i className="ri-calendar-event-fill text-4xl text-white"></i>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-md font-jost">
                        Discover Local Events & Happenings
                    </h1>
                </div>

                {/* Search Bar Container */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 mx-auto max-w-4xl font-jost">
                    <div className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">

                        {/* Search Input */}
                        <div className="w-full md:w-[40%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Search Event</label>
                            <div className="flex items-center justify-between cursor-pointer group">
                                <input type="text" placeholder="Music, Comedy, Workshop..." className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                <i className="ri-search-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="w-full md:w-[25%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">City / Area</label>
                            <div className="flex items-center justify-between cursor-pointer group">
                                <input type="text" placeholder="New Delhi" className="w-full text-xs text-gray-500 outline-none placeholder-gray-400 group-hover:text-gray-700" />
                                <i className="ri-map-pin-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="w-full md:w-[20%] p-3">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Date</label>
                            <div className="flex items-center justify-between cursor-pointer">
                                <span className="text-xs text-gray-500">Any Date</span>
                                <i className="ri-calendar-line text-gray-400"></i>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="w-full md:w-[15%] p-2 flex justify-end">
                            <button className="w-full bg-[#FF8A65] hover:bg-[#FF7043] text-white font-bold text-sm py-3 px-4 rounded-lg shadow-md transition-all">
                                Find
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

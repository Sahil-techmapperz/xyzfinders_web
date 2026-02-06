"use client";

import { useState, Fragment } from 'react';
import MobileFilterPopup from './MobileFilterPopup';

export default function MobileHero() {
    const [city, setCity] = useState('');
    const [device, setDevice] = useState('');
    const [priceRange, setPriceRange] = useState('Select');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching with:', { city, device, priceRange });
        // Implement search logic here
    };

    return (
        <Fragment>
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

                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none"
                        >
                            <option value="">City</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>

                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none"
                        >
                            <option value="Select">Price Range</option>
                            <option value="Under ₹10k">Under ₹10k</option>
                            <option value="₹10k - ₹30k">₹10k - ₹30k</option>
                            <option value="₹30k - ₹50k">₹30k - ₹50k</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Desktop Hero (Hidden on mobile) */}
            <section className="hidden md:block relative py-20 bg-linear-to-br from-[#3d2f3f] via-[#4a3d5c] to-[#2d2438] z-20">
                {/* Background Wrapper (Clipped) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-40 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1556656793-024524432fbc?q=80&w=2070&auto=format&fit=crop')",
                            backgroundBlendMode: 'multiply'
                        }}
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#3d2f3f]/50 to-[#3d2f3f]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
                    {/* Title */}
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 font-jost">
                        Find Mobile Phones
                    </h1>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto font-jost">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">

                            {/* City */}
                            <div className="lg:col-span-3">
                                <label className="block text-gray-800 font-semibold mb-2 text-sm">City</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Search city"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange pr-10"
                                    />
                                    <i className="ri-map-pin-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                                </div>
                            </div>

                            {/* Device */}
                            <div className="lg:col-span-4">
                                <label className="block text-gray-800 font-semibold mb-2 text-sm">Device</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={device}
                                        onChange={(e) => setDevice(e.target.value)}
                                        placeholder="Search device (e.g. iPhone 15)"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange pr-10"
                                    />
                                    <i className="ri-smartphone-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="lg:col-span-3">
                                <label className="block text-gray-800 font-semibold mb-2 text-sm">Price Range</label>
                                <select
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-700"
                                >
                                    <option value="Select">Any Price</option>
                                    <option value="Under ₹10k">Under ₹10k</option>
                                    <option value="₹10k - ₹30k">₹10k - ₹30k</option>
                                    <option value="₹30k - ₹50k">₹30k - ₹50k</option>
                                    <option value="Above ₹50k">Above ₹50k</option>
                                </select>
                            </div>

                            {/* Search Button */}
                            <div className="lg:col-span-2">
                                <label className="block text-gray-800 font-semibold mb-2 text-sm opacity-0 pointer-events-none">Search</label>
                                <button
                                    type="submit"
                                    className="w-full bg-brand-orange hover:bg-[#e07a46] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Additional Filters Trigger */}
                        <div className="mt-4 pt-4 border-t border-gray-200 relative">
                            <div
                                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors inline-flex"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <i className="ri-filter-3-line text-brand-orange"></i>
                                <span className="text-gray-700 font-medium text-sm">Advanced Filters</span>
                                <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`}></i>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Filter Popup */}
            {showFilters && (
                <div className="z-50 relative">
                    <MobileFilterPopup onClose={() => setShowFilters(false)} />
                </div>
            )}
        </Fragment>
    );
}

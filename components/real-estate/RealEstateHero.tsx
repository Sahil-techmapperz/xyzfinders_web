"use client";

import { useState } from 'react';
import RealEstateFilterPopup from './RealEstateFilterPopup';

export default function RealEstateHero() {
    const [purpose, setPurpose] = useState('Rent');
    const [location, setLocation] = useState('');
    const [propertyType, setPropertyType] = useState('All the Residential');
    const [priceRange, setPriceRange] = useState('Any');
    const [roomType, setRoomType] = useState('Any');
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching with:', { purpose, location, propertyType, priceRange, roomType });
        // Implement search logic here
    };

    return (
        <section className="relative py-20 bg-linear-to-br from-[#3d2f3f] via-[#4a3d5c] to-[#2d2438] z-20">
            {/* Background Wrapper (Clipped) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background City Skyline Image */}
                <div
                    className="absolute inset-0 opacity-40 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80')",
                        backgroundBlendMode: 'multiply'
                    }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#3d2f3f]/50 to-[#3d2f3f]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Title */}
                <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
                    Get Fast a Apartment for Sale or Buy ?
                </h1>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">

                        {/* Purpose */}
                        <div className="lg:col-span-1">
                            <label className="block text-gray-800 font-semibold mb-2 text-sm">Purpose</label>
                            <select
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-700"
                            >
                                <option>Rent</option>
                                <option>Buy</option>
                                <option>Sell</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="lg:col-span-1">
                            <label className="block text-gray-800 font-semibold mb-2 text-sm">Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange pr-10"
                                />
                                <i className="ri-map-pin-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                            </div>
                        </div>

                        {/* Property Type */}
                        <div className="lg:col-span-1">
                            <label className="block text-gray-800 font-semibold mb-2 text-sm">Property Type</label>
                            <select
                                value={propertyType}
                                onChange={(e) => setPropertyType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-700"
                            >
                                <option>All the Residential</option>
                                <option>Apartment</option>
                                <option>House</option>
                                <option>Villa</option>
                                <option>Commercial</option>
                                <option>Land</option>
                            </select>
                        </div>

                        {/* Price Range */}
                        <div className="lg:col-span-1">
                            <label className="block text-gray-800 font-semibold mb-2 text-sm">Price Range</label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-700"
                            >
                                <option>Any</option>
                                <option>Under ₹50L</option>
                                <option>₹50L - ₹1Cr</option>
                                <option>₹1Cr - ₹2Cr</option>
                                <option>₹2Cr - ₹5Cr</option>
                                <option>Above ₹5Cr</option>
                            </select>
                        </div>

                        {/* Room Type */}
                        <div className="lg:col-span-1">
                            <label className="block text-gray-800 font-semibold mb-2 text-sm">Room Type</label>
                            <select
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange bg-white text-gray-700"
                            >
                                <option>Any</option>
                                <option>1 BHK</option>
                                <option>2 BHK</option>
                                <option>3 BHK</option>
                                <option>4 BHK</option>
                                <option>5+ BHK</option>
                            </select>
                        </div>

                        {/* Search Button */}
                        <div className="lg:col-span-1">
                            <label className="block text-gray-800 font-semibold mb-2 text-sm opacity-0 pointer-events-none">Search</label>
                            <button
                                type="submit"
                                className="w-full bg-brand-orange hover:bg-[#e07a46] text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
                            >
                                Search Now
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

                        {/* Popup */}
                        {showFilters && (
                            <div className="absolute top-full left-0 mt-2 z-50">
                                <RealEstateFilterPopup onClose={() => setShowFilters(false)} />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
}

"use client";

import { useState } from 'react';

export default function FilterPopup({ onClose }: { onClose: () => void }) {

    // Helper component for filter sections
    const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">{title}</h3>
            {children}
        </div>
    );

    // Helper for Pill Options (Selectable)
    const PillOption = ({ label, active = false }: { label: string, active?: boolean }) => (
        <button className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${active
            ? "border-brand-orange text-brand-orange bg-orange-50"
            : "border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange"
            }`}>
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="w-[90%] md:w-[600px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col font-jost overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Filter Beauty Services</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">

                    {/* Keywords */}
                    <FilterSection title="Keywords">
                        <div className="relative">
                            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search services, salons..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Service Type */}
                    <FilterSection title="Service Type">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Bridal Makeup" />
                            <PillOption label="Spa & Massage" />
                            <PillOption label="Hair Care" />
                            <PillOption label="Skin Care" />
                            <PillOption label="Men's Salon" />
                            <PillOption label="Nail Art" />
                        </div>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price Range">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Under ₹500" />
                            <PillOption label="₹500 - ₹1000" />
                            <PillOption label="₹1000 - ₹2000" />
                            <PillOption label="₹2000 - ₹5000" />
                            <PillOption label="Above ₹5000" />
                        </div>
                    </FilterSection>

                    {/* Rating */}
                    <FilterSection title="Rating">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="4.5+" />
                            <PillOption label="4.0+" />
                            <PillOption label="3.5+" />
                            <PillOption label="Any" />
                        </div>
                    </FilterSection>

                    {/* Gender */}
                    <FilterSection title="Gender">
                        <div className="flex gap-3">
                            <button className="px-6 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange">Female</button>
                            <button className="px-6 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange">Male</button>
                            <button className="px-6 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange">Unisex</button>
                        </div>
                    </FilterSection>

                    {/* Sort By */}
                    <FilterSection title="Sort By">
                        <div className="flex gap-3">
                            <PillOption label="Popularity" active />
                            <PillOption label="Price: Low to High" />
                            <PillOption label="Price: High to Low" />
                            <PillOption label="Newest First" />
                        </div>
                    </FilterSection>

                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-[#FF8A65] hover:bg-[#FF7043] text-white rounded-lg font-bold shadow-md transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>

            </div>
        </div>
    );
}

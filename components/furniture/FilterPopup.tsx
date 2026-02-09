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
                    <h2 className="text-lg font-bold text-gray-800">Filter Furniture</h2>
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
                                placeholder="Search furniture..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Category */}
                    <FilterSection title="Category">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Sofa" />
                            <PillOption label="Bed" />
                            <PillOption label="Dining Table" />
                            <PillOption label="Office Chair" />
                            <PillOption label="Wardrobe" />
                            <PillOption label="Study Table" />
                        </div>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price Range">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Under ₹5000" />
                            <PillOption label="₹5000 - ₹10000" />
                            <PillOption label="₹10000 - ₹20000" />
                            <PillOption label="₹20000 - ₹50000" />
                            <PillOption label="Above ₹50000" />
                        </div>
                    </FilterSection>

                    {/* Condition */}
                    <FilterSection title="Condition">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Brand New" />
                            <PillOption label="Like New" />
                            <PillOption label="Good" />
                            <PillOption label="Fair" />
                        </div>
                    </FilterSection>

                    {/* Material */}
                    <FilterSection title="Material">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Wood" />
                            <PillOption label="Metal" />
                            <PillOption label="Plastic" />
                            <PillOption label="Glass" />
                            <PillOption label="Leather" />
                            <PillOption label="Fabric" />
                        </div>
                    </FilterSection>

                    {/* Sort By */}
                    <FilterSection title="Sort By">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Newest First" active />
                            <PillOption label="Price: Low to High" />
                            <PillOption label="Price: High to Low" />
                            <PillOption label="Most Popular" />
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

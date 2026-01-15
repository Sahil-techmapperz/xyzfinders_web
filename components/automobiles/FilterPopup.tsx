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

    // Helper for Color Options
    const ColorOption = ({ color, label }: { color: string, label: string }) => (
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange transition-colors min-w-[100px]">
            <span className={`w-3 h-3 rounded-full ${color}`}></span>
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
                    <h2 className="text-lg font-bold text-gray-800">Filter Automobiles</h2>
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
                                placeholder="Enter keywords....."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Seller Type */}
                    <FilterSection title="Seller Type">
                        <div className="grid grid-cols-3 gap-3">
                            <PillOption label="Dealer" />
                            <PillOption label="Owner" />
                            <PillOption label="Dealership/ Certified Pre-Owned" />
                        </div>
                    </FilterSection>

                    {/* Body Type */}
                    <FilterSection title="Body Type">
                        <div className="grid grid-cols-3 gap-3">
                            <PillOption label="SUV" />
                            <PillOption label="Coupe" />
                            <PillOption label="Sedan" />
                            <PillOption label="Crossover" />
                            <PillOption label="Hard Top Convertible" />
                            <PillOption label="Pickup Truck" />
                        </div>
                        <button className="text-brand-orange text-sm font-bold mt-3">View More</button>
                    </FilterSection>

                    {/* Seats */}
                    <FilterSection title="Seats">
                        <div className="flex gap-3 flex-wrap">
                            {['1', '2', '3', '4', '5', '6', '7'].map(num => (
                                <button key={num} className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-colors">
                                    {num}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Transmission Type */}
                    <FilterSection title="Transmission Type">
                        <div className="flex gap-3">
                            <button className="px-6 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange">Manual</button>
                            <button className="px-6 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange">Automatic</button>
                        </div>
                    </FilterSection>

                    {/* Fuel Type */}
                    <FilterSection title="Fuel Type">
                        <div className="grid grid-cols-3 gap-3">
                            <PillOption label="Petrol" />
                            <PillOption label="Diesel" />
                            <PillOption label="Electric" />
                            <PillOption label="Electric" />
                        </div>
                    </FilterSection>

                    {/* Badges */}
                    <FilterSection title="Badges">
                        <div className="grid grid-cols-3 gap-3">
                            <PillOption label="First Owner" />
                            <PillOption label="In Warranty" />
                            <PillOption label="Dealer Warranty" />
                            <PillOption label="Serviced Car" />
                            <PillOption label="No Accident" />
                            <PillOption label="Original Paint" />
                        </div>
                    </FilterSection>

                    {/* Exterior Color */}
                    <FilterSection title="Exterior Color">
                        <div className="grid grid-cols-3 gap-3">
                            <ColorOption color="bg-[#CD7F32]" label="Bronze" />
                            <ColorOption color="bg-[#800000]" label="Maroon" />
                            <ColorOption color="bg-[#FF00FF]" label="Pink" />
                            <ColorOption color="bg-black" label="Black" />
                            <ColorOption color="bg-[#0000FF]" label="Blue" />
                            <button className="text-brand-orange text-sm font-bold flex items-center justify-center">View More</button>
                        </div>
                    </FilterSection>

                    {/* Interior Color */}
                    <FilterSection title="Interior Color">
                        <div className="grid grid-cols-3 gap-3">
                            <ColorOption color="bg-[#CD7F32]" label="Bronze" />
                            <ColorOption color="bg-[#800000]" label="Maroon" />
                            <ColorOption color="bg-[#FF00FF]" label="Pink" />
                            <ColorOption color="bg-black" label="Black" />
                            <ColorOption color="bg-[#0000FF]" label="Blue" />
                            <button className="text-brand-orange text-sm font-bold flex items-center justify-center">View More</button>
                        </div>
                    </FilterSection>

                    {/* Engine Capacity */}
                    <FilterSection title="Engine Capacity">
                        <div className="grid grid-cols-3 gap-3">
                            <PillOption label="0 -499 cc" />
                            <PillOption label="500 - 999 cc" />
                            <PillOption label="1000 - 1500 cc" />
                            <PillOption label="1500 - 2000 cc" />
                            <PillOption label="2000 - 2500 cc" />
                            <button className="text-brand-orange text-sm font-bold flex items-center justify-center">View More</button>
                        </div>
                    </FilterSection>

                    {/* Doors */}
                    <FilterSection title="Door's">
                        <div className="flex gap-3 flex-wrap">
                            {['1', '2', '3', '4', '4'].map((num, i) => (
                                <button key={i} className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-colors">
                                    {num}
                                </button>
                            ))}
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

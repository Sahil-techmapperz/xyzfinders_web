"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function FilterPopup({ onClose }: { onClose: () => void }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Prevent scrolling when popup is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Helper component for filter sections
    const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">{title}</h3>
            {children}
        </div>
    );

    // Helper for Pill Options (Selectable)
    const PillOption = ({ label, active = false }: { label: string, active?: boolean }) => (
        <button className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap ${active
            ? "border-[#FF8A65] text-[#FF8A65] bg-orange-50"
            : "border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]"
            }`}>
            {label}
        </button>
    );

    // Helper for Color Options
    const ColorOption = ({ color, label }: { color: string, label: string }) => (
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors min-w-[100px]">
            <span className={`w-3 h-3 rounded-full ${color} border border-gray-100 shrink-0`}></span>
            {label}
        </button>
    );

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="w-[90%] md:w-[600px] max-h-[90vh] h-auto bg-white rounded-2xl shadow-2xl flex flex-col font-jost overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <h2 className="text-lg font-bold text-gray-800">Filter Fashion</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">

                    {/* Keywords */}
                    <FilterSection title="Search">
                        <div className="relative">
                            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search brand, item, etc..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FF8A65] focus:ring-1 focus:ring-[#FF8A65]/20 transition-all"
                            />
                        </div>
                    </FilterSection>

                    {/* Category */}
                    <FilterSection title="Category">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Men" />
                            <PillOption label="Women" />
                            <PillOption label="Kids" />
                            <PillOption label="Unisex" />
                        </div>
                    </FilterSection>

                    {/* Subcategory */}
                    <FilterSection title="Subcategory">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Clothing" />
                            <PillOption label="Footwear" />
                            <PillOption label="Accessories" />
                            <PillOption label="Watches" />
                            <PillOption label="Bags" />
                            <PillOption label="Jewelry" />
                        </div>
                    </FilterSection>

                    {/* Size */}
                    <FilterSection title="Size">
                        <div className="flex gap-3 flex-wrap">
                            {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map(size => (
                                <button key={size} className="min-w-[40px] h-10 px-2 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors whitespace-nowrap">
                                    {size}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3 flex-wrap mt-3">
                            <span className="text-xs text-gray-400 w-full mb-1">Footwear (UK/India)</span>
                            {['6', '7', '8', '9', '10', '11'].map(size => (
                                <button key={size} className="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center text-xs font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Brand */}
                    <FilterSection title="Popular Brands">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Zara" />
                            <PillOption label="H&M" />
                            <PillOption label="Nike" />
                            <PillOption label="Adidas" />
                            <PillOption label="Puma" />
                            <PillOption label="Gucci" />
                            <PillOption label="Levi's" />
                            <PillOption label="Uniqlo" />
                            <PillOption label="Other" />
                        </div>
                    </FilterSection>

                    {/* Condition */}
                    <FilterSection title="Condition">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="New with Tags" />
                            <PillOption label="Like New" />
                            <PillOption label="Good" />
                            <PillOption label="Fair" />
                        </div>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price Range">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                                <input type="number" placeholder="Min" className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF8A65]" />
                            </div>
                            <span className="text-gray-400">-</span>
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">₹</span>
                                <input type="number" placeholder="Max" className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#FF8A65]" />
                            </div>
                        </div>
                    </FilterSection>

                    {/* Colors */}
                    <FilterSection title="Color">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            <ColorOption color="bg-black" label="Black" />
                            <ColorOption color="bg-white" label="White" />
                            <ColorOption color="bg-blue-600" label="Blue" />
                            <ColorOption color="bg-red-500" label="Red" />
                            <ColorOption color="bg-green-600" label="Green" />
                            <ColorOption color="bg-yellow-400" label="Yellow" />
                            <ColorOption color="bg-pink-400" label="Pink" />
                            <ColorOption color="bg-purple-600" label="Purple" />
                            <ColorOption color="bg-orange-600" label="Orange" />
                            <ColorOption color="bg-gray-400" label="Grey" />
                            <ColorOption color="bg-[#F5F5DC]" label="Beige" />
                            <ColorOption color="bg-gradient-to-r from-red-500 via-green-500 to-blue-500" label="Multi" />
                        </div>
                    </FilterSection>

                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-gray-100 flex gap-4 bg-white">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-[#FF8A65] hover:bg-[#FF7043] text-white rounded-lg font-bold shadow-md transition-colors"
                    >
                        Show Results
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
}

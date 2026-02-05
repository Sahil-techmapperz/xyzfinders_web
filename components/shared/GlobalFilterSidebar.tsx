'use client';

import { useState, useEffect } from 'react';

export default function GlobalFilterSidebar({
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    verifiedOnly,
    setVerifiedOnly,
    premiumOnly,
    setPremiumOnly,
    locationFilter,
    setLocationFilter
}: {
    selectedCategory: string[],
    setSelectedCategory: (c: string[]) => void,
    priceRange: [number, number],
    setPriceRange: (r: [number, number]) => void,
    verifiedOnly: boolean,
    setVerifiedOnly: (v: boolean) => void,
    premiumOnly: boolean,
    setPremiumOnly: (v: boolean) => void,
    locationFilter: string,
    setLocationFilter: (l: string) => void
}) {
    const [categories, setCategories] = useState<string[]>(['All']);

    // Fetch categories from API
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const categoryNames = data.data.map((cat: any) => cat.name);
                    setCategories(['All', ...categoryNames]);
                }
            })
            .catch(err => {
                console.error('Failed to fetch categories:', err);
                // Fallback to default categories
                setCategories([
                    'All',
                    'Real Estate',
                    'Automobiles',
                    'Mobiles',
                    'Furniture',
                    'Electronics',
                    'Beauty',
                    'Jobs',
                    'Pets & Animals Accessories',
                    'Learning & Education',
                    'Local Events',
                    'Services'
                ]);
            });
    }, []);

    const handleCategoryChange = (cat: string) => {
        if (cat === 'All') {
            setSelectedCategory(['All']);
            return;
        }

        let newCategories = [...selectedCategory];

        // Remove 'All' if it exists when selecting specific category
        if (newCategories.includes('All')) {
            newCategories = [];
        }

        if (newCategories.includes(cat)) {
            newCategories = newCategories.filter(c => c !== cat);
        } else {
            newCategories.push(cat);
        }

        // If nothing selected, revert to 'All'
        if (newCategories.length === 0) {
            setSelectedCategory(['All']);
        } else {
            setSelectedCategory(newCategories);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24 h-fit">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <i className="ri-filter-3-line text-brand-orange"></i>
                Filters
            </h3>

            {/* Location Search */}
            <div className="mb-8">
                <h4 className="font-semibold text-sm text-gray-900 mb-4 uppercase tracking-wider">Location</h4>
                <div className="relative">
                    <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                        type="text"
                        placeholder="Filter by city..."
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20 transition-all"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
                <h4 className="font-semibold text-sm text-gray-900 mb-4 uppercase tracking-wider">Category</h4>
                <div className="space-y-2">
                    {categories.map(cat => {
                        const isSelected = selectedCategory.includes(cat);
                        return (
                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-brand-orange border-brand-orange' : 'border-gray-300 bg-white group-hover:border-brand-orange'}`}>
                                    {isSelected && <i className="ri-check-line text-white text-xs"></i>}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={isSelected}
                                    onChange={() => handleCategoryChange(cat)}
                                />
                                <span className={`text-sm ${isSelected ? 'text-brand-orange font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat}</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-8">
                <h4 className="font-semibold text-sm text-gray-900 mb-4 uppercase tracking-wider">Price Range</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>₹ {priceRange[0].toLocaleString()}</span>
                    <span className="text-gray-400">-</span>
                    <span>₹ {priceRange[1] >= 100000000 ? '10 Cr+' : priceRange[1].toLocaleString()}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
            </div>

            {/* Verified & Premium */}
            <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-gray-700">Verified Only</span>
                    <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${verifiedOnly ? 'bg-green-500' : 'bg-gray-200'}`} onClick={() => setVerifiedOnly(!verifiedOnly)}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${verifiedOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-sm font-medium text-gray-700">Premium Only</span>
                    <div className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 ${premiumOnly ? 'bg-amber-400' : 'bg-gray-200'}`} onClick={() => setPremiumOnly(!premiumOnly)}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${premiumOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                </label>
            </div>
        </div>
    );
}

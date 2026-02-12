"use client";

import { useState, use } from 'react';
import AutomobileCard from './AutomobileCard';
import FilterPopup from './FilterPopup';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface AutomobileListingsProps {
    automobilesPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function AutomobileListings({ automobilesPromise, locationsPromise }: AutomobileListingsProps) {
    const products = use(automobilesPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to automobile format
    const AUTO_DATA = products.map(p => {
        let attributes: any = {};
        if (typeof p.product_attributes === 'string') {
            try {
                attributes = JSON.parse(p.product_attributes);
            } catch (e) {
                console.error('Failed to parse product_attributes', e);
            }
        } else if (typeof p.product_attributes === 'object') {
            attributes = p.product_attributes;
        }

        const specs = attributes.specs || {};
        const productImages = p.images?.map((img: any) =>
            img.image ? `data:image/jpeg;base64,${img.image}` : ''
        ) || [];

        return {
            id: p.id,
            title: p.title,
            category: attributes.category || 'Car',
            make: attributes.make || '',
            model: attributes.model || '',
            variant: attributes.variant || '',
            desc: p.description,
            year: specs.year || new Date().getFullYear(),
            km: specs.km || '0 Km',
            fuel: specs.fuel || 'Petrol',
            price: p.price.toLocaleString(),
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            image: productImages.length > 0 ? productImages[0] : '',
            images: productImages,
            verified: !!(p.seller?.is_verified),
            premium: !!p.is_boosted
        };
    });

    const [locations, setLocations] = useState(initialLocations);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [showFilters, setShowFilters] = useState(false);

    // Location filtering
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredAutomobiles = activeLocationNames.length > 0
        ? AUTO_DATA.filter(auto => activeLocationNames.some(locName => auto.location.includes(locName)))
        : AUTO_DATA;

    // Pagination
    const totalPages = Math.ceil(filteredAutomobiles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentAutomobiles = filteredAutomobiles.slice(startIndex, endIndex);

    const toggleLocation = (name: string) => {
        setLocations(prev => prev.map(loc =>
            loc.name === name ? { ...loc, active: !loc.active } : loc
        ));
        setCurrentPage(1); // Reset to page 1 when filter changes
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <section className="container mx-auto px-4 py-8 bg-[#FFFBF0] min-h-screen font-jost">

            {/* Header Area */}
            <div className="mb-8">
                {/* Mobile Link/Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Automobiles</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Used Automobiles in New Delhi <span className="text-gray-500 font-normal text-base">- {filteredAutomobiles.length}(Available)</span>
                    </h1>

                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Location Filters (Pills Style) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {locations.map((loc, i) => (
                        <button
                            key={i}
                            onClick={() => toggleLocation(loc.name)}
                            className={`text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${loc.active
                                ? "bg-[#FF8A65] text-white"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]"
                                }`}
                        >
                            {loc.name}
                            {loc.active && (
                                <i className="ri-close-line bg-white/20 rounded-full p-0.5 text-[10px]"></i>
                            )}
                        </button>
                    ))}
                    {/* View More Button */}
                    <button
                        onClick={() => setShowFilters(true)}
                        className="text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 bg-gray-50 text-brand-orange border border-gray-200 hover:bg-orange-50 hover:border-brand-orange"
                    >
                        View More <i className="ri-equalizer-line"></i>
                    </button>
                </div>
            </div>

            {/* Filter Popup */}
            {showFilters && <FilterPopup onClose={() => setShowFilters(false)} />}

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Listings */}
                <div className="lg:col-span-2 space-y-6">
                    {currentAutomobiles.map(auto => (
                        <AutomobileCard key={auto.id} auto={auto} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pt-8 flex items-center justify-center gap-2">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition shadow-sm ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        : 'bg-white text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                    }`}
                            >
                                <i className="ri-arrow-left-s-line text-lg"></i>
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm ${currentPage === page
                                            ? 'bg-[#FF8A65] text-white font-bold shadow-md'
                                            : 'bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition shadow-sm ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                        : 'bg-white text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                    }`}
                            >
                                <i className="ri-arrow-right-s-line text-lg"></i>
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Google Ads */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                </div>

            </div>
        </section>
    );
}

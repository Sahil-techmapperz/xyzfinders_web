"use client";

import { useState, use } from 'react';
import GadgetCard, { GadgetData } from './GadgetCard';
import GadgetsFilterPopup from './GadgetsFilterPopup';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface GadgetsListingsProps {
    gadgetsPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function GadgetsListings({ gadgetsPromise, locationsPromise }: GadgetsListingsProps) {
    const products = use(gadgetsPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to gadget format
    const gadgetData: GadgetData[] = products.map(p => {
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

        const productImages = p.images?.map((img: any) =>
            img.image ? `data:image/jpeg;base64,${img.image}` : ''
        ) || [];

        const specs = attributes.specs || {};

        return {
            id: p.id,
            title: p.title,
            category: attributes.category || 'Electronics',
            image: productImages.length > 0 ? productImages[0] : '',
            specs: {
                brand: (attributes.brand || 'N/A').toUpperCase(),
                model: attributes.model || p.title.split(' ').slice(0, 3).join(' '),
                storage: attributes.storage || specs.storage || '256 GB',
                condition: (specs.condition || 'GOOD').toUpperCase(),
                warranty: (specs.warranty || 'NO WARRANTY').toUpperCase(),
                age: (specs.age || 'N/A').toUpperCase()
            },
            price: `₹ ${p.price.toLocaleString()}/-`,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            postedTime: formatDate(p.created_at),
            verified: !!(p.seller?.is_verified),
            premium: !!p.is_boosted,
            description: p.description || ''
        };
    });

    const [locations, setLocations] = useState(initialLocations);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    // Location filtering
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredGadgets = activeLocationNames.length > 0
        ? gadgetData.filter(item => activeLocationNames.some(locName => item.location.includes(locName)))
        : gadgetData;

    // Pagination
    const totalPages = Math.ceil(filteredGadgets.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentGadgets = filteredGadgets.slice(startIndex, endIndex);

    const toggleLocation = (name: string) => {
        setLocations(prev => prev.map(loc =>
            loc.name === name ? { ...loc, active: !loc.active } : loc
        ));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header / Titles */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Electronics & Gadgets in New Delhi <span className="text-gray-500 font-normal text-base">- {filteredGadgets.length}(Available)</span>
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
                        onClick={() => setIsFilterPopupOpen(true)}
                        className="text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 bg-gray-50 text-brand-orange border border-gray-200 hover:bg-orange-50 hover:border-brand-orange"
                    >
                        View More <i className="ri-equalizer-line"></i>
                    </button>
                </div>
            </div>

            {/* Filter Popup */}
            {isFilterPopupOpen && <GadgetsFilterPopup onClose={() => setIsFilterPopupOpen(false)} />}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

                {/* Left: Listings (One by One) */}
                <div className="flex flex-col gap-6">
                    {currentGadgets.map((item: GadgetData) => (
                        <GadgetCard key={item.id} item={item} />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${currentPage === 1
                                ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                : 'text-gray-600 hover:border-[#00B8D4] hover:text-[#00B8D4]'
                                }`}
                        >
                            <i className="ri-arrow-left-s-line text-lg"></i>
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === page
                                    ? 'bg-[#00B8D4] text-white shadow-md'
                                    : 'text-gray-600 hover:bg-cyan-50 hover:text-[#00B8D4]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${currentPage === totalPages
                                ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                : 'text-gray-600 hover:border-[#00B8D4] hover:text-[#00B8D4]'
                                }`}
                        >
                            <i className="ri-arrow-right-s-line text-lg"></i>
                        </button>
                    </div>
                )}

                {/* Right: Google Ads Sidebar */}
                <div className="hidden lg:block">
                    <div className="sticky top-24 space-y-6">
                        {/* Google Ad Placeholder 1 */}
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden">
                            <div className="p-6 text-center">
                                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">Advertisement</div>
                                <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
                                    <div className="text-center">
                                        <i className="ri-advertisement-line text-4xl text-gray-300 mb-3"></i>
                                        <p className="text-sm text-gray-400 font-medium">Google Ads</p>
                                        <p className="text-xs text-gray-300 mt-1">300 x 250</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Ad Placeholder 2 */}
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden">
                            <div className="p-6 text-center">
                                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">Advertisement</div>
                                <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
                                    <div className="text-center">
                                        <i className="ri-advertisement-line text-4xl text-gray-300 mb-3"></i>
                                        <p className="text-sm text-gray-400 font-medium">Google Ads</p>
                                        <p className="text-xs text-gray-300 mt-1">300 x 250</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Google Ad Placeholder 3 */}
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden">
                            <div className="p-6 text-center">
                                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-2">Advertisement</div>
                                <div className="bg-white border border-gray-200 rounded-lg p-8 min-h-[250px] flex items-center justify-center">
                                    <div className="text-center">
                                        <i className="ri-advertisement-line text-4xl text-gray-300 mb-3"></i>
                                        <p className="text-sm text-gray-400 font-medium">Google Ads</p>
                                        <p className="text-xs text-gray-300 mt-1">300 x 250</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

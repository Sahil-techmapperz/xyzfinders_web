"use client";

import { useState, use } from 'react';
import MobileCard, { MobileData } from './MobileCard';
import MobileFilterPopup from './MobileFilterPopup';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';


interface MobileListingsProps {
    mobilesPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function MobileListings({ mobilesPromise, locationsPromise }: MobileListingsProps) {
    const products = use(mobilesPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to MobileData
    const mobiles: MobileData[] = products.map(p => {
        // Parse attributes safely
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

        // Convert images to URLs
        const productImages = p.images?.map((img: any) =>
            img.image ? `data:image/jpeg;base64,${img.image}` : ''
        ) || [];

        return {
            id: p.id,
            title: p.title,
            category: attributes.category || 'Mobiles',
            brand: attributes.brand || '',
            image: productImages.length > 0 ? productImages[0] : '',
            images: productImages,
            description: p.description,
            specs: {
                age: specs.age || '',
                model: specs.model || p.title,
                storage: specs.storage || '',
                colour: specs.colour || ''
            },
            price: `₹ ${p.price.toLocaleString()}/-`,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            postedTime: `Posted ${formatDate(p.created_at)}`,
            verified: !!(p.seller?.is_verified),
            premium: !!p.is_boosted
        };
    });

    // Use locations from database
    const [locations, setLocations] = useState(initialLocations);

    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter mobiles based on selected locations
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredMobiles = activeLocationNames.length > 0
        ? mobiles.filter(mobile => activeLocationNames.some(locName => mobile.location.includes(locName)))
        : mobiles;

    // Pagination calculations
    const totalPages = Math.ceil(filteredMobiles.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMobiles = filteredMobiles.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleLocation = (name: string) => {
        setLocations(prev => prev.map(loc =>
            loc.name === name ? { ...loc, active: !loc.active } : loc
        ));
    };
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header / Titles */}
            <div className="mb-6">
                {/* Breadcrumb (Mobile Style) */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 md:hidden">
                    <i className="ri-home-4-line"></i>
                    <span>Mobiles</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Mobile Phones for Sale in New Delhi <span className="text-gray-500 font-normal text-base">- {mobiles.length} (Available)</span>
                    </h1>

                    {/* Sort By - Hidden on Mobile to match reference which focuses on pills, or keep small if needed. Keeping hidden for strict mobile match if requested, but let's keep it visible for desktop flexibility */}
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
            {showFilters && <MobileFilterPopup onClose={() => setShowFilters(false)} />}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {currentMobiles.map(mobile => (
                        <MobileCard key={mobile.id} item={mobile} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-8">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg transition-colors ${currentPage === 1
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-400 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                    }`}
                            >
                                <i className="ri-arrow-left-double-line"></i>
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium transition-colors ${currentPage === page
                                            ? 'bg-[#FF8A65] text-white font-bold shadow-sm'
                                            : 'border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg transition-colors ${currentPage === totalPages
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-400 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                    }`}
                            >
                                <i className="ri-arrow-right-double-line"></i>
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">HALFPAGE BANNER</div>
                            <div className="text-xs text-gray-400 mb-8">Digital Marketing</div>

                            {/* Styled Ad Content Placeholder similar to image */}
                            <div className="bg-[#FF8A65] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-gray-900 drop-shadow-sm">
                                    click,<br />Grow,<br />Repeat
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#FF8A65] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#FF8A65] transition-colors">
                                        Get Started!
                                    </button>
                                </div>

                                {/* Abstract shapes/image placeholder */}
                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#B39DDB] to-[#9575CD]">
                                        {/* Mock Person Image */}
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
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

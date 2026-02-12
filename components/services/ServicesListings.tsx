"use client";

import { useState, use } from 'react';
import ServicesCard, { ServiceData } from './ServicesCard';
import ServicesFilterPopup from './ServicesFilterPopup';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface ServicesListingsProps {
    servicesPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function ServicesListings({ servicesPromise, locationsPromise }: ServicesListingsProps) {
    const products = use(servicesPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to service format
    const SERVICES_DATA: ServiceData[] = products.map(p => {
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

        return {
            id: p.id,
            title: p.title,
            category: attributes.category || 'Service',
            subcategory: attributes.subcategory || '',
            image: productImages.length > 0 ? productImages[0] : '',
            rating: attributes.rating || 0,
            reviews: attributes.reviews || 0,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            price: `₹ ${p.price.toLocaleString()}`,
            verified: !!(p.seller?.is_verified),
            provider: p.seller?.name || 'Unknown Provider'
        };
    });

    const [locations, setLocations] = useState(initialLocations);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);

    // Location filtering
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredServices = activeLocationNames.length > 0
        ? SERVICES_DATA.filter(service => activeLocationNames.some(locName => service.location.includes(locName)))
        : SERVICES_DATA;

    // Pagination
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentServices = filteredServices.slice(startIndex, endIndex);

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

            {/* Header */}
            <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Services in New Delhi <span className="text-gray-500 font-normal text-base">- {filteredServices.length}(Available)</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Recommended <i className="ri-arrow-down-s-line"></i>
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
            {isFilterPopupOpen && <ServicesFilterPopup onClose={() => setIsFilterPopupOpen(false)} />}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {currentServices.map(item => (
                        <ServicesCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${currentPage === 1
                                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-[#00B0FF] hover:text-white hover:border-[#00B0FF]'
                                    }`}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${currentPage === page
                                            ? 'bg-[#00B0FF] text-white shadow-md'
                                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${currentPage === totalPages
                                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-[#00B0FF] hover:text-white hover:border-[#00B0FF]'
                                    }`}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    )}
                </div>

                {/* Sidebar Ad/Promo */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#E1F5FE] rounded-2xl p-6 text-center border border-sky-100 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Are you a Professional?</h3>
                            <p className="text-sm text-gray-600 mb-4">Join our network and grow your business today.</p>
                            <button className="w-full bg-[#00B0FF] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#0091EA] transition-colors">
                                Register as Partner
                            </button>
                        </div>

                        {/* Google Ad Placeholder (Larger) */}
                        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center h-[600px] text-gray-400">
                            <i className="ri-advertisement-line text-5xl mb-2"></i>
                            <span className="text-base font-bold">Google Ad Space</span>
                            <span className="text-xs">(Vertical Banner)</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

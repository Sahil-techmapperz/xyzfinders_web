"use client";

import { useState, use } from 'react';
import FurnitureCard, { FurnitureData } from './FurnitureCard';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface FurnitureListingsProps {
    furniturePromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function FurnitureListings({ furniturePromise, locationsPromise }: FurnitureListingsProps) {
    const products = use(furniturePromise);
    const initialLocations = use(locationsPromise);

    // Map API products to furniture format
    const furnitureData: FurnitureData[] = products.map(p => {
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
            category: attributes.category || 'Furniture',
            image: productImages.length > 0 ? productImages[0] : '',
            images: productImages,
            brand: attributes.material || '',
            specs: {
                material: specs.material || 'Wood',
                condition: specs.condition || 'Good',
                dimensions: specs.dimensions || 'Standard',
                age: specs.age || 'N/A'
            },
            description: p.description || '',
            price: `₹ ${p.price.toLocaleString()}`,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            postedTime: formatDate(p.created_at),
            verified: !!(p.seller?.is_verified),
            premium: !!p.is_boosted
        };
    });

    const [locations, setLocations] = useState(initialLocations);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Location filtering
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredFurniture = activeLocationNames.length > 0
        ? furnitureData.filter(item => activeLocationNames.some(locName => item.location.includes(locName)))
        : furnitureData;

    // Pagination
    const totalPages = Math.ceil(filteredFurniture.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFurniture = filteredFurniture.slice(startIndex, endIndex);

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
            <div className="mb-8">
                {/* Mobile Link/Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Furniture</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Furniture for sale in New Delhi <span className="text-gray-500 font-normal text-base">- {filteredFurniture.length}(Available)</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Location Filters (Pills Style) */}
                {locations.length > 0 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Locations:</span>
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
                    </div>
                )}


            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
                {/* Left: Listings (One by One) */}
                <div className="flex flex-col gap-6">
                    {currentFurniture.map((item: FurnitureData) => (
                        <FurnitureCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${currentPage === 1
                                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                    : 'text-gray-600 hover:border-[#8D6E63] hover:text-[#8D6E63]'
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
                                        ? 'bg-[#8D6E63] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-[#EFEBE9] hover:text-[#8D6E63]'
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
                                    : 'text-gray-600 hover:border-[#8D6E63] hover:text-[#8D6E63]'
                                    }`}
                            >
                                <i className="ri-arrow-right-s-line text-lg"></i>
                            </button>
                        </div>
                    )}
                </div>

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

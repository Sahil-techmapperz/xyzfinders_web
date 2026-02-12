"use client";

import { useState, use } from 'react';
import BeautyCard, { BeautyData } from './BeautyCard';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface BeautyListingsProps {
    beautyPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function BeautyListings({ beautyPromise, locationsPromise }: BeautyListingsProps) {
    const products = use(beautyPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to beauty format
    const beautyData: BeautyData[] = products.map(p => {
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
            category: attributes.category || 'Beauty',
            image: productImages.length > 0 ? productImages[0] : '',
            images: productImages,
            specs: {
                serviceFor: specs.serviceFor || 'ALL',
                type: specs.type || 'SALON',
                duration: specs.duration || 'N/A',
                rating: specs.rating || '5.0'
            },
            price: `₹ ${p.price.toLocaleString()}`,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            postedTime: formatDate(p.created_at),
            verified: !!(p.seller?.is_verified)
        };
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination
    const totalPages = Math.ceil(beautyData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBeauty = beautyData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header */}
            <div className="mb-8">
                {/* Mobile Link/Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Beauty</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Beauty & Wellness Services in New Delhi <span className="text-gray-500 font-normal text-base">- {beautyData.length} (Available)</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                    {beautyData.length === 0 && (
                        <div className="text-center py-12 text-gray-600">
                            <p>No beauty services found.</p>
                        </div>
                    )}

                    {currentBeauty.map((item: BeautyData) => (
                        <BeautyCard key={item.id} item={item} />
                    ))}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8 py-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${currentPage === 1
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                            >
                                <i className="ri-arrow-left-s-line text-lg"></i>
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum = i + 1;
                                if (totalPages > 5) {
                                    if (currentPage > 3) {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    if (pageNum > totalPages) {
                                        pageNum = totalPages - 4 + i;
                                    }
                                }

                                if (pageNum > 0 && pageNum <= totalPages) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${currentPage === pageNum
                                                ? 'bg-brand-orange text-white shadow-md'
                                                : 'text-gray-600 hover:bg-orange-50 hover:text-brand-orange'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                                return null;
                            })}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${currentPage === totalPages
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                            >
                                <i className="ri-arrow-right-s-line text-lg"></i>
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

                            <div className="bg-[#FF8A65] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-gray-900 drop-shadow-sm">
                                    Click,<br />Grow,<br />Repeat
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#FF8A65] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#FF8A65] transition-colors">
                                        Get Started!
                                    </button>
                                </div>

                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#B39DDB] to-[#9575CD]">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-50" alt="Marketing" />
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

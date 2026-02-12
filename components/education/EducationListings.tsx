"use client";

import { useState, use } from 'react';
import EducationCard, { EducationData } from './EducationCard';
import EducationFilterPopup from './EducationFilterPopup';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface EducationListingsProps {
    educationPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function EducationListings({ educationPromise, locationsPromise }: EducationListingsProps) {
    const products = use(educationPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to education format
    const EDUCATION_DATA: EducationData[] = products.map(p => {
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
            category: attributes.category || 'Education',
            subject: attributes.subject || '',
            image: productImages.length > 0 ? productImages[0] : '',
            description: p.description,
            specs: {
                mode: attributes.mode || 'Offline',
                level: attributes.level || 'All Levels',
                duration: attributes.duration || 'Flexible',
                language: attributes.language || 'English'
            },
            fees: `₹ ${p.price.toLocaleString()}`,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            postedTime: formatDate(p.created_at),
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
    const filteredEducation = activeLocationNames.length > 0
        ? EDUCATION_DATA.filter(item => activeLocationNames.some(locName => item.location.includes(locName)))
        : EDUCATION_DATA;

    // Pagination
    const totalPages = Math.ceil(filteredEducation.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEducation = filteredEducation.slice(startIndex, endIndex);

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
                {/* Breadcrumb (Mobile Style - Optional/Placeholder if needed, or just standard header) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Education & Learning in New Delhi <span className="text-gray-500 font-normal text-base">- {filteredEducation.length}(Available)</span>
                    </h1>

                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Newest First <i className="ri-arrow-down-s-line"></i>
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
            {showFilters && <EducationFilterPopup onClose={() => setShowFilters(false)} />}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {currentEducation.map(item => (
                        <EducationCard key={item.id} item={item} />
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
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${currentPage === page
                                            ? 'bg-[#FF8A65] text-white font-bold shadow-sm'
                                            : 'border border-gray-200 text-gray-500 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65]'
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
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">RECOMMENDED</div>
                            <div className="text-xs text-gray-400 mb-8">Featured Institutes</div>

                            {/* Styled Ad Content */}
                            <div className="bg-[#1E88E5] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-white drop-shadow-sm">
                                    Learn<br />Code,<br />Create
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-white text-[#1E88E5] font-bold py-3 rounded-lg shadow-lg hover:bg-[#E3F2FD] transition-colors">
                                        Join Bootcamp
                                    </button>
                                </div>

                                {/* Abstract shapes/image placeholder */}
                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#1565C0] to-[#1E88E5]">
                                        {/* Mock Coding Image */}
                                        <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
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

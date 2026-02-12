"use client";

import { useState, Fragment, use } from 'react';
import { useSearchParams } from 'next/navigation';
import GoogleAdBanner from '@/components/home/GoogleAdBanner';
import PropertyCard from './PropertyCard';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface Property {
    id: number;
    title: string;
    category: string;
    type: string;
    price: string;
    location: string;
    specs: {
        bedroom?: number;
        kitchen?: number;
        bathroom?: number;
        sharing?: string;
    };
    tags: string[];
    images: string[];
    verified: boolean;
    premium: boolean;
}

interface PropertyListingsProps {
    propertiesPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function PropertyListings({ propertiesPromise, locationsPromise }: PropertyListingsProps) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const typeParam = searchParams.get('type');

    const products = use(propertiesPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to Property format
    const properties: Property[] = products.map(p => {
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
            category: attributes.category || 'Real Estate',
            type: attributes.type || 'Property',
            price: `₹ ${p.price.toLocaleString()}`,
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            specs: {
                bedroom: specs.bedroom,
                kitchen: specs.kitchen,
                bathroom: specs.bathroom,
                sharing: specs.sharing
            },
            tags: attributes.tags || [],
            images: productImages,
            verified: !!(p.seller?.is_verified),
            premium: !!p.is_boosted
        };
    });

    // Use locations from database
    const [locations, setLocations] = useState(initialLocations);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const toggleLocation = (index: number) => {
        setLocations(prev => prev.map((loc, i) =>
            i === index ? { ...loc, active: !loc.active } : loc
        ));
    };

    // Filter by URL params
    const urlFilteredProperties = properties.filter(property => {
        const matchesCategory = categoryParam
            ? property.category.toLowerCase().includes(categoryParam.toLowerCase())
            : true;
        const matchesType = typeParam
            ? property.type.toLowerCase().includes(typeParam.toLowerCase())
            : true;

        return matchesCategory && matchesType;
    });

    // Filter by locations
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredProperties = activeLocationNames.length > 0
        ? urlFilteredProperties.filter(property => activeLocationNames.some(locName => property.location.includes(locName)))
        : urlFilteredProperties;

    // Pagination
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProperties = filteredProperties.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="container mx-auto px-4 py-8 font-jost">
            {/* Breadcrumb & Title */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Real Estate {typeParam ? `for ${typeParam}` : ''} {categoryParam ? `in ${categoryParam}` : ''}</span>
                </div>
                <div className="flex flex-col gap-3">
                    {/* Mobile: Title & Count Combined */}
                    <div className="md:hidden">
                        <h1 className="text-base font-bold text-gray-900 leading-tight">
                            {categoryParam || 'Property'} {typeParam ? `for ${typeParam}` : 'for Rent'} in New Delhi
                            <span className="text-xs font-normal text-gray-500 ml-1">
                                - {filteredProperties.length}(Available)
                            </span>
                        </h1>
                    </div>

                    {/* Desktop Title */}
                    <h1 className="hidden md:block text-3xl font-bold text-gray-900 leading-tight">
                        {categoryParam || 'Real Estate'} {typeParam ? `for ${typeParam}` : ''} in New Delhi
                        <span className="ml-2 text-xl font-normal text-gray-500">
                            - <span className="font-bold text-gray-900">{filteredProperties.length}</span> available
                        </span>
                    </h1>

                    {/* Desktop Sort (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center justify-end w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">Sort By:</span>
                            <div className="relative">
                                <button className="text-brand-orange text-sm font-medium flex items-center gap-1 border border-brand-orange/20 bg-brand-orange/5 px-3 py-1.5 rounded-lg active:bg-brand-orange/10">
                                    Popular <i className="ri-arrow-down-s-line"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location Tags */}
            <div className="mb-6 pb-4 md:border-b md:border-gray-100">
                <div className="hidden md:flex items-center justify-between mb-3">
                    <span className="font-bold text-sm text-gray-800">Popular Locations</span>
                    <span className="text-xs text-brand-orange font-medium">View All</span>
                </div>
                <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {locations.map((loc, idx) => (
                        <button
                            key={idx}
                            onClick={() => toggleLocation(idx)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap shrink-0 ${loc.active
                                ? "bg-brand-orange text-white flex items-center gap-2 shadow-sm"
                                : "bg-white border border-gray-200 text-gray-600"
                                }`}
                        >
                            {loc.name}
                            {loc.active && <i className="ri-close-line bg-white/20 rounded-full p-0.5"></i>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Column: Listings */}
                <div className="lg:col-span-3 flex flex-col gap-6">

                    {currentProperties.length > 0 ? (
                        currentProperties.map((property, index) => (
                            <Fragment key={property.id}>
                                <PropertyCard property={property} />

                                {/* In-feed Banner Ad (Inserted after 2nd item) */}
                                {index === 1 && (
                                    <GoogleAdBanner />
                                )}
                            </Fragment>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-lg border border-gray-100">
                            <i className="ri-home-search-line text-4xl text-gray-300 mb-3 block"></i>
                            <h3 className="text-xl font-bold text-gray-700">No properties found</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your filters.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded bg-white ${currentPage === 1
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                            >
                                <i className="ri-arrow-left-double-line"></i>
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 flex items-center justify-center border rounded text-xs font-semibold ${currentPage === page
                                            ? 'border-brand-orange bg-brand-orange text-white'
                                            : 'border-gray-200 bg-white text-gray-500 hover:border-brand-orange hover:text-brand-orange'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded bg-white ${currentPage === totalPages
                                        ? 'text-gray-300 cursor-not-allowed'
                                        : 'text-gray-500 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                            >
                                <i className="ri-arrow-right-double-line"></i>
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


import Link from 'next/link';
import { useState } from 'react';

export interface GadgetData {
    id: number;
    title: string;
    category: string;
    image: string;
    images?: string[];
    specs: {
        brand: string;
        model?: string;
        storage?: string;
        condition: string;
        warranty: string;
        age?: string;
    };
    price: string;
    location: string;
    postedTime: string;
    verified: boolean;
    premium: boolean;
    description?: string;
    rating?: number;
    reviews?: number;
}

interface GadgetCardProps {
    item: GadgetData;
}

export default function GadgetCard({ item }: GadgetCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = item.images && item.images.length > 0 ? item.images : [item.image];

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const createSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };
    const seoUrl = `/gadgets/${item.id}-${createSlug(item.title)}`;

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
            <div className="flex flex-col md:flex-row">
                {/* Image Section - Left */}
                <div className="relative w-full md:w-80 h-56 md:h-64 bg-gray-100 overflow-hidden group/slider flex-shrink-0">
                    <Link href={seoUrl} className="block w-full h-full">
                        <img
                            src={images[currentImageIndex]}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>

                    {/* Slider Controls */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/50"
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/50"
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>

                            {/* Image Counter Badge */}
                            <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs font-bold px-2.5 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                                <i className="ri-image-line"></i> {currentImageIndex + 1}/{images.length}
                            </div>
                        </>
                    )}

                    {/* Premium Badge */}
                    {item.premium && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                            Premium
                        </div>
                    )}

                    {/* Verified Badge */}
                    {item.verified && (
                        <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md text-white border-2 border-white">
                            <i className="ri-check-fill text-lg font-bold"></i>
                        </div>
                    )}
                </div>

                {/* Content Section - Right */}
                <div className="flex-1 p-5 flex flex-col">
                    {/* Title */}
                    <Link href={seoUrl}>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-[#00B8D4] transition-colors line-clamp-1">
                            {item.title}
                        </h3>
                    </Link>

                    {/* Category */}
                    <p className="text-sm text-gray-500 font-medium mb-4">{item.category}</p>

                    {/* Specs Row with Icons */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                            <i className="ri-smartphone-line text-lg text-gray-400"></i>
                            <span>{item.specs.brand}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-hard-drive-2-line text-lg text-gray-400"></i>
                            <span>{item.specs.storage || '256 GB'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-calendar-line text-lg text-gray-400"></i>
                            <span>{item.specs.age || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {item.specs.condition}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {item.specs.warranty}
                        </span>
                        {item.specs.model && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                {item.specs.model}
                            </span>
                        )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                        <i className="ri-map-pin-line text-gray-400"></i>
                        <span className="line-clamp-1">{item.location}</span>
                    </div>

                    {/* Footer: Price & Buttons */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-[#F44336]">{item.price}</span>
                            <span className="text-xs text-gray-400 font-medium">/Fixed</span>
                        </div>

                        <div className="flex gap-3">
                            <button className="px-5 py-2.5 bg-[#FFEBEE] text-[#F44336] text-sm font-bold rounded-lg hover:bg-[#F44336] hover:text-white transition-all shadow-sm flex items-center gap-2">
                                <i className="ri-phone-fill"></i> Call
                            </button>
                            <button className="px-5 py-2.5 bg-[#E3F2FD] text-[#1976D2] text-sm font-bold rounded-lg hover:bg-[#1976D2] hover:text-white transition-all shadow-sm flex items-center gap-2">
                                <i className="ri-chat-3-fill"></i> Chat
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

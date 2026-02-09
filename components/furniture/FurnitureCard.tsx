import Link from 'next/link';
import { useState } from 'react';

export interface FurnitureData {
    id: number;
    title: string;
    category: string;
    image: string;
    images?: string[];
    brand?: string; // Brand name to show on image
    specs: {
        material: string;
        condition: string;
        dimensions?: string;
        age?: string;
    };
    description?: string; // Short description
    price: string;
    location: string;
    postedTime: string;
    verified: boolean;
    premium?: boolean; // Premium listing badge
}

interface FurnitureCardProps {
    item: FurnitureData;
}

export default function FurnitureCard({ item }: FurnitureCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Extract brand from category or title
    const brand = item.brand || item.category;

    const createSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };
    const seoUrl = `/furniture/${item.id}-${createSlug(item.title)}`;

    // Ensure we have an array of images
    const images = (item.images && item.images.length > 0) ? item.images : [item.image];

    const handleDotClick = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">

            {/* Image Slider Section */}
            <div className="relative w-full h-64 bg-gray-100 overflow-hidden group/slider">
                <Link href={seoUrl}>
                    <div
                        className="flex h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${item.title} - ${idx + 1}`}
                                className="w-full h-full object-cover shrink-0"
                            />
                        ))}
                    </div>
                </Link>

                {/* Navigation Arrows (Visible on hover) */}
                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity z-20"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                            }}
                        >
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity z-20"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                            }}
                        >
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </>
                )}

                {/* 1/X Badge */}
                <div className="absolute bottom-3 left-3 z-10 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm backdrop-blur-sm">
                    <i className="ri-image-line mr-1"></i>
                    {currentImageIndex + 1}/{images.length}
                </div>

                {/* Pagination Dots */}
                {images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 pointer-events-none">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => handleDotClick(e, idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm pointer-events-auto ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Verified Badge */}
                {item.verified && (
                    <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white" title="Verified Seller">
                        <i className="ri-check-line text-sm font-bold"></i>
                    </div>
                )}

                {/* Premium Badge */}
                {item.premium && (
                    <div className="absolute top-4 right-0 z-10 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-3 py-1 shadow-sm border-l border-b border-[#FFE082] uppercase tracking-wide">
                        Premium
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <Link href={seoUrl}>
                        <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors">
                            {item.title}
                        </h3>
                    </Link>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-500 mb-4 mt-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63] shrink-0">
                                <i className="ri-paint-brush-line"></i>
                            </div>
                            <span className="font-medium truncate">{item.specs.material}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63] shrink-0">
                                <i className="ri-checkbox-circle-line"></i>
                            </div>
                            <span className="font-medium truncate">{item.specs.condition}</span>
                        </div>
                        {item.specs.dimensions && (
                            <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63] shrink-0">
                                    <i className="ri-ruler-line"></i>
                                </div>
                                <span className="font-medium truncate">{item.specs.dimensions}</span>
                            </div>
                        )}
                        {item.specs.age && (
                            <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63] shrink-0">
                                    <i className="ri-calendar-line"></i>
                                </div>
                                <span className="font-medium truncate">{item.specs.age}</span>
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-50">
                        <i className="ri-map-pin-line"></i>
                        <span className="truncate">{item.location}</span>
                    </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="flex flex-col gap-3">
                    <div>
                        <span className="text-[#D32F2F] text-xl font-bold font-rubik tracking-tight">
                            {item.price}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider ml-2">Fixed Price</span>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#FFF0F0] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition-all shadow-sm border border-[#FFCDD2]/50 text-sm font-bold" title="Call Seller">
                            <i className="ri-phone-fill"></i> Call
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#E3F2FD] text-[#1976D2] hover:bg-[#1976D2] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50 text-sm font-bold" title="Chat with Seller">
                            <i className="ri-chat-3-fill"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col h-auto">

            {/* Image Slider Section */}
            <div className="relative w-full h-40 md:h-[250px] bg-gray-100 overflow-hidden group/slider">
                <Link href={seoUrl} className="block w-full h-full">
                    <img
                        src={images[currentImageIndex]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </Link>

                {/* Slider Controls */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-100 md:opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/50"
                        >
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center opacity-100 md:opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/50"
                        >
                            <i className="ri-arrow-right-s-line"></i>
                        </button>

                        {/* Pagination Dots */}
                        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5 pointer-events-none">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50'}`}
                                />
                            ))}
                        </div>

                        {/* Image Counter Badge (Left) */}
                        <div className="absolute bottom-4 left-4 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm z-10 flex items-center gap-1">
                            <i className="ri-image-line"></i> {currentImageIndex + 1}/{images.length}
                        </div>
                    </>
                )}

                {/* Verified Badge (Top Left) */}
                {item.verified && (
                    <div className="absolute top-4 left-4 z-20 w-8 h-8 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-md text-white border-2 border-white">
                        <i className="ri-check-fill text-xl font-bold"></i>
                    </div>
                )}

                {/* Premium Badge (Top Right) */}
                {item.premium && (
                    <div className="absolute top-4 right-0 z-20 bg-[#FFE0B2] text-[#E65100] text-[10px] font-black px-3 py-1 shadow-sm uppercase tracking-wider rounded-l-md border-l border-b border-[#FFCC80]">
                        PREMIUM
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-2.5 md:p-5 flex flex-col">
                <Link href={seoUrl} className="group-hover:text-brand-orange transition-colors">
                    <h3 className="font-bold text-sm md:text-lg text-gray-900 leading-tight mb-1 line-clamp-1">
                        {item.title}
                    </h3>
                </Link>

                <p className="text-gray-500 text-xs md:text-sm font-medium mb-2 md:mb-4">{item.category}</p>

                {/* Specs Grid (Styled like screenshot) */}
                <div className="flex flex-col gap-1.5 md:gap-2 text-[10px] md:text-xs text-gray-500 mb-2 md:mb-4">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                            <i className="ri-smartphone-line text-sm md:text-lg text-gray-400"></i>
                            <span className="truncate text-gray-600">{item.specs.model || item.title.split(' ')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                            <i className="ri-hard-drive-2-line text-sm md:text-lg text-gray-400"></i>
                            <span className="truncate text-gray-600">{item.specs.storage || '256 GB'}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2">
                        <i className="ri-calendar-line text-sm md:text-lg text-gray-400"></i>
                        <span className="text-gray-600">{item.specs.age || '6 MONTHS'}</span>
                    </div>
                </div>

                {/* Description - Hidden on Mobile */}
                <div className="hidden md:block text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {item.description || "Industry-leading noise cancellation with premium sound quality. Perfect condition with original box and all accessories..."}
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3 md:mb-5">
                    <i className="ri-map-pin-line text-xs md:text-sm"></i>
                    <span className="line-clamp-1">{item.location}</span>
                </div>

                {/* Footer: Price & Actions */}
                <div className="mt-auto flex flex-col md:flex-row items-start md:items-center justify-between pt-3 md:pt-4 border-t border-gray-100 gap-3 md:gap-0">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[#F44336] text-xl md:text-2xl font-bold">{item.price}</span>
                        <span className="text-gray-400 text-[10px] md:text-xs font-medium">/Fixed</span>
                    </div>

                    <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-4 py-2 bg-[#FFEBEE] text-[#F44336] text-xs md:text-sm font-bold rounded-lg hover:bg-[#F44336] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                            <i className="ri-phone-fill"></i> Call
                        </button>
                        <button className="flex-1 md:flex-none px-4 py-2 bg-[#E3F2FD] text-[#1976D2] text-xs md:text-sm font-bold rounded-lg hover:bg-[#1976D2] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                            <i className="ri-chat-3-fill"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

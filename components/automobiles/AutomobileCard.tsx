"use client";

import Link from 'next/link';
import { useState } from 'react';

interface Automobile {
    id: number;
    title: string;
    category: string;
    make: string;
    model: string;
    variant: string;
    desc: string;
    year: number;
    km: string;
    fuel: string;
    price: string;
    location: string;
    image: string;
    images?: string[];
    verified: boolean;
    premium: boolean;
}

export default function AutomobileCard({ auto }: { auto: Automobile }) { // Ensure interface matches data
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Ensure we have an array of images (fallback to single image if array not present)
    const images = auto.images || [auto.image];

    const handleDotClick = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-72">

            {/* Image Slider Section */}
            <div className="relative w-full md:w-[40%] h-40 md:h-full bg-gray-100 overflow-hidden group/slider">
                <Link href={`/automobiles/${auto.id}-${auto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                    <div
                        className="flex h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${auto.title} - ${idx + 1}`}
                                className="w-full h-full object-cover shrink-0"
                            />
                        ))}
                    </div>
                </Link>

                {/* Navigation Arrows (Visible on hover or touch) */}
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

                {/* 1/10 Badge */}
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
                {auto.verified && (
                    <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white">
                        <i className="ri-check-line text-sm font-bold"></i>
                    </div>
                )}

                {/* Premium Badge */}
                {auto.premium && (
                    <div className="absolute top-4 right-0 z-10 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-2 py-0.5 shadow-sm border-l border-b border-[#FFE082] uppercase tracking-wide">
                        Premium
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-2.5 md:p-5 lg:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <Link href={`/automobiles/${auto.id}-${auto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                            <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight mb-0.5 hover:text-brand-orange transition-colors line-clamp-1">
                                {auto.title}
                            </h3>
                        </Link>
                    </div>

                    <p className="text-gray-500 text-xs font-medium mb-2">{auto.category} • {auto.make} {auto.model}</p>

                    {/* Specs Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                        <div className="flex items-center gap-1.5"><i className="ri-calendar-line text-gray-400 text-sm"></i> {auto.year}</div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1.5"><i className="ri-speed-line text-gray-400 text-sm"></i> {auto.km}</div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1.5"><i className="ri-gas-station-line text-gray-400 text-sm"></i> {auto.fuel}</div>
                    </div>

                    {/* Description */}
                    <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {auto.desc}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-gray-400 mb-3">
                        <i className="ri-map-pin-line mt-0.5"></i>
                        <span className="line-clamp-1">{auto.location}</span>
                    </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                    <div>
                        <span className="text-[#FF4D4D] text-lg md:text-xl font-bold">{auto.price}</span>
                        <span className="text-gray-500 text-xs font-medium">/Fixed</span>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 rounded bg-[#FFF0F0] text-[#FF4D4D] text-xs font-bold hover:bg-[#FF4D4D] hover:text-white transition-all shadow-sm border border-[#FFCDD2]/50">
                            <i className="ri-phone-line text-sm"></i> Call
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 rounded bg-[#E3F2FD] text-[#2196F3] text-xs font-bold hover:bg-[#2196F3] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50">
                            <i className="ri-chat-3-line text-sm"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

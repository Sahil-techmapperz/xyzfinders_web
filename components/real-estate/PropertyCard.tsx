"use client";

import { useState } from 'react';
import Link from 'next/link';

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

interface PropertyCardProps {
    property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDotClick = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-72">

            {/* Image Slider Section */}
            <div className="relative w-full md:w-[40%] h-48 md:h-full bg-gray-100 overflow-hidden group/slider">
                <Link href={`/real-estate/${property.id}-${property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                    <div
                        className="flex h-full transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {property.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${property.title} - ${idx + 1}`}
                                className="w-full h-full object-cover shrink-0"
                            />
                        ))}
                    </div>
                </Link>

                {/* Navigation Arrows (Visible on hover or touch) */}
                {property.images.length > 1 && (
                    <>
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity z-20"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
                            }}
                        >
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity z-20"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
                            }}
                        >
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </>
                )}

                {/* 1/10 Badge */}
                <div className="absolute bottom-3 left-3 z-10 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm backdrop-blur-sm">
                    <i className="ri-image-line mr-1"></i>
                    {currentImageIndex + 1}/{property.images.length}
                </div>

                {/* Pagination Dots */}
                {property.images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 pointer-events-none">
                        {property.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => handleDotClick(e, idx)}
                                className={`w-1.5 h-1.5 rounded-full transition-all shadow-sm pointer-events-auto ${currentImageIndex === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Verified Badge */}
                {property.verified && (
                    <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white">
                        <i className="ri-check-line text-sm font-bold"></i>
                    </div>
                )}

                {/* Premium Badge */}
                {property.premium && (
                    <div className="absolute top-4 right-0 z-10 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-2 py-0.5 shadow-sm border-l border-b border-[#FFE082] uppercase tracking-wide">
                        Premium
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 md:p-5 lg:p-6 flex flex-col justify-between">
                <div>
                    <div className="mb-2">
                        <h3 className="font-bold text-base md:text-lg text-gray-900 leading-tight mb-0.5 line-clamp-1">
                          <Link href={`/real-estate/${property.id}-${property.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>{property.title}</Link>
                        </h3>
                        <p className="text-gray-500 text-xs font-medium">{property.category}</p>
                    </div>

                    {/* Specs Row */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-gray-600 mb-3 md:mb-4">
                        {property.specs.sharing ? (
                            <div className="flex items-center gap-1.5"><i className="ri-hotel-bed-line text-gray-400 text-sm"></i> {property.specs.sharing}</div>
                        ) : (
                            <>
                                <div className="flex items-center gap-1.5"><i className="ri-hotel-bed-line text-gray-400 text-lg md:text-xl font-light"></i> <span className="pt-0.5">{property.specs.bedroom} Bedrooms</span></div>
                                <div className="flex items-center gap-1.5"><i className="ri-restaurant-line text-gray-400 text-lg md:text-xl font-light"></i> <span className="pt-0.5">{property.specs.kitchen} Kitchen</span></div>
                                <div className="flex items-center gap-1.5"><i className="ri-drop-line text-gray-400 text-lg md:text-xl font-light"></i> <span className="pt-0.5">{property.specs.bathroom} Baths</span></div>
                            </>
                        )}
                    </div>

                    {/* Tags Row */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-gray-500 mb-3 md:mb-4">
                        {property.tags.map((tag, i) => (
                            <span key={i} className="flex items-center">
                                {tag}
                                {i < property.tags.length - 1 && <span className="mx-2 text-gray-300 font-light">|</span>}
                            </span>
                        ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-gray-400 mb-4">
                        <i className="ri-map-pin-line mt-0.5"></i>
                        <span className="line-clamp-1">{property.location}</span>
                    </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-3 border-t border-gray-50">
                    <div>
                        <span className="text-[#FF4D4D] text-lg md:text-xl font-bold">{property.price}</span>
                        <span className="text-gray-500 text-xs font-medium">/Monthly</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#FFF0F0] text-[#FF4D4D] text-xs font-bold hover:bg-[#FF4D4D] hover:text-white transition-all shadow-sm border border-[#FFCDD2]/50">
                            <i className="ri-phone-line"></i> Call
                        </button>
                        <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#E3F2FD] text-[#2196F3] text-xs font-bold hover:bg-[#2196F3] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50">
                            <i className="ri-chat-3-line"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

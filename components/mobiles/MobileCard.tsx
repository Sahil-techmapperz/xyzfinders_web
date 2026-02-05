"use client";

import Link from 'next/link';

export interface MobileData {
    id: number;
    title: string;
    category: string;
    image: string;
    brand?: string; // Brand name to show on image
    specs: {
        age: string;
        model: string;
        storage: string;
        colour: string;
    };
    description?: string; // Short description
    price: string;
    location: string;
    postedTime: string;
    verified: boolean;
    premium: boolean;
}

interface MobileCardProps {
    item: MobileData;
}

export default function MobileCard({ item }: MobileCardProps) {
    // Extract brand from model or use provided brand
    const brand = item.brand || item.specs.model.split(' ')[0];

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-72">

            {/* Image Section */}
            <div className="relative w-full md:w-[40%] h-56 md:h-full bg-gray-100 overflow-hidden cursor-pointer">
                <Link href={`/mobiles/${item.id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Verified Badge */}
                {item.verified && (
                    <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white">
                        <i className="ri-check-line text-sm font-bold"></i>
                    </div>
                )}

                {/* Premium Badge */}
                {item.premium && (
                    <div className="absolute top-4 right-0 z-10 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-2 py-0.5 shadow-sm border-l border-b border-[#FFE082] uppercase tracking-wide">
                        Premium
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 lg:p-6 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight mb-1">
                            {item.title}
                        </h3>
                    </div>

                    <p className="text-gray-500 text-xs font-medium mb-3">{item.category}</p>

                    {/* Specs Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1.5"><i className="ri-edit-box-line text-gray-400 text-sm"></i> {item.specs.model}</div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1.5"><i className="ri-roadster-line text-gray-400 text-sm"></i> {item.specs.storage}</div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1.5"><i className="ri-calendar-line text-gray-400 text-sm"></i> {item.specs.age}</div>
                    </div>

                    {/* Description */}
                    {item.description && (
                        <div className="text-xs text-gray-600 mb-4 line-clamp-2">
                            {item.description}
                        </div>
                    )}

                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-xs text-gray-400 mb-4">
                        <i className="ri-map-pin-line mt-0.5"></i>
                        <span className="line-clamp-1">{item.location}</span>
                    </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <span className="text-[#FF4D4D] text-lg md:text-xl font-bold">{item.price}</span>
                        <span className="text-gray-500 text-xs font-medium">/Fixed</span>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFF0F0] text-[#FF4D4D] text-xs font-bold hover:bg-[#FF4D4D] hover:text-white transition-all shadow-sm border border-[#FFCDD2]/50">
                            <i className="ri-phone-line text-sm"></i> Call
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#E3F2FD] text-[#2196F3] text-xs font-bold hover:bg-[#2196F3] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50">
                            <i className="ri-chat-3-line text-sm"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

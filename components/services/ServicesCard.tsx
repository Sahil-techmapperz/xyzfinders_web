"use client";

import Link from "next/link";

export interface ServiceData {
    id: number;
    title: string;
    category: string;
    subcategory: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    price: string;
    verified: boolean;
    provider: string;
}

export default function ServicesCard({ item }: { item: ServiceData }) {
    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-64">

            {/* Image Section */}
            <div className="relative w-full md:w-[40%] h-48 md:h-full bg-gray-100 overflow-hidden cursor-pointer">
                <Link href={`/services/${item.id}`}>
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
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded textxs font-bold">
                            <span className="text-sm">{item.rating}</span> <i className="ri-star-fill text-[10px]"></i>
                            <span className="text-[10px] text-gray-400 font-normal">({item.reviews})</span>
                        </div>
                    </div>

                    <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 line-clamp-2 hover:text-[#00B0FF] transition-colors cursor-pointer">
                        <Link href={`/services/${item.id}`}>{item.title}</Link>
                    </h3>

                    {/* Meta Row */}
                    <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                            <i className="ri-user-line text-[#00B0FF]"></i>
                            <span>{item.provider}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line text-[#00B0FF]"></i>
                            <span>{item.location}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <span className="text-gray-400 text-[10px] font-bold uppercase block">Starting From</span>
                        <span className="text-[#00B0FF] text-lg font-bold">{item.price}</span>
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

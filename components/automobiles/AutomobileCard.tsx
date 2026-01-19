"use client";

import Link from 'next/link';

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
    verified: boolean;
    premium: boolean;
}

export default function AutomobileCard({ auto }: { auto: Automobile }) {
    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row min-h-[280px]">

            {/* Image Section */}
            <Link href={`/automobiles/${auto.id}`} className="relative w-full md:w-[45%] h-56 md:h-auto bg-gray-100 overflow-hidden cursor-pointer block">
                {/* Verified Badge */}
                {auto.verified && (
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-[#4CAF50] flex items-center gap-1 shadow-sm border border-green-100">
                        <i className="ri-checkbox-circle-fill text-sm"></i> VERIFIED USER
                    </div>
                )}

                <img
                    src={auto.image}
                    alt={auto.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </Link>

            {/* Content Section */}
            <div className="flex-1 p-5 lg:p-6 flex flex-col relative">

                {/* Premium Badge */}
                {auto.premium && (
                    <span className="absolute top-6 right-6 text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        PREMIUM
                    </span>
                )}

                <div className="mb-4 pr-16">
                    <Link href={`/automobiles/${auto.id}`}>
                        <h3 className="font-bold text-lg md:text-xl text-gray-800 leading-tight mb-1 hover:text-brand-orange transition-colors">
                            {auto.title}
                        </h3>
                    </Link>
                    <p className="text-gray-500 text-sm font-medium">{auto.category}</p>
                </div>

                {/* Spec Line */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-car-line text-gray-400 text-sm"></i>
                    <span>{auto.make} • {auto.model} • {auto.variant}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs mb-4 line-clamp-1 uppercase font-medium">
                    {auto.desc}
                </p>

                {/* Grid Specs */}
                <div className="flex items-center gap-6 mb-4 text-sm font-bold text-gray-700">
                    <div className="flex items-center gap-2">
                        <i className="ri-calendar-line text-gray-400 font-normal"></i> {auto.year}
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ri-speed-line text-gray-400 font-normal"></i> {auto.km}
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="ri-gas-station-line text-gray-400 font-normal"></i> {auto.fuel}
                    </div>
                </div>

                {/* Footer: Price & Location */}
                <div className="mt-auto">
                    <div className="text-[#FF4D4D] text-lg md:text-xl font-bold mb-1">
                        ₹ {auto.price}<span className="text-gray-400 text-xs font-medium">/</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-[10px] text-gray-400">
                        <i className="ri-map-pin-line mt-0.5"></i>
                        <span className="line-clamp-1">{auto.location}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

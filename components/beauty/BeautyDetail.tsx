"use client";

import Link from 'next/link';

export default function BeautyDetail({ id }: { id?: string }) {
    const service = {
        title: "Premium Bridal Makeup & Hair Styling Package",
        description: "Complete bridal transformation with professional makeup artist. Includes pre-bridal consultation, trial makeup session, and final bridal makeup with hairstyling on the wedding day.",
        price: "₹ 15,000/-",
        category: "Bridal Makeup",
        postedTime: "Posted 30 min ago",
        location: "South Delhi, New Delhi, Delhi",
        specs: [
            { label: "Service Category", value: "Bridal Makeup" },
            { label: "Service For", value: "Female" },
            { label: "Service Type", value: "Home Service" },
            { label: "Duration", value: "3-4 Hours" },
            { label: "Experience", value: "8+ Years" },
            { label: "Rating", value: "4.8/5" },
            { label: "Bookings", value: "150+ Completed" },
            { label: "Availability", value: "Book in Advance" },
        ],
        features: [
            "HD Airbrush makeup",
            "Hair styling included",
            "Free trial session",
            "Premium branded products"
        ],
        seller: {
            name: "Neha Sharma",
            verified: true,
            memberSince: "2019"
        }
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop"
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {service.seller.verified && (
                            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2">
                                <i className="ri-shield-check-fill"></i> VERIFIED PROFESSIONAL
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop"
                                alt="Portfolio 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1457972729786-0411a3b2b626?q=80&w=2070&auto=format&fit=crop"
                                alt="Portfolio 2"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Details */}
                    <div className="xl:col-span-2">

                        {/* Title & Actions */}
                        <div className="mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-[#FF2D55] text-white flex items-center justify-center hover:bg-[#e02447] transition-colors shadow-sm">
                                        <i className="ri-heart-fill"></i>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-3xl">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-6 text-gray-700 font-medium mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <i className="ri-bookmark-line text-[#FF8A65]"></i>
                                    <span>{service.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ri-time-line text-[#FF8A65]"></i>
                                    <span>{service.postedTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <i className="ri-map-pin-line text-[#FF8A65]"></i>
                                <span>{service.location}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-linear-to-r from-[#FF8A65] to-[#FF7043] rounded-2xl p-6 mb-8 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-white/80 text-sm font-medium mb-1">Service Charge</div>
                                    <div className="text-4xl font-bold text-white">{service.price}</div>
                                </div>
                                <button className="bg-white text-[#FF8A65] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md">
                                    Book Now
                                </button>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Service Details</h2>

                            <div className="space-y-4">
                                {service.specs.map((spec, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">{spec.label}</span>
                                        <span className="text-sm font-bold text-gray-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description & Features */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">What's Included</h2>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Key Features</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx}>- {feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {service.features.map((feature, idx) => (
                                    <span key={idx} className="bg-[#FFF0F0] text-[#FF6E40] text-xs font-medium px-3 py-1 rounded">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Professional Info */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* Professional Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Professional</h3>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#FF8A65] to-[#FF7043] flex items-center justify-center text-white text-xl font-bold">
                                        {service.seller.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-900">{service.seller.name}</div>
                                        <div className="text-xs text-gray-500">Member since {service.seller.memberSince}</div>
                                    </div>
                                    {service.seller.verified && (
                                        <i className="ri-verified-badge-fill text-green-500 text-xl"></i>
                                    )}
                                </div>

                                <button className="w-full bg-[#2196F3] text-white font-bold py-3 rounded-xl hover:bg-[#1976D2] transition-colors mb-3 flex items-center justify-center gap-2">
                                    <i className="ri-chat-3-line"></i>
                                    Chat Now
                                </button>

                                <button className="w-full bg-[#4CAF50] text-white font-bold py-3 rounded-xl hover:bg-[#45a049] transition-colors flex items-center justify-center gap-2">
                                    <i className="ri-phone-line"></i>
                                    Call Now
                                </button>
                            </div>

                            {/* Safety Tips */}
                            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="ri-shield-check-line text-yellow-600"></i>
                                    Booking Tips
                                </h3>
                                <ul className="text-xs text-gray-600 space-y-2">
                                    <li className="flex gap-2">
                                        <span>•</span>
                                        <span>Book well in advance</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>•</span>
                                        <span>Discuss requirements clearly</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>•</span>
                                        <span>Check reviews and portfolio</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Google Ads */}
                            <div className="bg-gray-200 rounded-none md:rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px]">
                                Google Ads
                            </div>

                        </div>
                    </div>

                </div>

                {/* Similar Services */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Similar Services</h2>
                        <div className="flex gap-2">
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => {
                                    const container = document.getElementById('similar-beauty-carousel');
                                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => {
                                    const container = document.getElementById('similar-beauty-carousel');
                                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="similar-beauty-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "Full Body Massage & Spa", price: "₹ 2,500/-", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "Men's Grooming Package", price: "₹ 800/-", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop" },
                            { id: 4, title: "Hair Spa Treatment", price: "₹ 1,200/-", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop" },
                            { id: 5, title: "Party Makeup", price: "₹ 3,500/-", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop" },
                            { id: 6, title: "Skin Whitening Treatment", price: "₹ 4,000/-", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" },
                        ].map((service) => (
                            <Link key={service.id} href={`/beauty/${service.id}`}>
                                <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                    <div className="h-48 bg-gray-100 relative">
                                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{service.title}</h3>
                                        <div className="text-[#FF6E40] font-bold text-base">{service.price}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

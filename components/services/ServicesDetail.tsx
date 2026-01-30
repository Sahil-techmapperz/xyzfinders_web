"use client";

import Link from 'next/link';

export default function ServicesDetail({ id }: { id?: string }) {
    // Mock Data for Services
    const item = {
        title: "Expert Home Plumbing Services",
        price: "₹ 500 Visit Charge",
        category: "Home Maintenance",
        rating: 4.8,
        reviews: 124,
        location: "Serving all areas of South Delhi",
        provider: "QuickFix Solutions",
        experience: "10+ Years",
        description: `We provide professional plumbing services for all your home needs. From minor leaks to major installations, our expert team can handle it all. We are available 24/7 for emergency repairs. All our plumbers are verified and background checked for your safety.
        
        We use high-quality materials and offer a warranty on our work. Transparent pricing with no hidden charges. Book a visit today and get your plumbing issues resolved quickly and efficiently.`,
        servicesOffered: [
            "Leak Repairs",
            "Pipe Installation",
            "Drain Cleaning",
            "Water Heater Repair",
            "Fixture Installation (Taps, Sinks, Toilets)",
            "Water Tank Cleaning"
        ],
        images: [
            "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2072&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=2074&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
        ],
        providerImage: "https://ui-avatars.com/api/?name=Quick+Fix&background=0288D1&color=fff"
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src={item.images[0]}
                            alt="Main View"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
                            <span className="text-[#00B0FF] font-bold text-xl">{item.rating}</span>
                            <div className="flex text-yellow-500 text-sm">
                                <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-half-fill"></i>
                            </div>
                            <span className="text-gray-500 text-sm font-medium">({item.reviews} Reviews)</span>
                        </div>
                    </div>
                    {/* Side Images */}
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={item.images[1]}
                                alt="Side View 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Google Ad Placeholder */}
                            <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex flex-col items-center justify-center h-[300px] text-gray-400">
                                <i className="ri-advertisement-line text-4xl mb-2"></i>
                                <span className="text-sm font-bold">Google Ad Space</span>
                            </div>
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={item.images[2]}
                                alt="Side View 2"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Title & Key Info */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {item.title}
                        </h1>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
                                <i className="ri-share-line"></i>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition shadow-sm">
                                <i className="ri-heart-line"></i>
                            </button>
                        </div>
                    </div>

                    {/* Key Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E1F5FE] flex items-center justify-center text-[#0288D1]"><i className="ri-tools-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Experience</p>
                                <p className="text-sm font-bold text-gray-900">{item.experience}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center text-[#EF6C00]"><i className="ri-map-pin-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Service Area</p>
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">South Delhi</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]"><i className="ri-money-rupee-circle-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Visiting Charge</p>
                                <p className="text-lg font-bold text-[#2E7D32]">{item.price}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Details */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">About Service</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">
                                {item.description}
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">Services Offered</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {item.servicesOffered.map((service, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <i className="ri-checkbox-circle-fill text-[#00B0FF] mt-1"></i>
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Provider & Contact */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
                                <img src={item.providerImage} alt={item.provider} className="w-14 h-14 rounded-full" />
                                <div>
                                    <p className="text-sm text-gray-500">Service Provider</p>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.provider}</h3>
                                    <span className="text-[10px] text-blue-500 flex items-center gap-1 font-bold mt-1">
                                        <i className="ri-checkbox-circle-fill"></i> Verified Partner
                                    </span>
                                </div>
                            </div>

                            <button className="w-full bg-[#00B0FF] hover:bg-[#0091EA] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-2">
                                <i className="ri-phone-fill"></i> Call Now
                            </button>
                            <button className="w-full bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#2196F3] font-bold text-lg py-4 rounded-xl shadow-sm transition-transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-2 border border-[#90CAF9]/30">
                                <i className="ri-chat-3-fill"></i> Chat with Provider
                            </button>

                        </div>

                        {/* Google Ad Placeholder */}
                        <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex flex-col items-center justify-center h-[300px] text-gray-400">
                            <i className="ri-advertisement-line text-4xl mb-2"></i>
                            <span className="text-sm font-bold">Google Ad Space</span>
                        </div>
                    </div>


                </div>

                {/* Similar Services (Carousel) */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Recommended For You</h2>
                        <div className="flex gap-2">
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#00B0FF] hover:text-white hover:border-[#00B0FF] transition"
                                onClick={() => document.getElementById('services-similar-carousel')?.scrollBy({ left: -300, behavior: 'smooth' })}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#00B0FF] hover:text-white hover:border-[#00B0FF] transition"
                                onClick={() => document.getElementById('services-similar-carousel')?.scrollBy({ left: 300, behavior: 'smooth' })}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="services-similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "Deep Cleaning Services", price: "₹ 1,599", provider: "CleanPro", image: "https://images.unsplash.com/photo-1527515545081-5db817172677?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "Electrician Services", price: "₹ 300", provider: "PowerFix", image: "https://images.unsplash.com/photo-1621905252507-b35a5f8b25e5?q=80&w=2069&auto=format&fit=crop" },
                            { id: 4, title: "AC Repair & Service", price: "₹ 599", provider: "CoolTech", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop" },
                            { id: 5, title: "Pest Control", price: "₹ 999", provider: "PestFree", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2078&auto=format&fit=crop" },
                        ].map((service) => (
                            <div key={service.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                <div className="h-48 bg-gray-100 relative">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white">
                                        <i className="ri-check-line text-sm font-bold"></i>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{service.title}</h3>
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{service.provider}</span>
                                        <span className="font-bold text-[#00B0FF]">{service.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

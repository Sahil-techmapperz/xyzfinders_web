"use client";

import BeautyCard, { BeautyData } from './BeautyCard';

const BEAUTY_DATA: BeautyData[] = [
    {
        id: 1,
        title: "Premium Bridal Makeup & Hair Styling Package",
        category: "Bridal Makeup",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2071&auto=format&fit=crop",
        specs: {
            serviceFor: "FEMALE",
            type: "HOME SERVICE",
            duration: "3-4 Hours",
            rating: "4.8"
        },
        price: "₹ 15,000/-",
        location: "South Delhi, New Delhi, Delhi",
        postedTime: "Posted 30 min ago",
        verified: true
    },
    {
        id: 2,
        title: "Full Body Massage & Spa - Relaxation Therapy",
        category: "Spa & Massage",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        specs: {
            serviceFor: "UNISEX",
            type: "AT CENTER",
            duration: "60-90 Min",
            rating: "4.9"
        },
        price: "₹ 2,500/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 1 hr ago",
        verified: true
    },
    {
        id: 3,
        title: "Men's Grooming - Haircut, Beard Trim & Facial",
        category: "Men's Salon",
        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop",
        specs: {
            serviceFor: "MALE",
            type: "AT SALON",
            duration: "45-60 Min",
            rating: "4.7"
        },
        price: "₹ 800/-",
        location: "Connaught Place, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true
    },
    {
        id: 4,
        title: "Hair Spa & Deep Conditioning Treatment",
        category: "Hair Care",
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop",
        specs: {
            serviceFor: "UNISEX",
            type: "AT CENTER",
            duration: "90 Min"
        },
        price: "₹ 1,200/-",
        location: "Saket, New Delhi, Delhi",
        postedTime: "Posted 3 hr ago",
        verified: false
    },
    {
        id: 5,
        title: "Professional Makeup for Party & Events",
        category: "Party Makeup",
        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
        specs: {
            serviceFor: "FEMALE",
            type: "HOME SERVICE",
            duration: "1-2 Hours",
            rating: "4.6"
        },
        price: "₹ 3,500/-",
        location: "Rohini, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true
    },
    {
        id: 6,
        title: "Body Polishing & Skin Whitening Treatment",
        category: "Skin Care",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        specs: {
            serviceFor: "UNISEX",
            type: "AT CENTER",
            duration: "120 Min",
            rating: "4.5"
        },
        price: "₹ 4,000/-",
        location: "Dwarka, New Delhi, Delhi",
        postedTime: "Posted 6 hr ago",
        verified: true
    }
];

const SERVICES = [
    { name: "Bridal Makeup", active: true },
    { name: "Spa & Massage", active: false },
    { name: "Hair Care", active: false },
    { name: "Skin Care", active: false },
    { name: "Men's Salon", active: false },
    { name: "Party Makeup", active: false },
    { name: "Nail Art", active: false },
];

export default function BeautyListings() {
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Beauty & Wellness Services in New Delhi - <span className="text-gray-500 font-normal">1,542 available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Service Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Service :</span>
                    <div className="flex flex-wrap gap-2">
                        {SERVICES.map((service, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${service.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#FF8A65]"
                                    }`}
                            >
                                {service.name}
                                {service.active && <i className="ri-close-line"></i>}
                            </button>
                        ))}
                        <button className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#FF8A65] text-[#FF8A65] hover:bg-[#FF8A65] hover:text-white transition-colors">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {BEAUTY_DATA.map(item => (
                        <BeautyCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-left-double-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white font-bold rounded-lg shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">3</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">4</button>
                        <span className="text-gray-300">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">6</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-right-double-line"></i></button>
                    </div>
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">HALFPAGE BANNER</div>
                            <div className="text-xs text-gray-400 mb-8">Digital Marketing</div>

                            <div className="bg-[#FF8A65] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-gray-900 drop-shadow-sm">
                                    Click,<br />Grow,<br />Repeat
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#FF8A65] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#FF8A65] transition-colors">
                                        Get Started!
                                    </button>
                                </div>

                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#B39DDB] to-[#9575CD]">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-50" alt="Marketing" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

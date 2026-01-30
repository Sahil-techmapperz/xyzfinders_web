"use client";

import ServicesCard, { ServiceData } from './ServicesCard';

const SERVICES_DATA: ServiceData[] = [
    {
        id: 1,
        title: "Expert Home Plumbing Services",
        category: "Home Maintenance",
        subcategory: "Plumbing",
        image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2072&auto=format&fit=crop",
        rating: 4.8,
        reviews: 124,
        location: "Kalkaji, New Delhi",
        price: "₹ 500 Visit Charge",
        verified: true,
        provider: "QuickFix Solutions"
    },
    {
        id: 2,
        title: "Professional House Deep Cleaning",
        category: "Cleaning",
        subcategory: "Deep Clean",
        image: "https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?q=80&w=1974&auto=format&fit=crop",
        rating: 4.9,
        reviews: 210,
        location: "Vasant Kunj, New Delhi",
        price: "₹ 1,999 (2BHK)",
        verified: true,
        provider: "Sparkle Homes"
    },
    {
        id: 3,
        title: "AC Repair & Service - Brand Authorized",
        category: "Appliances",
        subcategory: "AC Repair",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
        rating: 4.5,
        reviews: 89,
        location: "Dwarka, New Delhi",
        price: "₹ 600 Visit Charge",
        verified: false,
        provider: "Cool Breeze Services"
    },
    {
        id: 4,
        title: "Interior Design Consultation",
        category: "Design",
        subcategory: "Interior",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
        rating: 5.0,
        reviews: 45,
        location: "South Ex, New Delhi",
        price: "Free Consultation",
        verified: true,
        provider: "Urban Space Designs"
    }
];

export default function ServicesListings() {
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Services in New Delhi
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Filter By:</span>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#00B0FF] hover:text-[#00B0FF]">Verified Only</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#00B0FF] hover:text-[#00B0FF]">High Rating</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#00B0FF] hover:text-[#00B0FF]">Budget Friendly</button>
                    </div>
                </div>

                {/* Popular Services (Moved to Top) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Popular:</span>
                    {["Cleaning", "Plumbing", "Electrician", "Salon", "Carpentry", "Painting", "Pest Control"].map((tag, i) => (
                        <button key={i} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {SERVICES_DATA.map(item => (
                        <ServicesCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#00B0FF] hover:text-white hover:border-[#00B0FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-[#00B0FF] text-white font-bold flex items-center justify-center shadow-md">1</button>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50 transition-all">2</button>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50 transition-all">3</button>
                        <span className="text-gray-400">...</span>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50 transition-all">8</button>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#00B0FF] hover:text-white hover:border-[#00B0FF] transition-all">
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Sidebar Ad/Promo */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#E1F5FE] rounded-2xl p-6 text-center border border-sky-100 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Are you a Professional?</h3>
                            <p className="text-sm text-gray-600 mb-4">Join our network and grow your business today.</p>
                            <button className="w-full bg-[#00B0FF] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#0091EA] transition-colors">
                                Register as Partner
                            </button>
                        </div>

                        {/* Google Ad Placeholder (Larger) */}
                        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center h-[600px] text-gray-400">
                            <i className="ri-advertisement-line text-5xl mb-2"></i>
                            <span className="text-base font-bold">Google Ad Space</span>
                            <span className="text-xs">(Vertical Banner)</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

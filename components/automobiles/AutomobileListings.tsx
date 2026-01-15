"use client";

import AutomobileCard from './AutomobileCard';

// Mock Data
const AUTO_DATA = [
    {
        id: 1,
        title: "Volvo XC90 T6 Inscription Highline",
        category: "Car",
        make: "Volvo",
        model: "XC90",
        variant: "T6 Inscription Highline",
        desc: "FORD ESCAPE 2014 PANORAMIC SUNROOF VERY...",
        year: 2016,
        km: "164,546 Km",
        fuel: "Petrol",
        price: "11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Audi Q3 35 TFSI",
        category: "Car",
        make: "Audi",
        model: "Q3",
        variant: "35 TFSI",
        desc: "AUDI Q3 2018 MODEL IN MINT CONDITION...",
        year: 2018,
        km: "45,000 Km",
        fuel: "Diesel",
        price: "255,546",
        location: "Sector 18, Noida, Uttar Pradesh",
        image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1974&auto=format&fit=crop",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "BMW 5 Series 520d Luxury Line",
        category: "Car",
        make: "BMW",
        model: "5 Series",
        variant: "520d Luxury Line",
        desc: "BMW 5 SERIES 2020 WITH SERVICE RECORDS...",
        year: 2020,
        km: "32,000 Km",
        fuel: "Diesel",
        price: "4,500,000",
        location: "Vasant Vihar, New Delhi",
        image: "https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "Mercedes-Benz C-Class C 220d",
        category: "Car",
        make: "Mercedes-Benz",
        model: "C-Class",
        variant: "C 220d Progressive",
        desc: "MERCEDES C CLASS IN EXCELLENT CONDITION...",
        year: 2019,
        km: "28,500 Km",
        fuel: "Diesel",
        price: "3,850,000",
        location: "Gurugram Phase 1, Haryana",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop",
        verified: false,
        premium: true
    },
    {
        id: 5,
        title: "Toyota Fortuner 2.8 4x4 AT",
        category: "SUV",
        make: "Toyota",
        model: "Fortuner",
        variant: "2.8 4x4 AT",
        desc: "TOYOTA FORTUNER TOP MODEL WHITE...",
        year: 2021,
        km: "55,000 Km",
        fuel: "Diesel",
        price: "3,200,000",
        location: "Connaught Place, New Delhi",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        premium: false
    }
];

const LOCATIONS = [
    { name: "Sarjoni Nagar", active: true },
    { name: "Greater Kailash", active: false },
    { name: "Vasant Kunj", active: false },
    { name: "Defence Colony", active: false },
    { name: "Hauz Khas", active: false },
    { name: "Shanti Niketan", active: false },
    { name: "Gurugram", active: false },
    { name: "Old Delhi", active: false },
    { name: "Chanakyapuri", active: false },
];

export default function AutomobileListings() {
    return (
        <section className="container mx-auto px-4 py-8 bg-[#FFFBF0] min-h-screen font-jost">

            {/* Header Area */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Real Estate for Rent in New Delhi</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Used Automobiles for Sales in New Delhi - <span className="font-bold">26,056</span> <span className="text-gray-500 font-normal text-xl">available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Sort By :</span>
                        <div className="relative">
                            <button className="text-brand-orange text-sm font-medium flex items-center gap-1 border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 rounded">
                                Popular <i className="ri-arrow-down-s-line"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Location Filters */}
                <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-gray-100">
                    <span className="font-bold text-sm text-gray-800">Location :-</span>
                    <div className="flex flex-wrap gap-2">
                        {LOCATIONS.map((loc, idx) => (
                            <button
                                key={idx}
                                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${loc.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-2 shadow-sm"
                                    : "bg-transparent text-gray-600 hover:text-[#FF8A65] hover:bg-orange-50"
                                    }`}
                            >
                                {loc.name}
                                {loc.active && <i className="ri-close-line bg-white/20 rounded-full p-0.5"></i>}
                            </button>
                        ))}
                        <button className="px-4 py-1.5 rounded-full text-xs font-medium text-[#FF8A65] border border-[#FF8A65] hover:bg-[#FF8A65] hover:text-white transition-all">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Listings */}
                <div className="lg:col-span-2 space-y-6">
                    {AUTO_DATA.map(auto => (
                        <AutomobileCard key={auto.id} auto={auto} />
                    ))}

                    {/* Pagination */}
                    <div className="pt-8 flex items-center justify-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            <i className="ri-arrow-left-s-line text-lg"></i>
                        </button>

                        <button className="w-10 h-10 rounded-full bg-[#FF8A65] text-white font-bold flex items-center justify-center shadow-md">
                            1
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            2
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            3
                        </button>

                        <span className="text-gray-400 px-2">...</span>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            10
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            <i className="ri-arrow-right-s-line text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Right Column: Google Ads */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                </div>

            </div>
        </section>
    );
}

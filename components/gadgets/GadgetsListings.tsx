"use client";

import GadgetCard, { GadgetData } from './GadgetCard';

const GADGET_DATA: GadgetData[] = [
    {
        id: 1,
        title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
        category: "Headphones",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop",
        specs: {
            brand: "SONY",
            condition: "LIKE NEW",
            warranty: "IN WARRANTY",
            age: "6 MONTHS"
        },
        price: "₹ 18,500/-",
        location: "Connaught Place, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Dell XPS 15 9520 - i7 12th Gen, 16GB RAM, 512GB SSD",
        category: "Laptop",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop",
        specs: {
            brand: "DELL",
            condition: "EXCELLENT",
            warranty: "IN WARRANTY",
            age: "1 YEAR"
        },
        price: "₹ 85,000/-",
        location: "Saket, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Canon EOS R6 Mark II Mirrorless Camera Body",
        category: "Camera",
        image: "https://images.unsplash.com/photo-1606980702021-66026c71f90a?q=80&w=2070&auto=format&fit=crop",
        specs: {
            brand: "CANON",
            condition: "LIKE NEW",
            warranty: "IN WARRANTY"
        },
        price: "₹ 1,85,000/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false
    },
    {
        id: 4,
        title: "PlayStation 5 Console with Extra Controller",
        category: "Gaming Console",
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
        specs: {
            brand: "SONY",
            condition: "GOOD",
            warranty: "OUT OF WARRANTY",
            age: "2 YEARS"
        },
        price: "₹ 42,000/-",
        location: "Vasant Kunj, New Delhi, Delhi",
        postedTime: "Posted 3 hr ago",
        verified: false,
        premium: false
    },
    {
        id: 5,
        title: "Apple Watch Series 9 GPS 45mm Midnight Aluminum",
        category: "Smartwatch",
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=2070&auto=format&fit=crop",
        specs: {
            brand: "APPLE",
            condition: "LIKE NEW",
            warranty: "IN WARRANTY",
            age: "3 MONTHS"
        },
        price: "₹ 35,000/-",
        location: "Rohini, New Delhi, Delhi",
        postedTime: "Posted 12 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 6,
        title: "JBL Flip 6 Portable Bluetooth Speaker - Black",
        category: "Speaker",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2070&auto=format&fit=crop",
        specs: {
            brand: "JBL",
            condition: "GOOD",
            warranty: "OUT OF WARRANTY",
            age: "1 YEAR"
        },
        price: "₹ 6,500/-",
        location: "Dwarka, New Delhi, Delhi",
        postedTime: "Posted 8 hr ago",
        verified: false,
        premium: false
    }
];

const BRANDS = [
    { name: "Sony", active: true },
    { name: "Apple", active: false },
    { name: "Dell", active: false },
    { name: "Canon", active: false },
    { name: "Samsung", active: false },
    { name: "JBL", active: false },
    { name: "Bose", active: false },
    { name: "HP", active: false },
    { name: "Lenovo", active: false },
];

export default function GadgetsListings() {
    return (
        <section className="container mx-auto px-4 py-8 max-w-7xl font-jost">

            {/* Header / Titles */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Electronics & Gadgets for sale in New Delhi - <span className="text-gray-500 font-normal">3,247 available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Brand Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Brand :</span>
                    <div className="flex flex-wrap gap-2">
                        {BRANDS.map((brand, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${brand.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#FF8A65]"
                                    }`}
                            >
                                {brand.name}
                                {brand.active && <i className="ri-close-line"></i>}
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
                    {GADGET_DATA.map(item => (
                        <GadgetCard key={item.id} item={item} />
                    ))}

                    <div className="flex items-center justify-center gap-2 pt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-left-double-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white font-bold rounded-lg shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">3</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">4</button>
                        <span className="text-gray-300">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">8</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-right-double-line"></i></button>
                    </div>
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">HALFPAGE BANNER</div>
                            <div className="text-xs text-gray-400 mb-8">Digital Marketing</div>

                            {/* Styled Ad Content Placeholder */}
                            <div className="bg-[#FF8A65] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-gray-900 drop-shadow-sm">
                                    Click,<br />Grow,<br />Repeat
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#FF8A65] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#FF8A65] transition-colors">
                                        Get Started!
                                    </button>
                                </div>

                                {/* Abstract shapes/image placeholder */}
                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#B39DDB] to-[#9575CD]">
                                        {/* Mock Person Image */}
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

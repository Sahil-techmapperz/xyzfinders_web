"use client";

import FurnitureCard, { FurnitureData } from './FurnitureCard';

const FURNITURE_DATA: FurnitureData[] = [
    {
        id: 1,
        title: "Modern L-Shaped Sofa Set - 6 Seater with Premium Fabric",
        category: "Sofa",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
        specs: {
            material: "FABRIC",
            condition: "LIKE NEW",
            dimensions: "240x180 cm",
            age: "6 MONTHS"
        },
        price: "₹ 45,000/-",
        location: "Saket, New Delhi, Delhi",
        postedTime: "Posted 1 hr ago",
        verified: true
    },
    {
        id: 2,
        title: "King Size Bed with Storage - Solid Sheesham Wood",
        category: "Bed",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop",
        specs: {
            material: "WOOD",
            condition: "EXCELLENT",
            dimensions: "72x78 inches",
            age: "1 YEAR"
        },
        price: "₹ 32,000/-",
        location: "Greater Kailash, New Delhi, Delhi",
        postedTime: "Posted 3 hr ago",
        verified: true
    },
    {
        id: 3,
        title: "Samsung 8kg Front Load Washing Machine",
        category: "Washing Machine",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=2070&auto=format&fit=crop",
        specs: {
            material: "STEEL",
            condition: "GOOD",
            age: "2 YEARS"
        },
        price: "₹ 18,500/-",
        location: "Rohini, New Delhi, Delhi",
        postedTime: "Posted 5 hr ago",
        verified: false
    },
    {
        id: 4,
        title: "LG 260L Double Door Refrigerator - Smart Inverter",
        category: "Refrigerator",
        image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=2070&auto=format&fit=crop",
        specs: {
            material: "STEEL",
            condition: "LIKE NEW",
            age: "8 MONTHS"
        },
        price: "₹ 25,000/-",
        location: "Dwarka, New Delhi, Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true
    },
    {
        id: 5,
        title: "6 Seater Dining Table Set - Solid Wood with Cushioned Chairs",
        category: "Table",
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2070&auto=format&fit=crop",
        specs: {
            material: "WOOD",
            condition: "GOOD",
            dimensions: "72x42 inches"
        },
        price: "₹ 28,000/-",
        location: "Vasant Kunj, New Delhi, Delhi",
        postedTime: "Posted 8 hr ago",
        verified: false
    },
    {
        id: 6,
        title: "Office Chair - Ergonomic Mesh Back with Lumbar Support",
        category: "Chair",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2070&auto=format&fit=crop",
        specs: {
            material: "MESH",
            condition: "LIKE NEW",
            age: "3 MONTHS"
        },
        price: "₹ 8,500/-",
        location: "Connaught Place, New Delhi, Delhi",
        postedTime: "Posted 4 hr ago",
        verified: true
    }
];

const CATEGORIES = [
    { name: "Sofa", active: true },
    { name: "Bed", active: false },
    { name: "Table", active: false },
    { name: "Chair", active: false },
    { name: "Wardrobe", active: false },
    { name: "Refrigerator", active: false },
    { name: "Washing Machine", active: false },
    { name: "AC", active: false },
];

export default function FurnitureListings() {
    return (
        <section className="container mx-auto px-4 py-8 max-w-7xl font-jost">

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Furniture & Appliances for sale in New Delhi - <span className="text-gray-500 font-normal">2,856 available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Category :</span>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${cat.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#FF8A65]"
                                    }`}
                            >
                                {cat.name}
                                {cat.active && <i className="ri-close-line"></i>}
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
                    {FURNITURE_DATA.map(item => (
                        <FurnitureCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-left-double-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white font-bold rounded-lg shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">3</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">4</button>
                        <span className="text-gray-300">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">7</button>
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

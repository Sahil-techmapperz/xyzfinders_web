import React from 'react';

interface Product {
    id: number;
    name: string;
    brand?: string;
    specs: string;
    condition: string;
    warranty: string;
    rating: number;
    reviews: number;
    price: string;
    image1: string;
    image2: string;
}

const products: Product[] = [
    {
        id: 1,
        name: 'ThinkPad X1 TABLET GEN 3',
        specs: '8th Gen i5 Quad Core Speed | 8GB RAM',
        condition: '6 Month Old',
        warranty: 'In Warranty Period',
        rating: 5,
        reviews: 450,
        price: '₹ 25,000',
        image1: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTqI8qjDfGY950I1YXHpi4CS0Kgm44UC3C6yDWKZhv_oro7bu0DnhHwQPWL6q_vd9lLMHLOvZHYFn5BYLzdlLLRrBmii4OPQ6YWVLr-hInj0XBqBM8pNxjw9NetFOStEl0xW1eHfLhk8Q&usqp=CAc',
        image2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY-9JsrLMvjWU3b77voV_jMxa7aYYTjEmdLg&s'
    },
    {
        id: 2,
        name: 'iPhone 17 Pro Max',
        brand: 'Apple',
        specs: 'Titanium Design | A19 Pro Chip',
        condition: '1 Year Old',
        warranty: 'Out of Warranty',
        rating: 5,
        reviews: 450,
        price: '₹ 105,565',
        image1: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT6mSUFw9EZDLW4rfOTyEoWQj1Yzu4ltqNLQ5IfeYvzDDQp2QuYZ_1Ech0i5zGmzrlc-DA05bJDjX9JB3BYoSuPyDLAKZVkyQdhav5mE_Wj-8R2VoLUrcZBjhuzk6ujXzS-krjsJXg&usqp=CAc',
        image2: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT4q5YoX_R4UFTUEDRoG2dp0I0x5XWK2PKUWg_RahEpX4NWrAV9XBDjRiKVcGsF-1cZ_mX6ePdwH6IpKGYon66TTc73q3HAs23s7grnqb-teeKv2vQn3xBSIS7AS8CApkc6sM6MklI&usqp=CAc'
    },
    {
        id: 3,
        name: 'Samsung Galaxy S25 Ultra',
        specs: 'AI Features | 200MP Camera',
        condition: 'New',
        warranty: '1 Year Warranty',
        rating: 4.5,
        reviews: 320,
        price: '₹ 1,25,000',
        image1: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=300&q=80',
        image2: 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?auto=format&fit=crop&w=300&q=80'
    },
    {
        id: 4,
        name: 'Foldable Phone X',
        specs: 'Dual Screen | 5G Ready',
        condition: '1 Year Old',
        warranty: 'Out of Warranty',
        rating: 5,
        reviews: 450,
        price: '₹ 105,565',
        image1: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLHtf9eowG0uhZCWN40VFetsE08D5S27JGNfUGC-qmMCOTgUiLKjQxFaSbrqAGmCkgRnv86YVz6zScd_YlVJSjcFk5llSOOC6DgodxXZPgQTYS2ODHT59NTXkn8lBSgDRKg-5PqrQ&usqp=CAc',
        image2: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQA4jdlcozXJ53l3d-3f40qSnbfMub2qsxsIzc2eQwXyMAuWx1LC3V0kwu0wGTcsYBfo32VtUcMvzjXDe8FttaHZGjHjbB1rF3_r40iXCLY23i33w2gPsjVz5lzyx5totWPeAMCfLI&usqp=CAc'
    },
    {
        id: 5,
        name: 'Honor MagicBook',
        specs: 'Lightweight | Long Battery Life',
        condition: '6 Month Old',
        warranty: 'In Warranty Period',
        rating: 5,
        reviews: 450,
        price: '₹ 65,000',
        image1: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=300&q=80',
        image2: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80'
    }
];

export default function WeeklyDeals() {
    return (
        <section className="hidden md:block bg-brand-orange py-12 mb-8">
            <div className="container mx-auto px-4">

                {/* Header */}
                <h2 className="text-3xl font-bold text-white mb-6">Weekly Best deals</h2>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {/* Reusing existing buttons */}
                    <button className="px-5 py-2 rounded-full border bg-[#F6E6D9]/20 text-white font-medium text-sm whitespace-nowrap hover:bg-white hover:text-brand-orange transition">Furniture & Appliance</button>
                    <button className="px-5 py-2 rounded-full bg-brand-teal text-white font-medium text-sm border border-transparent whitespace-nowrap shadow-md">Phone & Tablets</button>
                    <button className="px-5 py-2 rounded-full border border-white/50 text-white font-medium text-sm whitespace-nowrap hover:bg-white hover:text-brand-orange transition">Education & Learning</button>
                    <button className="px-5 py-2 rounded-full border border-white/50 text-white font-medium text-sm whitespace-nowrap hover:bg-white hover:text-brand-orange transition">Jobs</button>
                    <button className="px-5 py-2 rounded-full border border-white/50 text-white font-medium text-sm whitespace-nowrap hover:bg-white hover:text-brand-orange transition">Property</button>
                    <button className="px-5 py-2 rounded-full border border-white/50 text-white font-medium text-sm whitespace-nowrap hover:bg-white hover:text-brand-orange transition">Gadgets & Electronics</button>
                    <button className="px-5 py-2 rounded-full border border-white/50 text-white font-medium text-sm whitespace-nowrap hover:bg-white hover:text-brand-orange transition">Gadgets & Electronics</button>
                </div>

                {/* Product Grid / Mobile Scroll */}
                <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 md:gap-4 md:mb-12 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {products.map((product) => (
                        <div key={product.id} className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-xl p-3 shadow-md group relative overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 cursor-pointer">

                            {/* Image Container with Hover Effect */}
                            <div className="h-40 md:h-40 rounded-lg mb-3 relative overflow-hidden bg-gray-100 flex items-center justify-center">
                                {/* Image 1 (Default) */}
                                <img
                                    src={product.image1}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0 absolute inset-0"
                                />
                                {/* Image 2 (Hover) */}
                                <img
                                    src={product.image2}
                                    alt={`${product.name} Hover`}
                                    className="w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0"
                                />
                            </div>

                            {/* Brand (Optional) */}
                            {product.brand && <div className="text-xs text-brand-orange font-semibold mb-1">{product.brand}</div>}

                            {/* Title */}
                            <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[2.5em] leading-tight">
                                {product.name}: {product.specs}
                            </h3>

                            {/* Meta Info (Condition/Warranty) as Details */}
                            <ul className="flex flex-wrap gap-2 text-xs text-gray-400 mb-3">
                                <li className="flex items-center gap-1"><i className="ri-time-line text-gray-300 text-xs"></i> <span className="text-gray-500">{product.condition}</span></li>
                                <li className="flex items-center gap-1"><i className="ri-shield-check-line text-gray-300 text-xs"></i> <span className="text-gray-500">{product.warranty}</span></li>
                            </ul>

                            {/* Rating and Price Container */}
                            <div className="relative h-14 w-full">
                                <div className="absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
                                    {/* Rating (replaces Location line in other cards) */}
                                    <div className="flex items-center text-yellow-400 text-xs gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : i < product.rating ? 'half-fill' : 'line'}`}></i>
                                        ))}
                                        <span className="text-gray-400">({product.reviews})</span>
                                    </div>
                                    <div className="text-[#FF4D4D] font-bold text-lg mt-1">{product.price}</div>
                                </div>

                                {/* Hover Button Overlay */}
                                <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                                    <button className="bg-brand-teal text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg hover:bg-teal-700 transition-colors w-full">
                                        View Detail
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Banners Grid (Unchanged) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 rounded-xl overflow-hidden relative h-64 bg-[#EAF2F5]">
                        <img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=600&q=80" alt="Fitness Header" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:col-span-1 rounded-xl overflow-hidden relative h-64 bg-[#FFF5E6]">
                        <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=300&q=80" alt="Men's Fashion" className="w-full h-full object-cover" />
                    </div>
                    <div className="md:col-span-1 rounded-xl overflow-hidden relative h-64 bg-[#E0F2FE]">
                        <img src="https://images.unsplash.com/photo-1627483297929-37f416fec7cd?auto=format&fit=crop&w=300&q=80" alt="Fan Offer" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
}

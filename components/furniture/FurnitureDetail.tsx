"use client";

import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

export default function FurnitureDetail({ id }: { id?: string }) {
    const furniture = {
        title: "Modern L-Shaped Sofa Set - 6 Seater with Premium Fabric",
        description: "Beautiful L-shaped sofa in excellent condition. Made with high-quality fabric and solid wooden frame. Perfect for modern living rooms. Very comfortable with thick cushioning.",
        price: "₹ 45,000/-",
        category: "Sofa",
        postedTime: "Posted 1 hr ago",
        location: "Saket, New Delhi, Delhi",
        specs: [
            { label: "Category", value: "Sofa" },
            { label: "Material", value: "Fabric & Wood" },
            { label: "Condition", value: "Like New" },
            { label: "Dimensions", value: "240x180 cm" },
            { label: "Age", value: "6 Months" },
            { label: "Color", value: "Grey" },
            { label: "Seating Capacity", value: "6 Seater" },
            { label: "Warranty", value: "No" },
        ],
        features: [
            "Premium fabric upholstery",
            "Solid wooden frame",
            "Removable cushion covers",
            "Easy to clean"
        ],
        seller: {
            name: "Priya Gupta",
            verified: true,
            memberSince: "2021"
        }
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"
                            alt={furniture.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {furniture.seller.verified && (
                            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2">
                                <i className="ri-shield-check-fill"></i> VERIFIED SELLER
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2070&auto=format&fit=crop"
                                alt="Detail view"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
                                alt="Side view"
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
                                <h1 className="text-3xl font-bold text-gray-900">{furniture.title}</h1>
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
                                {furniture.description}
                            </p>

                            <div className="flex items-center gap-6 text-gray-700 font-medium mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <i className="ri-bookmark-line text-[#FF8A65]"></i>
                                    <span>{furniture.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ri-time-line text-[#FF8A65]"></i>
                                    <span>{furniture.postedTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <i className="ri-map-pin-line text-[#FF8A65]"></i>
                                <span>{furniture.location}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-linear-to-r from-[#FF8A65] to-[#FF7043] rounded-2xl p-6 mb-8 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-white/80 text-sm font-medium mb-1">Price</div>
                                    <div className="text-4xl font-bold text-white">{furniture.price}</div>
                                </div>
                                <button className="bg-white text-[#FF8A65] font-bold px-8 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md">
                                    Make Offer
                                </button>
                            </div>
                        </div>

                        {/* Item Details */}
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Item Details</h2>

                            <div className="space-y-4">
                                {furniture.specs.map((spec, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">{spec.label}</span>
                                        <span className="text-sm font-bold text-gray-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description & Features */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {furniture.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Key Features</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {furniture.features.map((feature, idx) => (
                                        <li key={idx}>- {feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#FFF0F0] text-[#FF6E40] text-xs font-medium px-3 py-1 rounded">
                                    {furniture.category}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller Info */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* Seller Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Seller Information</h3>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#FF8A65] to-[#FF7043] flex items-center justify-center text-white text-xl font-bold">
                                        {furniture.seller.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-gray-900">{furniture.seller.name}</div>
                                        <div className="text-xs text-gray-500">Member since {furniture.seller.memberSince}</div>
                                    </div>
                                    {furniture.seller.verified && (
                                        <i className="ri-verified-badge-fill text-green-500 text-xl"></i>
                                    )}
                                </div>

                                <ContactSellerButton
                                    productId={id || 1}
                                    sellerId={1}
                                    className="w-full bg-[#2196F3] text-white font-bold py-3 rounded-xl hover:bg-[#1976D2] transition-colors mb-3 flex items-center justify-center gap-2"
                                />

                                <button className="w-full bg-[#4CAF50] text-white font-bold py-3 rounded-xl hover:bg-[#45a049] transition-colors flex items-center justify-center gap-2">
                                    <i className="ri-phone-line"></i>
                                    Call Seller
                                </button>
                            </div>

                            {/* Safety Tips */}
                            <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="ri-shield-check-line text-yellow-600"></i>
                                    Safety Tips
                                </h3>
                                <ul className="text-xs text-gray-600 space-y-2">
                                    <li className="flex gap-2">
                                        <span>•</span>
                                        <span>Meet in a safe public place</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>•</span>
                                        <span>Check the item before you buy</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <span>•</span>
                                        <span>Pay only after collecting item</span>
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

                {/* Similar Products */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Similar Products</h2>
                        <div className="flex gap-2">
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => {
                                    const container = document.getElementById('similar-furniture-carousel');
                                    if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                }}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => {
                                    const container = document.getElementById('similar-furniture-carousel');
                                    if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                }}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="similar-furniture-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "King Size Bed - Solid Wood", price: "₹ 32,000/-", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "Samsung Washing Machine", price: "₹ 18,500/-", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=2070&auto=format&fit=crop" },
                            { id: 4, title: "LG Refrigerator 260L", price: "₹ 25,000/-", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?q=80&w=2070&auto=format&fit=crop" },
                            { id: 5, title: "6 Seater Dining Table", price: "₹ 28,000/-", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2070&auto=format&fit=crop" },
                            { id: 6, title: "Office Chair - Ergonomic", price: "₹ 8,500/-", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2070&auto=format&fit=crop" },
                        ].map((product) => (
                            <Link key={product.id} href={`/furniture/${product.id}`}>
                                <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                    <div className="h-48 bg-gray-100 relative">
                                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{product.title}</h3>
                                        <div className="text-[#FF6E40] font-bold text-base">{product.price}</div>
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

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PropertyDetail({ id }: { id: string }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if (data.success) {
                    setProduct(data.data);
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 h-96 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-gray-500">
                Product not found.
            </div>
        );
    }

    // Parse attributes safely
    const attrs = typeof product.product_attributes === 'string'
        ? JSON.parse(product.product_attributes)
        : product.product_attributes || {};

    const specs = attrs.specs || {};
    const amenities = attrs.amenities || [];

    // Process images
    const images = product.images && product.images.length > 0
        ? product.images.map((img: any) => `data:image/jpeg;base64,${img.image}`)
        : ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'];

    return (
        <section className="container mx-auto px-4 py-8 font-jost">
            {/* 1. Hero Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-8 h-[400px] md:h-[500px]">
                {/* Large Main Image */}
                <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-100">
                    <img
                        src={images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Right Column Images */}
                <div className="flex flex-col gap-2 h-full">
                    <div className="relative h-[250px] overflow-hidden rounded-2xl group cursor-pointer bg-gray-100">
                        <img
                            src={images[1] || images[0]}
                            alt={`${product.title} view 2`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="relative h-[250px] overflow-hidden rounded-2xl group cursor-pointer bg-gray-100">
                        <img
                            src={images[2] || images[0]}
                            alt={`${product.title} view 3`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                    </div>
                </div>
            </div>

            {/* 2. Main Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">

                {/* Left Content */}
                <div className="lg:col-span-3 text-gray-800">
                    {/* Header: Title & Actions */}
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight flex-1">
                            {product.title}
                        </h1>
                        <div className="flex gap-2 ml-4">
                            <button className="w-8 h-8 rounded-full bg-red-50 text-[#FF4D4D] flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition">
                                <i className="ri-heart-fill text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition">
                                <i className="ri-share-line text-sm"></i>
                            </button>
                        </div>
                    </div>

                    {/* Description Excerpt */}
                    <p className="text-gray-500 text-[10px] sm:text-xs mb-4 leading-relaxed line-clamp-2">
                        {product.description}
                    </p>

                    {/* Key Attributes Row */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 pb-6 border-b border-gray-100">
                        <div className="font-bold text-xs">
                            {specs.roomType || attrs.type || 'Property'}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                            <i className="ri-map-pin-line"></i>
                            <span className="line-clamp-1">{product.location?.name || product.city || 'Location N/A'}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <span className="text-[#FF4D4D] text-2xl font-bold">₹ {product.price}</span>
                        <span className="text-gray-500 text-xs font-medium ml-1">/ Monthly</span>
                    </div>

                    {/* 3. Property Details & Seller Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                        {/* Left: Property Specifications */}
                        <div className="xl:col-span-2">
                            {/* Property Details Table */}
                            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Property Details</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Type</span>
                                        <span className="text-sm font-bold text-gray-900">{attrs.type || 'N/A'}</span>
                                    </div>
                                    {specs.roomType && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm text-gray-500">Room Type</span>
                                            <span className="text-sm font-bold text-gray-900">{specs.roomType}</span>
                                        </div>
                                    )}
                                    {specs.securityDeposit && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm text-gray-500">Security Deposit</span>
                                            <span className="text-sm font-bold text-gray-900">₹ {specs.securityDeposit}</span>
                                        </div>
                                    )}
                                    {specs.attachedBathroom && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm text-gray-500">Attached Bathroom</span>
                                            <span className="text-sm font-bold text-gray-900">{specs.attachedBathroom}</span>
                                        </div>
                                    )}
                                    {specs.balcony && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm text-gray-500">Balcony</span>
                                            <span className="text-sm font-bold text-gray-900">{specs.balcony}</span>
                                        </div>
                                    )}
                                    {specs.updated && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm text-gray-500">Updated</span>
                                            <span className="text-sm font-bold text-gray-900">{specs.updated}</span>
                                        </div>
                                    )}
                                    {specs.tenants && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                            <span className="text-sm text-gray-500">Tenant Preference</span>
                                            <span className="text-sm font-bold text-gray-900">{specs.tenants}</span>
                                        </div>
                                    )}
                                    {specs.furnishing && (
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-gray-500">Furnishing</span>
                                            <span className="text-sm font-bold text-gray-900">{specs.furnishing}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right: Seller Card */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Property Owner</h3>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#FF8A65] to-[#FF7043] flex items-center justify-center text-white text-xl font-bold shrink-0">
                                            {product.seller_name ? product.seller_name.charAt(0) : 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-gray-900 truncate">{product.seller_name || 'Unknown User'}</div>
                                            <div className="text-xs text-gray-500">Member since Dec 2025</div>
                                        </div>
                                        <i className="ri-verified-badge-fill text-green-500 text-xl shrink-0"></i>
                                    </div>

                                    <button className="w-full bg-[#2196F3] text-white font-bold py-3 rounded-xl hover:bg-[#1976D2] transition-colors mb-3 flex items-center justify-center gap-2 cursor-pointer">
                                        <i className="ri-chat-3-line"></i>
                                        Chat with Owner
                                    </button>

                                    <button className="w-full bg-[#4CAF50] text-white font-bold py-3 rounded-xl hover:bg-[#45a049] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                        <i className="ri-phone-line"></i>
                                        Call Owner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features / Description Heading */}
                    {amenities.length > 0 && (
                        <div className="mt-10 mb-8">
                            <h3 className="text-sm font-bold text-gray-900 mb-6">Amenities & Features</h3>

                            {/* Amenities Circles */}
                            <div className="flex flex-wrap gap-4">
                                {amenities.map((amenity: any, idx: number) => (
                                    <div key={idx} className="flex flex-col items-center gap-2">
                                        <div className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-gray-500 text-sm hover:border-brand-orange hover:text-brand-orange hover:shadow-sm transition bg-white">
                                            <i className={amenity.icon}></i>
                                        </div>
                                        <span className="text-[8px] font-medium text-gray-500 text-center max-w-[50px] leading-tight">
                                            {amenity.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* 4. Map Section - Optional if Coordinates Available */}
            {/* Using a static map or placeholder for now as mock data had specific coords */}
            <div className="mb-12">
                <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 mb-6">
                    {(attrs.location || product.location || product.city) ? (
                        <iframe
                            width="100%"
                            height="100%"
                            title="map"
                            scrolling="no"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(attrs.location || product.location || product.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full border-0 filter grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <i className="ri-map-pin-2-line text-4xl mb-2"></i>
                                <p>Map View Unavailable</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Location</h2>
                    <p className="text-xs text-gray-500">{attrs.location || product.location?.name || product.city || 'Location N/A'}</p>
                </div>
            </div>

            {/* 5. Similar Properties Carousel (Dynamic) */}
            <div className="mb-12 relative">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Similar Properties</h2>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                            const container = document.getElementById('similar-properties-carousel');
                            if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                        }}>
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                            const container = document.getElementById('similar-properties-carousel');
                            if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                        }}>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>

                <div id="similar-properties-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {product.similarProducts && product.similarProducts.length > 0 ? (
                        product.similarProducts.map((prop: any, i: number) => {
                            // Helper to get spec counts safely
                            const pAttrs = typeof prop.product_attributes === 'string'
                                ? JSON.parse(prop.product_attributes)
                                : prop.product_attributes || {};
                            const pSpecs = pAttrs.specs || {};

                            return (
                                <Link href={`/real-estate/${prop.id}-${prop.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} key={i}>
                                    <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                        {/* Image */}
                                        <div className="relative h-48 bg-gray-100">
                                            <img
                                                src={prop.image ? `data:image/jpeg;base64,${prop.image}` : '/placeholder.jpg'}
                                                className="w-full h-full object-cover"
                                                alt={prop.title}
                                            />
                                            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-4">
                                            <h4 className="font-bold text-gray-900 text-sm mb-3 truncate">{prop.title}</h4>

                                            {/* Specs */}
                                            <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <i className="ri-hotel-bed-fill text-gray-300"></i> {pSpecs.bedroom || '-'} Bed
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <i className="ri-restaurant-fill text-gray-300"></i> {pSpecs.kitchen || '-'} Kit
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <i className="ri-drop-fill text-gray-300"></i> {pSpecs.bathroom || '-'} Bath
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-3">
                                                <i className="ri-map-pin-line"></i>
                                                <span className="truncate">{prop.city || 'Location N/A'}</span>
                                            </div>

                                            {/* Price */}
                                            <div>
                                                <span className="text-[#FF4D4D] text-base font-bold">₹ {prop.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="flex w-full items-center justify-center p-8 text-gray-400 text-sm italic">
                            No similar properties found.
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
}

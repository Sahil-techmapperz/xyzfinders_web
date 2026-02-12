"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

export default function MobileDetail({ id }: { id?: string }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
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

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6E40]"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="text-xl text-gray-500">Product not found</div>
            </div>
        );
    }

    // Parse attributes
    let attrs: any = {};
    try {
        attrs = typeof product.product_attributes === 'string'
            ? JSON.parse(product.product_attributes)
            : product.product_attributes || {};
    } catch (e) {
        console.error("Error parsing attributes", e);
    }

    const images = product.images && product.images.length > 0
        ? product.images.map((img: any) => `data:image/jpeg;base64,${img.image}`)
        : ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'];

    // Map attributes to UI
    const topSpecs = [
        { label: "AGE", value: attrs.specs?.age || 'N/A' },
        { label: "MODEL", value: attrs.specs?.model || 'N/A' },
        { label: "STORAGE", value: attrs.specs?.storage || 'N/A' },
        { label: "COLOUR", value: attrs.specs?.colour || 'N/A' },
    ];

    const details = [
        { label: "Warranty", value: attrs.details?.warranty || 'N/A' },
        { label: "Memory (RAM)", value: attrs.details?.ram || 'N/A' },
        { label: "Condition", value: product.condition || 'Used' },
        { label: "Version", value: attrs.details?.version || 'N/A' },
        { label: "Battery Health", value: attrs.details?.battery || 'N/A' },
        { label: "Damage", value: attrs.details?.damage || 'None' },
    ];

    const productSpecsList = [
        `- Model : ${attrs.specs?.model || 'N/A'}`,
        `- Color : ${attrs.specs?.colour || 'N/A'}`,
        `- Storage Capacity : ${attrs.specs?.storage || 'N/A'}`,
        `- Memory RAM : ${attrs.details?.ram || 'N/A'}`,
        `- Warranty : ${attrs.details?.warranty || 'N/A'}`,
    ];

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-8 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section - 3 Images */}
                <div className="mb-8">
                    {/* Mobile Carousel (Visible only on mobile) */}
                    <div className="md:hidden relative h-[300px] w-full rounded-2xl overflow-hidden bg-white group">
                        <img
                            src={images[activeImage]}
                            alt={`${product.title} - View ${activeImage + 1}`}
                            className="w-full h-full object-contain bg-gray-50 transition-opacity duration-300"
                        />

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1);
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all active:scale-95"
                                >
                                    <i className="ri-arrow-left-s-line text-xl"></i>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveImage(prev => prev === images.length - 1 ? 0 : prev + 1);
                                    }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all active:scale-95"
                                >
                                    <i className="ri-arrow-right-s-line text-xl"></i>
                                </button>
                            </>
                        )}

                        {/* Counter Badge */}
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5">
                            <i className="ri-image-line"></i>
                            {activeImage + 1} / {images.length}
                        </div>
                    </div>

                    {/* Desktop Grid (Hidden on Mobile) */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
                        {/* Main Image (Left) */}
                        <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                            <img
                                src={images[0]}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        {/* Side Images (Right Column, Stacked) */}
                        <div className="flex flex-col gap-2 h-full">
                            <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                                <img
                                    src={images[1] || images[0]}
                                    alt={`${product.title} view 2`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                                <img
                                    src={images[2] || images[0]}
                                    alt={`${product.title} view 3`}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Title & Specs ROW */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">
                            {product.title}
                        </h1>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-sm">
                                <i className="ri-heart-fill text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition shadow-sm">
                                <i className="ri-share-line text-sm"></i>
                            </button>
                        </div>
                    </div>

                    {/* Specs Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl">
                        {topSpecs.map((spec, i) => (
                            <div key={i} className="bg-white border-b-2 border-gray-100 rounded-xl p-3 text-center shadow-sm">
                                <span className="block text-[10px] uppercase font-bold text-gray-800 mb-1">{spec.label}</span>
                                <span className="block text-xs text-gray-500 font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price & Posted Time */}
                    <div className="flex items-center gap-4">
                        <span className="text-[#FF2D55] text-xl md:text-2xl font-bold">₹ {product.price.toLocaleString()}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            Posted on {new Date(product.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* 3. Main Layout: Details (Left) + Sidebar (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Details */}
                    <div className="xl:col-span-2">

                        {/* Item Details Table */}
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Item Details</h2>

                            <div className="space-y-4">
                                {details.map((detail, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">{detail.label}</span>
                                        <span className="text-sm font-bold text-gray-900">{detail.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description & Specs */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Product Specification</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {productSpecsList.map((spec, i) => (
                                        <li key={i}>{spec}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#FFF0F0] text-[#FF6E40] text-xs font-medium px-3 py-1 rounded">
                                    Face Lens
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller & Banner (span-1) */}
                    <div className="xl:col-span-1 space-y-8">

                        {/* Seller Card */}
                        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                            <p className="text-[10px] md:text-xs text-gray-400 font-medium mb-3 md:mb-4">Posted By</p>

                            <div className="flex items-center gap-3 md:gap-4 mb-2">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {product.seller_avatar ? (
                                        <img
                                            src={`data:image/jpeg;base64,${product.seller_avatar}`}
                                            alt={product.seller_name || 'Seller'}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-lg md:text-xl font-bold text-blue-600">
                                            {product.seller_name ? product.seller_name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-bold text-sm md:text-base flex items-center gap-1">
                                        {product.seller_name || 'Seller'}
                                        {!!product.seller_is_verified && (
                                            <i className="ri-verified-badge-fill text-blue-500 text-base md:text-lg"></i>
                                        )}
                                    </h3>
                                    <p className="text-[10px] md:text-xs text-gray-500">Seller</p>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 mb-4 md:mb-6">
                                Member Since {product.seller_created_at ? new Date(product.seller_created_at).getFullYear() : '2025'}
                            </p>

                            <div className="space-y-2 md:space-y-3">
                                <button className="w-full bg-[#D53F3F] hover:bg-[#c43232] text-white font-bold py-2.5 md:py-3 rounded-lg mb-2 md:mb-3 flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm md:text-base">
                                    <i className="ri-phone-fill"></i>
                                    Call
                                </button>

                                <ContactSellerButton
                                    productId={id || "1"}
                                    sellerId={product.user_id || 1}
                                    className="w-full bg-[#0078D4] hover:bg-[#006cbd] text-white font-bold py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* Google Ads Banner Slot */}
                        <div className="bg-gray-200 rounded-none md:rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px]">
                            Google Ads
                        </div>

                    </div>


                </div>

                {/* 4. Similar Properties (Carousel) */}
                <div className="mt-16 relative">
                    {product.similarProducts && product.similarProducts.length > 0 && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Similar Properties</h2>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition" onClick={() => {
                                        const container = document.getElementById('similar-carousel');
                                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}>
                                        <i className="ri-arrow-left-s-line"></i>
                                    </button>
                                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-brand-orange hover:text-white hover:border-brand-orange transition" onClick={() => {
                                        const container = document.getElementById('similar-carousel');
                                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}>
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </div>
                            </div>

                            <div id="similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {product.similarProducts.map((mobile: any) => (
                                    <Link href={`/mobiles/${mobile.id}-${mobile.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} key={mobile.id}>
                                        <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                            <div className="h-48 bg-gray-100 relative">
                                                <img
                                                    src={mobile.image ? `data:image/jpeg;base64,${mobile.image}` : '/placeholder.jpg'}
                                                    alt={mobile.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{mobile.title}</h3>
                                                <div className="text-[#FF6E40] font-bold text-sm">₹ {mobile.price.toLocaleString()}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

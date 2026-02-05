"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

export default function ServicesDetail({ id }: { id?: string }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00B0FF]"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="text-xl text-gray-500">Service not found</div>
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

    const servicesOffered = attrs.servicesOffered || [
        "Consultation",
        "Installation",
        "Repair & Maintenance"
    ];

    const experience = attrs.experience || 'Experienced';
    const rating = attrs.rating || 'New';
    const reviews = attrs.reviews || 0;
    const providerName = product.seller_name || 'Service Provider';
    const location = product.city || product.location?.name || 'Local Service';

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                        <img
                            src={images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg">
                            <span className="text-[#00B0FF] font-bold text-xl">{rating}</span>
                            <div className="flex text-yellow-500 text-sm">
                                <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-half-fill"></i>
                            </div>
                            <span className="text-gray-500 text-sm font-medium">({reviews} Reviews)</span>
                        </div>
                    </div>
                    {/* Side Images */}
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                            <img
                                src={images[1] || images[0]}
                                alt="Side View 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Google Ad Placeholder */}
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                                {/* Optional overlay or ad badge if needed */}
                            </div>
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                            <img
                                src={images[2] || images[0]}
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
                            {product.title}
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
                                <p className="text-sm font-bold text-gray-900">{experience}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#FFF3E0] flex items-center justify-center text-[#EF6C00]"><i className="ri-map-pin-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Service Area</p>
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{location}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]"><i className="ri-money-rupee-circle-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Charge</p>
                                <p className="text-lg font-bold text-[#2E7D32]">₹ {product.price.toLocaleString()}</p>
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
                                {product.description}
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">Services Offered</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {servicesOffered.map((service: string, i: number) => (
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
                                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                                    {providerName ? providerName.charAt(0).toUpperCase() : 'P'}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Service Provider</p>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{providerName}</h3>
                                    <span className="text-[10px] text-blue-500 flex items-center gap-1 font-bold mt-1">
                                        <i className="ri-checkbox-circle-fill"></i> Verified Partner
                                    </span>
                                </div>
                            </div>

                            <button className="w-full bg-[#00B0FF] hover:bg-[#0091EA] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-2">
                                <i className="ri-phone-fill"></i> Call Now
                            </button>
                            <ContactSellerButton
                                productId={id || "1"}
                                sellerId={product.seller_id || 1}
                                className="w-full bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#2196F3] font-bold text-lg py-4 rounded-xl shadow-sm transition-transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-2 border border-[#90CAF9]/30"
                                label="Chat with Provider"
                            />

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
                    {product.similarProducts && product.similarProducts.length > 0 && (
                        <>
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
                                {product.similarProducts.map((service: any) => (
                                    <Link href={`/services/${service.id}-${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} key={service.id}>
                                        <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                            <div className="h-48 bg-gray-100 relative">
                                                <img
                                                    src={service.image ? `data:image/jpeg;base64,${service.image}` : '/placeholder.jpg'}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 left-2 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white">
                                                    <i className="ri-check-line text-sm font-bold"></i>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{service.title}</h3>
                                                <div className="flex justify-between items-center text-sm text-gray-500">
                                                    <span>{service.seller_name || 'Provider'}</span>
                                                    <span className="font-bold text-[#00B0FF]">₹ {service.price.toLocaleString()}</span>
                                                </div>
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

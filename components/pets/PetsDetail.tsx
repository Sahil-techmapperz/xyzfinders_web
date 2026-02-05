"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

export default function PetsDetail({ id }: { id?: string }) {
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF8A65]"></div>
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
    const specs = [
        { label: "AGE", value: attrs.specs?.age || 'N/A' },
        { label: "BREED", value: attrs.specs?.breed || 'N/A' },
        { label: "GENDER", value: attrs.specs?.gender || 'N/A' },
        { label: "VACCINATED", value: attrs.specs?.vaccinated || 'N/A' },
    ];

    const details = [
        { label: "KCI Registered", value: attrs.details?.kci || 'No' },
        { label: "Color", value: attrs.details?.color || 'N/A' },
        { label: "Health Certificate", value: attrs.details?.certificate || 'No' },
        { label: "Dewormed", value: attrs.details?.dewormed || 'No' },
        { label: "Microchipped", value: attrs.details?.microchipped || 'No' },
        { label: "Location", value: product.city || product.location?.name || 'Unknown' },
    ];

    const productSpecsList = [
        `- Breed : ${attrs.specs?.breed || 'N/A'}`,
        `- Age : ${attrs.specs?.age || 'N/A'}`,
        `- Gender : ${attrs.specs?.gender || 'N/A'}`,
        `- KCI Papers : ${attrs.details?.kci || 'No'}`,
        `- Vaccination : ${attrs.specs?.vaccinated || 'N/A'}`,
    ];

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
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
                        {specs.map((spec, i) => (
                            <div key={i} className="bg-white border-b-2 border-gray-100 rounded-xl p-3 text-center shadow-sm">
                                <span className="block text-[10px] uppercase font-bold text-gray-800 mb-1">{spec.label}</span>
                                <span className="block text-xs text-gray-500 font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price & Posted Time */}
                    <div className="flex items-center gap-4">
                        <span className="text-[#FF2D55] text-2xl font-bold">₹ {product.price.toLocaleString()}</span>
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
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Details</h2>
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
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                                {product.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Health & Info</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {productSpecsList.map((spec, i) => (
                                        <li key={i}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller & Banner */}
                    <div className="xl:col-span-1 space-y-6">

                        {/* Seller Card */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-1">Posted By:</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg">
                                            {product.seller_name ? product.seller_name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{product.seller_name || 'Unknown User'}</h3>
                                            <span className="text-[10px] text-blue-500 flex items-center gap-1">
                                                <i className="ri-checkbox-circle-fill"></i> Verified Breeder
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 mb-4">Member Since 2022</p>

                            <button className="w-full bg-[#D50000] hover:bg-[#b50000] text-white text-xs font-bold py-2.5 rounded-lg mb-2 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <i className="ri-phone-fill"></i> Call Seller
                            </button>
                            <ContactSellerButton productId={id || "1"} sellerId={product.seller_id || 1} />
                        </div>

                        {/* Google Ads Vertical Banner */}
                        <div className="bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px] relative overflow-hidden">
                            <span className="transform -rotate-90 whitespace-nowrap">Google Ads</span>
                        </div>

                    </div>
                </div>

                {/* 4. Similar Properties (Carousel) */}
                <div className="mt-16 relative">
                    {product.similarProducts && product.similarProducts.length > 0 && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Similar Listings</h2>
                                <div className="flex gap-2">
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                        onClick={() => document.getElementById('pets-similar-carousel')?.scrollBy({ left: -300, behavior: 'smooth' })}
                                    >
                                        <i className="ri-arrow-left-s-line"></i>
                                    </button>
                                    <button
                                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                        onClick={() => document.getElementById('pets-similar-carousel')?.scrollBy({ left: 300, behavior: 'smooth' })}
                                    >
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </div>
                            </div>

                            <div id="pets-similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {product.similarProducts.map((pet: any) => (
                                    <Link href={`/pets/${pet.id}-${pet.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} key={pet.id}>
                                        <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                            <div className="h-48 bg-gray-100 relative">
                                                <img
                                                    src={pet.image ? `data:image/jpeg;base64,${pet.image}` : '/placeholder.jpg'}
                                                    alt={pet.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{pet.title}</h3>
                                                <div className="text-[#FF6E40] font-bold text-sm">₹ {pet.price.toLocaleString()}</div>
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

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';


export default function AutomobileDetail({ id }: { id?: string }) {
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF2D55]"></div>
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

    console.log("Automobile Product Data:", product);
    console.log("Parsed Attributes:", attrs);


    const images = product.images && product.images.length > 0
        ? product.images.map((img: any) => `data:image/jpeg;base64,${img.image}`)
        : ['/placeholder.jpg', '/placeholder.jpg', '/placeholder.jpg'];

    // Map DB attributes to UI fields
    const specs = [
        { label: "Model", value: attrs.model || product.model || 'N/A' },
        { label: "Interior Color", value: attrs.interiorColor || attrs.interior_color || product.interior_color || 'N/A' },
        { label: "Horsepower", value: attrs.horsepower || product.horsepower || 'N/A' },
        { label: "Exterior Color", value: attrs.exteriorColor || attrs.exterior_color || product.exterior_color || 'N/A' },
        { label: "Doors", value: attrs.doors || product.doors || 'N/A' },
        { label: "Body Type", value: attrs.bodyType || attrs.body_type || product.body_type || 'N/A' },
        { label: "Fuel Type", value: attrs.fuel || attrs.fuel_type || product.fuel || 'N/A' },
        { label: "Seater Capacity", value: attrs.seaterCapacity || attrs.seater_capacity || product.seater_capacity || 'N/A' },
        { label: "Engine Capacity", value: attrs.engineCapacity || attrs.engine_capacity || product.engine_capacity || 'N/A' },
        { label: "Seller Type", value: product.seller_type || 'Dealer' },
    ];

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-8 font-jost">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* 1. Hero Gallery Section */}
                <div className="mb-8">
                    {/* Mobile Carousel (Visible only on mobile) */}
                    <div className="md:hidden relative h-[300px] w-full rounded-2xl overflow-hidden bg-gray-200 group">
                        <img
                            src={images[activeImage]}
                            alt={`${product.title} - View ${activeImage + 1}`}
                            className="w-full h-full object-cover transition-opacity duration-300"
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
                        <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
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

                {/* 2. Main Layout Code: Details (Left) + Sidebar (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Property Details (span-2) */}
                    <div className="xl:col-span-2">

                        {/* Title & Basic Info */}
                        <div className="mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
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
                                {product.description}
                            </p>

                            <div className="flex items-center gap-6 text-gray-700 font-medium mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <i className="ri-calendar-line text-lg text-gray-400"></i>
                                    <span>{attrs.year || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ri-dashboard-3-line text-lg text-gray-400"></i>
                                    <span>{attrs.kms || attrs.km || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="text-2xl md:text-3xl font-bold text-[#FF2D55]">
                                ₹ {product.price.toLocaleString()}
                            </div>
                        </div>

                        <hr className="border-gray-200 my-8" />

                        {/* Specifications Table */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Specification</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
                                {specs.map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center py-1">
                                        <span className="text-gray-500 text-sm">{spec.label}</span>
                                        <span className="text-gray-900 font-bold text-sm">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-200 my-8" />

                        {/* Detailed Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Description</h2>
                            <p className="text-gray-500 text-sm mb-6">{product.description}</p>

                            <ul className="space-y-2 mb-8 text-sm text-gray-600">
                                <li>- Mileage: {attrs.mileage || product.mileage || product.km || 'N/A'}</li>
                                <li>- Warranty: {attrs.warranty || product.warranty || 'N/A'}</li>
                                <li>- Engine capacity: {attrs.engineCapacity || attrs.engine_capacity || product.engine_capacity || 'N/A'}</li>
                            </ul>

                            <div className="py-2 border-y border-dashed border-gray-300 mb-8 inline-block">
                                <span className="text-gray-600 text-sm">Price: </span>
                                <span className="text-gray-900 font-bold ml-2">₹ {product.price.toLocaleString()}</span>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-800 mb-3">Assurance:</h3>
                                <ul className="space-y-2 text-sm text-gray-500">
                                    {attrs.assurance?.map((item: string, i: number) => (
                                        <li key={i}>- {item}</li>
                                    )) || <li>- Verified listing</li>}
                                </ul>
                            </div>

                            <hr className="border-gray-200 my-8" />

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-900 font-medium mb-1">Trade-in facility available</p>
                                    <p className="text-gray-500 text-sm">We buy all Makes and models in Cash</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <i className="ri-map-pin-line text-lg"></i>
                                        <span>{product.city || product.location?.name || 'Unknown Location'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span>Posted on {new Date(product.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
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



                {/* Map Section */}
                <div className="mb-12">
                    <div className="w-full h-[300px] bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 mb-6">
                        {(attrs.location || product.location?.name || product.city) ? (
                            <iframe
                                width="100%"
                                height="100%"
                                title="map"
                                scrolling="no"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(attrs.location || product.location?.name || product.city)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
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

                {/* 4. Similar Automobiles (Carousel) */}
                <div className="mt-16 relative">
                    {product.similarProducts && product.similarProducts.length > 0 && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-gray-900">Similar Automobiles</h2>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                                        const container = document.getElementById('similar-carousel');
                                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}>
                                        <i className="ri-arrow-left-s-line"></i>
                                    </button>
                                    <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                                        const container = document.getElementById('similar-carousel');
                                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}>
                                        <i className="ri-arrow-right-s-line"></i>
                                    </button>
                                </div>
                            </div>

                            <div id="similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                {product.similarProducts.map((car: any) => (
                                    <Link href={`/automobiles/${car.id}-${car.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} key={car.id}>
                                        <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                            <div className="h-48 bg-gray-100 relative">
                                                <img
                                                    src={car.image ? `data:image/jpeg;base64,${car.image}` : '/placeholder.jpg'}
                                                    alt={car.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{car.title}</h3>
                                                <div className="text-[#FF2D55] font-bold text-sm">₹ {car.price.toLocaleString()}</div>
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


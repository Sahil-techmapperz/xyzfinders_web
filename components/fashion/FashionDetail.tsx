"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    brand?: string;
    category?: string;
    subcategory?: string;
    images: string[];
    specs: any;
    location?: string;
    postedTime?: string;
    verified?: boolean;
    premium?: boolean;
    seller_id?: number;
    seller_name?: string;
    seller_created_at?: string;
    seller_is_verified?: boolean;
    seller_avatar?: string | null;
}

export default function FashionDetail({ id }: { id?: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`/api/products/${id}`);
                const data = await response.json();

                if (data.data) {
                    const item = data.data;
                    const attributes = typeof item.product_attributes === 'string'
                        ? JSON.parse(item.product_attributes)
                        : item.product_attributes || {};

                    // Convert images to URLs
                    const images = item.images?.map((img: any) =>
                        img.image ? `data:image/jpeg;base64,${img.image}` : ''
                    ) || [];

                    // Build full address from location fields
                    const locationParts = [];
                    if (item.location_name) locationParts.push(item.location_name);
                    if (item.city_name) locationParts.push(item.city_name);
                    if (item.state_name) locationParts.push(item.state_name);
                    if (item.postal_code) locationParts.push(item.postal_code);
                    const fullAddress = locationParts.join(', ') || 'Location not specified';

                    setProduct({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: `₹ ${item.price.toLocaleString()}/-`,
                        brand: attributes.brand || '',
                        category: attributes.category || 'Fashion',
                        subcategory: attributes.subcategory || '',
                        images: images,
                        specs: attributes.specs || {},
                        location: fullAddress,
                        postedTime: `Posted ${new Date(item.created_at).toLocaleDateString()}`,
                        verified: attributes.verified || false,
                        premium: attributes.premium || item.is_featured,
                        seller_id: item.user_id,
                        seller_name: item.seller_name,
                        seller_created_at: item.seller_created_at,
                        seller_is_verified: item.seller_is_verified,
                        seller_avatar: item.seller_avatar
                    });
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            if (!product) return;

            try {
                // Fetch category ID for Fashion
                const categoriesRes = await fetch('/api/categories');
                const categoriesData = await categoriesRes.json();
                const fashionCategory = categoriesData.data?.find((cat: any) => cat.name === 'Fashion');

                if (fashionCategory) {
                    // Fetch products from same category
                    const productsRes = await fetch(`/api/products?category_id=${fashionCategory.id}&per_page=10`);
                    const productsData = await productsRes.json();

                    if (productsData.data) {
                        // Transform and filter out current product
                        const transformedData: Product[] = productsData.data
                            .filter((item: any) => item.id !== product.id)
                            .slice(0, 6)
                            .map((item: any) => {
                                const attributes = typeof item.product_attributes === 'string'
                                    ? JSON.parse(item.product_attributes)
                                    : item.product_attributes || {};

                                const images = item.images?.map((img: any) =>
                                    img.image ? `data:image/jpeg;base64,${img.image}` : ''
                                ) || [];

                                // Build full address from location fields
                                const locationParts = [];
                                if (item.location_name) locationParts.push(item.location_name);
                                if (item.city_name) locationParts.push(item.city_name);
                                if (item.state_name) locationParts.push(item.state_name);
                                if (item.postal_code) locationParts.push(item.postal_code);
                                const fullAddress = locationParts.join(', ') || 'Location not specified';

                                return {
                                    id: item.id,
                                    title: item.title,
                                    description: item.description,
                                    price: `₹ ${item.price.toLocaleString()}/-`,
                                    brand: attributes.brand || '',
                                    category: attributes.category || 'Fashion',
                                    subcategory: attributes.subcategory || '',
                                    images: images,
                                    specs: attributes.specs || {},
                                    location: fullAddress,
                                    postedTime: `Posted ${new Date(item.created_at).toLocaleDateString()}`,
                                    verified: attributes.verified || false,
                                    premium: attributes.premium || item.is_featured,
                                    seller_id: item.user_id,
                                };
                            });

                        setSimilarProducts(transformedData);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch similar products:', error);
            }
        };

        fetchSimilarProducts();
    }, [product]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="text-xl text-gray-500">Loading...</div>
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

    const images = product.images.length > 0 ? product.images : [];

    // Specs mappings
    const specs = [
        { label: "Size", value: product.specs?.size },
        { label: "Condition", value: product.specs?.condition },
        { label: "Brand", value: product.brand },
        { label: "Material", value: product.specs?.material },
        { label: "Color", value: product.specs?.color },
        { label: "Category", value: product.category },
        { label: "Subcategory", value: product.subcategory },
        { label: "Posted", value: product.postedTime },
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

                            <div className="text-2xl md:text-3xl font-bold text-[#FF2D55]">
                                {product.price}
                            </div>
                        </div>

                        <hr className="border-gray-200 my-8" />

                        {/* Specifications Table */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Details</h2>
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

                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Description</h2>
                            <p className="text-gray-500 text-sm mb-6">{product.description}</p>

                            <div className="py-2 border-y border-dashed border-gray-300 mb-8 inline-block">
                                <span className="text-gray-600 text-sm">Price: </span>
                                <span className="text-gray-900 font-bold ml-2">{product.price}</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-900 font-medium mb-1">Authenticity Guaranteed</p>
                                    <p className="text-gray-500 text-sm">We verify all verified listings.</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <i className="ri-map-pin-line text-lg"></i>
                                        <span>{product.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span>{product.postedTime}</span>
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
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                                    {product.seller_avatar ? (
                                        <img
                                            src={`data:image/jpeg;base64,${product.seller_avatar}`}
                                            alt={product.seller_name || 'Seller'}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-lg md:text-xl font-bold text-purple-600">
                                            {product.seller_name ? product.seller_name.charAt(0).toUpperCase() : 'S'}
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
                                    <p className="text-[10px] md:text-xs text-gray-500">Fashion Seller</p>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 mb-4 md:mb-6">
                                Member Since {product.seller_created_at ? new Date(product.seller_created_at).getFullYear() : '2024'}
                            </p>

                            <div className="space-y-2 md:space-y-3">
                                <button className="w-full bg-[#D53F3F] hover:bg-[#c43232] text-white font-bold py-2.5 md:py-3 rounded-lg mb-2 md:mb-3 flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm md:text-base">
                                    <i className="ri-phone-fill"></i>
                                    Call
                                </button>

                                <ContactSellerButton
                                    productId={id || "1"}
                                    sellerId={product.seller_id || 1}
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
                        <iframe
                            width="100%"
                            height="100%"
                            title="map"
                            scrolling="no"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(product.location || 'New Delhi')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            className="w-full h-full border-0 filter grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>

                {/* Similar Fashion Items (Carousel) */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Similar Fashion Items</h2>
                        <div className="flex gap-2">
                            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FF2D55] hover:text-white hover:border-[#FF2D55] transition shadow-sm bg-white text-gray-600" onClick={() => {
                                const container = document.getElementById('similar-carousel');
                                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                            }}>
                                <i className="ri-arrow-left-s-line text-lg"></i>
                            </button>
                            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#FF2D55] hover:text-white hover:border-[#FF2D55] transition shadow-sm bg-white text-gray-600" onClick={() => {
                                const container = document.getElementById('similar-carousel');
                                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                            }}>
                                <i className="ri-arrow-right-s-line text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <div id="similar-carousel" className="flex gap-5 overflow-x-auto pb-6 snap-x -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {similarProducts.length === 0 ? (
                            <div className="w-full text-center py-12 text-gray-400">
                                <Link href="/fashion" className="text-[#FF2D55] hover:underline">
                                    Browse all fashion items
                                </Link>
                            </div>
                        ) : (
                            similarProducts.map(item => (
                                <Link
                                    key={item.id}
                                    href={`/fashion/${item.id}-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}
                                    className="min-w-[240px] md:min-w-[280px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer snap-start shrink-0 group"
                                >
                                    <div className="h-64 bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={item.images[0] || ''}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {/* Badge */}
                                        {item.premium && (
                                            <div className="absolute top-3 right-3 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-[#FFE082] uppercase tracking-wide">
                                                Premium
                                            </div>
                                        )}
                                        {item.verified && !item.premium && (
                                            <div className="absolute top-3 right-3 bg-white/90 text-green-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm backdrop-blur-sm border border-green-100 flex items-center gap-1">
                                                <i className="ri-check-fill"></i> Verified
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{item.brand}</p>
                                            <p className="text-xs font-medium text-gray-400">{item.specs?.size || ''}</p>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-base mb-2 truncate leading-tight group-hover:text-[#FF2D55] transition-colors">{item.title}</h3>

                                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                                            <div className="text-[#FF2D55] font-bold text-lg">{item.price}</div>
                                            <div className="text-xs text-gray-400 font-medium">{item.specs?.condition || ''}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

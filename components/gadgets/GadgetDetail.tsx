"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

interface GadgetDetailData {
    id: number;
    title: string;
    description: string;
    price: string;
    category: string;
    image: string;
    images: string[];
    postedTime: string;
    location: string;
    specs: { label: string; value: string }[];
    features: string[];
    seller: {
        name: string;
        verified: boolean;
        memberSince: string;
        id?: number;
        avatar?: string | null;
    };
    seller_id?: number;
}

interface SimilarProduct {
    id: number;
    title: string;
    price: number | string;
    image: string;
}

export default function GadgetDetail({ id }: { id?: string }) {
    const [gadget, setGadget] = useState<GadgetDetailData | null>(null);
    const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (!id) return;

        async function fetchGadgetDetail() {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error('Product not found');
                    throw new Error('Failed to fetch product details');
                }

                const result = await response.json();
                const data = result.data;

                // Transform API data
                const specs = data.product_attributes?.specs || {};
                const transformedSpecs = [
                    { label: "Brand", value: data.product_attributes?.brand || 'N/A' },
                    { label: "Model", value: data.product_attributes?.model || data.title.split(' ').slice(0, 3).join(' ') },
                    { label: "Condition", value: specs.condition || 'Good' },
                    { label: "Warranty", value: specs.warranty || 'No' },
                    { label: "Age", value: specs.age || 'N/A' },
                    { label: "Color", value: specs.color || 'N/A' },
                    { label: "Connectivity", value: specs.connectivity || 'N/A' },
                    { label: "Battery Life", value: specs.batteryLife || 'N/A' },
                ].filter(s => s.value !== 'N/A');

                const features = data.description ? data.description.split('.').filter((f: string) => f.trim().length > 0).slice(0, 4) : [];

                const mainImage = data.images?.[0]?.image ? `data:image/jpeg;base64,${data.images[0].image}` : '';
                const allImages = data.images?.map((img: any) => `data:image/jpeg;base64,${img.image}`) || [mainImage];

                setGadget({
                    id: data.id,
                    title: data.title,
                    description: data.description || 'No description available.',
                    price: `₹ ${Number(data.price).toLocaleString('en-IN')}`,
                    category: data.category_name || 'Electronics',
                    image: mainImage,
                    images: allImages,
                    postedTime: getTimeAgo(new Date(data.created_at)),
                    location: data.location || data.city || 'New Delhi',
                    specs: transformedSpecs,
                    features: features,
                    seller: {
                        name: data.seller_name || 'Seller',
                        verified: data.seller_is_verified || false,
                        memberSince: data.seller_created_at ? new Date(data.seller_created_at).getFullYear().toString() : '2025',
                        id: data.user_id,
                        avatar: data.seller_avatar
                    },
                    seller_id: data.user_id
                });

                // Transform similar products
                if (data.similarProducts) {
                    setSimilarProducts(data.similarProducts.map((p: any) => ({
                        id: p.id,
                        title: p.title,
                        price: `₹ ${Number(p.price).toLocaleString('en-IN')}`,
                        image: p.image ? `data:image/jpeg;base64,${p.image}` : ''
                    })));
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchGadgetDetail();
    }, [id]);

    function getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
        return 'just now';
    }

    const createSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D6E63]"></div>
            </div>
        );
    }

    if (error || !gadget) {
        return (
            <div className="min-h-screen bg-[#FFFBF7] flex flex-col items-center justify-center p-4 text-center">
                <i className="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                <p className="text-gray-800 font-bold text-lg mb-2">{error || 'Product not found'}</p>
                <Link href="/gadgets" className="text-[#8D6E63] underline font-medium">
                    Back to Gadgets
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-8 font-jost">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Image Gallery */}
                <div className="mb-8">
                    {/* Mobile Carousel (Visible only on mobile) */}
                    <div className="md:hidden relative h-[300px] w-full rounded-2xl overflow-hidden bg-white group">
                        {gadget.images[activeImage] ? (
                            <img
                                src={gadget.images[activeImage]}
                                alt={`${gadget.title} - View ${activeImage + 1}`}
                                className="w-full h-full object-contain bg-gray-50 transition-opacity duration-300"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                <i className="ri-image-line text-4xl"></i>
                            </div>
                        )}

                        {gadget.seller.verified && (
                            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 z-10 shadow-sm">
                                <i className="ri-shield-check-fill"></i> VERIFIED
                            </div>
                        )}

                        {/* Navigation Arrows */}
                        {gadget.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveImage(prev => prev === 0 ? gadget.images.length - 1 : prev - 1);
                                    }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center shadow-md backdrop-blur-sm transition-all active:scale-95"
                                >
                                    <i className="ri-arrow-left-s-line text-xl"></i>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveImage(prev => prev === gadget.images.length - 1 ? 0 : prev + 1);
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
                            {activeImage + 1} / {gadget.images.length}
                        </div>
                    </div>

                    {/* Desktop Grid (Hidden on Mobile) */}
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 h-[500px]">
                        {/* Main Image */}
                        <div className="md:col-span-2 relative h-full rounded-2xl overflow-hidden group cursor-pointer bg-white">
                            {gadget.image ? (
                                <img
                                    src={gadget.image}
                                    alt={gadget.title}
                                    className="w-full h-full object-contain md:object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                    <i className="ri-image-line text-4xl"></i>
                                </div>
                            )}
                            {gadget.seller.verified && (
                                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2">
                                    <i className="ri-shield-check-fill"></i> VERIFIED SELLER
                                </div>
                            )}
                        </div>
                        {/* Side Images */}
                        <div className="flex flex-col gap-2 h-full">
                            {[1, 2].map((idx) => (
                                <div key={idx} className="relative h-1/2 rounded-2xl overflow-hidden group cursor-pointer bg-white">
                                    {gadget.images[idx] ? (
                                        <img
                                            src={gadget.images[idx]}
                                            alt={`View ${idx}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 border border-gray-100">
                                            <i className="ri-image-2-line text-2xl"></i>
                                        </div>
                                    )}
                                </div>
                            ))}
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
                                <h1 className="text-3xl font-bold text-gray-900">{gadget.title}</h1>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-[#FF2D55] text-white flex items-center justify-center hover:bg-[#e02447] transition-colors shadow-sm">
                                        <i className="ri-heart-fill"></i>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-3xl whitespace-pre-line">
                                {gadget.description}
                            </p>

                            <div className="flex items-center gap-6 text-gray-700 font-medium mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <i className="ri-bookmark-line text-[#FF8A65]"></i>
                                    <span>{gadget.category}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ri-time-line text-[#FF8A65]"></i>
                                    <span>{gadget.postedTime}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <i className="ri-map-pin-line text-[#FF8A65]"></i>
                                <span>{gadget.location}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="bg-linear-to-r from-[#FF8A65] to-[#FF7043] rounded-2xl p-4 md:p-6 mb-6 md:mb-8 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-white/90 text-xs md:text-sm font-medium mb-1">Price</div>
                                    <div className="text-2xl md:text-4xl font-bold text-white">₹ {gadget.price.toLocaleString()}</div>
                                </div>
                                <button className="bg-white text-[#FF8A65] font-bold px-4 py-2 md:px-8 md:py-3 rounded-xl text-sm md:text-base hover:bg-gray-50 transition-colors shadow-md">
                                    Make Offer
                                </button>
                            </div>
                        </div>


                        {/* Item Details - Table Style */}
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Item Details</h2>

                            <div className="space-y-4">
                                {gadget.specs.map((spec, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">{spec.label}</span>
                                        <span className="text-sm font-bold text-gray-900">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Item Description & Specifications */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Details</h2>

                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {gadget.description}
                            </p>

                            {gadget.features.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-bold text-gray-900 mb-3">Product Specification</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {gadget.features.map((feature, idx) => (
                                            <li key={idx}>- {feature.trim()}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Key Features as Tags */}
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-[#FFF0F0] text-[#FF6E40] text-xs font-medium px-3 py-1 rounded">
                                    {gadget.category}
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller Info */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-24 space-y-6">

                            {/* Seller Card */}
                            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                                <p className="text-[10px] md:text-xs text-gray-400 font-medium mb-3 md:mb-4">Posted By</p>

                                <div className="flex items-center gap-3 md:gap-4 mb-2">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                                        {gadget.seller.avatar ? (
                                            <img
                                                src={`data:image/jpeg;base64,${gadget.seller.avatar}`}
                                                alt={gadget.seller.name || 'Seller'}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-lg md:text-xl font-bold text-blue-600">
                                                {gadget.seller.name ? gadget.seller.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-bold text-sm md:text-base flex items-center gap-1">
                                            {gadget.seller.name || 'Seller'}
                                            {!!gadget.seller.verified && (
                                                <i className="ri-verified-badge-fill text-blue-500 text-base md:text-lg"></i>
                                            )}
                                        </h3>
                                        <p className="text-[10px] md:text-xs text-gray-500">Seller</p>
                                    </div>
                                </div>

                                <p className="text-[10px] text-gray-400 mb-4 md:mb-6">Member Since {gadget.seller.memberSince}</p>

                                <div className="space-y-2 md:space-y-3">
                                    <button className="w-full bg-[#D53F3F] hover:bg-[#c43232] text-white font-bold py-2.5 md:py-3 rounded-lg text-sm md:text-base mb-2 md:mb-3 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                        <i className="ri-phone-fill"></i>
                                        Call
                                    </button>

                                    <ContactSellerButton
                                        productId={id || "1"}
                                        sellerId={gadget.seller_id || 1}
                                        className="w-full bg-[#0078D4] hover:bg-[#006cbd] text-white font-bold py-2.5 md:py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm md:text-base"
                                    />
                                </div>
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

                            {/* Google Ads Banner Slot */}
                            <div className="bg-gray-200 rounded-none md:rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px]">
                                Google Ads
                            </div>

                        </div>
                    </div>

                </div>

                {/* Similar Products Carousel */}
                {similarProducts.length > 0 && (
                    <div className="mt-16 relative">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900">Similar Products</h2>
                            <div className="flex gap-2">
                                <button
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                    onClick={() => {
                                        const container = document.getElementById('similar-gadgets-carousel');
                                        if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                                    }}
                                >
                                    <i className="ri-arrow-left-s-line"></i>
                                </button>
                                <button
                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                    onClick={() => {
                                        const container = document.getElementById('similar-gadgets-carousel');
                                        if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                                    }}
                                >
                                    <i className="ri-arrow-right-s-line"></i>
                                </button>
                            </div>
                        </div>

                        <div id="similar-gadgets-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {similarProducts.map((item) => (
                                <Link key={item.id} href={`/gadgets/${item.id}-${createSlug(item.title)}`}>
                                    <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                        <div className="h-48 bg-gray-100 relative">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <i className="ri-image-line text-2xl"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">{item.title}</h3>
                                            <div className="text-[#FF6E40] font-bold text-base">{item.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

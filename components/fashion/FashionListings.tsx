"use client";

import { useState, useEffect } from 'react';
import FashionCard, { FashionItem } from './FashionCard';

export default function FashionListings() {
    const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([
        { name: "Sarjoni Nagar", active: true },
        { name: "Greater Kailash", active: false },
        { name: "Vasant Kunj", active: false },
        { name: "Defence Colony", active: false },
        { name: "Hauz Khas", active: false },
        { name: "Saket", active: false },
        { name: "Connaught Place", active: false },
        { name: "Rajouri Garden", active: false },
    ]);

    useEffect(() => {
        const fetchFashionData = async () => {
            try {
                setLoading(true);
                // Fetch category ID for Fashion first
                const categoriesRes = await fetch('/api/categories');
                const categoriesData = await categoriesRes.json();
                const fashionCategory = categoriesData.data?.find((cat: any) => cat.name === 'Fashion');

                if (fashionCategory) {
                    // Fetch products for this category
                    const productsRes = await fetch(`/api/products?category_id=${fashionCategory.id}&per_page=20`);
                    const productsData = await productsRes.json();

                    if (productsData.data) {
                        // Transform API data to FashionItem format
                        const transformedData: FashionItem[] = productsData.data.map((item: any) => {
                            const attributes = typeof item.product_attributes === 'string'
                                ? JSON.parse(item.product_attributes)
                                : item.product_attributes || {};

                            // Convert images to URLs
                            const images = item.images?.map((img: any) =>
                                img.image ? `data:image/jpeg;base64,${img.image}` : ''
                            ) || [];

                            return {
                                id: item.id,
                                title: item.title,
                                category: attributes.category || 'Fashion',
                                subcategory: attributes.subcategory || '',
                                brand: attributes.brand || '',
                                image: images[0] || '',
                                images: images,
                                description: item.description,
                                specs: attributes.specs || {},
                                price: `₹ ${item.price.toLocaleString()}/-`,
                                location: attributes.location || item.city || '',
                                postedTime: `Posted ${new Date(item.created_at).toLocaleDateString()}`,
                                verified: attributes.verified || false,
                                premium: attributes.premium || item.is_featured,
                            };
                        });

                        setFashionItems(transformedData);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch fashion data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFashionData();
    }, []);

    const toggleLocation = (name: string) => {
        setLocations(prev => prev.map(loc =>
            loc.name === name ? { ...loc, active: !loc.active } : loc
        ));
    };

    return (
        <section className="container mx-auto px-4 py-8 bg-[#FFFBF0] min-h-screen font-jost">

            {/* Header Area */}
            <div className="mb-8">
                {/* Mobile Link/Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Fashion</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Fashion & Accessories in New Delhi <span className="text-gray-500 font-normal text-base">- {fashionItems.length} (Available)</span>
                    </h1>

                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Location Filters (Pills Style) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {locations.map((loc, i) => (
                        <button
                            key={i}
                            onClick={() => toggleLocation(loc.name)}
                            className={`text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${loc.active
                                ? "bg-[#FF8A65] text-white"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]"
                                }`}
                        >
                            {loc.name}
                            {loc.active && (
                                <i className="ri-close-line bg-white/20 rounded-full p-0.5 text-[10px]"></i>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Listings */}
                <div className="lg:col-span-2 space-y-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Loading fashion items...</p>
                        </div>
                    ) : fashionItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No fashion items found.</p>
                        </div>
                    ) : (
                        fashionItems.map(item => (
                            <FashionCard key={item.id} item={item as FashionItem} />
                        ))
                    )}

                    {/* Pagination */}
                    <div className="pt-8 flex items-center justify-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            <i className="ri-arrow-left-s-line text-lg"></i>
                        </button>

                        <button className="w-10 h-10 rounded-full bg-[#FF8A65] text-white font-bold flex items-center justify-center shadow-md">
                            1
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            2
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            <i className="ri-arrow-right-s-line text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Right Column: Google Ads */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                </div>

            </div>
        </section>
    );
}

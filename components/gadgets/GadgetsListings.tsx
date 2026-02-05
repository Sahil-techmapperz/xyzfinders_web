"use client";

import { useEffect, useState } from 'react';
import GadgetCard, { GadgetData } from './GadgetCard';

const BRANDS = [
    { name: "Sony", active: true },
    { name: "Apple", active: false },
    { name: "Dell", active: false },
    { name: "Canon", active: false },
    { name: "Samsung", active: false },
    { name: "JBL", active: false },
    { name: "Bose", active: false },
    { name: "HP", active: false },
    { name: "Lenovo", active: false },
];

export default function GadgetsListings() {
    const [gadgetData, setGadgetData] = useState<GadgetData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchGadgetData() {
            try {
                // Fetch electronics products from API (category_id=5 for Electronics)
                const response = await fetch('/api/products?category_id=5&per_page=100');
                if (!response.ok) throw new Error('Failed to fetch data');

                const result = await response.json();
                const products = result.data || [];

                // Transform API data to GadgetData format
                const transformed: GadgetData[] = products.map((product: any) => ({
                    id: product.id,
                    title: product.title,
                    category: product.product_attributes?.category || 'Electronics',
                    image: product.images?.[0]?.image ? `data:image/jpeg;base64,${product.images[0].image}` : '',
                    specs: {
                        brand: product.product_attributes?.brand?.toUpperCase() || 'N/A',
                        condition: product.product_attributes?.specs?.condition?.toUpperCase() || 'GOOD',
                        warranty: product.product_attributes?.specs?.warranty?.toUpperCase() || 'NO WARRANTY',
                        age: product.product_attributes?.specs?.age?.toUpperCase() || 'N/A'
                    },
                    price: `₹ ${product.price.toLocaleString('en-IN')}/-`,
                    location: product.product_attributes?.location || product.city || 'New Delhi',
                    postedTime: `Posted ${getTimeAgo(new Date(product.created_at))}`,
                    verified: product.product_attributes?.verified || false,
                    premium: product.is_featured === 1,
                    description: product.description || ''
                }));

                setGadgetData(transformed);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchGadgetData();
    }, []);

    function getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
        return 'just now';
    }

    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header / Titles */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Electronics & Gadgets for sale in New Delhi - <span className="text-gray-500 font-normal">{gadgetData.length} available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Brand Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Brand :</span>
                    <div className="flex flex-wrap gap-2">
                        {BRANDS.map((brand, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${brand.active
                                    ? "bg-[#00B8D4] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#00B8D4]"
                                    }`}
                            >
                                {brand.name}
                                {brand.active && <i className="ri-close-line"></i>}
                            </button>
                        ))}
                        <button className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#00B8D4] text-[#00B8D4] hover:bg-[#00B8D4] hover:text-white transition-colors">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B8D4]"></div>
                            <p className="mt-4 text-gray-600">Loading electronics...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12 text-red-600">
                            <p>Error: {error}</p>
                        </div>
                    )}

                    {!loading && !error && gadgetData.length === 0 && (
                        <div className="text-center py-12 text-gray-600">
                            <p>No electronics found.</p>
                        </div>
                    )}

                    {!loading && !error && gadgetData.map((item: GadgetData) => (
                        <GadgetCard key={item.id} item={item} />
                    ))}
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#E0F7FA] rounded-2xl p-6 text-center border border-cyan-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">HALFPAGE BANNER</div>
                            <div className="text-xs text-gray-400 mb-8">Premium Gadgets</div>

                            <div className="bg-[#00B8D4] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left drop-shadow-sm">
                                    Latest<br />Tech<br />Deals
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#00B8D4] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#00B8D4] transition-colors">
                                        Explore Now!
                                    </button>
                                </div>

                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0288D1] to-[#0097A7]">
                                        <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-50" alt="Electronics" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

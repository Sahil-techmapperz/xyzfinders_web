"use client";

import { useEffect, useState } from 'react';
import FurnitureCard, { FurnitureData } from './FurnitureCard';

const CATEGORIES = [
    { name: "Sofa", active: true },
    { name: "Bedroom", active: false },
    { name: "Dining", active: false },
    { name: "Office", active: false },
    { name: "Study", active: false },
];

export default function FurnitureListings() {
    const [furnitureData, setFurnitureData] = useState<FurnitureData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchFurnitureData() {
            try {
                // Fetch furniture products from API (category_id=4 for Furniture)
                const response = await fetch('/api/products?category_id=4&per_page=100');
                if (!response.ok) throw new Error('Failed to fetch data');

                const result = await response.json();
                const products = result.data || [];

                // Transform API data to FurnitureData format
                const transformed: FurnitureData[] = products.map((product: any) => ({
                    id: product.id,
                    title: product.title,
                    category: product.product_attributes?.category || 'Furniture',
                    image: product.images?.[0]?.image ? `data:image/jpeg;base64,${product.images[0].image}` : '',
                    brand: product.product_attributes?.material || '',
                    specs: {
                        material: product.product_attributes?.material || 'Wood',
                        condition: product.product_attributes?.specs?.condition || 'Good',
                        dimensions: product.product_attributes?.specs?.dimensions || 'Standard',
                        age: product.product_attributes?.specs?.age || 'N/A'
                    },
                    description: product.description || '',
                    price: `₹ ${Number(product.price).toLocaleString('en-IN')}`,
                    location: product.product_attributes?.location || product.city || 'New Delhi',
                    postedTime: `Posted ${getTimeAgo(new Date(product.created_at))}`,
                    verified: product.product_attributes?.verified || false,
                    premium: product.is_featured === 1
                }));

                setFurnitureData(transformed);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchFurnitureData();
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
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Furniture for sale in New Delhi - <span className="text-gray-500 font-normal">{furnitureData.length} available</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Category :</span>
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${cat.active
                                    ? "bg-[#8D6E63] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#8D6E63]"
                                    }`}
                            >
                                {cat.name}
                                {cat.active && <i className="ri-close-line"></i>}
                            </button>
                        ))}
                        <button className="text-[10px] font-bold px-3 py-1 rounded-full border border-[#8D6E63] text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-colors">
                            View More
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading && (
                    <div className="col-span-full text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#8D6E63]"></div>
                        <p className="mt-4 text-gray-600">Loading furniture...</p>
                    </div>
                )}

                {error && (
                    <div className="col-span-full text-center py-12 text-red-600">
                        <p>Error: {error}</p>
                    </div>
                )}

                {!loading && !error && furnitureData.length === 0 && (
                    <div className="col-span-full text-center py-12 text-gray-600">
                        <p>No furniture found.</p>
                    </div>
                )}

                {!loading && !error && furnitureData.map((item: FurnitureData) => (
                    <FurnitureCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
}

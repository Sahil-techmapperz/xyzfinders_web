"use client";

import { useEffect, useState } from 'react';
import BeautyCard, { BeautyData } from './BeautyCard';

const INITIAL_SERVICES = [
    { name: "Bridal Makeup", active: true },
    { name: "Spa & Massage", active: false },
    { name: "Hair Care", active: false },
    { name: "Skin Care", active: false },
    { name: "Men's Salon", active: false },
    { name: "Party Makeup", active: false },
    { name: "Nail Art", active: false },
];

export default function BeautyListings() {
    const [beautyData, setBeautyData] = useState<BeautyData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [services, setServices] = useState(INITIAL_SERVICES);

    // Pagination State
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 9, // Adjusted for grid layout
        total: 0,
        total_pages: 1
    });

    const toggleService = (name: string) => {
        setServices(prev => prev.map(service =>
            service.name === name ? { ...service, active: !service.active } : service
        ));
    };

    async function fetchBeautyData(page: number = 1) {
        setLoading(true);
        try {
            // Fetch beauty products from API (category_id=6 for Beauty)
            const response = await fetch(`/api/products?category_id=6&per_page=${pagination.per_page}&page=${page}`);
            if (!response.ok) throw new Error('Failed to fetch data');

            const result = await response.json();
            const products = result.data || [];

            // Update Pagination from Response
            if (result.pagination) {
                setPagination(prev => ({
                    ...prev,
                    current_page: result.pagination.current_page,
                    total: result.pagination.total,
                    total_pages: result.pagination.total_pages
                }));
            }

            // Transform API data to BeautyData format
            const transformed: BeautyData[] = products.map((product: any) => ({
                id: product.id,
                title: product.title,
                category: product.product_attributes?.category || 'Beauty',
                image: product.images?.[0]?.image ? `data:image/jpeg;base64,${product.images[0].image}` : '',
                images: product.images?.map((img: any) => `data:image/jpeg;base64,${img.image}`) || [],
                specs: {
                    serviceFor: product.product_attributes?.specs?.serviceFor?.toUpperCase() || 'ALL',
                    type: product.product_attributes?.specs?.type?.toUpperCase() || 'SALON',
                    duration: product.product_attributes?.specs?.duration || 'N/A',
                    rating: product.product_attributes?.specs?.rating?.replace('/5', '') || '5.0'
                },
                price: `₹ ${product.price.toLocaleString('en-IN')}/-`,
                location: product.product_attributes?.location || product.city || 'New Delhi',
                postedTime: `Posted ${getTimeAgo(new Date(product.created_at))}`,
                verified: product.product_attributes?.verified || false
            }));

            setBeautyData(transformed);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBeautyData(1);
    }, []);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.total_pages) {
            fetchBeautyData(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Helper function to get time ago
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

            {/* Header */}
            <div className="mb-8">
                {/* Mobile Link/Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <i className="ri-home-4-line"></i>
                    <span>Beauty</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                        Beauty & Wellness Services in New Delhi <span className="text-gray-500 font-normal text-base">- {pagination.total}(Available)</span>
                    </h1>
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Popular <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Service Filters (Pills Style) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {services.map((service, i) => (
                        <button
                            key={i}
                            onClick={() => toggleService(service.name)}
                            className={`text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${service.active
                                ? "bg-[#FF8A65] text-white"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]"
                                }`}
                        >
                            {service.name}
                            {service.active && (
                                <i className="ri-close-line bg-white/20 rounded-full p-0.5 text-[10px]"></i>
                            )}
                        </button>
                    ))}
                    {/* View More Button */}
                    <button
                        className="text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 bg-gray-50 text-brand-orange border border-gray-200 hover:bg-orange-50 hover:border-brand-orange"
                    >
                        View More <i className="ri-equalizer-line"></i>
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A65]"></div>
                            <p className="mt-4 text-gray-600">Loading beauty services...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-12 text-red-600">
                            <p>Error: {error}</p>
                        </div>
                    )}

                    {!loading && !error && beautyData.length === 0 && (
                        <div className="text-center py-12 text-gray-600">
                            <p>No beauty services found.</p>
                        </div>
                    )}

                    {!loading && !error && beautyData.map((item: BeautyData) => (
                        <BeautyCard key={item.id} item={item} />
                    ))}

                    {/* Pagination Controls */}
                    {!loading && !error && pagination.total_pages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8 py-4">
                            <button
                                onClick={() => handlePageChange(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${pagination.current_page === 1
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                            >
                                <i className="ri-arrow-left-s-line text-lg"></i>
                            </button>

                            {/* Page Numbers */}
                            {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                                // Logic to show window of pages around current page could be added here
                                // For simplicity, showing first 5 or logic as needed.
                                // Let's implement a simple sliding window or just 1..N if small.
                                let pageNum = i + 1;
                                if (pagination.total_pages > 5) {
                                    if (pagination.current_page > 3) {
                                        pageNum = pagination.current_page - 2 + i;
                                    }
                                    if (pageNum > pagination.total_pages) {
                                        pageNum = pagination.total_pages - 4 + i;
                                    }
                                }

                                if (pageNum > 0 && pageNum <= pagination.total_pages) {
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${pagination.current_page === pageNum
                                                ? 'bg-brand-orange text-white shadow-md'
                                                : 'text-gray-600 hover:bg-orange-50 hover:text-brand-orange'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                }
                                return null;
                            })}

                            <button
                                onClick={() => handlePageChange(pagination.current_page + 1)}
                                disabled={pagination.current_page === pagination.total_pages}
                                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${pagination.current_page === pagination.total_pages
                                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                                    : 'border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                                    }`}
                            >
                                <i className="ri-arrow-right-s-line text-lg"></i>
                            </button>
                        </div>
                    )}
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">HALFPAGE BANNER</div>
                            <div className="text-xs text-gray-400 mb-8">Digital Marketing</div>

                            <div className="bg-[#FF8A65] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-gray-900 drop-shadow-sm">
                                    Click,<br />Grow,<br />Repeat
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-[#FF8A65] border-2 border-white text-white font-bold py-3 rounded-lg shadow-lg hover:bg-white hover:text-[#FF8A65] transition-colors">
                                        Get Started!
                                    </button>
                                </div>

                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#B39DDB] to-[#9575CD]">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-50" alt="Marketing" />
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

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

interface Product {
    id: number;
    title: string;
    price: number;
    status: 'active' | 'sold' | 'inactive' | 'details_archived';
    views_count: number;
    favorites_count: number;
    created_at: string;
    category_name: string;
    thumbnail: string;
}

const CATEGORIES = [
    'Automobiles', 'Beauty', 'Education', 'Events', 'Fashion',
    'Furniture', 'Gadgets', 'Jobs', 'Mobiles', 'Pets',
    'Property', 'Services'
];

export default function MyAdsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Get initial state from URL
    const initialFilter = (searchParams.get('status') as 'all' | 'active' | 'inactive' | 'sold') || 'all';
    const initialSearch = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || 'all';

    const [filter, setFilter] = useState(initialFilter);
    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // Sync local state with URL params
    useEffect(() => {
        setFilter(searchParams.get('status') as any || 'all');
        setSearchQuery(searchParams.get('search') || '');
        setSelectedCategory(searchParams.get('category') || 'all');
    }, [searchParams]);

    // Create a query string from object
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value && value !== 'all' && value !== '') {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    );

    // Update URL when filters change
    const updateFilter = (type: 'status' | 'search' | 'category', value: string) => {
        // Update local state immediately for UI responsiveness
        if (type === 'status') setFilter(value as any);
        if (type === 'search') setSearchQuery(value);
        if (type === 'category') setSelectedCategory(value);

        // Update URL
        const queryString = createQueryString(type, value);
        router.push(`${pathname}?${queryString}`);
    };

    useEffect(() => {
        // Debounce search fetch
        const timer = setTimeout(() => {
            fetchAd();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchParams]); // Re-fetch when URL params change

    const fetchAd = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            // Use current URL params for fetching
            const params = new URLSearchParams(searchParams.toString());

            const res = await fetch(`/api/seller/products?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setProducts(data.data || []);
            } else {
                toast.error('Failed to load your ads');
            }
        } catch (error) {
            console.error('Error fetching ads', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this ad? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/seller/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                toast.success('Ad deleted successfully');
                // Refresh list
                fetchAd();
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to delete ad');
            }
        } catch (error) {
            console.error('Error deleting ad', error);
            toast.error('Something went wrong');
        }
    };

    const handleStatusChange = async (id: number, newStatus: 'active' | 'sold' | 'inactive') => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/seller/products/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                toast.success(`Ad marked as ${newStatus}`);

                // Optimistic update
                setProducts(prev => prev.map(p =>
                    p.id === id ? { ...p, status: newStatus } : p
                ));

                // If current filter excludes the new status, remove it from view
                // Since we rely on URL params for source of truth, 
                // re-fetching might be safer but leads to UI jump. 
                // Optimistic update is better. 
                const currentStatusFilter = searchParams.get('status');
                if (currentStatusFilter && currentStatusFilter !== 'all' && currentStatusFilter !== newStatus) {
                    setProducts(prev => prev.filter(p => p.id !== id));
                }

            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status', error);
            toast.error('Something went wrong');
        }
    };

    const getCategorySlug = (categoryName: string) => {
        if (!categoryName) return 'gadgets';
        const name = categoryName.toLowerCase();
        if (name.includes('property') || name.includes('real estate')) return 'property';
        if (name.includes('gadget') || name.includes('electronic')) return 'gadgets';
        if (name.includes('automobile') || name.includes('car') || name.includes('bike')) return 'automobiles';
        if (name.includes('mobile') || name.includes('tablet')) return 'mobiles';
        if (name.includes('furniture') || name.includes('appliance')) return 'furniture';
        if (name.includes('service')) return 'services';
        if (name.includes('education') || name.includes('learning')) return 'education';
        if (name.includes('beauty') || name.includes('wellness')) return 'beauty';
        if (name.includes('pet')) return 'pets';
        if (name.includes('event')) return 'events';
        if (name.includes('job')) return 'jobs';
        if (name.includes('fashion') || name.includes('lifestyle')) return 'fashion';
        return 'gadgets'; // Default fallback
    };

    // Use products directly since they are now filtered on the server
    const filteredProducts = products;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    // Handler helpers for UI components
    const handleFilterClick = (f: string) => updateFilter('status', f);
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => updateFilter('category', e.target.value);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => updateFilter('search', e.target.value);

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Ads</h1>
                        <p className="text-gray-500">Manage your active, inactive, and sold listings</p>
                    </div>
                    <Link
                        href="/seller/place-ad"
                        className="bg-brand-orange text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition flex items-center gap-2"
                    >
                        <i className="ri-add-circle-line text-xl"></i>
                        Post New Ad
                    </Link>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl p-4 border border-gray-100 mb-8 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
                    {/* Status Tabs */}
                    <div className="bg-gray-50 rounded-lg p-1 inline-flex items-center">
                        {(['all', 'active', 'inactive', 'sold'] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => handleFilterClick(f)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition ${filter === f
                                    ? 'bg-white text-brand-orange shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 flex-1 justify-end">
                        {/* Category Dropdown */}
                        <div className="relative min-w-[150px]">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                            >
                                <option value="all">All Categories</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <i className="ri-arrow-down-s-line"></i>
                            </div>
                        </div>

                        {/* Search Input */}
                        <div className="relative min-w-[250px]">
                            <input
                                type="text"
                                placeholder="Search by title..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="ri-search-line text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ads List */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-folder-open-line text-3xl text-gray-400"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Ads Found</h3>
                        <p className="text-gray-500 mb-6">
                            {(filter !== 'all' || selectedCategory !== 'all' || searchQuery)
                                ? "No ads match your selected filters."
                                : "You haven't posted any ads yet."}
                        </p>
                        {(filter === 'all' && selectedCategory === 'all' && !searchQuery) && (
                            <Link
                                href="/seller/place-ad"
                                className="inline-flex items-center gap-2 text-brand-orange font-medium hover:underline"
                            >
                                <i className="ri-add-line"></i>
                                Post your first ad
                            </Link>
                        )}
                        {(filter !== 'all' || selectedCategory !== 'all' || searchQuery) && (
                            <button
                                onClick={() => {
                                    router.push(pathname);
                                }}
                                className="text-brand-orange font-medium hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                ) : ( // continued...                ) : (
                    <div className="space-y-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-sm hover:shadow-md transition">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image */}
                                    <div className="w-full md:w-48 h-32 md:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative group">
                                        <img
                                            src={product.thumbnail || '/placeholder.png'}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute top-2 left-2">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${product.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : product.status === 'inactive'
                                                    ? 'bg-yellow-100 text-yellow-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider mb-1 block">
                                                        {product.category_name}
                                                    </span>
                                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                                                        <Link href={`/${product.category_name?.toLowerCase()}/${product.id}`} className="hover:underline">
                                                            {product.title}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-gray-900">
                                                        ₹{product.price.toLocaleString('en-IN')}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                                <span className="flex items-center gap-1">
                                                    <i className="ri-calendar-line"></i>
                                                    {new Date(product.created_at).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className="ri-eye-line"></i>
                                                    {product.views_count} Views
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <i className="ri-heart-line"></i>
                                                    {product.favorites_count} Likes
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                                            {/* Active/Inactive Toggle */}
                                            {product.status !== 'sold' && (
                                                <div className="flex items-center gap-2 mr-4 text-sm">
                                                    <span className={`font-medium ${product.status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>
                                                        {product.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                    <button
                                                        role="switch"
                                                        aria-checked={product.status === 'active'}
                                                        onClick={() => handleStatusChange(product.id, product.status === 'active' ? 'inactive' : 'active')}
                                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 ${product.status === 'active' ? 'bg-green-500' : 'bg-gray-200'
                                                            }`}
                                                    >
                                                        <span
                                                            aria-hidden="true"
                                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${product.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </button>
                                                </div>
                                            )}

                                            <Link
                                                href={`/seller/place-ad/${getCategorySlug(product.category_name)}/create?edit=${product.id}`}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                                            >
                                                <i className="ri-edit-line"></i>
                                                Edit
                                            </Link>

                                            {product.status === 'active' && (
                                                <button
                                                    onClick={() => handleStatusChange(product.id, 'sold')}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                                                >
                                                    <i className="ri-checkbox-circle-line"></i>
                                                    Mark Sold
                                                </button>
                                            )}

                                            {product.status === 'sold' && (
                                                <button
                                                    onClick={() => handleStatusChange(product.id, 'active')}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                                                >
                                                    <i className="ri-refresh-line"></i>
                                                    Relist
                                                </button>
                                            )}

                                            <div className="flex-1"></div>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-600 text-sm font-medium hover:bg-red-50 transition ml-auto"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Product {
    id: number;
    title: string;
    price: number;
    status: 'active' | 'sold' | 'details_archived';
    views_count: number;
    favorites_count: number;
    created_at: string;
    category_name: string;
    thumbnail: string;
}

export default function MyAdsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'active' | 'sold'>('all');

    useEffect(() => {
        fetchAd();
    }, []);

    const fetchAd = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch('/api/seller/products', {
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
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to delete ad');
            }
        } catch (error) {
            console.error('Error deleting ad', error);
            toast.error('Something went wrong');
        }
    };

    const handleStatusChange = async (id: number, newStatus: 'active' | 'sold') => {
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
                setProducts(prev => prev.map(p =>
                    p.id === id ? { ...p, status: newStatus } : p
                ));
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

    const filteredProducts = products.filter(p => {
        if (filter === 'all') return true;
        return p.status === filter;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8F9FA] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Ads</h1>
                        <p className="text-gray-500">Manage your active and sold listings</p>
                    </div>
                    <Link
                        href="/seller/place-ad"
                        className="bg-brand-orange text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition flex items-center gap-2"
                    >
                        <i className="ri-add-circle-line text-xl"></i>
                        Post New Ad
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl p-2 inline-flex items-center gap-1 border border-gray-100 mb-8 shadow-sm">
                    {(['all', 'active', 'sold'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === f
                                ? 'bg-brand-orange text-white shadow-sm'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)} ({
                                f === 'all'
                                    ? products.length
                                    : products.filter(p => p.status === f).length
                            })
                        </button>
                    ))}
                </div>

                {/* Ads List */}
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-folder-open-line text-3xl text-gray-400"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Ads Found</h3>
                        <p className="text-gray-500 mb-6">
                            {filter === 'all'
                                ? "You haven't posted any ads yet."
                                : `You don't have any ${filter} ads.`}
                        </p>
                        {filter === 'all' && (
                            <Link
                                href="/seller/place-ad"
                                className="inline-flex items-center gap-2 text-brand-orange font-medium hover:underline"
                            >
                                <i className="ri-add-line"></i>
                                Post your first ad
                            </Link>
                        )}
                    </div>
                ) : (
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
                                            <Link
                                                href={`/seller/place-ad/${getCategorySlug(product.category_name)}/create?edit=${product.id}`}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                                            >
                                                <i className="ri-edit-line"></i>
                                                Edit
                                            </Link>

                                            {product.status === 'active' ? (
                                                <button
                                                    onClick={() => handleStatusChange(product.id, 'sold')}
                                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                                                >
                                                    <i className="ri-checkbox-circle-line"></i>
                                                    Mark Sold
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleStatusChange(product.id, 'active')}
                                                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                                                >
                                                    <i className="ri-refresh-line"></i>
                                                    Republish
                                                </button>
                                            )}

                                            <div className="flex-1"></div>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 text-sm font-medium hover:bg-red-50 transition ml-auto"
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

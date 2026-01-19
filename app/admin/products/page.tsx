'use client';

import { useState } from 'react';

export default function AdminProducts() {
    const [filter, setFilter] = useState('pending');

    const products = [
        { id: 1, title: '3BHK Apartment in Indiranagar', category: 'Real Estate', seller: 'Rahul Property', price: '₹25,000/mo', status: 'pending', reported: false, date: '2 hours ago' },
        { id: 2, title: 'iPhone 14 Pro Max - Deep Purple', category: 'Mobiles', seller: 'Tech Store', price: '₹1,05,000', status: 'pending', reported: false, date: '5 hours ago' },
        { id: 3, title: 'Royal Enfield Bullet 350', category: 'Automobiles', seller: 'RK Motors', price: '₹1,85,000', status: 'pending', reported: false, date: '1 day ago' },
        { id: 4, title: 'MacBook Pro M2', category: 'Electronics', seller: 'Apple Store', price: '₹1,50,000', status: 'approved', reported: false, date: '2 days ago' },
        { id: 5, title: 'Fake Product Listing', category: 'Mobiles', seller: 'Scammer', price: '₹10,000', status: 'pending', reported: true, date: '3 hours ago' },
    ];

    const filteredProducts = filter === 'all' ? products :
        filter === 'reported' ? products.filter(p => p.reported) :
            products.filter(p => p.status === filter);

    return (
        <div className="min-h-screen bg-gray-50 font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Moderation</h1>
                        <p className="text-gray-500">{filteredProducts.length} products</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-2 inline-flex gap-2 mb-6 flex-wrap">
                    <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'pending' ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Pending ({products.filter(p => p.status === 'pending').length})
                    </button>
                    <button
                        onClick={() => setFilter('reported')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'reported' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Reported ({products.filter(p => p.reported).length})
                    </button>
                    <button
                        onClick={() => setFilter('approved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'approved' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Approved ({products.filter(p => p.status === 'approved').length})
                    </button>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        All ({products.length})
                    </button>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className={`bg-white rounded-xl border shadow-sm overflow-hidden ${product.reported ? 'border-red-300' : 'border-gray-100'}`}>
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <h3 className="text-lg font-bold text-gray-900 flex-1">{product.title}</h3>
                                            {product.reported && (
                                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                                    <i className="ri-flag-fill"></i>
                                                    REPORTED
                                                </span>
                                            )}
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                    product.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {product.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                            <span className="flex items-center gap-1">
                                                <i className="ri-folder-line"></i>
                                                {product.category}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <i className="ri-user-line"></i>
                                                {product.seller}
                                            </span>
                                            <span className="text-brand-orange font-bold text-lg">{product.price}</span>
                                            <span className="flex items-center gap-1">
                                                <i className="ri-time-line"></i>
                                                {product.date}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            {product.status === 'pending' && (
                                                <>
                                                    <button className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition flex items-center gap-1">
                                                        <i className="ri-check-line"></i>
                                                        Approve
                                                    </button>
                                                    <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-1">
                                                        <i className="ri-close-line"></i>
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition flex items-center gap-1">
                                                <i className="ri-eye-line"></i>
                                                View Details
                                            </button>
                                            <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition flex items-center gap-1">
                                                <i className="ri-delete-bin-line"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';

export default function AdminUsers() {
    const [filter, setFilter] = useState('all');

    const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', type: 'buyer', status: 'active', joined: '2024-01-15', products: 0 },
        { id: 2, name: 'Priya Sharma', email: 'priya@example.com', type: 'seller', status: 'active', joined: '2024-02-20', products: 8 },
        { id: 3, name: 'Rahul Kumar', email: 'rahul@example.com', type: 'seller', status: 'active', joined: '2024-03-10', products: 15 },
        { id: 4, name: 'Amit Patel', email: 'amit@example.com', type: 'buyer', status: 'suspended', joined: '2024-01-25', products: 0 },
    ];

    const filteredUsers = filter === 'all' ? users : users.filter(u => u.type === filter);

    return (
        <div className="min-h-screen bg-gray-50 font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                        <p className="text-gray-500">{filteredUsers.length} users</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 shadow-sm">
                            <i className="ri-download-line"></i>
                            Export
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-2 inline-flex gap-2 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        All ({users.length})
                    </button>
                    <button
                        onClick={() => setFilter('buyer')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'buyer' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Buyers ({users.filter(u => u.type === 'buyer').length})
                    </button>
                    <button
                        onClick={() => setFilter('seller')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'seller' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Sellers ({users.filter(u => u.type === 'seller').length})
                    </button>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Products</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.type === 'seller' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                {user.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{user.products}</td>
                                        <td className="px-6 py-4 text-gray-700 text-sm">{user.joined}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                                    <i className="ri-eye-line"></i>
                                                </button>
                                                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition">
                                                    <i className="ri-edit-line"></i>
                                                </button>
                                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                                                    <i className="ri-delete-bin-line"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '2,847', icon: 'ri-user-line', color: 'blue', change: '+12%' },
        { label: 'Total Products', value: '8,432', icon: 'ri-shopping-bag-line', color: 'green', change: '+8%' },
        { label: 'Pending Approvals', value: '23', icon: 'ri-time-line', color: 'orange', change: '-3%' },
        { label: 'Revenue', value: '₹3.2L', icon: 'ri-money-rupee-circle-line', color: 'purple', change: '+15%' },
    ];

    const recentActivities = [
        { action: 'New user registered', user: 'john.doe@example.com', time: '5 mins ago', icon: 'ri-user-add-line' },
        { action: 'Product reported', product: 'iPhone 14 Pro Max', time: '12 mins ago', icon: 'ri-flag-line' },
        { action: 'Subscription purchased', user: 'Premium Plan - ₹999', time: '1 hour ago', icon: 'ri-vip-crown-line' },
        { action: 'Product deleted', product: 'Royal Enfield Classic', time: '2 hours ago', icon: 'ri-delete-bin-line' },
    ];

    const pendingApprovals = [
        { id: 1, title: '3BHK Apartment in Indiranagar', category: 'Real Estate', seller: 'Rahul Property', time: '2 hours ago' },
        { id: 2, title: 'iPhone 14 Pro Max - Deep Purple', category: 'Mobiles', seller: 'Tech Store', time: '5 hours ago' },
        { id: 3, title: 'Royal Enfield Bullet 350', category: 'Automobiles', seller: 'RK Motors', time: '1 day ago' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-500">Manage and monitor platform activity</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                                    <i className={`${stat.icon} text-2xl text-${stat.color}-600`}></i>
                                </div>
                                <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.change}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <i className={`${activity.icon} text-blue-600`}></i>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                            <p className="text-sm text-gray-500">{activity.user || activity.product}</p>
                                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pending Approvals */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900">Pending Approvals</h2>
                            <Link href="/admin/products" className="text-sm font-medium text-blue-600 hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {pendingApprovals.map((item) => (
                                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded">{item.category}</span>
                                                <span>•</span>
                                                <span>{item.seller}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="flex-1 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-100 transition">
                                            Approve
                                        </button>
                                        <button className="flex-1 bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Link href="/admin/users" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center">
                        <i className="ri-user-settings-line text-4xl text-blue-600 mb-3 block"></i>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Manage Users</h3>
                        <p className="text-sm text-gray-500">View and edit users</p>
                    </Link>

                    <Link href="/admin/products" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center">
                        <i className="ri-shopping-bag-line text-4xl text-green-600 mb-3 block"></i>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Products</h3>
                        <p className="text-sm text-gray-500">Moderate listings</p>
                    </Link>

                    <Link href="/admin/analytics" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center">
                        <i className="ri-line-chart-line text-4xl text-purple-600 mb-3 block"></i>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Analytics</h3>
                        <p className="text-sm text-gray-500">View insights</p>
                    </Link>

                    <Link href="/admin/settings" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 text-center">
                        <i className="ri-settings-3-line text-4xl text-orange-600 mb-3 block"></i>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Settings</h3>
                        <p className="text-sm text-gray-500">Platform config</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

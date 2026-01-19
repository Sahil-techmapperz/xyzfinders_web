'use client';

import Link from 'next/link';

export default function SellerDashboard() {
    const stats = [
        { label: 'Total Ads', value: '12', icon: 'ri-folders-line', color: 'blue' },
        { label: 'Active Ads', value: '8', icon: 'ri-checkbox-circle-line', color: 'green' },
        { label: 'Total Views', value: '1,247', icon: 'ri-eye-line', color: 'orange' },
        { label: 'Messages', value: '23', icon: 'ri-message-3-line', color: 'purple' },
    ];

    const recentActivity = [
        { type: 'inquiry', user: 'Amit Kapoor', product: 'Royal Enfield Classic 350', time: '2 hours ago', icon: 'ri-message-2-line' },
        { type: 'view', user: '15 people', product: 'iPhone 14 Pro Max', time: 'Today', icon: 'ri-eye-line' },
        { type: 'inquiry', user: 'Sneha Sharma', product: 'Modern 3 Seater Sofa', time: 'Yesterday', icon: 'ri-message-2-line' },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-jost">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
                    <p className="text-gray-500">Manage your listings and track performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}>
                                    <i className={`${stat.icon} text-2xl text-${stat.color}-600`}></i>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Link href="/seller/place-ad" className="bg-gradient-to-br from-brand-orange to-orange-600 text-white rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <i className="ri-add-circle-line text-4xl mb-3 block"></i>
                        <h3 className="text-xl font-bold mb-1">Post New Ad</h3>
                        <p className="text-orange-100 text-sm">Create a new listing to sell</p>
                    </Link>

                    <Link href="/seller/ads" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <i className="ri-file-list-3-line text-4xl text-brand-orange mb-3 block"></i>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Manage Ads</h3>
                        <p className="text-gray-500 text-sm">Edit or delete your listings</p>
                    </Link>

                    <Link href="/seller/messages" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all transform hover:-translate-y-1">
                        <i className="ri-chat-3-line text-4xl text-blue-600 mb-3 block"></i>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">View Messages</h3>
                        <p className="text-gray-500 text-sm">Respond to buyer inquiries</p>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-full ${activity.type === 'inquiry' ? 'bg-blue-50' : 'bg-orange-50'} flex items-center justify-center flex-shrink-0`}>
                                        <i className={`${activity.icon} ${activity.type === 'inquiry' ? 'text-blue-600' : 'text-orange-600'}`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 font-medium">
                                            {activity.type === 'inquiry' ? (
                                                <><span className="font-semibold">{activity.user}</span> sent an inquiry about <span className="text-brand-orange">{activity.product}</span></>
                                            ) : (
                                                <><span className="font-semibold">{activity.user}</span> viewed <span className="text-brand-orange">{activity.product}</span></>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

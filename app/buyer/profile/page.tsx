'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UserProfile() {
    const [userData, setUserData] = useState({
        name: 'Priya Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98123 45678',
        location: 'Bangalore, Karnataka'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    const activityStats = [
        { label: 'Wishlist Items', value: '3', icon: 'ri-heart-line', link: '/buyer/wishlist' },
        { label: 'Inquiries Sent', value: '7', icon: 'ri-message-3-line', link: '/buyer/inquiries' },
        { label: 'Active Chats', value: '2', icon: 'ri-chat-3-line', link: '/buyer/messages' },
    ];

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-500">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Sidebar */}
                    <div className="space-y-6">
                        {/* Avatar Card */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                                PS
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{userData.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{userData.email}</p>
                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2 mx-auto">
                                <i className="ri-upload-2-line"></i>
                                Change Photo
                            </button>
                        </div>

                        {/* Activity Stats */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Activity</h3>
                            <div className="space-y-3">
                                {activityStats.map((stat, index) => (
                                    <Link key={index} href={stat.link} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
                                        <div className="flex items-center gap-3">
                                            <i className={`${stat.icon} text-brand-orange text-xl`}></i>
                                            <span className="text-sm text-gray-700">{stat.label}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">{stat.value}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link href="/buyer/settings" className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-orange transition">
                                    <i className="ri-settings-3-line"></i>
                                    Settings
                                </Link>
                                <Link href="/buyer/wishlist" className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-orange transition">
                                    <i className="ri-heart-line"></i>
                                    Wishlist
                                </Link>
                                <Link href="/buyer/messages" className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-orange transition">
                                    <i className="ri-message-3-line"></i>
                                    Messages
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 mb-6">Personal Information</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        value={userData.email}
                                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={userData.phone}
                                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={userData.location}
                                    onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                    placeholder="City, State"
                                />
                            </div>

                            {/* Account Type Notice */}
                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
                                <i className="ri-information-line text-blue-600 text-xl flex-shrink-0"></i>
                                <div>
                                    <p className="text-sm font-medium text-blue-900 mb-1">Want to sell products?</p>
                                    <p className="text-sm text-blue-700">Upgrade to a seller account to post ads and manage listings.</p>
                                    <button className="mt-2 text-sm font-semibold text-blue-600 hover:underline">Learn More →</button>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-brand-orange text-white py-3 rounded-xl font-semibold hover:bg-[#e07a46] transition shadow-sm"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';

export default function SellerProfile() {
    const [profileData, setProfileData] = useState({
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@example.com',
        phone: '+91 98765 43210',
        businessName: 'RK Traders',
        address: 'Shop 12, Main Market, Connaught Place, New Delhi - 110001',
        bio: 'Trusted seller with 5+ years of experience in electronics and automobiles.'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-jost">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Seller Profile</h1>
                    <p className="text-gray-500">Manage your seller information and public profile</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Picture */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Profile Picture</h2>
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-orange to-orange-600 flex items-center justify-center text-white text-4xl font-bold mb-4">
                                RK
                            </div>
                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2">
                                <i className="ri-upload-2-line"></i>
                                Upload Photo
                            </button>
                        </div>

                        {/* Rating */}
                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                            <div className="flex items-center justify-center gap-1 mb-2">
                                <i className="ri-star-fill text-yellow-400 text-xl"></i>
                                <span className="text-2xl font-bold text-gray-900">4.8</span>
                            </div>
                            <p className="text-sm text-gray-500">Based on 47 reviews</p>
                            <button className="mt-3 text-brand-orange text-sm font-medium hover:underline">View All Reviews</button>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 mb-6">Personal Information</h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                                <input
                                    type="text"
                                    value={profileData.businessName}
                                    onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <textarea
                                    value={profileData.address}
                                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition resize-none"
                                    rows={3}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio / About</label>
                                <textarea
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange transition resize-none"
                                    rows={4}
                                    placeholder="Tell buyers about yourself and your business..."
                                ></textarea>
                                <p className="text-xs text-gray-400 mt-1">This will be visible on your public profile</p>
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

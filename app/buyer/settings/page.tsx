'use client';

import { useState } from 'react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('account');

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-500">Manage your account settings and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-2 h-fit">
                        <button
                            onClick={() => setActiveTab('account')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 'account' ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <i className="ri-user-settings-line"></i>
                            Account
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 'security' ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <i className="ri-shield-keyhole-line"></i>
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 'notifications' ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <i className="ri-notification-3-line"></i>
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('privacy')}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 'privacy' ? 'bg-brand-orange text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            <i className="ri-lock-line"></i>
                            Privacy
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        {activeTab === 'account' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                                <div className="space-y-6">
                                    <div className="pb-6 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-900 mb-2">Email Preferences</h3>
                                        <p className="text-sm text-gray-500 mb-4">Choose which emails you'd like to receive</p>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" defaultChecked className="w-5 h-5 text-brand-orange rounded" />
                                                <span className="text-sm text-gray-700">Product updates and announcements</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input type="checkbox" defaultChecked className="w-5 h-5 text-brand-orange rounded" />
                                                <span className="text-sm text-gray-700">Weekly newsletter</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pb-6 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-900 mb-2">Language & Region</h3>
                                        <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-orange">
                                            <option>English (India)</option>
                                            <option>Hindi</option>
                                        </select>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-red-600 mb-2">Delete Account</h3>
                                        <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data</p>
                                        <button className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition">
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                                <div className="space-y-6">
                                    <div className="pb-6 border-b border-gray-100">
                                        <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                <input type="password" className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-orange" />
                                            </div>
                                            <button type="submit" className="bg-brand-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e07a46] transition">
                                                Update Password
                                            </button>
                                        </form>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
                                        <button className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition">
                                            Enable 2FA
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">New Messages</h4>
                                            <p className="text-sm text-gray-500">Get notified when you receive a message</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Price Drops</h4>
                                            <p className="text-sm text-gray-500">Alert when wishlist items go on sale</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Promotional Emails</h4>
                                            <p className="text-sm text-gray-500">Receive offers and deals via email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'privacy' && (
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Profile Visibility</h4>
                                            <p className="text-sm text-gray-500">Make your profile visible to other users</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Show Online Status</h4>
                                            <p className="text-sm text-gray-500">Let sellers see when you're online</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

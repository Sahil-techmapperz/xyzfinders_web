'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerSettingsPage() {
    const router = useRouter();
    const [email] = useState(JSON.parse(localStorage.getItem('user') || '{}').email || '');

    // Placeholder States
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        marketing: true
    });

    const handleDeleteAccount = async () => {
        if (confirm('Are you absolutely sure you want to delete your account? This action cannot be undone. All your listings and data will be permanently removed.')) {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/auth/delete-account', {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    alert('Account deleted successfully.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                } else {
                    alert('Failed to delete account.');
                }
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('An error occurred.');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
                <p className="text-gray-500 mt-2 text-lg">Manage your account preferences and security</p>
            </div>

            <div className="space-y-6">

                {/* Account Security */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <i className="ri-shield-keyhole-line text-xl"></i>
                        </span>
                        Login & Security
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="font-medium text-gray-900">Email Address</h4>
                                <p className="text-gray-500 text-sm mt-1">Your registered email for login</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-medium">{email}</span>
                                <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider">Verified</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 my-4"></div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="font-medium text-gray-900">Password</h4>
                                <p className="text-gray-500 text-sm mt-1">Last changed 3 months ago</p>
                            </div>
                            <button className="px-5 py-2 border border-blue-200 text-blue-600 font-medium rounded-xl hover:bg-blue-50 transition">
                                Change Password
                            </button>
                        </div>

                        <div className="border-t border-gray-100 my-4"></div>

                        <div className="flex items-center justify-between py-2">
                            <div>
                                <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                <p className="text-gray-500 text-sm mt-1">Add an extra layer of security to your account</p>
                            </div>
                            <button className="px-5 py-2 bg-gray-50 text-gray-400 font-medium rounded-xl cursor-not-allowed">
                                Coming Soon
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                            <i className="ri-notification-3-line text-xl"></i>
                        </span>
                        Notifications
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                                <p className="text-gray-500 text-sm mt-1">Receive updates about your listings and messages</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.email}
                                    onChange={() => setNotifications({ ...notifications, email: !notifications.email })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                                <p className="text-gray-500 text-sm mt-1">Receive news, tips, and special offers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.marketing}
                                    onChange={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                    <h3 className="font-bold text-red-700 text-lg mb-2 flex items-center gap-2">
                        <i className="ri-alarm-warning-line"></i> Danger Zone
                    </h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <p className="text-red-600/70 text-sm max-w-lg">
                            Deleting your account is permanent. All your data, including active listings, messages, and profile information, will be wiped from our servers immediately.
                        </p>
                        <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="whitespace-nowrap px-6 py-2.5 bg-white border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition shadow-sm"
                        >
                            Delete Account
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

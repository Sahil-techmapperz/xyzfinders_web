'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserProfile() {
    const router = useRouter();
    const [user, setUser] = useState<{ id?: number; name: string; email: string; avatar?: string } | null>(null);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '+91 00000 00000',
        location: 'Not Specified'
    });
    const [isDeleting, setIsDeleting] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            // MainLayout handles protection, but we need token for API
            if (!token) return;

            try {
                const res = await fetch('/api/buyer/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (data.buyer) {
                        setUser(data.buyer);
                        setUserData({
                            name: data.buyer.name || '',
                            email: data.buyer.email || '',
                            phone: data.buyer.phone || '',
                            location: data.buyer.location || ''
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('location', userData.location);
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            const res = await fetch('/api/buyer/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                const data = await res.json();
                alert('Profile updated successfully!');

                // Update local storage
                const storedUserRaw = localStorage.getItem('user');
                if (storedUserRaw) {
                    const parsed = JSON.parse(storedUserRaw);
                    parsed.name = userData.name;
                    // If avatar was updated, update it in local storage
                    if (data.buyer && data.buyer.avatar) {
                        parsed.avatar = data.buyer.avatar;
                    }
                    localStorage.setItem('user', JSON.stringify(parsed));
                }

                // Refresh page
                window.location.reload();
            } else {
                alert('Failed to update profile.');
            }
        } catch (error) {
            console.error('Update error:', error);
            alert('An error occurred.');
        }
    };

    const handleDeleteAccount = async () => {
        if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/delete-account', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                alert('Account deleted successfully.');
                router.push('/');
                window.location.href = '/';
            } else {
                alert('Failed to delete account. Please try again.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const activityStats = [
        { label: 'Wishlist Items', value: '0', icon: 'ri-heart-line', link: '/buyer/wishlist' },
        { label: 'Inquiries Sent', value: '0', icon: 'ri-message-3-line', link: '/buyer/inquiries' },
        { label: 'Active Chats', value: '0', icon: 'ri-chat-3-line', link: '/buyer/messages' },
    ];

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Back to Home */}
                <div className="mb-6">
                    <Link href="/" className="text-gray-500 hover:text-brand-orange flex items-center gap-2 transition">
                        <i className="ri-arrow-left-line"></i>
                        <span>Back to Home</span>
                    </Link>
                </div>

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
                            <div className="relative group mx-auto w-24 h-24 mb-4">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-brand-orange/20">
                                    {previewAvatar || user.avatar ? (
                                        <img src={previewAvatar || user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-brand-orange/10 flex items-center justify-center text-brand-orange text-3xl font-bold">
                                            {user.name?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full cursor-pointer text-white">
                                    <i className="ri-camera-line text-2xl"></i>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-1">{user.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{user.email}</p>

                            <label className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center gap-2 mx-auto cursor-pointer w-fit">
                                <i className="ri-upload-2-line"></i>
                                Change Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
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
                                <Link href="/" className="flex items-center gap-2 text-sm text-gray-700 hover:text-brand-orange transition">
                                    <i className="ri-home-line"></i>
                                    Home
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
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                            <h2 className="font-bold text-gray-900 mb-6 font-jost text-xl">Personal Information</h2>

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
                                            readOnly
                                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
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

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-brand-orange text-white py-3 rounded-xl font-semibold hover:bg-[#e07a46] transition shadow-sm"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-6">
                            <h2 className="font-bold text-red-600 mb-2 font-jost text-xl">Danger Zone</h2>
                            <p className="text-sm text-gray-500 mb-6">Once you delete your account, there is no going back. Please be certain.</p>

                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="w-full sm:w-auto bg-red-50 text-red-600 border border-red-100 py-3 px-8 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete Account'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

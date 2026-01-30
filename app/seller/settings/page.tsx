'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerSettingsPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [seller, setSeller] = useState<any>(null);

    // Form States
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [website, setWebsite] = useState('');

    // Social Links
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [twitter, setTwitter] = useState('');

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/');
                return;
            }

            const res = await fetch('/api/seller/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setSeller(data.seller);

                // Initialize form
                setPhone(data.seller.phone || '');
                setAddress(data.seller.address || '');
                setCompanyName(data.seller.company_name || '');
                setGstNumber(data.seller.gst_number || '');
                setWebsite(data.seller.website || '');

                // Parse social links if JSON
                if (data.seller.social_links) {
                    try {
                        const social = typeof data.seller.social_links === 'string'
                            ? JSON.parse(data.seller.social_links)
                            : data.seller.social_links;

                        setFacebook(social.facebook || '');
                        setInstagram(social.instagram || '');
                        setTwitter(social.twitter || '');
                    } catch (e) {
                        console.error("Error parsing social links", e);
                    }
                }

                if (data.seller.user_avatar) {
                    setPreviewAvatar(data.seller.user_avatar);
                }

            } else {
                console.error('Failed to fetch profile');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();

            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('company_name', companyName);
            formData.append('gst_number', gstNumber);
            formData.append('website', website);

            const socialLinks = JSON.stringify({
                facebook,
                instagram,
                twitter
            });
            formData.append('social_links', socialLinks);

            if (avatarFile) {
                formData.append('profile_pic', avatarFile);
            }

            const res = await fetch('/api/seller/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert('Profile updated successfully!');
                const data = await res.json();
                // Update local storage user avatar if changed
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    parsedUser.avatar = data.seller.user_avatar;
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                    // Force a reload or event dispatch to update Sidebar might be needed
                    // For now, simpler to just let it be or reload page
                    window.location.reload();
                }
            } else {
                alert('Failed to update profile.');
            }

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
            </div>
        );
    }

    if (!seller) {
        return <div className="p-8 text-center text-gray-500">Profile not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your seller profile and account preferences</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Profile Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-start">

                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner bg-gray-100">
                                {previewAvatar ? (
                                    <img src={previewAvatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold bg-gray-50">
                                        {seller.user_name?.charAt(0) || 'S'}
                                    </div>
                                )}
                            </div>
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full cursor-pointer text-white font-medium">
                                <i className="ri-camera-line mr-2"></i> Change
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-gray-900 text-lg">{seller.user_name}</h3>
                            <p className="text-gray-500 text-sm">{seller.user_email}</p>
                            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                                {seller.seller_type} Account
                            </span>
                        </div>
                    </div>

                    {/* Basic Info Fields */}
                    <div className="flex-1 space-y-4 w-full">
                        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Info (Conditional) */}
                {seller.seller_type !== 'owner' && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Business Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="e.g. Acme Properties"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                                <input
                                    type="text"
                                    value={gstNumber}
                                    onChange={(e) => setGstNumber(e.target.value)}
                                    placeholder="GST12345678"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                                <input
                                    type="url"
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value)}
                                    placeholder="https://example.com"
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Social Links */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Social Media</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <i className="ri-facebook-circle-fill text-blue-600 mr-2"></i> Facebook
                            </label>
                            <input
                                type="url"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                placeholder="Profile URL"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <i className="ri-instagram-line text-pink-600 mr-2"></i> Instagram
                            </label>
                            <input
                                type="url"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                placeholder="Profile URL"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <i className="ri-twitter-x-line text-black mr-2"></i> Twitter / X
                            </label>
                            <input
                                type="url"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                                placeholder="Profile URL"
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 outline-none transition"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`bg-brand-orange text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition flex items-center gap-2 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? (
                            <>
                                <i className="ri-loader-4-line animate-spin"></i> Saving...
                            </>
                        ) : (
                            <>
                                <i className="ri-save-line"></i> Save Changes
                            </>
                        )}
                    </button>
                </div>

            </form>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-100 mt-12">
                <h3 className="font-bold text-red-700 text-lg mb-2">Danger Zone</h3>
                <p className="text-red-600/80 mb-6 text-sm">
                    Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                    type="button"
                    onClick={async () => {
                        if (confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
                            try {
                                const token = localStorage.getItem('token');
                                const res = await fetch('/api/auth/delete-account', {
                                    method: 'DELETE',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });

                                if (res.ok) {
                                    alert('Account deleted successfully.');
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                    router.push('/');
                                    window.location.href = '/';
                                } else {
                                    alert('Failed to delete account.');
                                }
                            } catch (error) {
                                console.error('Error deleting account:', error);
                                alert('An error occurred.');
                            }
                        }
                    }}
                    className="px-6 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
}

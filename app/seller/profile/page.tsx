'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerProfile() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [seller, setSeller] = useState<any>(null);

    // Form States
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [gstNumber, setGstNumber] = useState('');
    const [website, setWebsite] = useState('');

    // Social Links States
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

                if (data.seller.avatar) {
                    setPreviewAvatar(data.seller.avatar);
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
                const data = await res.json();
                // Update local storage
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    parsedUser.avatar = data.seller.avatar;
                    parsedUser.brand_logo = data.seller.avatar;
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                }

                // Update local state without reload
                setSeller(data.seller);
                setIsEditing(false); // Switch back to view mode
                alert('Profile updated successfully!');
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

    const getSocialLink = (links: any, platform: string) => {
        if (!links) return null;
        try {
            // Handle both string and object possibilities for safety
            const parsed = typeof links === 'string' ? JSON.parse(links) : links;
            return parsed[platform] || null;
        } catch (e) { return null; }
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

    // --- VIEW MODE ---
    if (!isEditing) {
        return (
            <div className="max-w-6xl mx-auto pb-12">
                {/* Header Banner */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-slate-800 to-slate-900 relative">
                        {/* Edit Button (Top Right) */}
                        <button
                            onClick={() => setIsEditing(true)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm transition flex items-center gap-2"
                        >
                            <i className="ri-edit-line"></i> Edit Profile
                        </button>
                    </div>
                    <div className="px-8 pb-8 flex flex-col md:flex-row gap-6 items-start -mt-12">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                                {seller.avatar ? (
                                    <img src={seller.avatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl font-bold bg-gray-50">
                                        {seller.user_name?.charAt(0) || 'S'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name & Basic Info */}
                        <div className="flex-1 pt-14 md:pt-14">
                            <h1 className="text-3xl font-bold text-gray-900">{seller.user_name}</h1>
                            <div className="flex flex-wrap gap-4 mt-2 text-gray-500">
                                <span className="flex items-center gap-1">
                                    <i className="ri-mail-line"></i> {seller.user_email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <i className="ri-user-star-line"></i> {seller.seller_type} Seller
                                </span>
                                <span className="flex items-center gap-1 text-green-600 font-medium">
                                    <i className="ri-verified-badge-fill"></i> Verified Account
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Contact & Quick Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-contacts-book-2-line text-brand-orange"></i>
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</span>
                                    <p className="text-gray-900 font-medium">{seller.phone || 'Not provided'}</p>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</span>
                                    <p className="text-gray-900 font-medium">{seller.address || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <i className="ri-share-network-line text-brand-orange"></i>
                                Social Presence
                            </h3>
                            <div className="space-y-3">
                                {getSocialLink(seller.social_links, 'facebook') ? (
                                    <a href={getSocialLink(seller.social_links, 'facebook')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition">
                                        <i className="ri-facebook-circle-fill text-xl"></i>
                                        <span className="font-medium">Facebook</span>
                                        <i className="ri-external-link-line ml-auto text-sm opacity-50"></i>
                                    </a>
                                ) : <div className="text-gray-400 italic text-sm">No Facebook linked</div>}

                                {getSocialLink(seller.social_links, 'instagram') ? (
                                    <a href={getSocialLink(seller.social_links, 'instagram')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 text-pink-700 hover:bg-pink-100 transition">
                                        <i className="ri-instagram-fill text-xl"></i>
                                        <span className="font-medium">Instagram</span>
                                        <i className="ri-external-link-line ml-auto text-sm opacity-50"></i>
                                    </a>
                                ) : <div className="text-gray-400 italic text-sm">No Instagram linked</div>}

                                {getSocialLink(seller.social_links, 'twitter') ? (
                                    <a href={getSocialLink(seller.social_links, 'twitter')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-800 hover:bg-gray-100 transition">
                                        <i className="ri-twitter-x-fill text-xl"></i>
                                        <span className="font-medium">X (Twitter)</span>
                                        <i className="ri-external-link-line ml-auto text-sm opacity-50"></i>
                                    </a>
                                ) : <div className="text-gray-400 italic text-sm">No Twitter linked</div>}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Business Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
                            <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <i className="ri-briefcase-4-line text-xl"></i>
                                </span>
                                Business Profile
                            </h3>

                            {seller.seller_type === 'owner' ? (
                                <div className="bg-gray-50 rounded-2xl p-6 text-center">
                                    <i className="ri-user-line text-4xl text-gray-300 mb-2 block"></i>
                                    <p className="text-gray-500">You are registered as an <span className="font-bold text-gray-700">Individual Owner</span>.</p>
                                    <p className="text-sm text-gray-400 mt-1">Business details are not applicable to your account type.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Company Name</span>
                                        <p className="text-lg font-medium text-gray-900">{seller.company_name || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">GST Number</span>
                                        <p className="text-lg font-medium text-gray-900 font-mono bg-gray-50 inline-block px-3 py-1 rounded-lg">
                                            {seller.gst_number || 'Not provided'}
                                        </p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <span className="block text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Website</span>
                                        {seller.website ? (
                                            <a href={seller.website} target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline flex items-center gap-1 group">
                                                {seller.website}
                                                <i className="ri-arrow-right-up-line group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
                                            </a>
                                        ) : (
                                            <p className="text-gray-400 italic">No website added</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- EDIT MODE ---
    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Profile</h1>
                    <p className="text-gray-500 mt-2 text-lg">Update your public profile and business information</p>
                </div>
                <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 hover:text-gray-700 font-medium px-4 py-2 hover:bg-gray-100 rounded-xl transition"
                >
                    Cancel Editing
                </button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                <div className="lg:col-span-1 lg:sticky lg:top-8 space-y-6">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="relative group cursor-pointer mb-6">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-50 ring-4 ring-gray-50/50">
                                {previewAvatar ? (
                                    <img src={previewAvatar} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl font-bold bg-gray-50">
                                        {seller.user_name?.charAt(0) || 'S'}
                                    </div>
                                )}
                            </div>
                            <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 rounded-full cursor-pointer text-white font-medium backdrop-blur-sm">
                                <i className="ri-camera-fill text-3xl mb-1"></i>
                                <span className="text-sm">Change Photo</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                        <h3 className="font-bold text-gray-900 text-xl mb-1">{seller.user_name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{seller.user_email}</p>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                                <i className="ri-contacts-book-2-line text-xl"></i>
                            </span>
                            Contact Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none font-medium" placeholder="+91..." />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Address</label>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none font-medium" placeholder="City, State" />
                            </div>
                        </div>
                    </div>

                    {/* Business Details */}
                    {seller.seller_type !== 'owner' && (
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <i className="ri-briefcase-4-line text-xl"></i>
                                </span>
                                Business Info
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Company Name</label>
                                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">GST Number</label>
                                    <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none font-medium" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Website URL</label>
                                    <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none font-medium" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Social Media */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                                <i className="ri-share-line text-xl"></i>
                            </span>
                            Social Assets
                        </h3>
                        <div className="space-y-5">
                            <div className="flex items-center gap-4">
                                <i className="ri-facebook-fill text-xl text-blue-600"></i>
                                <input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="Facebook URL" className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none" />
                            </div>
                            <div className="flex items-center gap-4">
                                <i className="ri-instagram-line text-xl text-pink-600"></i>
                                <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="Instagram URL" className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none" />
                            </div>
                            <div className="flex items-center gap-4">
                                <i className="ri-twitter-x-line text-xl text-black"></i>
                                <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="Twitter URL" className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10 transition outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="sticky bottom-6 z-10 flex justify-end gap-4">
                        <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-4 rounded-2xl font-bold text-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSaving} className="bg-brand-orange text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 transition flex items-center gap-3">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

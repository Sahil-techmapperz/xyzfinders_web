'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BecomeSellerPage() {
    const router = useRouter();
    const [sellerType, setSellerType] = useState<'owner' | 'agency'>('owner');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<any>(null);

    // Form States
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        company_name: '',
        gst_number: '',
        license_number: '',
        website: '',
        social_facebook: '',
        social_instagram: '',
        social_twitter: '',
    });

    const [files, setFiles] = useState<{ documents: FileList | null, profile_pic: File | null }>({
        documents: null,
        profile_pic: null
    });

    useEffect(() => {
        const fetchBuyerProfile = async () => {
            const storedUser = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            if (token) {
                try {
                    const res = await fetch('/api/buyer/profile', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data.buyer) {
                            setFormData(prev => ({
                                ...prev,
                                phone: data.buyer.phone || '',
                                address: data.buyer.location || '' // Mapping location to address
                            }));
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch buyer profile for pre-fill", err);
                }
            }
        };

        fetchBuyerProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'documents') {
            setFiles({ ...files, documents: e.target.files });
        } else if (e.target.name === 'profile_pic') {
            setFiles({ ...files, profile_pic: e.target.files ? e.target.files[0] : null });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!formData.phone) {
            setError('Phone number is required.');
            setIsLoading(false);
            return;
        }

        if (sellerType === 'agency' && (!formData.company_name || !formData.gst_number || !formData.address)) {
            setError('Company Name, GST Number, and Address are required for Agencies.');
            setIsLoading(false);
            return;
        }

        const data = new FormData();
        data.append('seller_type', sellerType);
        data.append('phone', formData.phone);
        data.append('address', formData.address);

        // Social Links
        const socialLinks = {
            facebook: formData.social_facebook,
            instagram: formData.social_instagram,
            twitter: formData.social_twitter
        };
        data.append('social_links', JSON.stringify(socialLinks));

        if (sellerType === 'agency') {
            data.append('company_name', formData.company_name);
            data.append('gst_number', formData.gst_number);
            data.append('license_number', formData.license_number);
            data.append('website', formData.website);

            if (files.documents) {
                Array.from(files.documents).forEach((file) => {
                    data.append('documents', file);
                });
            }
        }

        if (files.profile_pic) {
            data.append('profile_pic', files.profile_pic);
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/auth/become-seller', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: data
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            // Update user in local storage (if API returns updated user)
            if (result.user) {
                localStorage.setItem('user', JSON.stringify(result.user));
                // We might need to manually set a flag like "isSeller" if the backend doesn't explicitly return it in a standard way,
                // but let's assume the component will redirect.
            }

            // Redirect to Seller Dashboard
            alert('Congratulations! You are now a seller.');
            // Route to switch to seller mode or dashboard
            // For now, let's go to seller dashboard directly? Or verify sidebar update.
            window.location.href = '/seller/dashboard';

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
            <p className="text-gray-600 mb-8">Start selling your properties or products on XYZ Finders.</p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                {/* Seller Type Toggle */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setSellerType('owner')}
                        className={`flex-1 py-3 rounded-lg font-medium transition ${sellerType === 'owner'
                            ? 'bg-brand-orange text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        I am an Owner
                    </button>
                    <button
                        onClick={() => setSellerType('agency')}
                        className={`flex-1 py-3 rounded-lg font-medium transition ${sellerType === 'agency'
                            ? 'bg-brand-orange text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        I am an Agency
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Common Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                placeholder="City, State"
                            />
                        </div>
                    </div>

                    {/* Profile Pic (Optional) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture / Logo (Optional)
                        </label>
                        <input
                            type="file"
                            name="profile_pic"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20"
                        />
                    </div>

                    {/* Agency Specific */}
                    {sellerType === 'agency' && (
                        <div className="space-y-6 pt-4 border-t border-gray-100">
                            <h3 className="font-semibold text-lg">Agency Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Agency Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        GST Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="gst_number"
                                        value={formData.gst_number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        License Number
                                    </label>
                                    <input
                                        type="text"
                                        name="license_number"
                                        value={formData.license_number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Supported Documents (PDF/Images) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    name="documents"
                                    multiple
                                    accept=".pdf,image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-orange/10 file:text-brand-orange hover:file:bg-brand-orange/20"
                                />
                                <p className="text-xs text-gray-500 mt-1">Upload business registration, identity proof, etc.</p>
                            </div>
                        </div>
                    )}

                    {/* Social Links (Optional) */}
                    <div className="pt-4 border-t border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Social Media Links (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                                <input
                                    type="url"
                                    name="social_facebook"
                                    value={formData.social_facebook}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                                <input
                                    type="url"
                                    name="social_instagram"
                                    value={formData.social_instagram}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter / X</label>
                                <input
                                    type="url"
                                    name="social_twitter"
                                    value={formData.social_twitter}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-[#e07a46] transition shadow-lg shadow-orange-200 disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Create Seller Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompleteProfile() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const onboardingToken = searchParams.get('onboarding_token');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');

    // Seller Fields
    const [sellerDetails, setSellerDetails] = useState({
        seller_type: 'owner',
        company_name: '',
        license_number: '',
        website: '',
        address: ''
    });

    useEffect(() => {
        if (!onboardingToken) {
            router.push('/auth');
        }
    }, [onboardingToken, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/social-register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    onboarding_token: onboardingToken,
                    user_type: userType,
                    ...sellerDetails
                }),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'Registration failed');
            }

            // Store token
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            // Redirect
            router.push("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!onboardingToken) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFCF3] p-4 font-jost">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 p-8 md:p-10 shadow-orange-100/50">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Complete Your Profile
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Just one more step to get started!
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm flex items-center gap-2">
                        <i className="ri-error-warning-fill"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            How do you want to use XYZFinders?
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setUserType('buyer')}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${userType === 'buyer' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                            >
                                <i className="ri-shopping-bag-3-line text-2xl"></i>
                                <span className="font-bold">Buyer</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setUserType('seller')}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${userType === 'seller' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                            >
                                <i className="ri-store-2-line text-2xl"></i>
                                <span className="font-bold">Seller</span>
                            </button>
                        </div>
                    </div>

                    {userType === 'seller' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Seller Type</label>
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none"
                                        value={sellerDetails.seller_type}
                                        onChange={(e) => setSellerDetails({ ...sellerDetails, seller_type: e.target.value })}
                                    >
                                        <option value="owner">Owner (Individual)</option>
                                        <option value="agency">Agency / Broker</option>
                                        <option value="builder">Builder / Developer</option>
                                    </select>
                                </div>

                                {(sellerDetails.seller_type === 'agency' || sellerDetails.seller_type === 'builder') && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                                {sellerDetails.seller_type === 'agency' ? 'Agency Name' : 'Company Name'}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none"
                                                value={sellerDetails.company_name}
                                                onChange={(e) => setSellerDetails({ ...sellerDetails, company_name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">License / Reg. No.</label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none"
                                                value={sellerDetails.license_number}
                                                onChange={(e) => setSellerDetails({ ...sellerDetails, license_number: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website (Optional)</label>
                                            <input
                                                type="url"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none"
                                                value={sellerDetails.website}
                                                onChange={(e) => setSellerDetails({ ...sellerDetails, website: e.target.value })}
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Office Address</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none"
                                                value={sellerDetails.address}
                                                onChange={(e) => setSellerDetails({ ...sellerDetails, address: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-orange text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#e67a45] transition shadow-lg shadow-orange-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Setting up...' : 'Complete Registration'}
                    </button>
                </form>
            </div>
        </div>
    );
}

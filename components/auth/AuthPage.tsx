'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthPageProps {
    initialMode: 'login' | 'register';
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    user_type: string;
    seller_type?: string;
    company_name?: string;
    license_number?: string;
    website?: string;
    address?: string;
}

export default function AuthPage({ initialMode }: AuthPageProps) {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        user_type: "buyer",
        seller_type: "owner",
        company_name: "",
        license_number: "",
        website: "",
        address: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Sync mode with prop if it changes (optional, but good for direct navigation)
    useEffect(() => {
        setMode(initialMode);
    }, [initialMode]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (mode === 'register' && formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const endpoint = mode === 'login' ? "/api/auth/login" : "/api/auth/register";
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mode === 'login' ?
                    { email: formData.email, password: formData.password } :
                    formData
                ),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || `${mode === 'login' ? 'Login' : 'Registration'} failed`);
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

    const handleGoogleAuth = () => {
        // Mock Google Auth implementation
        console.log("Google Auth Clicked");
        // implementation would go here (e.g., Firebase, NextAuth, or custom flow)
        alert("Google Authentication integration would happen here.");
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFCF3] p-4 font-jost">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col shadow-orange-100/50">

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => {
                            setMode('login');
                            window.history.pushState({}, '', '/auth?mode=login');
                        }}
                        className={`flex-1 py-4 text-center font-bold text-lg transition-colors relative ${mode === 'login' ? 'text-brand-orange' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Login
                        {mode === 'login' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange rounded-t-full"></div>}
                    </button>
                    <button
                        onClick={() => {
                            setMode('register');
                            window.history.pushState({}, '', '/auth?mode=register');
                        }}
                        className={`flex-1 py-4 text-center font-bold text-lg transition-colors relative ${mode === 'register' ? 'text-brand-orange' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Sign Up
                        {mode === 'register' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange rounded-t-full"></div>}
                    </button>
                </div>

                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">
                            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {mode === 'login'
                                ? 'Enter your details to access your account'
                                : 'Start your journey with us today'}
                        </p>
                    </div>

                    {/* Google Auth Button */}
                    <button
                        onClick={handleGoogleAuth}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition mb-6 shadow-sm group"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Continue with Google</span>
                    </button>

                    <div className="relative flex py-2 items-center mb-6">
                        <div className="grow border-t border-gray-200"></div>
                        <span className="shrink-0 mx-4 text-gray-400 text-sm">Or with Email</span>
                        <div className="grow border-t border-gray-200"></div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm flex items-center gap-2 animate-pulse">
                            <i className="ri-error-warning-fill"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-top-4 duration-300">
                            {mode === 'register' && (
                                <>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+1 234 567 8900"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}

                            <div className={mode === 'login' ? "col-span-1 md:col-span-2" : "col-span-1"}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className={mode === 'login' ? "col-span-1 md:col-span-2" : "col-span-1"}>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            {mode === 'register' && (
                                <>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Confirm</label>
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                            value={formData.password_confirmation}
                                            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Account Type</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition appearance-none cursor-pointer"
                                            value={formData.user_type}
                                            onChange={(e) => setFormData({ ...formData, user_type: e.target.value })}
                                        >
                                            <option value="buyer">Buyer</option>
                                            <option value="seller">Seller</option>
                                        </select>
                                    </div>

                                    {/* Seller Specific Options */}
                                    {formData.user_type === 'seller' && (
                                        <>
                                            <div className="col-span-1 animate-in fade-in slide-in-from-top-2">
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">Seller Type</label>
                                                <select
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition appearance-none cursor-pointer"
                                                    value={formData.seller_type || 'owner'}
                                                    onChange={(e) => setFormData({ ...formData, seller_type: e.target.value })}
                                                >
                                                    <option value="owner">Owner (Individual)</option>
                                                    <option value="agency">Agency / Broker</option>
                                                    <option value="builder">Builder / Developer</option>
                                                </select>
                                            </div>

                                            {/* Dynamic Fields for Agency/Builder */}
                                            {(formData.seller_type === 'agency' || formData.seller_type === 'builder') && (
                                                <>
                                                    <div className="col-span-1 animate-in fade-in slide-in-from-top-2">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                                            {formData.seller_type === 'agency' ? 'Agency Name' : 'Company Name'}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder={formData.seller_type === 'agency' ? "Enter Agency Name" : "Enter Company Name"}
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                                            value={formData.company_name || ''}
                                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 animate-in fade-in slide-in-from-top-2">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                                            License / Reg. No.
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. RERA12345"
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                                            value={formData.license_number || ''}
                                                            onChange={(e) => setFormData({ ...formData, license_number: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 animate-in fade-in slide-in-from-top-2">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                                            Website (Optional)
                                                        </label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://example.com"
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                                            value={formData.website || ''}
                                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="col-span-1 md:col-span-2 animate-in fade-in slide-in-from-top-2">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                                                            Office Address
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="Full Business Address"
                                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                                                            value={formData.address || ''}
                                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        {mode === 'login' && (
                            <div className="flex justify-end animate-in fade-in duration-300">
                                <a href="#" className="text-sm text-brand-orange hover:text-[#e07a46] font-medium hover:underline">
                                    Forgot Password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-orange text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#e67a45] transition shadow-lg shadow-orange-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-4 active:scale-[0.98] transform"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <i className="ri-loader-4-line animate-spin text-xl"></i>
                                    Processing...
                                </span>
                            ) : (
                                mode === 'login' ? 'Login' : 'Create Account'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

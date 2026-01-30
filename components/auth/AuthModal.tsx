'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'signup';
}

type AuthView = 'login' | 'signup';

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
    const router = useRouter();
    const [view, setView] = useState<AuthView>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Initial view handler
    useEffect(() => {
        if (isOpen) {
            setView('login');
            setError('');
            setEmail('');
            setPassword('');
            setName('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Login Handler
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            onClose();
            window.location.reload(); // Refresh to update header state
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Signup Handler
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic password validation
        if (password.length < 7) {
            setError("Password must be at least 7 characters long");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    password_confirmation: password,
                    phone: '0000000000', // Placeholder
                    user_type: 'buyer' // Defaulting to buyer
                }),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'Registration failed');
            }

            // Store token
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            onClose();
            window.location.reload();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = '/api/auth/google?returnUrl=' + encodeURIComponent(window.location.pathname);
    };

    const renderLoginView = () => (
        <div className="p-6 md:px-8 md:pb-8 pt-2">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6 font-jost">
                Log in to call the seller
            </h2>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <input
                        type="email" // Changed from text to email for better validation
                        required
                        placeholder="Email Address" // Simplified placeholder based on standard UX, mock said "Email Address & Phone Numbers"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition text-gray-700 placeholder-gray-400 italic"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition text-gray-700 placeholder-gray-400 italic"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                    </button> */}
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-gray-500">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Remember me</span>
                    </label>
                    <button type="button" className="text-gray-700 font-bold hover:underline">
                        Forgot Password ?
                    </button>
                </div>

                {/* Login Button removed from here as per visual flow? No, form needs explicit submit usually, but the mock doesn't show a big "LOGIN" button above the "or login with". 
                    Wait, looking at the mock (uploaded image):
                    - Inputs
                    - Remember me | Forgot Password
                    - (Separator) "or login with"
                    - Social Icons
                    - "Don't have an account? Create one"
                    - Footer

                    WHERE IS THE LOGIN BUTTON?
                    Usually in such designs, the "Enter" key works, or there IS a button that might be missing or scrolling?
                    Actually, most designs MUST have a Login button.
                    Maybe it's below "Forgot Password"?
                    I will add a Login button because it's non-functional without it for many users.
                    I'll place it before the separator.
                */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-orange hover:bg-[#e07a46] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70 shadow-md"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </div>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-600 font-medium">or login with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition shadow-sm"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                    </button>
                    {/* Facebook removed as per previous instruction, but if user wants it back based on image, I can uncomment. 
                        User said "remove the facbook", keeping it off.
                    */}
                </div>

                <div className="text-center pt-4">
                    <p className="text-brand-orange font-semibold cursor-pointer text-lg bg-red-50 py-2 rounded" onClick={() => setView('signup')}>
                        Don&apos;t have an account ? <span className="text-brand-orange">Create one</span>
                    </p>
                </div>

                <div className="mt-4 text-center text-[10px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                    By Signing up I agree to the <a href="#" className="text-blue-500">Terms & Conditions</a> and <a href="#" className="text-blue-500">Privacy policy</a>
                </div>
            </form>
        </div>
    );

    const renderSignupView = () => (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => setView('login')} className="text-xl text-gray-400 hover:text-gray-600 flex items-center gap-1">
                    <i className="ri-arrow-left-line"></i> Back
                </button>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-jost">
                Create an account
            </h2>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition text-gray-700 placeholder-gray-400 italic"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition text-gray-700 placeholder-gray-400 italic"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password*"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition text-gray-700 placeholder-gray-400 italic"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-orange hover:bg-[#e07a46] text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-70 shadow-md"
                    >
                        {loading ? 'Sign Up' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Scrollable Container */}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <div
                    className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-[90%] sm:max-w-md animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                    >
                        <i className="ri-close-line text-2xl"></i>
                    </button>

                    {/* Banner Image - Only ensure it exists in public folder */}
                    {/* Banner Image */}
                    <div className="w-full flex justify-center pt-8 px-6 md:px-8 pb-0">
                        <img src="/login_call_banner.png" alt="Welcome" className="w-40 md:w-48 h-auto object-contain mx-auto" />
                    </div>

                    {view === 'login' && renderLoginView()}
                    {view === 'signup' && renderSignupView()}
                </div>
            </div>
        </div>
    );
}

function ValidationItem({ label, valid }: { label: string, valid: boolean }) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <i className={`text-lg ${valid ? 'ri-check-line text-green-500' : 'ri-close-line text-red-500'}`}></i>
            <span className={valid ? 'text-gray-600' : 'text-gray-500'}>{label}</span>
        </div>
    );
}

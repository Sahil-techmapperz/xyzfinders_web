'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: 'login' | 'signup';
}

type AuthView = 'selection' | 'email_login' | 'email_signup';

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
    const router = useRouter();
    const [view, setView] = useState<AuthView>('selection');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Initial view handler
    useEffect(() => {
        if (isOpen) {
            setView('selection');
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
                    phone: '0000000000', // Placeholder as required by API currently, or make optional in API
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

    const handleFacebookLogin = () => {
        window.location.href = '/api/auth/facebook?returnUrl=' + encodeURIComponent(window.location.pathname);
    };

    const handleAppleLogin = () => {
        window.location.href = '/api/auth/apple?returnUrl=' + encodeURIComponent(window.location.pathname);
    };

    // View Components
    const renderSelectionView = () => (
        <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-jost">
                Log in to call the seller
            </h2>

            <div className="space-y-3">
                <button onClick={handleFacebookLogin} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition relative group">
                    {/* Facebook Icon Placeholder */}
                    <div className="w-6 h-6 text-blue-600 bg-transparent flex items-center justify-center text-xl">
                        <i className="ri-facebook-circle-fill"></i>
                    </div>
                    <span className="font-semibold text-gray-700">Continue with Facebook</span>
                </button>

                <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition relative group">
                    {/* Google Icon */}
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className="font-semibold text-gray-700">Continue with Google</span>
                </button>

                <button onClick={handleAppleLogin} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition relative group">
                    {/* Apple Icon */}
                    <div className="w-5 h-5 text-black flex items-center justify-center text-xl">
                        <i className="ri-apple-fill"></i>
                    </div>
                    <span className="font-semibold text-gray-700">Continue with Apple</span>
                </button>

                <button onClick={() => setView('email_login')} className="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition relative group">
                    <div className="w-5 h-5 text-red-500 flex items-center justify-center text-xl">
                        <i className="ri-mail-fill"></i>
                    </div>
                    <span className="font-semibold text-gray-700">Continue with Email</span>
                </button>
            </div>

            <div className="mt-8 text-center">
                <p className="text-brand-orange font-semibold cursor-pointer hover:underline" onClick={() => setView('email_signup')}>
                    Don't have an account? Create one
                </p>

                <p className="mt-6 text-xs text-gray-400 leading-relaxed">
                    By signing up I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                </p>
            </div>
        </div>
    );

    const renderLoginView = () => (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <button onClick={() => setView('selection')} className="text-2xl text-gray-400 hover:text-gray-600">
                    <i className="ri-arrow-left-line"></i>
                </button>
                {/* Close button handles via parent, but visual placeholder if needed */}
                <div className="w-6"></div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 font-jost">
                Log in with your email
            </h2>

            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                    </button>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-200 hover:bg-brand-orange hover:text-white text-gray-700 font-bold py-3.5 rounded-lg transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </div>

                <div className="text-center pt-2">
                    <button type="button" className="text-red-500 font-bold text-sm hover:underline">
                        Forgot your password?
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400 leading-relaxed">
                    By signing up I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                </div>
            </form>
        </div>
    );

    const renderSignupView = () => (
        <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => setView('selection')} className="text-2xl text-gray-400 hover:text-gray-600">
                    <i className="ri-arrow-left-line"></i>
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
                        placeholder="First Name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <i className={showPassword ? "ri-eye-line" : "ri-eye-off-line"}></i>
                    </button>
                </div>

                {/* Password Validation Checklist (Visual only for now matching UI) */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <ValidationItem label="At least 7 characters long" valid={password.length >= 7} />
                    <ValidationItem label="One upper and one lower case letter" valid={/[a-z]/.test(password) && /[A-Z]/.test(password)} />
                    <ValidationItem label="Must contain a number" valid={/\d/.test(password)} />
                    <ValidationItem label="At least one special character" valid={/[!@#$%^&*(),.?":{}|<>]/.test(password)} />
                    <ValidationItem label="Must not include your name" valid={name ? !password.toLowerCase().includes(name.toLowerCase()) : true} />
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-200 hover:bg-brand-orange hover:text-white text-gray-700 font-bold py-3.5 rounded-lg transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </div>

                <div className="mt-6 text-center text-xs text-gray-400 leading-relaxed">
                    By signing up I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
                </div>
            </form>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>

                {view === 'selection' && renderSelectionView()}
                {view === 'email_login' && renderLoginView()}
                {view === 'email_signup' && renderSignupView()}
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

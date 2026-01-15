'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Subscribing email:', email);
        setEmail('');
    };

    return (
        <footer className="bg-[#003B3A] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 justify-between">
                    {/* Column 1: Brand & Subscribe */}
                    <div className="lg:col-span-2 lg:w-fit">
                        <Link href="/" className="inline-block bg-white p-2 rounded mb-6">
                            <img src="/logo.png" alt="XYZFinders" className="h-10 w-auto" />
                        </Link>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            We have Expertise in building scalable high performance e-commerce application
                        </p>

                        <h3 className="text-xl font-bold mb-4">We are Ready to Help.</h3>

                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full bg-white text-gray-800 rounded px-4 py-3 focus:outline-none pr-32"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1 bottom-1 bg-[#FF8C42] hover:bg-[#E67026] text-white font-bold px-6 rounded transition-colors uppercase text-sm flex items-center justify-center"
                            >
                                Subscribe
                            </button>
                        </form>

                        <div className="mt-8">
                            <h4 className="text-lg font-bold mb-4">Follow Us on :-</h4>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded bg-gradient-to-br from-pink-500 to-yellow-500 flex items-center justify-center text-white hover:opacity-90 transition"
                                >
                                    <i className="ri-instagram-line text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded bg-black flex items-center justify-center text-white hover:opacity-90 transition"
                                >
                                    <i className="ri-twitter-x-fill text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center text-white hover:opacity-90 transition"
                                >
                                    <i className="ri-linkedin-fill text-lg"></i>
                                </a>
                                <a
                                    href="#"
                                    className="w-9 h-9 rounded bg-blue-500 flex items-center justify-center text-white hover:opacity-90 transition"
                                >
                                    <i className="ri-facebook-fill text-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 flex justify-between">
                        {/* Column 2: Information */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Information</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>
                                    <Link href="/about" className="hover:text-white transition">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-white transition">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/advertising" className="hover:text-white transition">
                                        Advertising
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="hover:text-white transition">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="hover:text-white transition">
                                        Term & Conditions
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Support */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Support</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>
                                    <Link href="/account" className="hover:text-white transition">
                                        Your Account
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/returns" className="hover:text-white transition">
                                        Return Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/purchase-history" className="hover:text-white transition">
                                        Purchase History
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/advertise" className="hover:text-white transition">
                                        Advertise your product
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/sale-product" className="hover:text-white transition">
                                        Sale Product
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: Quick Links */}
                        <div>
                            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>
                                    <Link href="/account" className="hover:text-white transition">
                                        My Accounts
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cart" className="hover:text-white transition">
                                        Shopping Cart
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/wishlist" className="hover:text-white transition">
                                        Wishlists
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/order-history" className="hover:text-white transition">
                                        Order History
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/payment-history" className="hover:text-white transition">
                                        Payment History
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>@ Copyrights 2026. All Rights Reserved XYZFinder</p>
                    <p>Design and Development by - Techmapperz</p>
                </div>
            </div>
        </footer>
    );
}

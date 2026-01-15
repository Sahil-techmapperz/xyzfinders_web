"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        user_type: "buyer",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || "Registration failed");
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFCF3] p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
                <h1 className="text-2xl font-bold text-[#005251] mb-6 text-center">
                    Create Account
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                            value={formData.phone}
                            onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                                value={formData.password_confirmation}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password_confirmation: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Account Type
                        </label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                            value={formData.user_type}
                            onChange={(e) =>
                                setFormData({ ...formData, user_type: e.target.value })
                            }
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FE8B53] text-white py-2 rounded-lg font-bold hover:bg-[#e67a45] transition disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#005251] font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

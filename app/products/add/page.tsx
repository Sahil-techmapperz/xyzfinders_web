"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        original_price: "",
        condition: "used",
        category_id: "1", // Default to 1 for testing
        location_id: "1", // Default to 1 for testing
    });

    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [myProducts, setMyProducts] = useState<any[]>([]);

    const fetchMyProducts = async (authToken: string) => {
        try {
            const res = await fetch("/api/users/my-products", {
                headers: { "Authorization": `Bearer ${authToken}` }
            });
            const data = await res.json();
            if (data.success) {
                setMyProducts(data.data);
            }
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
            fetchMyProducts(storedToken);
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        if (!token) return;

        try {
            // 1. Create Product
            const productRes = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price), // Ensure price is number
                    original_price: formData.original_price ? parseFloat(formData.original_price) : null
                }),
            });

            const productData = await productRes.json();

            if (!productData.success) {
                throw new Error(productData.message || "Failed to create product");
            }

            const productId = productData.data.id;

            // 2. Upload Image (if selected)
            if (file) {
                const imageFormData = new FormData();
                imageFormData.append("product_id", productId);
                imageFormData.append("is_primary", "true"); // First image is primary
                imageFormData.append("image0", file);

                const uploadRes = await fetch("/api/upload/product-images", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: imageFormData,
                });

                const uploadData = await uploadRes.json();
                if (!uploadData.success) {
                    console.error("Image upload failed:", uploadData.message);
                    // Not throwing here to still show product success, but warn user
                    setError("Product created but image upload failed: " + uploadData.message);
                    setLoading(false);
                    return;
                }
            }

            setSuccess("Product created successfully!");
            // Reset form
            setFormData({
                title: "",
                description: "",
                price: "",
                original_price: "",
                condition: "used",
                category_id: "1",
                location_id: "1",
            });
            setFile(null);
            // Refresh list
            fetchMyProducts(token);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) return null; // Don't render until checked

    return (
        <div className="min-h-screen py-10 bg-[#FFFCF3] px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <h1 className="text-2xl font-bold text-[#005251] mb-6 text-center">
                        Sell Product
                    </h1>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition h-24"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                                    value={formData.original_price}
                                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                            <select
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#005251] focus:border-transparent outline-none transition"
                                value={formData.condition}
                                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                            >
                                <option value="new">New</option>
                                <option value="like_new">Like New</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="poor">Poor</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#005251]/10 file:text-[#005251] hover:file:bg-[#005251]/20 cursor-pointer"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            />
                        </div>

                        {/* Hidden/Default inputs for now */}
                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                            <div>Category ID: {formData.category_id}</div>
                            <div>Location ID: {formData.location_id}</div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#005251] text-white py-2 rounded-lg font-bold hover:bg-[#003d3c] transition disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Post Product"}
                        </button>
                    </form>
                </div>

                {/* Products List Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-[#005251] mb-6">
                        Your Products
                    </h2>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[600px]">
                        {myProducts.length === 0 ? (
                            <div className="text-gray-500 text-center py-10">
                                No products listed yet.
                            </div>
                        ) : (
                            myProducts.map((product) => (
                                <div key={product.id} className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition bg-gray-50">
                                    <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden shrink-0">
                                        <img
                                            src={product.primary_image_id
                                                ? `/api/images/product/${product.primary_image_id}`
                                                : "/placeholder.png"}
                                            alt={product.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-bold text-brand-orange">₹{product.price}</span>
                                            {product.original_price && (
                                                <span className="text-xs text-gray-400 line-through">₹{product.original_price}</span>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center mt-2 text-xs">
                                            <span className={`px-2 py-0.5 rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {product.status}
                                            </span>
                                            <span className="text-gray-400">
                                                {new Date(product.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

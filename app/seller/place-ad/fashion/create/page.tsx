"use client";

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/shared/ImageUpload';
import ProductPreview from '@/components/shared/ProductPreview';

function FashionCreateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');
    const isEditMode = !!editId;

    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        phone: '',
        price: '',
        description: '',
        category: '',
        size: '',
        color: '',
        material: '',
        brand: '',
        condition: '',
        city: '',
        state: '',
        landmark: '',
        pincode: '',
        termsAccepted: false
    });
    const [images, setImages] = useState<string[]>([]);
    const [charCount, setCharCount] = useState(0);
    const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
    const maxChars = 10000;

    useEffect(() => {
        if (isEditMode && editId) {
            fetchProductDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editId]); // Only depend on editId

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setCategories(data.data || []);
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/seller/products/${editId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                const product = data.data;

                console.log('Loaded product data:', product);
                console.log('Product attributes:', product.product_attributes);
                console.log('===== DETAIL FIELDS FROM PRODUCT_ATTRIBUTES =====');
                console.log('Size:', product.size);
                console.log('Color:', product.color);
                console.log('Material:', product.material);
                console.log('Brand:', product.brand);
                console.log('Condition:', product.condition);
                console.log('Phone:', product.phone);
                console.log('===== END DETAIL FIELDS =====');

                console.log('Terms:', product.termsAccepted);

                // Check if category matches current form (Fashion)
                // Map category names to their respective routes
                const categoryRoutes: Record<string, string> = {
                    'Fashion': 'fashion',
                    'Mobile & Tablet': 'mobiles',
                    'Mobiles': 'mobiles',
                    'Automobiles': 'automobiles',
                    'Real Estate': 'real-estate',
                    'Electronics': 'gadgets',
                    'Gadgets & Electronics': 'gadgets',
                    'Furniture': 'furniture',
                    'Furniture & Appliance': 'furniture',
                    'Pets': 'pets',
                    'Pets & Animals Accessories': 'pets',
                    'Education': 'education',
                    'Learning & Education': 'education',
                    'Services': 'services',
                    'Events': 'events',
                    'Local Events': 'events',
                    'Jobs': 'jobs',
                    "Job's": 'jobs'
                };

                const currentCategory = product.category_name || product.category;
                const targetRoute = categoryRoutes[currentCategory];

                if (targetRoute && targetRoute !== 'fashion') {
                    toast('Redirecting to correct category form...', { icon: '🔄' });
                    router.push(`/seller/place-ad/${targetRoute}/create?edit=${editId}`);
                    return;
                }

                // The API now returns product_attributes merged into the response
                // Parse attributes
                let attrs: any = {};
                try {
                    attrs = typeof product.product_attributes === 'string'
                        ? JSON.parse(product.product_attributes)
                        : product.product_attributes || {};
                } catch (e) {
                    console.error("Error parsing attributes", e);
                }
                const specs = attrs.specs || {};

                setFormData({
                    title: product.title || '',
                    phone: product.phone || '',
                    price: product.price?.toString() || '',
                    description: product.description || '',
                    category: product.category || '',
                    size: product.size || specs.size || '',
                    color: product.color || specs.color || '',
                    material: product.material || specs.material || '',
                    brand: product.brand || attrs.brand || '',
                    condition: product.condition || specs.condition || '',
                    city: product.city_name || '',
                    state: product.state_name || '',
                    landmark: product.location_name || '',
                    pincode: product.postal_code || '',
                    termsAccepted: true
                });
                setImages(product.images || []);
                setCharCount(product.description?.length || 0);

                console.log('Form data set:', {
                    title: product.title,
                    phone: product.phone,
                    category: product.category,
                    size: product.size,
                    color: product.color
                });
            } else {
                toast.error('Failed to load product details');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Error loading product details');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Handle category change redirect
        if (name === 'category') {
            const categoryRoutes: Record<string, string> = {
                'Fashion': 'fashion',
                'Mobile & Tablet': 'mobiles',
                'Mobiles': 'mobiles',
                'Automobiles': 'automobiles',
                'Real Estate': 'real-estate',
                'Electronics': 'gadgets',
                'Gadgets & Electronics': 'gadgets',
                'Furniture': 'furniture',
                'Furniture & Appliance': 'furniture',
                'Pets': 'pets',
                'Pets & Animals Accessories': 'pets',
                'Education': 'education',
                'Learning & Education': 'education',
                'Services': 'services',
                'Events': 'events',
                'Local Events': 'events',
                'Jobs': 'jobs',
                "Job's": 'jobs'
            };

            const targetRoute = categoryRoutes[value];
            if (targetRoute && targetRoute !== 'fashion') {
                const confirmRedirect = window.confirm(`Switching to ${value} category will redirect you to a different form. Continue?`);
                if (confirmRedirect) {
                    const currentUrl = new URL(window.location.href);
                    router.push(`/seller/place-ad/${targetRoute}/create${currentUrl.search}`);
                    return;
                } else {
                    return; // Don't update state if cancelled
                }
            }
        }

        if (name === 'description') {
            if (value.length <= maxChars) {
                setFormData(prev => ({ ...prev, [name]: value }));
                setCharCount(value.length);
            }
        } else if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePillSelect = (field: 'condition', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckbox = () => {
        setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
    };

    const handleSubmit = async () => {
        const requiredFields = ['title', 'phone', 'price', 'description', 'city', 'state', 'pincode'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!formData.termsAccepted) {
            toast.error('Please accept the terms and conditions');
            return;
        }

        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = isEditMode ? `/api/seller/products/${editId}` : '/api/seller/products/create';
            const method = isEditMode ? 'PATCH' : 'POST';

            // Normalize condition value for database
            const normalizeCondition = (value: string) => {
                return value.toLowerCase().replace(/ /g, '_');
            };

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    condition: normalizeCondition(formData.condition),
                    images
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(isEditMode ? 'Listing updated successfully!' : 'Listing created successfully!');
                router.push('/seller/my-ads');
            } else {
                toast.error(data.message || 'Failed to save listing');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Failed to save listing');
        } finally {
            setLoading(false);
        }
    };

    const conditionOptions = ['New', 'Like New', 'Good', 'Fair'];


    const steps = [
        { number: 1, title: 'Basic Info', icon: 'ri-information-line' },
        { number: 2, title: 'Details', icon: 'ri-list-check' },
        { number: 3, title: 'Images', icon: 'ri-image-line' },
        { number: 4, title: 'Location', icon: 'ri-map-pin-line' },
    ];


    return (
        <div className="min-h-screen font-jost bg-linear-to-br from-fuchsia-50 via-white to-pink-50">
            {/* Same JSX as before, just ensuring we are inside the component */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto px-4 py-4 max-w-5xl">
                    <div className="flex items-center justify-between">
                        <Link href={isEditMode ? "/seller/my-ads" : "/seller/place-ad"} className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-orange transition">
                            <i className="ri-arrow-left-line text-xl"></i>
                            <span className="font-medium">Back</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <i className="ri-shirt-line text-2xl text-brand-orange"></i>
                            <span className="font-bold text-gray-900">{isEditMode ? 'Edit Ad' : 'Fashion & Lifestyle'}</span>
                        </div>
                        <div className="w-16"></div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-12">
                    {/* Steps indicator - simplified for brevity in this replace block if unchanged, 
                         but since I need to return the full JSX, I must include it. 
                         Wait, I can't easily reproduce the whole JSX blindly. 
                         Let's just target the top and bottom of the component.
                     */}
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= step.number
                                        ? 'bg-linear-to-br from-brand-orange to-orange-600 text-white shadow-lg scale-110'
                                        : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        <i className={step.icon}></i>
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${currentStep >= step.number ? 'text-brand-orange' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${currentStep > step.number ? 'bg-brand-orange' : 'bg-gray-200'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-information-line text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <i className="ri-price-tag-3-line text-brand-orange"></i>
                                            Title*
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., Designer Saree, Men's Leather Jacket"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                                <i className="ri-folder-3-line text-brand-orange"></i>
                                                Category*
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            >
                                                <option value="">Select category</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.name}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                                <i className="ri-money-rupee-circle-line text-brand-orange"></i>
                                                Price*
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                    placeholder="999"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <i className="ri-phone-line text-brand-orange"></i>
                                            Contact Number*
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <i className="ri-file-text-line text-brand-orange"></i>
                                            Description*
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition resize-none"
                                            placeholder="Describe the item, fabric details, size chart, etc..."
                                        ></textarea>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-400">Be detailed to attract more buyers</span>
                                            <span className="text-sm text-gray-400">{charCount}/{maxChars}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="mt-8 w-full bg-linear-to-r from-brand-orange to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    Continue to Details
                                    <i className="ri-arrow-right-line text-xl"></i>
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-list-check text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Item Details</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Size (Optional)</label>
                                            <input
                                                type="text"
                                                name="size"
                                                value={formData.size}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., M, L, XL, UK 8"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Color (Optional)</label>
                                            <input
                                                type="text"
                                                name="color"
                                                value={formData.color}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Navy Blue, Red"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Material (Optional)</label>
                                            <input
                                                type="text"
                                                name="material"
                                                value={formData.material}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Cotton, Silk, Leather"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Brand (Optional)</label>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Zara, H&M"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-3">Condition*</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {conditionOptions.map(option => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => handlePillSelect('condition', option)}
                                                    className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all ${formData.condition === option
                                                        ? 'bg-linear-to-r from-brand-orange to-orange-600 text-white border-brand-orange shadow-md'
                                                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange hover:shadow'
                                                        }`}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex-1 bg-linear-to-r from-brand-orange to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
                                    >
                                        Continue
                                        <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-image-line text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Images</h2>
                                </div>

                                <div className="mb-4 p-4 bg-fuchsia-50 rounded-xl border border-fuchsia-200">
                                    <div className="flex items-start gap-3">
                                        <i className="ri-lightbulb-line text-fuchsia-600 text-xl mt-0.5"></i>
                                        <div>
                                            <h4 className="font-semibold text-fuchsia-900 mb-1">Tips for fashion listings</h4>
                                            <ul className="text-sm text-fuchsia-700 space-y-1">
                                                <li>• Use a mannequin or model if possible</li>
                                                <li>• Show close-ups of the fabric and pattern</li>
                                                <li>• Include photos of tags or labels</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <ImageUpload
                                    onImagesChange={setImages}
                                    maxImages={5}
                                    maxSizeMB={5}
                                    initialImages={images}
                                />

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(4)}
                                        className="flex-1 bg-linear-to-r from-brand-orange to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
                                    >
                                        Continue
                                        <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-map-pin-line text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">City*</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Delhi"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">State*</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Delhi"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Pin Code*</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., 110024"
                                            maxLength={6}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Area / Locality (Optional)</label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={formData.landmark}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., Lajpat Nagar"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.termsAccepted}
                                                onChange={handleCheckbox}
                                                className="mt-1 w-5 h-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                                            />
                                            <span className="text-sm text-gray-600 leading-relaxed">
                                                I confirm that the information provided is accurate and complete. I agree to the{' '}
                                                <Link href="/terms" className="text-brand-orange underline hover:text-orange-700">
                                                    Terms & Conditions
                                                </Link>
                                            </span>
                                        </label>
                                        <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
                                            <i className="ri-time-line"></i>
                                            Your ad will be active for 15 days and automatically deactivated after
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <i className="ri-loader-4-line animate-spin"></i>
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-check-line text-xl"></i>
                                                {isEditMode ? 'Update Listing' : 'Publish Listing'}
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => setShowPreview(true)}
                                        className="w-full bg-white text-gray-700 font-bold py-4 rounded-xl border-2 border-gray-100 hover:border-brand-orange hover:text-brand-orange transition-all flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-eye-line text-xl"></i>
                                        Preview Your Ad
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Modal */}
                <ProductPreview
                    isOpen={showPreview}
                    onClose={() => setShowPreview(false)}
                    data={formData}
                    images={images}
                    category="Fashion & Lifestyle"
                />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default function FashionCreatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FashionCreateForm />
        </Suspense>
    );
}

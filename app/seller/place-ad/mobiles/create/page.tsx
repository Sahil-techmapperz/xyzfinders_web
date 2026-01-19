"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function MobilesCreatePage() {
    const [formData, setFormData] = useState({
        title: '',
        phone: '',
        price: '',
        description: '',
        brand: '',
        model: '',
        storage: '',
        ram: '',
        condition: '',
        warranty: '',
        city: '',
        state: '',
        landmark: '',
        accessories: {
            box: false,
            charger: false,
            earphones: false,
            bill: false
        },
        termsAccepted: false
    });

    const [charCount, setCharCount] = useState(0);
    const maxChars = 10000;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'description') {
            if (value.length <= maxChars) {
                setFormData(prev => ({ ...prev, [name]: value }));
                setCharCount(value.length);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePillSelect = (field: 'storage' | 'ram' | 'condition' | 'warranty', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAccessoryToggle = (accessory: keyof typeof formData.accessories) => {
        setFormData(prev => ({
            ...prev,
            accessories: {
                ...prev.accessories,
                [accessory]: !prev.accessories[accessory]
            }
        }));
    };

    const handleCheckbox = () => {
        setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
    };

    const handleSubmit = () => {
        const requiredFields = ['title', 'phone', 'price', 'description', 'brand', 'model', 'storage', 'ram', 'condition', 'warranty', 'city', 'state'];

        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            alert(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        console.log('Mobile listing submitted:', formData);
        alert('Form submitted successfully! Check console for data.');
    };

    const storageOptions = ['16GB', '32GB', '64GB', '128GB', '256GB', '512GB', '1TB'];
    const ramOptions = ['2GB', '3GB', '4GB', '6GB', '8GB', '12GB', '16GB+'];
    const conditionOptions = ['New', 'Like New', 'Good', 'Fair'];
    const warrantyOptions = ['In Warranty', 'Out of Warranty'];

    return (
        <div className="bg-[#FFFBF7] min-h-screen font-jost pb-16">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
                    <Link href="/seller/place-ad" className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition">
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span className="font-medium">Back</span>
                    </Link>
                    <img src="/logo.png" alt="XYZ Finders" className="h-8 md:h-10 object-contain" />
                    <div className="w-20"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">List Your Mobile</h1>
                    <p className="text-gray-600 text-sm md:text-base">Provide detailed specifications to attract buyers</p>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-8 font-medium flex-wrap">
                    <i className="ri-home-4-fill text-brand-orange"></i>
                    <span>Place Ad</span>
                    <i className="ri-arrow-right-s-line text-brand-orange"></i>
                    <span className="text-brand-orange">Mobiles & Tablets</span>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Title*</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., iPhone 14 Pro Max 256GB"
                        />
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Brand*</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., Apple, Samsung, OnePlus"
                        />
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Model*</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., iPhone 14 Pro Max, Galaxy S23 Ultra"
                        />
                    </div>

                    {/* Storage */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Storage*</label>
                        <div className="flex flex-wrap gap-3">
                            {storageOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('storage', option)}
                                    className={`px-5 py-2 rounded-full border-2 font-medium transition ${formData.storage === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RAM */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">RAM*</label>
                        <div className="flex flex-wrap gap-3">
                            {ramOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('ram', option)}
                                    className={`px-5 py-2 rounded-full border-2 font-medium transition ${formData.ram === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Condition*</label>
                        <div className="flex flex-wrap gap-3">
                            {conditionOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('condition', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.condition === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Warranty */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Warranty*</label>
                        <div className="flex flex-wrap gap-3">
                            {warrantyOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('warranty', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.warranty === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Accessories */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Accessories Included</label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { key: 'box', label: 'Box' },
                                { key: 'charger', label: 'Charger' },
                                { key: 'earphones', label: 'Earphones' },
                                { key: 'bill', label: 'Bill' }
                            ].map(acc => (
                                <label key={acc.key} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.accessories[acc.key as keyof typeof formData.accessories]}
                                        onChange={() => handleAccessoryToggle(acc.key as keyof typeof formData.accessories)}
                                        className="w-5 h-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                                    />
                                    <span className="text-gray-700">{acc.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price*</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="Enter price in ₹"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Description*</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition resize-none"
                            placeholder="Describe the device condition, battery health, any scratches..."
                        ></textarea>
                        <div className="text-right text-sm text-gray-400 mt-1">{charCount}/{maxChars}</div>
                    </div>

                    {/* Location Section */}
                    <div className="pt-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Location*</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">City*</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                    placeholder="Enter city"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">State*</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                    placeholder="Enter state"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                placeholder="Nearby landmark"
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Phone Number*</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="pt-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-brand-orange transition cursor-pointer">
                            <i className="ri-image-add-line text-4xl text-brand-orange mb-3"></i>
                            <p className="text-gray-600 font-medium">Upload images or Drop a file</p>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="pt-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.termsAccepted}
                                onChange={handleCheckbox}
                                className="mt-1 w-5 h-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                            />
                            <span className="text-sm text-gray-600 leading-relaxed">
                                By proceeding, I confirm that I have reviewed the information provided above and confirm that such information is complete and accurate. <Link href="#" className="text-brand-orange underline">Terms & Conditions</Link>
                            </span>
                        </label>
                        <p className="text-xs text-gray-400 mt-4">After 15 days ad will be automatically deactivated</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-brand-orange text-white font-bold py-4 rounded-lg hover:bg-orange-600 transition shadow-lg"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

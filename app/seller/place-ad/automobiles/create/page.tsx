"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function AutomobilesCreatePage() {
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        phone: '',
        price: '',
        description: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        fuelType: '',
        transmission: '',
        owners: '',
        color: '',
        registrationNumber: '',
        city: '',
        state: '',
        landmark: '',
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

    const handlePillSelect = (field: 'fuelType' | 'transmission' | 'owners', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckbox = () => {
        setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
    };

    const handleSubmit = () => {
        const requiredFields = ['title', 'phone', 'price', 'description', 'make', 'model', 'year', 'mileage', 'fuelType', 'transmission', 'owners', 'city', 'state'];

        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            alert(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        console.log('Automobile listing submitted:', formData);
        alert('Form submitted successfully! Check console for data.');
    };

    const fuelTypeOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
    const transmissionOptions = ['Manual', 'Automatic'];
    const ownersOptions = ['1st', '2nd', '3rd', '4+'];

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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">List Your Automobile</h1>
                    <p className="text-gray-600 text-sm md:text-base">Provide detailed information to attract potential buyers</p>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-8 font-medium flex-wrap">
                    <i className="ri-home-4-fill text-brand-orange"></i>
                    <span>Place Ad</span>
                    <i className="ri-arrow-right-s-line text-brand-orange"></i>
                    <span className="text-brand-orange">Automobiles</span>
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
                            placeholder="e.g., Honda City 2020 VX Model"
                        />
                    </div>

                    {/* Make/Brand */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Make/Brand*</label>
                        <input
                            type="text"
                            name="make"
                            value={formData.make}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., Honda, Toyota, BMW"
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
                            placeholder="e.g., City VX, Fortuner, X5"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Year*</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., 2020"
                        />
                    </div>

                    {/* Kilometers Driven */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Kilometers Driven*</label>
                        <input
                            type="number"
                            name="mileage"
                            value={formData.mileage}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., 45000"
                        />
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

                    {/* Fuel Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Fuel Type*</label>
                        <div className="flex flex-wrap gap-3">
                            {fuelTypeOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('fuelType', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.fuelType === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Transmission*</label>
                        <div className="flex flex-wrap gap-3">
                            {transmissionOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('transmission', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.transmission === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Owners */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">No. of Owners*</label>
                        <div className="flex flex-wrap gap-3">
                            {ownersOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('owners', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.owners === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., White, Black, Silver"
                        />
                    </div>

                    {/* Registration Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Registration Number</label>
                        <input
                            type="text"
                            name="registrationNumber"
                            value={formData.registrationNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., MH12AB1234"
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
                            placeholder="Describe the condition, features, service history..."
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

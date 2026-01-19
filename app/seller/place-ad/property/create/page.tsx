"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function PropertyCreatePage() {
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        phone: '',
        pricePerMonth: '',
        description: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        roomType: '',
        maintenanceFees: '',
        buildingName: '',
        landmark: '',
        fullAddress: '',
        city: '',
        pincode: '',
        state: '',
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

    const handlePillSelect = (field: 'bedrooms' | 'bathrooms' | 'roomType', value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckbox = () => {
        setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
    };

    const handleSubmit = () => {
        // Validation
        const requiredFields = ['title', 'phone', 'pricePerMonth', 'description', 'size', 'bedrooms', 'bathrooms', 'roomType', 'maintenanceFees', 'buildingName', 'landmark', 'fullAddress', 'city', 'pincode', 'state'];

        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            alert(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!formData.termsAccepted) {
            alert('Please accept the terms and conditions');
            return;
        }

        console.log('Form submitted:', formData);
        alert('Form submitted successfully! Check console for data.');
    };

    const bedroomOptions = ['1', '2', '3', '4', '5', '6', '7', '8+'];
    const bathroomOptions = ['1', '2', '3', '+4'];
    const roomTypeOptions = ['Unfurnished', 'Semi-furnished', 'Full-furnished'];

    return (
        <div className="bg-[#FFFBF7] min-h-screen font-jost pb-16">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
                    <Link href="/seller/place-ad/property" className="flex items-center gap-2 text-gray-600 hover:text-brand-orange transition">
                        <i className="ri-arrow-left-line text-xl"></i>
                        <span className="font-medium">Back</span>
                    </Link>
                    <img src="/logo.png" alt="XYZ Finders" className="h-8 md:h-10 object-contain" />
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Title Section */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">You are almost there!</h1>
                    <p className="text-gray-600 text-sm md:text-base">Include as much detail and picture as possible, and set the right price!</p>
                </div>

                {/* Breadcrumb */}
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-8 font-medium flex-wrap">
                    <i className="ri-home-4-fill text-brand-orange"></i>
                    <span>Property for sale</span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span>Residential</span>
                    <i className="ri-arrow-right-s-line"></i>
                    <span>Landlord</span>
                    <i className="ri-arrow-right-s-line text-brand-orange"></i>
                    <span className="text-brand-orange">Apartment</span>
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
                            placeholder="Enter property title"
                        />
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

                    {/* Price Per Month */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price Per Month*</label>
                        <input
                            type="number"
                            name="pricePerMonth"
                            value={formData.pricePerMonth}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="Enter price"
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
                            placeholder="Enter description"
                        ></textarea>
                        <div className="text-right text-sm text-gray-400 mt-1">{charCount}/{maxChars}</div>
                    </div>

                    {/* Size */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Size*</label>
                        <input
                            type="text"
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="e.g., 1200 sq ft"
                        />
                    </div>

                    {/* Bedrooms */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Bedrooms*</label>
                        <div className="flex flex-wrap gap-3">
                            {bedroomOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('bedrooms', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.bedrooms === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Bathrooms*</label>
                        <div className="flex flex-wrap gap-3">
                            {bathroomOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('bathrooms', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.bathrooms === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Room Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-3">Room Type*</label>
                        <div className="flex flex-wrap gap-3">
                            {roomTypeOptions.map(option => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handlePillSelect('roomType', option)}
                                    className={`px-6 py-2 rounded-full border-2 font-medium transition ${formData.roomType === option
                                            ? 'bg-brand-orange text-white border-brand-orange'
                                            : 'bg-white text-gray-700 border-gray-200 hover:border-brand-orange'
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Maintenance Fees */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Maintenance Fees*</label>
                        <input
                            type="text"
                            name="maintenanceFees"
                            value={formData.maintenanceFees}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                            placeholder="Enter maintenance fees"
                        />
                    </div>

                    {/* Location Section */}
                    <div className="pt-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Select Location*</h2>

                        {/* Building Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Building Name*</label>
                            <input
                                type="text"
                                name="buildingName"
                                value={formData.buildingName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                placeholder="Enter building name"
                            />
                        </div>

                        {/* Landmark */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Landmark*</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                placeholder="Enter landmark"
                            />
                        </div>

                        {/* Full Address */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Full Address*</label>
                            <input
                                type="text"
                                name="fullAddress"
                                value={formData.fullAddress}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                placeholder="Enter full address"
                            />
                        </div>

                        {/* City & Pincode */}
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
                                <label className="block text-gray-700 font-medium mb-2">Pincode*</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition"
                                    placeholder="Enter pincode"
                                />
                            </div>
                        </div>

                        {/* State */}
                        <div className="mb-4">
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
                        <p className="text-xs text-gray-400 mt-4">After 15 days add will be automatic deactivated, if there will no</p>
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

"use client";

import Link from 'next/link';

export default function AutomobileDetail() {
    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost">

            {/* Top Navigation / Breadcrumb - Optional based on layout, keeping it simple for now */}

            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* 1. Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
                    {/* Main Image */}
                    <div className="md:col-span-2 relative h-full rounded-3xl overflow-hidden shadow-lg group">
                        <img
                            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                            alt="Audi Q3 Front"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Side Images */}
                    <div className="md:col-span-1 flex flex-col gap-4 h-full">
                        <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg group">
                            <img
                                src="https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=1974&auto=format&fit=crop"
                                alt="Audi Q3 Interior Trunk"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative flex-1 rounded-3xl overflow-hidden shadow-lg group">
                            <img
                                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1974&auto=format&fit=crop"
                                alt="Audi Q3 Interior Dashboard"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2">

                        {/* Header Info */}
                        <div className="mb-8">
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-3xl font-bold text-gray-900">Audi Q3 35 TFSI</h1>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm">
                                        <i className="ri-heart-fill"></i>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                            </p>

                            <div className="flex items-center gap-6 text-sm text-gray-600 font-medium mb-4">
                                <div className="flex items-center gap-2">
                                    <i className="ri-calendar-line text-lg"></i>
                                    <span>2016</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ri-dashboard-3-line text-lg"></i>
                                    <span>452,458 Km</span>
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-[#FF2D55]">
                                ₹564,548/
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200 mb-8" />

                        {/* Specifications */}
                        <div className="mb-10">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Specification</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                <SpecRow label="Model" value="2021" />
                                <SpecRow label="Interior Color" value="Yellow" />
                                <SpecRow label="Horsepower" value="25,000" />
                                <SpecRow label="Exterior Color" value="Black" />
                                <SpecRow label="Door's" value="4" />
                                <SpecRow label="Body Type" value="SUV" />
                                <SpecRow label="Fuel Type" value="Petrol" />
                                <SpecRow label="Seater Capacity" value="5" />
                                <SpecRow label="Engine Capacity (cc)" value="1000-1499 cc" />
                                <SpecRow label="Seller Type" value="Dealer" />
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-200 mb-8" />

                        {/* Detailed Description */}
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Audi Q3 35 TFSI 2022 fully loaded with Dealer Warranty</h2>
                            <p className="text-gray-500 text-sm mb-4">Audi Q3 35 TFSI</p>

                            <ul className="text-gray-600 text-sm space-y-2 mb-6 list-disc list-inside marker:text-gray-400">
                                <li>Mileage - 72530 Km</li>
                                <li>Warranty: 1-Year Warranty.</li>
                                <li>Engine capacity: 1600CC</li>
                            </ul>

                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium text-sm">Cash Price:</span>
                                <span className="text-gray-900 font-bold">564,548/-</span>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">NXT Assurance:</h3>
                                <ul className="text-gray-500 text-sm space-y-1">
                                    <li>- 145 Point Check</li>
                                    <li>- Free Comprehensive Warranty</li>
                                    <li>- 10 Day Exchange no questions asked</li>
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Follow Us on:</h3>
                                <ul className="text-gray-500 text-sm space-y-1">
                                    <li>Facebook: NXTCarsuae</li>
                                    <li>Instagram: NXTCarsuae</li>
                                </ul>
                            </div>

                            {/* Divider line */}
                            <div className="border-t border-gray-200 my-6"></div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-700 font-medium text-sm">Trade-in facility available</p>
                                    <p className="text-gray-500 text-sm">We buy all Makes and models in Cash</p>
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <i className="ri-map-pin-line"></i>
                                        <span>Kundeshwari Rd, Kundeshwari, Kashipur, Uttara...</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-500 text-xs font-medium">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span>Posted 14hr ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
                            <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">Posted By:</p>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                                    {/* Placeholder for Logo */}
                                    <i className="ri-store-2-line text-2xl text-gray-400"></i>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        Yadav Automobiles
                                        <i className="ri-verified-badge-fill text-blue-500"></i>
                                    </h3>
                                    <p className="text-xs text-gray-500">Dealer</p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-400 mb-6 pb-6 border-b border-gray-100">
                                Member Since from December 2023
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[#FFF0F3] text-[#FF2D55] font-bold text-sm hover:bg-[#ffe0e6] transition-colors">
                                    <i className="ri-phone-line"></i>
                                    Call
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[#E3F2FD] text-[#007AFF] font-bold text-sm hover:bg-[#bbdefb] transition-colors">
                                    <i className="ri-message-3-line"></i>
                                    Chats
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Helper Component for Spec Rows
function SpecRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex justify-between items-center py-2">
            <span className="text-gray-500 text-sm font-medium">{label}</span>
            <span className="text-gray-900 text-sm font-bold">{value}</span>
        </div>
    );
}

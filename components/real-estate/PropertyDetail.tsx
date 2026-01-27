"use client";

import { useState } from 'react';
import Link from 'next/link';

// Helper to get mock data (duplicated from listings for now)
const getProperty = (id: string) => {
    // Mock data - in a real app this would fetch from API
    return {
        id: parseInt(id),
        title: "Premium 4BHK Master Room Apartment for Rent in Greater Kailash",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        price: "₹ 11,000",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand 244713, India",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80"
        ],
        specs: {
            type: "Apartment",
            roomType: "Private Room",
            securityDeposit: "25,000",
            attachedBathroom: "Yes",
            balcony: "Yes",
            updated: "25-December-2025",
            tenants: "1 year",
            furnishing: "Semi-furnished"
        },
        amenities: [
            { icon: "ri-wifi-line", name: "Free Wifi" },
            { icon: "ri-tools-line", name: "Maintenance" },
            { icon: "ri-leaf-line", name: "Free Cleaning" },
            { icon: "ri-drop-line", name: "Water Dispenser" },
            { icon: "ri-hotel-bed-line", name: "On Stay" },
            { icon: "ri-tv-line", name: "Smart TV" },
            { icon: "ri-road-map-line", name: "Near Highway" },
        ],
        seller: {
            name: "Ankit Yadav",
            verified: true,
            memberSince: "December 2025",
            avatar: "https://placehold.co/100x100/2196F3/FFFFFF?text=AY"
        },
        mapCoordinates: { lat: 28.6139, lng: 77.2090 } // New Delhi approx
    };
};

export default function PropertyDetail({ id }: { id: string }) {
    const property = getProperty(id);
    const [activeImage, setActiveImage] = useState(0);

    return (
        <section className="container mx-auto px-4 py-8 font-jost">
            {/* 1. Hero Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-8 h-[400px] md:h-[500px]">
                {/* Large Main Image */}
                <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Right Column Images */}
                <div className="flex flex-col gap-2 h-full">
                    <div className="relative h-[250px] overflow-hidden rounded-2xl group cursor-pointer">
                        <img
                            src={property.images[1]}
                            alt={`${property.title} view 2`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="relative h-[250px] overflow-hidden rounded-2xl group cursor-pointer">
                        <img
                            src={property.images[2]}
                            alt={`${property.title} view 3`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                    </div>
                </div>
            </div>

            {/* 2. Main Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">

                {/* Left Content */}
                <div className="lg:col-span-3 text-gray-800">
                    {/* Header: Title & Actions */}
                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight flex-1">
                            {property.title}
                        </h1>
                        <div className="flex gap-2 ml-4">
                            <button className="w-8 h-8 rounded-full bg-red-50 text-[#FF4D4D] flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition">
                                <i className="ri-heart-fill text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition">
                                <i className="ri-share-line text-sm"></i>
                            </button>
                        </div>
                    </div>

                    {/* Description Excerpt */}
                    <p className="text-gray-500 text-[10px] sm:text-xs mb-4 leading-relaxed line-clamp-2">
                        {property.description}
                    </p>

                    {/* Key Attributes Row */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 pb-6 border-b border-gray-100">
                        <div className="font-bold text-xs">
                            {property.specs.roomType}
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                            <i className="ri-map-pin-line"></i>
                            <span className="line-clamp-1">{property.location}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-8">
                        <span className="text-[#FF4D4D] text-2xl font-bold">{property.price}</span>
                        <span className="text-gray-500 text-xs font-medium ml-1">/ Monthly</span>
                    </div>

                    {/* 3. Property Details & Seller Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                        {/* Left: Property Specifications */}
                        <div className="xl:col-span-2">
                            {/* Property Details Table */}
                            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900 mb-6">Property Details</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Type</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Room Type</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.roomType}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Security Deposit</span>
                                        <span className="text-sm font-bold text-gray-900">₹ {property.specs.securityDeposit}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Attached Bathroom</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.attachedBathroom}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Balcony</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.balcony}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Updated</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.updated}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">Lease Period</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.tenants}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-sm text-gray-500">Furnishing</span>
                                        <span className="text-sm font-bold text-gray-900">{property.specs.furnishing}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Seller Card */}
                        <div className="xl:col-span-1">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Property Owner</h3>

                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#FF8A65] to-[#FF7043] flex items-center justify-center text-white text-xl font-bold">
                                            {property.seller.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold text-gray-900">{property.seller.name}</div>
                                            <div className="text-xs text-gray-500">Member since {property.seller.memberSince}</div>
                                        </div>
                                        {property.seller.verified && (
                                            <i className="ri-verified-badge-fill text-green-500 text-xl"></i>
                                        )}
                                    </div>

                                    <button className="w-full bg-[#2196F3] text-white font-bold py-3 rounded-xl hover:bg-[#1976D2] transition-colors mb-3 flex items-center justify-center gap-2">
                                        <i className="ri-chat-3-line"></i>
                                        Chat with Owner
                                    </button>

                                    <button className="w-full bg-[#4CAF50] text-white font-bold py-3 rounded-xl hover:bg-[#45a049] transition-colors flex items-center justify-center gap-2">
                                        <i className="ri-phone-line"></i>
                                        Call Owner
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features / Description Heading */}
                    <div className="mt-10 mb-8">
                        <h3 className="text-sm font-bold text-gray-900 mb-6">Executive Premium master room available for rent in New Delhi</h3>

                        {/* Amenities Circles */}
                        <div className="flex flex-wrap gap-4">
                            {property.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-gray-500 text-sm hover:border-brand-orange hover:text-brand-orange hover:shadow-sm transition bg-white">
                                        <i className={amenity.icon}></i>
                                    </div>
                                    <span className="text-[8px] font-medium text-gray-500 text-center max-w-[50px] leading-tight">
                                        {amenity.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column Spacer - aligned with design having lots of whitespace or potential ad slot */}
                {/* <div className="hidden lg:block lg:col-span-1">
                </div> */}
            </div>

            {/* 4. Map Section */}
            <div className="mb-12">
                <div className="w-full h-[300px] bg-gray-100 rounded-none overflow-hidden relative border-y border-gray-200 mb-6 -mx-4 md:mx-0 md:rounded-xl md:border-0">
                    <iframe
                        width="100%"
                        height="100%"
                        title="map"
                        scrolling="no"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="w-full h-full border-0 filter grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-1">Map View</h2>
                    <p className="text-xs text-gray-500">{property.location}</p>
                </div>
            </div>

            {/* 5. Similar Properties Carousel */}
            <div className="mb-12 relative">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Similar Properties</h2>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                            const container = document.getElementById('similar-properties-carousel');
                            if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                        }}>
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                            const container = document.getElementById('similar-properties-carousel');
                            if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                        }}>
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>

                <div id="similar-properties-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {[
                        { title: "Premium 4BHK Apartment", price: "₹ 95,000", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80", location: "New Sabji Mandi Teacher Colony..." },
                        { title: "Luxury Villa with Pool", price: "₹ 1,50,000", image: "https://images.unsplash.com/photo-1600596542815-225dfc086928?w=500&q=80", location: "Vasant Vihar, New Delhi" },
                        { title: "Modern 3BHK Flat", price: "₹ 45,000", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80", location: "Saket, New Delhi" },
                        { title: "Spacious Studio Apartment", price: "₹ 25,000", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80", location: "Hauz Khas, New Delhi" },
                        { title: "Duplex Penthouse", price: "₹ 1,20,000", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80", location: "Defence Colony, New Delhi" },
                    ].map((prop, i) => (
                        <div key={i} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                            {/* Image */}
                            <div className="relative h-48 bg-gray-100">
                                <img
                                    src={prop.image}
                                    className="w-full h-full object-cover"
                                    alt={prop.title}
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Verified
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h4 className="font-bold text-gray-900 text-sm mb-3 truncate">{prop.title}</h4>

                                {/* Specs */}
                                <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <i className="ri-hotel-bed-fill text-gray-300"></i> 4 Bed
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <i className="ri-restaurant-fill text-gray-300"></i> 1 Kit
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <i className="ri-drop-fill text-gray-300"></i> 2 Bath
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-3">
                                    <i className="ri-map-pin-line"></i>
                                    <span className="truncate">{prop.location}</span>
                                </div>

                                {/* Price */}
                                <div>
                                    <span className="text-[#FF4D4D] text-base font-bold">{prop.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

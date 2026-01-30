"use client";

import Link from 'next/link';

export default function EducationDetail({ id }: { id?: string }) {
    // Mock Data for Education
    const item = {
        title: "Advanced Mathematics & Science Tuition for Class 10 (CBSE/ICSE)",
        price: "₹ 3,500/mo",
        postedTime: "Posted 5hr ago",
        specs: [
            { label: "MODE", value: "Offline / Home" },
            { label: "LEVEL", value: "Class 9-10" },
            { label: "SUBJECT", value: "Maths & Science" },
            { label: "DURATION", value: "Yearly" },
        ],
        details: [
            { label: "Batch Size", value: "Small (Max 5)" },
            { label: "Experience", value: "12 Years" },
            { label: "Trial Class", value: "Available (Free)" },
            { label: "Board", value: "CBSE / ICSE" },
            { label: "Language", value: "English / Hindi" },
            { label: "Location", value: "Dwarka Sector 7, Delhi" },
        ],
        description: `Experienced tutor with over 12 years of teaching experience in Mathematics and Physics for high school students. I focus on conceptual understanding, problem-solving techniques, and exam strategies.

Special attention to weak students. Regular tests and feedback sessions for parents. Small batch size ensures individual attention. I have helped hundreds of students achieve 90%+ in their board exams. Notes and assignments provided.`,
        productSpecs: [
            "- Course : Maths & Science Foundation",
            "- Target Audience : Class 9 & 10 Students",
            "- Mode : Offline (At my center) or Home Tuition",
            "- Batch Timing : Evening 4 PM - 8 PM",
            "- Study Material : Included",
        ],
        seller: {
            name: "Suresh Gupta (M.Sc Maths)",
            verified: true,
            memberSince: "January 2021",
            image: "https://ui-avatars.com/api/?name=Suresh+Gupta&background=1E88E5&color=fff"
        },
        images: [
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
        ]
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image (Left) */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src={item.images[0]}
                            alt="Main View"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Side Images (Right Column, Stacked) */}
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={item.images[1]}
                                alt="Side View 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src={item.images[2]}
                                alt="Side View 2"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Title & Specs ROW */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 uppercase">
                            {item.title}
                        </h1>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition shadow-sm">
                                <i className="ri-heart-fill text-sm"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center hover:bg-gray-200 transition shadow-sm">
                                <i className="ri-share-line text-sm"></i>
                            </button>
                        </div>
                    </div>

                    {/* Specs Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-2xl">
                        {item.specs.map((spec, i) => (
                            <div key={i} className="bg-white border-b-2 border-gray-100 rounded-xl p-3 text-center shadow-sm">
                                <span className="block text-[10px] uppercase font-bold text-gray-800 mb-1">{spec.label}</span>
                                <span className="block text-xs text-gray-500 font-medium">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Price & Posted Time */}
                    <div className="flex items-center gap-4">
                        <span className="text-[#FF2D55] text-2xl font-bold">{item.price}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            {item.postedTime}
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* 3. Main Layout: Details (Left) + Sidebar (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Details */}
                    <div className="xl:col-span-2">

                        {/* Item Details Table */}
                        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-6">Course Details</h2>
                            <div className="space-y-4">
                                {item.details.map((detail, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                                        <span className="text-sm text-gray-500">{detail.label}</span>
                                        <span className="text-sm font-bold text-gray-900">{detail.value || '-'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description & Specs */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">About the Course</h2>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                                {item.description}
                            </p>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-900 mb-3">Key Highlights</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {item.productSpecs.map((spec, i) => (
                                        <li key={i}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Seller & Banner */}
                    <div className="xl:col-span-1 space-y-6">

                        {/* Seller Card */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-1">Posted By:</p>
                                    <div className="flex items-center gap-3">
                                        <img src={item.seller.image} alt={item.seller.name} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 leading-tight">{item.seller.name}</h3>
                                            {item.seller.verified && (
                                                <span className="text-[10px] text-blue-500 flex items-center gap-1">
                                                    <i className="ri-checkbox-circle-fill"></i> Verified Tutor
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 mb-4">Member Since from {item.seller.memberSince}</p>

                            <button className="w-full bg-[#D50000] hover:bg-[#b50000] text-white text-xs font-bold py-2.5 rounded-lg mb-2 flex items-center justify-center gap-2 transition-colors">
                                <i className="ri-phone-fill"></i> Call Tutor
                            </button>
                            <button className="w-full bg-[#0078D4] hover:bg-[#006cbd] text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <i className="ri-chat-3-fill"></i> Chat with Tutor
                            </button>
                        </div>

                        {/* Google Ads Vertical Banner */}
                        <div className="bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px] relative overflow-hidden">
                            <span className="transform -rotate-90 whitespace-nowrap">Google Ads</span>
                        </div>

                    </div>
                </div>

                {/* 4. Similar Properties (Carousel) */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Similar Courses</h2>
                        <div className="flex gap-2">
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => document.getElementById('edu-similar-carousel')?.scrollBy({ left: -300, behavior: 'smooth' })}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => document.getElementById('edu-similar-carousel')?.scrollBy({ left: 300, behavior: 'smooth' })}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="edu-similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "IELTS Coaching", price: "₹ 12,000/-", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "English Spoken Course", price: "₹ 5,000/-", image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop" },
                            { id: 4, title: "Coding Bootcamp", price: "₹ 25,000/-", image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&auto=format&fit=crop&q=60" },
                            { id: 5, title: "Guitar Classes", price: "₹ 2,000/mo", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop" },
                        ].map((course) => (
                            <div key={course.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                <div className="h-48 bg-gray-100 relative">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{course.title}</h3>
                                    <div className="text-[#FF6E40] font-bold text-sm">{course.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

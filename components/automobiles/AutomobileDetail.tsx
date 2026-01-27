"use client";

import Link from 'next/link';

export default function AutomobileDetail({ id }: { id?: string }) {
    // In a real app, use the ID to fetch data. For now, we use fixed mock data matching the image.
    const car = {
        title: "Audi Q3 35 TFSI",
        description: "Audi Q3 35 TFSI 2022 fully loaded with Dealer Warranty",
        price: "₹ 564,548/-",
        year: "2016",
        km: "452,458 Km",
        postedTime: "Posted 14hr ago",
        location: "Kundeshwari Rd, Kundeshwari, Kashipur, Uttarakhand...",
        specs: [
            { label: "Model", value: "2021" },
            { label: "Interior Color", value: "Yellow" },
            { label: "Horsepower", value: "25,000" },
            { label: "Exterior Color", value: "Black" },
            { label: "Door's", value: "4" },
            { label: "Body Type", value: "SUV" },
            { label: "Fuel Type", value: "Petrol" },
            { label: "Seater Capacity", value: "5" },
            { label: "Engine Capacity (cc)", value: "1000-1499 cc" },
            { label: "Seller Type", value: "Dealer" },
        ],
        details: {
            mileage: "72530 Km",
            warranty: "1-Year Warranty",
            engineCapacity: "1600CC"
        },
        assurance: [
            "145 Point Check",
            "Free Comprehensive Warranty",
            "10 Day Exchange no questions asked"
        ],
        socials: {
            facebook: "NXTCarsuae",
            instagram: "NXTCarsuae"
        }
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* 1. Hero Gallery Section - 3 Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image (Left) */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                            alt="Audi Q3 Front"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    {/* Side Images (Right Column, Stacked) */}
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative  h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=1974&auto=format&fit=crop"
                                alt="Audi Q3 Trunk"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative  h-[250px] rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1974&auto=format&fit=crop"
                                alt="Audi Q3 Interior"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Main Layout Code: Details (Left) + Sidebar (Right) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Property Details (span-2) */}
                    <div className="xl:col-span-2">

                        {/* Title & Basic Info */}
                        <div className="mb-8">
                            <div className="flex justify-between items-start mb-4">
                                <h1 className="text-3xl font-bold text-gray-900">{car.title}</h1>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-[#FF2D55] text-white flex items-center justify-center hover:bg-[#e02447] transition-colors shadow-sm">
                                        <i className="ri-heart-fill"></i>
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm">
                                        <i className="ri-share-line"></i>
                                    </button>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-3xl">
                                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                            </p>

                            <div className="flex items-center gap-6 text-gray-700 font-medium mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <i className="ri-calendar-line text-lg text-gray-400"></i>
                                    <span>{car.year}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="ri-dashboard-3-line text-lg text-gray-400"></i>
                                    <span>{car.km}</span>
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-[#FF2D55]">
                                {car.price}
                            </div>
                        </div>

                        <hr className="border-gray-200 my-8" />

                        {/* Specifications Table */}
                        <div className="mb-10">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Specification</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16">
                                {car.specs.map((spec, index) => (
                                    <div key={index} className="flex justify-between items-center py-1">
                                        <span className="text-gray-500 text-sm">{spec.label}</span>
                                        <span className="text-gray-900 font-bold text-sm">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-gray-200 my-8" />

                        {/* Detailed Description */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">{car.description}</h2>
                            <p className="text-gray-500 text-sm mb-6">{car.title}</p>

                            <ul className="space-y-2 mb-8 text-sm text-gray-600">
                                <li>- Mileage - {car.details.mileage}</li>
                                <li>- Warranty: {car.details.warranty}.</li>
                                <li>- Engine capacity {car.details.engineCapacity}</li>
                            </ul>

                            <div className="py-2 border-y border-dashed border-gray-300 mb-8 inline-block">
                                <span className="text-gray-600 text-sm">Cash Price: </span>
                                <span className="text-gray-900 font-bold ml-2">564,548/-</span>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-800 mb-3">NXT Assurance:</h3>
                                <ul className="space-y-2 text-sm text-gray-500">
                                    {car.assurance.map((item, i) => (
                                        <li key={i}>- {item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-800 mb-3">Follow Us on:</h3>
                                <div className="space-y-1 text-sm text-gray-500">
                                    <p>Facebook: {car.socials.facebook}</p>
                                    <p>Instagram: {car.socials.instagram}</p>
                                </div>
                            </div>

                            <hr className="border-gray-200 my-8" />

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-900 font-medium mb-1">Trade-in facility available</p>
                                    <p className="text-gray-500 text-sm">We buy all Makes and models in Cash</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <i className="ri-map-pin-line text-lg"></i>
                                        <span>{car.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-green-500 text-xs font-bold">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span>{car.postedTime}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Seller & Banner (span-1) */}
                    <div className="xl:col-span-1 space-y-8">

                        {/* Seller Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-400 font-medium mb-4">Posted By</p>

                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                                    <img src="https://ui-avatars.com/api/?name=Yadav+Automobiles&background=0D8ABC&color=fff" alt="Seller" className="w-full h-full" />
                                </div>
                                <div>
                                    <h3 className="text-gray-900 font-bold text-base flex items-center gap-1">
                                        Yadav Automobiles
                                        <i className="ri-verified-badge-fill text-blue-500 text-lg"></i>
                                    </h3>
                                    <p className="text-xs text-gray-500">Dealer</p>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-400 mb-6">Member Since from December 2025</p>

                            <button className="w-full bg-[#D53F3F] hover:bg-[#c43232] text-white font-bold py-3 rounded-lg mb-3 flex items-center justify-center gap-2 transition-colors">
                                <i className="ri-phone-fill"></i>
                                Call
                            </button>

                            <button className="w-full bg-[#0078D4] hover:bg-[#006cbd] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                <i className="ri-message-2-fill"></i>
                                Chat with Seller
                            </button>
                        </div>

                        {/* Google Ads Banner Slot */}
                        <div className="bg-gray-200 rounded-none md:rounded-2xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px]">
                            Google Ads
                        </div>

                    </div>
                </div>

                {/* 4. Similar Automobiles (Carousel) */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Similar Automobiles</h2>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                                const container = document.getElementById('similar-carousel');
                                if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                            }}>
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition" onClick={() => {
                                const container = document.getElementById('similar-carousel');
                                if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                            }}>
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "BMW X1 sDrive20i", price: "₹ 42,00,000/-", image: "https://images.unsplash.com/photo-1555215695-3004980adade?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "Mercedes-Benz GLA 200", price: "₹ 45,00,000/-", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop" },
                            { id: 4, title: "Audi Q5 45 TFSI", price: "₹ 58,00,000/-", image: "https://images.unsplash.com/photo-1606152421811-3130958578b4?q=80&w=2070&auto=format&fit=crop" },
                            { id: 5, title: "Volvo XC40 Recharge", price: "₹ 55,00,000/-", image: "https://images.unsplash.com/photo-1626668893632-6f3d446f82c8?q=80&w=2070&auto=format&fit=crop" },
                            { id: 6, title: "Range Rover Evoque", price: "₹ 65,00,000/-", image: "https://images.unsplash.com/photo-1605218427360-6927d14db4e6?q=80&w=2070&auto=format&fit=crop" },
                            { id: 7, title: "Toyota Fortuner Legender", price: "₹ 48,00,000/-", image: "https://images.unsplash.com/photo-1609520505218-7421dad182d8?q=80&w=2070&auto=format&fit=crop" },
                        ].map((car) => (
                            <div key={car.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                <div className="h-48 bg-gray-100 relative">
                                    <img src={car.image} alt={car.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{car.title}</h3>
                                    <div className="text-[#FF2D55] font-bold text-sm">{car.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}


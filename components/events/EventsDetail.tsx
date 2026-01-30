"use client";

import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';

export default function EventsDetail({ id }: { id?: string }) {
    // Mock Data for Events
    const item = {
        title: "Arijit Singh Live Concert - India Tour",
        price: "₹ 1,500 - ₹ 15,000",
        date: "15 OCT 2024",
        time: "6:00 PM Onwards",
        venue: "Jawaharlal Nehru Stadium, New Delhi",
        organizer: "Star Events",
        category: "Music Concert",
        description: `Get ready for the most awaited musical event of the year! Arijit Singh is back on tour, bringing his soul-stirring melodies to your city. 
        
        Experience a magical evening as he performs his biggest hits live. From romantic ballads to high-energy numbers, this concert promises an unforgettable experience. State-of-the-art production, mesmerizing visuals, and the soothing voice of Arijit Singh - it's a night you don't want to miss!
        
        Food and beverages will be available at the venue. Parking is available on a first-come, first-serve basis. Gate opens at 4:00 PM.`,
        highlights: [
            "Live Performance by Arijit Singh",
            "3+ Hours of Non-stop Music",
            "Food & Beverage Stalls",
            "Premium Seating Options",
            "Merchandise Store"
        ],
        images: [
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1470229722913-7c0d2dbbafd3?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=2070&auto=format&fit=crop"
        ],
        organizer_id: 2 // Mock organizer ID
    };

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src={item.images[0]}
                            alt="Main View"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-[#FF6E40] text-white px-3 py-1 rounded font-bold text-sm shadow-sm">
                            {item.category}
                        </div>
                    </div>
                    {/* Side Images */}
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

                {/* 2. Title & Key Info */}
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {item.title}
                        </h1>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
                                <i className="ri-share-line"></i>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition shadow-sm">
                                <i className="ri-heart-line"></i>
                            </button>
                        </div>
                    </div>

                    {/* Key Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#1565C0]"><i className="ri-calendar-event-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Date & Time</p>
                                <p className="text-sm font-bold text-gray-900">{item.date}</p>
                                <p className="text-xs text-gray-600">{item.time}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#C2185B]"><i className="ri-map-pin-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Venue</p>
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.venue}</p>
                                <a href="#" className="text-xs text-blue-500 hover:underline">View on Map</a>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]"><i className="ri-ticket-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Tickets Starting</p>
                                <p className="text-lg font-bold text-[#2E7D32]">{item.price}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">

                    {/* Left Column: Details */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">About the Event</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line mb-8">
                                {item.description}
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">Event Highlights</h3>
                            <ul className="space-y-3">
                                {item.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700">
                                        <i className="ri-checkbox-circle-fill text-[#FF6E40] mt-1"></i>
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Booking & Organizer */}
                    <div className="xl:col-span-1 space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 sticky top-24">
                            <div className="text-center mb-6">
                                <p className="text-sm text-gray-500 mb-1">Organized by</p>
                                <p className="text-lg font-bold text-gray-900">{item.organizer}</p>
                            </div>

                            <button className="w-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] mb-4">
                                Book Tickets
                            </button>

                            <ContactSellerButton
                                productId={id || 1}
                                sellerId={item.organizer_id}
                                className="w-full bg-[#E3F2FD] hover:bg-[#BBDEFB] text-[#2196F3] font-bold text-lg py-4 rounded-xl shadow-sm transition-transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-2 border border-[#90CAF9]/30"
                                label="Chat with Organizer"
                            />

                            <p className="text-xs text-center text-gray-400">
                                Safe & Secure Booking • Instant Confirmation
                            </p>
                        </div>

                        {/* Google Ad Placeholder */}
                        <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex flex-col items-center justify-center h-[300px] text-gray-400">
                            <i className="ri-advertisement-line text-4xl mb-2"></i>
                            <span className="text-sm font-bold">Google Ad Space</span>
                        </div>
                    </div>
                </div>

                {/* Similar Events (Carousel) */}
                <div className="mt-16 relative">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">You May Also Like</h2>
                        <div className="flex gap-2">
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => document.getElementById('events-similar-carousel')?.scrollBy({ left: -300, behavior: 'smooth' })}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>
                            <button
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition"
                                onClick={() => document.getElementById('events-similar-carousel')?.scrollBy({ left: 300, behavior: 'smooth' })}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    </div>

                    <div id="events-similar-carousel" className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[
                            { id: 2, title: "Sunburn Arena", date: "18 NOV", image: "https://images.unsplash.com/photo-1459749411177-3c971fe26e79?q=80&w=2070&auto=format&fit=crop" },
                            { id: 3, title: "Comic Con Delhi", date: "05 DEC", image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2070&auto=format&fit=crop" },
                            { id: 4, title: "Jazz Festival", date: "10 DEC", image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop" },
                            { id: 5, title: "Art Exhibition", date: "12 DEC", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=2070&auto=format&fit=crop" },
                        ].map((event) => (
                            <div key={event.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                <div className="h-40 bg-gray-100 relative">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-1.5 text-center min-w-[40px]">
                                        <span className="block text-lg font-bold text-[#FF6E40] leading-none">{event.date.split(" ")[0]}</span>
                                        <span className="block text-[9px] font-bold text-gray-600 uppercase tracking-wide">{event.date.split(" ")[1]}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{event.title}</h3>
                                    <div className="text-xs text-gray-500">New Delhi</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

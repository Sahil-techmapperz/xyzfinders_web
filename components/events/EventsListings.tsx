"use client";

import EventsCard, { EventData } from './EventsCard';
import { MOCK_EVENTS } from '@/data/mock-data';

// Use MOCK_EVENTS directly - it already matches EventData interface
const EVENTS_DATA: EventData[] = MOCK_EVENTS;

export default function EventsListings() {
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Upcoming Events in New Delhi
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Filter By:</span>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#FF8A65] hover:text-[#FF8A65]">Today</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#FF8A65] hover:text-[#FF8A65]">This Weekend</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#FF8A65] hover:text-[#FF8A65]">Free</button>
                    </div>
                </div>

                {/* Popular Categories (Moved to Top) */}
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Popular:</span>
                    {["Music", "Comedy", "Workshops", "Health", "Food", "Fashion", "Tech"].map((tag, i) => (
                        <button key={i} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap">
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {EVENTS_DATA.map(item => (
                        <EventsCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            <i className="ri-arrow-left-s-line"></i>
                        </button>
                        <button className="w-10 h-10 rounded-lg bg-[#FF8A65] text-white font-bold flex items-center justify-center shadow-md">1</button>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50 transition-all">2</button>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50 transition-all">3</button>
                        <span className="text-gray-400">...</span>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 font-bold flex items-center justify-center hover:bg-gray-50 transition-all">12</button>
                        <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65] transition-all">
                            <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Sidebar Ad/Promo */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF8E1] rounded-2xl p-6 text-center border border-amber-100 mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">List Your Event</h3>
                            <p className="text-sm text-gray-600 mb-4">Reach thousands of people in your city.</p>
                            <button className="w-full bg-[#FF8A65] text-white font-bold py-3 rounded-xl shadow-md hover:bg-[#F4511E] transition-colors">
                                Create Event
                            </button>
                        </div>

                        {/* Google Ad Placeholder (Larger) */}
                        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center h-[600px] text-gray-400">
                            <i className="ri-advertisement-line text-5xl mb-2"></i>
                            <span className="text-base font-bold">Google Ad Space</span>
                            <span className="text-xs">(Vertical Banner)</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

"use client";

import EventsCard, { EventData } from './EventsCard';

const EVENTS_DATA: EventData[] = [
    {
        id: 1,
        title: "Arijit Singh Live Concert - India Tour",
        category: "Music",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
        date: "15 OCT",
        time: "6:00 PM Onwards",
        location: "JLN Stadium, New Delhi",
        price: "₹ 1,500 onwards",
        organizer: "Star Events",
        description: "Experience the magic of Arijit Singh live in concert. A night full of soulful melodies and chart-topping hits. Book your tickets now!"
    },
    {
        id: 2,
        title: "Delhi Food Carnival 2024",
        category: "Food & Drink",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
        date: "20 OCT",
        time: "12:00 PM - 10:00 PM",
        location: "Dilli Haat, INA",
        price: "Entry Free",
        organizer: "Delhi Tourism",
        description: "A celebration of flavors! Taste dishes from over 50 renowned food stalls. Live music, games, and fun for the whole family."
    },
    {
        id: 3,
        title: "Standup Comedy Special - Zakir Khan",
        category: "Comedy",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?q=80&w=2070&auto=format&fit=crop",
        date: "22 OCT",
        time: "8:00 PM",
        location: "Siri Fort Auditorium",
        price: "₹ 999 onwards",
        organizer: "Comedy High",
        description: "Laugh your heart out with the 'Sakht Launda' himself. Brand new material, never performed before specials."
    },
    {
        id: 4,
        title: "Startup Founders Meetup",
        category: "Networking",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
        date: "25 OCT",
        time: "5:00 PM - 8:00 PM",
        location: "WeWork, Cyber City",
        price: "Free (Reg. Req.)",
        organizer: "Tech Circle",
        description: "Connect with fellow founders, investors, and tech enthusiasts. Panel discussions on scaling and fundraising."
    }
];

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

"use client";

import Link from "next/link";

export interface EventData {
    id: number;
    title: string;
    category: string;
    image: string;
    date: string;
    time: string;
    location: string;
    price: string;
    organizer: string;
    description: string;
}

export default function EventsCard({ item }: { item: EventData }) {
    const [day, month] = item.date.split(" "); // Assuming format "15 OCT"

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden group flex flex-col md:flex-row h-auto md:h-64">

            {/* Image Section */}
            <div className="relative w-full md:w-[40%] h-48 md:h-full bg-gray-100 overflow-hidden cursor-pointer">
                <Link href={`/events/${item.id}`}>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-2 text-center min-w-[50px]">
                    <span className="block text-xl font-bold text-[#FF6E40] leading-none">{day}</span>
                    <span className="block text-[10px] font-bold text-gray-600 uppercase tracking-wide">{month}</span>
                </div>

                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                    {item.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 line-clamp-2 hover:text-[#FF6E40] transition-colors cursor-pointer">
                        <Link href={`/events/${item.id}`}>{item.title}</Link>
                    </h3>

                    {/* Meta Row */}
                    <div className="flex flex-col gap-2 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                            <i className="ri-time-line text-[#FF6E40]"></i>
                            <span>{item.date} • {item.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-map-pin-line text-[#FF6E40]"></i>
                            <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-user-smile-line text-[#FF6E40]"></i>
                            <span>By {item.organizer}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <span className="text-gray-400 text-[10px] font-bold uppercase block">Starting From</span>
                        <span className="text-[#FF6E40] text-lg font-bold">{item.price}</span>
                    </div>

                    <div className="flex gap-3">
                        <Link href={`/events/${item.id}`} className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFF0EB] text-[#FF6E40] text-xs font-bold hover:bg-[#FF6E40] hover:text-white transition-all shadow-sm border border-[#FFCCBC]/50">
                            <i className="ri-ticket-line text-sm"></i> Book
                        </Link>
                        <button className="flex items-center gap-2 px-4 py-2 rounded bg-[#E3F2FD] text-[#2196F3] text-xs font-bold hover:bg-[#2196F3] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50">
                            <i className="ri-chat-3-line text-sm"></i> Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

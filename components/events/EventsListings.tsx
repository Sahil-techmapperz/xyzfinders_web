"use client";

import { useState, use } from 'react';
import EventsCard, { EventData } from './EventsCard';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

interface EventsListingsProps {
    eventsPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function EventsListings({ eventsPromise, locationsPromise }: EventsListingsProps) {
    const products = use(eventsPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to events format
    const EVENTS_DATA: EventData[] = products.map(p => {
        let attributes: any = {};
        if (typeof p.product_attributes === 'string') {
            try {
                attributes = JSON.parse(p.product_attributes);
            } catch (e) {
                console.error('Failed to parse product_attributes', e);
            }
        } else if (typeof p.product_attributes === 'object') {
            attributes = p.product_attributes;
        }

        const productImages = p.images?.map((img: any) =>
            img.image ? `data:image/jpeg;base64,${img.image}` : ''
        ) || [];

        return {
            id: p.id,
            title: p.title,
            category: attributes.category || 'Event',
            image: productImages.length > 0 ? productImages[0] : '',
            description: p.description,
            date: attributes.date || formatDate(p.created_at),
            time: attributes.time || '',
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            price: p.price > 0 ? `₹ ${p.price.toLocaleString()}` : 'Free',
            organizer: p.seller?.name || 'Unknown Organizer',
            verified: !!(p.seller?.is_verified),
            premium: !!p.is_boosted
        };
    });

    const [locations, setLocations] = useState(initialLocations);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Location filtering
    const activeLocationNames = locations.filter(loc => loc.active).map(loc => loc.name);
    const filteredEvents = activeLocationNames.length > 0
        ? EVENTS_DATA.filter(event => activeLocationNames.some(locName => event.location.includes(locName)))
        : EVENTS_DATA;

    // Pagination
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    const toggleLocation = (name: string) => {
        setLocations(prev => prev.map(loc =>
            loc.name === name ? { ...loc, active: !loc.active } : loc
        ));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Upcoming Events in New Delhi <span className="text-gray-500 font-normal text-base">- {filteredEvents.length}(Available)</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Filter By:</span>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#FF8A65] hover:text-[#FF8A65]">Today</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#FF8A65] hover:text-[#FF8A65]">This Weekend</button>
                        <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-3 py-1.5 rounded hover:border-[#FF8A65] hover:text-[#FF8A65]">Free</button>
                    </div>
                </div>

                {/* Location Filters */}
                {locations.length > 0 && (
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Locations:</span>
                        {locations.map((loc, i) => (
                            <button
                                key={i}
                                onClick={() => toggleLocation(loc.name)}
                                className={`text-xs font-medium px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center gap-2 ${loc.active
                                        ? "bg-[#FF8A65] text-white"
                                        : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]"
                                    }`}
                            >
                                {loc.name}
                                {loc.active && (
                                    <i className="ri-close-line bg-white/20 rounded-full p-0.5 text-[10px]"></i>
                                )}
                            </button>
                        ))}
                    </div>
                )}

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
                    {currentEvents.map(item => (
                        <EventsCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${currentPage === 1
                                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65]'
                                    }`}
                            >
                                <i className="ri-arrow-left-s-line"></i>
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${currentPage === page
                                            ? 'bg-[#FF8A65] text-white shadow-md'
                                            : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {/* Next button */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${currentPage === totalPages
                                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                        : 'text-gray-500 hover:bg-[#FF8A65] hover:text-white hover:border-[#FF8A65]'
                                    }`}
                            >
                                <i className="ri-arrow-right-s-line"></i>
                            </button>
                        </div>
                    )}
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

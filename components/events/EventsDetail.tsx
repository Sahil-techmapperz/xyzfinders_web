"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ContactSellerButton from '../shared/ContactSellerButton';


export default function EventsDetail({ id }: { id?: string }) {
    const [eventItem, setEventItem] = useState<any>(null);
    const [similarEvents, setSimilarEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                const numericId = id.split('-')[0];
                const res = await fetch(`/api/products/${numericId}`);
                const data = await res.json();

                if (data.success) {
                    const product = data.data;

                    // Parse attributes
                    let attrs: any = {};
                    try {
                        attrs = typeof product.product_attributes === 'string'
                            ? JSON.parse(product.product_attributes)
                            : product.product_attributes || {};
                    } catch (e) {
                        console.error("Error parsing attributes", e);
                    }

                    const images = product.images && product.images.length > 0
                        ? product.images.map((img: any) => `data:image/jpeg;base64,${img.image}`)
                        : ['/placeholder.jpg'];

                    setEventItem({
                        ...product,
                        image: images[0],
                        images: images,
                        date: attrs.date || new Date(product.created_at).toLocaleDateString(),
                        time: attrs.time || 'TBD',
                        organizer: product.seller_name || 'Organizer',
                        category: product.category_name || 'Event',
                        location: product.city || product.location || 'Venue TBD',
                        highlights: attrs.highlights || ["Live Performance", "Food & Beverage Available", "Experience of a Lifetime"]
                    });

                    if (product.similarProducts) {
                        setSimilarEvents(product.similarProducts.map((p: any) => ({
                            id: p.id,
                            title: p.title,
                            date: p.product_attributes?.date || 'Upcoming',
                            location: p.city || 'Location',
                            image: p.image ? `data:image/jpeg;base64,${p.image}` : '/placeholder.jpg'
                        })));
                    }
                }
            } catch (err) {
                console.error("Failed to fetch event:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6E40]"></div>
            </div>
        );
    }

    if (!eventItem) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FFFBF7]">
                <div className="text-xl text-gray-500">Event not found</div>
            </div>
        );
    }

    const eventDate = eventItem.date;
    const eventTime = eventItem.time;
    const venue = eventItem.location;
    const organizer = eventItem.organizer;
    const category = eventItem.category;

    return (
        <div className="bg-[#FFFBF7] min-h-screen pb-20 font-jost overflow-x-hidden">
            <div className="container mx-auto px-4 py-8 max-w-7xl relative">

                {/* 1. Hero Gallery Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 h-[400px] md:h-[500px]">
                    {/* Main Image */}
                    <div className="md:col-span-2 relative h-[500px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                        <img
                            src={eventItem.image}
                            alt={eventItem.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-[#FF6E40] text-white px-3 py-1 rounded font-bold text-sm shadow-sm">
                            {category}
                        </div>
                    </div>
                    {/* Side Images */}
                    <div className="flex flex-col gap-2 h-full">
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                            <img
                                src={eventItem.images[1] || eventItem.image}
                                alt="Side View 1"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="relative h-[250px] rounded-2xl overflow-hidden group cursor-pointer bg-gray-200">
                            <img
                                src={eventItem.images[2] || eventItem.image}
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
                            {eventItem.title}
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
                                <p className="text-sm font-bold text-gray-900">{eventDate}</p>
                                <p className="text-xs text-gray-600">{eventTime}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#FCE4EC] flex items-center justify-center text-[#C2185B]"><i className="ri-map-pin-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Venue</p>
                                <p className="text-sm font-bold text-gray-900 line-clamp-1">{venue}</p>
                                <a href="#" className="text-xs text-blue-500 hover:underline">View on Map</a>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32]"><i className="ri-ticket-line text-xl"></i></div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Tickets Starting</p>
                                <p className="text-lg font-bold text-[#2E7D32]">₹ {eventItem.price}</p>
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
                                {eventItem.description}
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">Event Highlights</h3>
                            <ul className="space-y-3">
                                {eventItem.highlights.map((h: string, i: number) => (
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
                                <p className="text-lg font-bold text-gray-900">{organizer}</p>
                            </div>

                            <button className="w-full bg-[#FF6E40] hover:bg-[#F4511E] text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] mb-4">
                                Book Tickets
                            </button>

                            <ContactSellerButton
                                productId={id || "1"}
                                sellerId={eventItem.user_id || 1}
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
                    {similarEvents.length > 0 && (
                        <>
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
                                {similarEvents.map((event) => {
                                    const [day, month] = event.date && event.date.split ? event.date.split(' ') : ['?', '?'];
                                    return (
                                        <Link href={`/events/${event.id}-${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`} key={event.id}>
                                            <div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer snap-start shrink-0">
                                                <div className="h-40 bg-gray-100 relative">
                                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                                    <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-1.5 text-center min-w-[40px]">
                                                        <span className="block text-lg font-bold text-[#FF6E40] leading-none">
                                                            {day || '?'}
                                                        </span>
                                                        <span className="block text-[9px] font-bold text-gray-600 uppercase tracking-wide">
                                                            {month || '?'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{event.title}</h3>
                                                    <div className="text-xs text-gray-500">{event.location}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

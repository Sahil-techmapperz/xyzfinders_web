import type { Metadata } from 'next';
import EventsHero from '@/components/events/EventsHero';
import EventsListings from '@/components/events/EventsListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Events & Workshops | XYZ Finders',
    description: 'Discover upcoming events, workshops, and activities in New Delhi.',
};

async function getEvents() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=10&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch events');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=10&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function EventsPage() {
    const eventsPromise = getEvents();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen">
            <EventsHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading events...</div>}>
                <EventsListings eventsPromise={eventsPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

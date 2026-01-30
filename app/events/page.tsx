
import type { Metadata } from 'next';
import EventsHero from '@/components/events/EventsHero';
import EventsListings from '@/components/events/EventsListings';

export const metadata: Metadata = {
    title: 'Local Events | XYZ Finders',
    description: 'Find best local events, concerts, workshops, and meetups in New Delhi.',
};

export default function EventsPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <EventsHero />
            <EventsListings />
        </main>
    );
}

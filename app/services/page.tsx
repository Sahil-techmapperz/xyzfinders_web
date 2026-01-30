
import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesListings from '@/components/services/ServicesListings';

export const metadata: Metadata = {
    title: 'Local Services | XYZ Finders',
    description: 'Find trusted professionals and services in New Delhi. Plumbers, Electricians, Cleaners, and more.',
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <ServicesHero />
            <ServicesListings />
        </main>
    );
}

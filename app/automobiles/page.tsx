import type { Metadata } from 'next';
import AutomobileHero from '@/components/automobiles/AutomobileHero';
import AutomobileListings from '@/components/automobiles/AutomobileListings';

export const metadata: Metadata = {
    title: 'Automobiles for Sale | XYZ Finders',
    description: 'Find used cars and automobiles for sale.',
};

export default function AutomobileListingPage() {
    return (
        <main className="font-jost min-h-screen bg-[#FFFBF0]">
            <AutomobileHero />
            <AutomobileListings />
        </main>
    );
}

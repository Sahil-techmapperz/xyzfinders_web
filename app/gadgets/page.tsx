
import type { Metadata } from 'next';
import GadgetsHero from '@/components/gadgets/GadgetsHero';
import GadgetsListings from '@/components/gadgets/GadgetsListings';

export const metadata: Metadata = {
    title: 'Electronics & Gadgets for Sale | XYZ Finders',
    description: 'Find new and used electronics, gadgets, laptops, cameras, gaming consoles and more in New Delhi.',
};

export default function ElectronicsGadgetsPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <GadgetsHero />
            <GadgetsListings />
        </main>
    );
}

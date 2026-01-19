
import type { Metadata } from 'next';
import FurnitureHero from '@/components/furniture/FurnitureHero';
import FurnitureListings from '@/components/furniture/FurnitureListings';

export const metadata: Metadata = {
    title: 'Furniture & Appliances for Sale | XYZ Finders',
    description: 'Find new and used furniture, home appliances, refrigerators, washing machines and more in New Delhi.',
};

export default function FurnitureAppliancesPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <FurnitureHero />
            <FurnitureListings />
        </main>
    );
}

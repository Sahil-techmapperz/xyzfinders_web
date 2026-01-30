
import type { Metadata } from 'next';
import PetsHero from '@/components/pets/PetsHero';
import PetsListings from '@/components/pets/PetsListings';

export const metadata: Metadata = {
    title: 'Pets & Animals Accessories | XYZ Finders',
    description: 'Find pets for adoption, accessories, and pet care services in New Delhi.',
};

export default function PetsPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <PetsHero />
            <PetsListings />
        </main>
    );
}

import type { Metadata } from 'next';
import FashionListings from '@/components/fashion/FashionListings';
import FashionHero from '@/components/fashion/FashionHero';

export const metadata: Metadata = {
    title: 'Fashion & Accessories | XYZ Finders',
    description: 'Find the latest fashion trends, clothing, footwear, and accessories.',
};

export default function FashionPage() {
    return (
        <main className="font-jost min-h-screen bg-[#FFFBF0]">
            <FashionHero />
            <FashionListings />
        </main>
    );
}

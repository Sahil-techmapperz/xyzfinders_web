
import type { Metadata } from 'next';
import BeautyHero from '@/components/beauty/BeautyHero';
import BeautyListings from '@/components/beauty/BeautyListings';

export const metadata: Metadata = {
    title: 'Beauty & Wellness Services | XYZ Finders',
    description: 'Find the best beauty salons, spas, massage centers, and wellness services in New Delhi.',
};

export default function BeautyWellnessPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <BeautyHero />
            <BeautyListings />
        </main>
    );
}

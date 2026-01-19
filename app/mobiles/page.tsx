
import type { Metadata } from 'next';
import MobileHero from '@/components/mobiles/MobileHero';
import MobileListings from '@/components/mobiles/MobileListings';

export const metadata: Metadata = {
    title: 'Mobile Phones for Sale | XYZ Finders',
    description: 'Find new and used mobile phones for sale in New Delhi.',
};

export default function MobilePhonesPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <MobileHero />
            <MobileListings />
        </main>
    );
}

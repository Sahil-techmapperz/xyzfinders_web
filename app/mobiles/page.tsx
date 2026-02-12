import type { Metadata } from 'next';
import MobileHero from '@/components/mobiles/MobileHero';
import MobileListings from '@/components/mobiles/MobileListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Mobile Phones for Sale | XYZ Finders',
    description: 'Find new and used mobile phones for sale in New Delhi.',
};


async function getMobiles() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=3&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch mobiles');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=3&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    // Extract unique cities from products
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function MobilePhonesPage() {
    const mobilesPromise = getMobiles();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <MobileHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading mobiles...</div>}>
                <MobileListings mobilesPromise={mobilesPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

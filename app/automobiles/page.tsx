import type { Metadata } from 'next';
import AutomobileHero from '@/components/automobiles/AutomobileHero';
import AutomobileListings from '@/components/automobiles/AutomobileListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Automobiles for Sale | XYZ Finders',
    description: 'Find used and new automobiles for sale in New Delhi.',
};

async function getAutomobiles() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=2&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch automobiles');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=2&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function AutomobileListingPage() {
    const automobilesPromise = getAutomobiles();
    const locationsPromise = getLocations();

    return (
        <main className="font-jost min-h-screen bg-[#FFFBF0]">
            <AutomobileHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading automobiles...</div>}>
                <AutomobileListings automobilesPromise={automobilesPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

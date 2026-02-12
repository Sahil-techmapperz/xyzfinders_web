import type { Metadata } from 'next';
import GadgetsHero from '@/components/gadgets/GadgetsHero';
import GadgetsListings from '@/components/gadgets/GadgetsListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Electronics & Gadgets | XYZ Finders',
    description: 'Find electronics and gadgets for sale in New Delhi.',
};

async function getGadgets() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=5&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch gadgets');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=5&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function GadgetsPage() {
    const gadgetsPromise = getGadgets();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen">
            <GadgetsHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading gadgets...</div>}>
                <GadgetsListings gadgetsPromise={gadgetsPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

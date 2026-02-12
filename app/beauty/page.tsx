import type { Metadata } from 'next';
import BeautyHero from '@/components/beauty/BeautyHero';
import BeautyListings from '@/components/beauty/BeautyListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Beauty &Wellness | XYZ Finders',
    description: 'Find beauty salons, spas, and wellness services in New Delhi.',
};

async function getBeauty() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=6&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch beauty services');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=6&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function BeautyPage() {
    const beautyPromise = getBeauty();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen">
            <BeautyHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading beauty services...</div>}>
                <BeautyListings beautyPromise={beautyPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

import type { Metadata } from 'next';
import FurnitureHero from '@/components/furniture/FurnitureHero';
import FurnitureListings from '@/components/furniture/FurnitureListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Furniture | XYZ Finders',
    description: 'Find new and used furniture for sale in New Delhi.',
};

async function getFurniture() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=4&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch furniture');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=4&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function FurniturePage() {
    const furniturePromise = getFurniture();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen">
            <FurnitureHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading furniture...</div>}>
                <FurnitureListings furniturePromise={furniturePromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

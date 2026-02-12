import type { Metadata } from 'next';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesListings from '@/components/services/ServicesListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Services | XYZ Finders',
    description: 'Find trusted local service providers for all your needs.',
};

async function getServices() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=11&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch services');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=11&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function ServicesPage() {
    const servicesPromise = getServices();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen">
            <ServicesHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading services...</div>}>
                <ServicesListings servicesPromise={servicesPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

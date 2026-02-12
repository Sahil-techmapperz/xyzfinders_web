import RealEstateHero from '@/components/real-estate/RealEstateHero';
import PropertyListings from '@/components/real-estate/PropertyListings';
import { Suspense } from 'react';

export const metadata = {
    title: 'Real Estate - Properties for Sale & Rent | XYZ Finders',
    description: 'Find your dream property - apartments, houses, and commercial spaces for sale or rent',
};

async function getProperties() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=1&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch properties');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=1&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function RealEstatePage() {
    const propertiesPromise = getProperties();
    const locationsPromise = getLocations();

    return (
        <>
            <RealEstateHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading properties...</div>}>
                <PropertyListings propertiesPromise={propertiesPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </>
    );
}

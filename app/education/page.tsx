import type { Metadata } from 'next';
import EducationHero from '@/components/education/EducationHero';
import EducationListings from '@/components/education/EducationListings';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Education & Learning | XYZ Finders',
    description: 'Find tuition, coaching, language classes, and skill development courses in New Delhi.',
};

async function getEducation() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=9&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch education');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=9&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function EducationPage() {
    const educationPromise = getEducation();
    const locationsPromise = getLocations();

    return (
        <main className="min-h-screen">
            <EducationHero />
            <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading education listings...</div>}>
                <EducationListings educationPromise={educationPromise} locationsPromise={locationsPromise} />
            </Suspense>
        </main>
    );
}

import { Suspense } from 'react';
import type { Metadata } from 'next';
import JobsLanding from '@/components/jobs/JobsLanding';

export const metadata: Metadata = {
    title: 'Job Listings | XYZ Finders',
    description: 'Browse available job openings.',
};

async function getJobs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=7&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch jobs');
    }

    return res.json().then(data => data.data);
}

async function getLocations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/products?category_id=7&status=active`, {
        cache: 'no-store'
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    const uniqueCities = [...new Set(data.data?.map((p: any) => p.city).filter(Boolean))];
    return uniqueCities.map((city) => ({ name: city as string, active: false }));
}

export default function JobListingPage() {
    const jobsPromise = getJobs();
    const locationsPromise = getLocations();

    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#FF8A65] border-t-transparent rounded-full animate-spin"></div>
        </div>}>
            <JobsLanding jobsPromise={jobsPromise} locationsPromise={locationsPromise} />
        </Suspense>
    );
}

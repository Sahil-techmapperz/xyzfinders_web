import { Suspense } from 'react';
import type { Metadata } from 'next';
import JobsLanding from '@/components/jobs/JobsLanding';

export const metadata: Metadata = {
    title: 'Job Listings | XYZ Finders',
    description: 'Browse available job openings.',
};

export default function JobListingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#FF8A65] border-t-transparent rounded-full animate-spin"></div>
        </div>}>
            <JobsLanding />
        </Suspense>
    );
}

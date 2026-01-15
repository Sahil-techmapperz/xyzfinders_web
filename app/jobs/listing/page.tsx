import type { Metadata } from 'next';
import JobsHero from '@/components/jobs/JobsHero';
import JobListings from '@/components/jobs/JobListings';

export const metadata: Metadata = {
    title: 'Job Listings | XYZ Finders',
    description: 'Browse available job openings.',
};

export default function JobListingPage() {
    return (
        <main className="bg-[#FFFBF0] font-jost min-h-screen">
            <JobsHero />
            <JobListings />
        </main>
    );
}

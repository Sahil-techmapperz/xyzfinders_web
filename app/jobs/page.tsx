import type { Metadata } from 'next';
import JobsLanding from '@/components/jobs/JobsLanding';
import JobsHero from '@/components/jobs/JobsHero';
import PopularJobs from '@/components/jobs/PopularJobs';
import JobCategories from '@/components/jobs/JobCategories';

export const metadata: Metadata = {
    title: 'Find Jobs | XYZ Finders',
    description: 'Search for the latest job openings in your area.',
};

export default function JobsPage() {
   return (
    <div>
    <JobsHero />
    <PopularJobs />
    <JobCategories />
    </div>
   )
}

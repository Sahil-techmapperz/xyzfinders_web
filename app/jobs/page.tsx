import type { Metadata } from 'next';
import JobsLanding from '@/components/jobs/JobsLanding';

export const metadata: Metadata = {
    title: 'Find Jobs | XYZ Finders',
    description: 'Search for the latest job openings in your area.',
};

export default function JobsPage() {
    return <JobsLanding />;
}

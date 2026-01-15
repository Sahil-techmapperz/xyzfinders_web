import type { Metadata } from 'next';
import JobDetail from '@/components/jobs/JobDetail';
import JobsHero from '@/components/jobs/JobsHero';

export const metadata: Metadata = {
    title: 'Job Details | XYZ Finders',
    description: 'View full job description and details.',
};

export default async function JobDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <main className="font-jost">
            {/* Optional: Reuse Hero or use a smaller header. Reference shows just the page. 
            I'll keep it simple or reuse the hero if desired. 
            For now, let's render the Detail component which has its own container.
        */}
            <JobDetail id={id} />
        </main>
    );
}

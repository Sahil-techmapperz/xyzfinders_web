
import type { Metadata } from 'next';
import EducationHero from '@/components/education/EducationHero';
import EducationListings from '@/components/education/EducationListings';

export const metadata: Metadata = {
    title: 'Learning & Education | XYZ Finders',
    description: 'Find tutors, coaching centers, vocational courses, and study materials in New Delhi.',
};

export default function EducationPage() {
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <EducationHero />
            <EducationListings />
        </main>
    );
}

"use client";

import JobsHero from './JobsHero';
import PopularJobs from './PopularJobs';
import JobCategories from './JobCategories';

export default function JobsLanding() {
    return (
        <main className="min-h-screen bg-[#FFFBF0] font-jost">
            <JobsHero />
            <PopularJobs />
            <JobCategories />
        </main>
    );
}

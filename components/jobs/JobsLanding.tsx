"use client";

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JobSidebar from './JobSidebar';
import JobListings from './JobListings';
import JobRightSidebar from './JobRightSidebar';
import JobCategories from './JobCategories';
import { JobFilters } from './types';

export default function JobsLanding() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Derived state from URL (Source of Truth)
    const filters: JobFilters = {
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        qualification: searchParams.get('qualification') || '',
        jobType: searchParams.get('job_types')?.split(',').filter(Boolean) ||
            (searchParams.get('job_type') ? [searchParams.get('job_type')!] : []),
        experience: searchParams.get('experience_levels')?.split(',').filter(Boolean) ||
            (searchParams.get('experience') ? [searchParams.get('experience')!] : []),
        salaryRange: parseInt(searchParams.get('min_salary') || '0'),
        workMode: searchParams.get('work_modes')?.split(',').filter(Boolean) ||
            searchParams.get('work_mode')?.split(',').filter(Boolean) || [],
        keywords: searchParams.get('keywords') || '',
        salaryRanges: searchParams.get('salary_ranges')?.split(',').filter(Boolean) || [],
        jobRoles: searchParams.get('job_roles')?.split(',').filter(Boolean) || []
    };

    // Wrapper to handle filter updates by changing URL directly
    const handleSetFilters = (action: React.SetStateAction<JobFilters>) => {
        const newFilters = typeof action === 'function' ? action(filters) : action;

        const params = new URLSearchParams();

        // Basic search fields
        if (newFilters.search) params.set('search', newFilters.search);
        if (newFilters.location) params.set('location', newFilters.location);
        if (newFilters.qualification) params.set('qualification', newFilters.qualification);

        // Advanced filters
        if (newFilters.keywords) params.set('keywords', newFilters.keywords);
        if (newFilters.jobType.length > 0) params.set('job_types', newFilters.jobType.join(','));
        if (newFilters.experience.length > 0) params.set('experience_levels', newFilters.experience.join(','));
        if (newFilters.salaryRange > 0) params.set('min_salary', newFilters.salaryRange.toString());
        if (newFilters.salaryRanges && newFilters.salaryRanges.length > 0) params.set('salary_ranges', newFilters.salaryRanges.join(','));
        if (newFilters.workMode.length > 0) params.set('work_modes', newFilters.workMode.join(','));
        if (newFilters.jobRoles && newFilters.jobRoles.length > 0) params.set('job_roles', newFilters.jobRoles.join(','));

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        router.replace(newUrl, { scroll: false });
    };

    return (
        <main className="min-h-screen bg-[#FFFBF0] font-jost pb-20">
            <div className="container mx-auto px-4 py-8 md:py-12">
                {/* Mobile Filter Toggle */}
                <div className="md:hidden mb-6">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full bg-white border border-gray-200 py-3 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-2 shadow-sm"
                    >
                        <i className="ri-filter-3-line text-[#FF8A65]"></i>
                        {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar Column */}
                    <div className={`w-full md:w-[280px] lg:w-[320px] shrink-0 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
                        <div className="sticky top-24">
                            <JobSidebar filters={filters} setFilters={handleSetFilters} />
                        </div>
                    </div>

                    {/* Main Content Column */}
                    <div className="flex-1 min-w-0">
                        <JobListings filters={filters} />
                    </div>

                    {/* Right Sidebar Column (Ads) */}
                    <div className="hidden xl:block w-[280px] shrink-0">
                        <div className="sticky top-24">
                            <JobRightSidebar />
                        </div>
                    </div>
                </div>
            </div>

            <JobCategories />
        </main>
    );
}

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
                    <div className={`
                        ${isSidebarOpen ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-4' : 'hidden'} 
                        md:block md:static md:w-[280px] md:p-0 md:bg-transparent md:overflow-visible lg:w-[320px] shrink-0
                    `}>
                        {/* Mobile Close Button */}
                        <div className="md:hidden flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                            >
                                <i className="ri-close-line text-2xl"></i>
                            </button>
                        </div>

                        <div className="md:sticky md:top-24">
                            <JobSidebar filters={filters} setFilters={handleSetFilters} />

                            {/* Mobile specific apply button (optional but good for UX) */}
                            <div className="md:hidden mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-full bg-[#FF8A65] text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-200"
                                >
                                    Show Result
                                </button>
                            </div>
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

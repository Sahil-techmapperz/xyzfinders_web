"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import JobFilterPopup, { AdvancedFilters } from './JobFilterPopup';
import Link from 'next/link';

export default function JobsHero() {
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Search state initialized from URL
    const [searchQuery, setSearchQuery] = useState({
        jobRole: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        qualification: searchParams.get('qualification') || '',
        jobType: searchParams.get('job_type') || '',
        experience: searchParams.get('experience') || ''
    });

    // Advanced filters state initialized from URL
    const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
        keywords: searchParams.get('keywords') || '',
        jobTypes: searchParams.get('job_types')?.split(',').filter(Boolean) || [],
        experienceLevels: searchParams.get('experience_levels')?.split(',').filter(Boolean) || [],
        salaryRanges: searchParams.get('salary_ranges')?.split(',').filter(Boolean) || [],
        workModes: searchParams.get('work_modes')?.split(',').filter(Boolean) || [],
        jobRoles: searchParams.get('job_roles')?.split(',').filter(Boolean) || []
    });

    // Update state when URL changes
    useEffect(() => {
        setSearchQuery({
            jobRole: searchParams.get('search') || '',
            location: searchParams.get('location') || '',
            qualification: searchParams.get('qualification') || '',
            jobType: searchParams.get('job_type') || '',
            experience: searchParams.get('experience') || ''
        });

        setAdvancedFilters({
            keywords: searchParams.get('keywords') || '',
            jobTypes: searchParams.get('job_types')?.split(',').filter(Boolean) || [],
            experienceLevels: searchParams.get('experience_levels')?.split(',').filter(Boolean) || [],
            salaryRanges: searchParams.get('salary_ranges')?.split(',').filter(Boolean) || [],
            workModes: searchParams.get('work_modes')?.split(',').filter(Boolean) || [],
            jobRoles: searchParams.get('job_roles')?.split(',').filter(Boolean) || []
        });
    }, [searchParams]);

    const handleSearch = () => {
        const params = new URLSearchParams();

        // Basic search fields
        if (searchQuery.jobRole.trim()) {
            params.set('search', searchQuery.jobRole.trim());
        }
        if (searchQuery.location.trim()) {
            params.set('location', searchQuery.location.trim());
        }
        if (searchQuery.qualification.trim()) {
            params.set('qualification', searchQuery.qualification.trim());
        }
        if (searchQuery.jobType.trim()) {
            params.set('job_type', searchQuery.jobType.trim());
        }
        if (searchQuery.experience.trim()) {
            params.set('experience', searchQuery.experience.trim());
        }

        // Advanced filters from popup
        if (advancedFilters.keywords.trim()) {
            params.set('keywords', advancedFilters.keywords.trim());
        }
        if (advancedFilters.jobTypes.length > 0) {
            params.set('job_types', advancedFilters.jobTypes.join(','));
        }
        if (advancedFilters.experienceLevels.length > 0) {
            params.set('experience_levels', advancedFilters.experienceLevels.join(','));
        }
        if (advancedFilters.salaryRanges.length > 0) {
            params.set('salary_ranges', advancedFilters.salaryRanges.join(','));
        }
        if (advancedFilters.workModes.length > 0) {
            params.set('work_modes', advancedFilters.workModes.join(','));
        }
        if (advancedFilters.jobRoles.length > 0) {
            params.set('job_roles', advancedFilters.jobRoles.join(','));
        }

        const queryString = params.toString();
        router.push(`/jobs/listing${queryString ? `?${queryString}` : ''}`);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleApplyFilters = (filters: AdvancedFilters) => {
        const params = new URLSearchParams();

        // Basic search fields (from current state)
        if (searchQuery.jobRole.trim()) params.set('search', searchQuery.jobRole.trim());
        if (searchQuery.location.trim()) params.set('location', searchQuery.location.trim());
        if (searchQuery.qualification.trim()) params.set('qualification', searchQuery.qualification.trim());
        if (searchQuery.jobType.trim()) params.set('job_type', searchQuery.jobType.trim());
        if (searchQuery.experience.trim()) params.set('experience', searchQuery.experience.trim());

        // Advanced filters (from argument)
        if (filters.keywords.trim()) params.set('keywords', filters.keywords.trim());
        if (filters.jobTypes.length > 0) params.set('job_types', filters.jobTypes.join(','));
        if (filters.experienceLevels.length > 0) params.set('experience_levels', filters.experienceLevels.join(','));
        if (filters.salaryRanges.length > 0) params.set('salary_ranges', filters.salaryRanges.join(','));
        if (filters.workModes.length > 0) params.set('work_modes', filters.workModes.join(','));
        if (filters.jobRoles.length > 0) params.set('job_roles', filters.jobRoles.join(','));

        setAdvancedFilters(filters);
        const queryString = params.toString();
        router.push(`/jobs/listing${queryString ? `?${queryString}` : ''}`);
        // No timeout needed
    };

    return (
        <>
            {/* Mobile Header (Visible only on mobile) */}
            <div className="md:hidden bg-white border-b border-gray-100 pb-2">
                <div className="px-4 pt-4 pb-2">
                    {/* Mobile Filters Scroll */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => setShowFilters(true)}
                            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange text-brand-orange bg-orange-50 text-sm font-medium whitespace-nowrap shrink-0"
                        >
                            <i className="ri-equalizer-line"></i>
                            View More
                        </button>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>Job Role</option>
                            <option>Developer</option>
                            <option>Designer</option>
                            <option>Manager</option>
                        </select>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>Location</option>
                            <option>Delhi</option>
                            <option>Mumbai</option>
                            <option>Bangalore</option>
                        </select>

                        <select className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium bg-white whitespace-nowrap shrink-0 focus:outline-none">
                            <option>Salary</option>
                            <option>0-3 LPA</option>
                            <option>3-6 LPA</option>
                            <option>6-10 LPA</option>
                        </select>
                    </div>
                </div>
            </div>

            <section className="hidden md:flex relative w-full bg-[#EA580C] min-h-[500px] z-20">
                {/* Background Wrapper (Clipped) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop"
                            alt="Background"
                            className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                        />
                    </div>

                    {/* Background Decorations - Abstract overlay */}
                    <div className="absolute inset-0 opacity-10 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        {/* Floating Icons (Simulating the 'flying papers' in design) */}
                        <i className="ri-file-list-3-line absolute top-10 left-[10%] text-6xl text-white transform -rotate-12 opacity-20"></i>
                        <i className="ri-briefcase-4-line absolute bottom-20 right-[15%] text-8xl text-white transform rotate-12 opacity-20"></i>
                        <i className="ri-search-eye-line absolute top-20 right-[30%] text-5xl text-white transform -rotate-45 opacity-20"></i>
                    </div>

                    {/* Bottom Curve/Wave (Optional, using simple CSS shape or SVG) */}
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-[#FFFBF0] rounded-t-[50%] scale-x-150 translate-y-6"></div>
                </div>

                <div className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10 flex flex-col items-center">
                    {/* Logo */}
                    <div className="mb-8 p-3 bg-white rounded-lg shadow-lg">
                        <img src="/logo.png" alt="XYZ Finders" className="h-12 w-auto" />
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-md">
                        Get Fast a Job !
                    </h1>

                    {/* Search Bar Container */}
                    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 mx-auto transform translate-y-8 md:translate-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">

                            {/* Job Role */}
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Job Role
                                </label>
                                <div className="relative">
                                    <i className="ri-briefcase-line absolute left-3 top-1/2 -translate-y-1/2 text-[#FF8A65] text-lg"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Title"
                                        value={searchQuery.jobRole}
                                        onChange={(e) => setSearchQuery({ ...searchQuery, jobRole: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8A65] focus:bg-white placeholder-gray-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Location
                                </label>
                                <div className="relative">
                                    <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-[#FF8A65] text-lg"></i>
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={searchQuery.location}
                                        onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8A65] focus:bg-white placeholder-gray-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Qualification */}
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Qualification
                                </label>
                                <div className="relative">
                                    <i className="ri-graduation-cap-line absolute left-3 top-1/2 -translate-y-1/2 text-[#FF8A65] text-lg"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Qualification"
                                        value={searchQuery.qualification}
                                        onChange={(e) => setSearchQuery({ ...searchQuery, qualification: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8A65] focus:bg-white placeholder-gray-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Job Type */}
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Job Type
                                </label>
                                <div className="relative">
                                    <i className="ri-briefcase-line absolute left-3 top-1/2 -translate-y-1/2 text-[#FF8A65] text-lg"></i>
                                    <input
                                        type="text"
                                        placeholder="Enter Job type"
                                        value={searchQuery.jobType}
                                        onChange={(e) => setSearchQuery({ ...searchQuery, jobType: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8A65] focus:bg-white placeholder-gray-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="lg:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                    Experience
                                </label>
                                <div className="relative">
                                    <i className="ri-award-line absolute left-3 top-1/2 -translate-y-1/2 text-[#FF8A65] text-lg"></i>
                                    <input
                                        type="text"
                                        placeholder="Any"
                                        value={searchQuery.experience}
                                        onChange={(e) => setSearchQuery({ ...searchQuery, experience: e.target.value })}
                                        onKeyPress={handleKeyPress}
                                        className="w-full pl-10 pr-3 py-3 text-sm text-gray-800 font-medium bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#FF8A65] focus:bg-white placeholder-gray-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Filters & Search Button Combined */}
                            <div className="lg:col-span-2 grid grid-cols-2 gap-2">
                                {/* Filters Button */}
                                <div className="relative">
                                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                                        Filters
                                    </label>
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="w-full bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 text-gray-700 font-medium text-sm py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-1"
                                    >
                                        <i className="ri-filter-3-line text-[#FF8A65]"></i>
                                        <span className="text-xs">More</span>
                                    </button>
                                </div>

                                {/* Search Button */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide opacity-0">
                                        Search
                                    </label>
                                    <button
                                        onClick={handleSearch}
                                        className="w-full bg-linear-to-r from-[#FF8A65] to-[#FF7043] hover:from-[#FF7043] hover:to-[#F4511E] text-white font-bold text-sm py-3 px-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1 group"
                                    >
                                        <i className="ri-search-line text-lg group-hover:scale-110 transition-transform"></i>
                                        <span className="hidden xl:inline">Search</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Filters */}
                        <div className="mt-6 pt-5 border-t border-gray-100">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Quick Filters:</span>
                                <Link href="/jobs/listing?work_modes=Remote">
                                    <button
                                        className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-[#FF8A65] hover:text-white rounded-full transition-all"
                                    >
                                        Remote Jobs
                                    </button>
                                </Link>

                                <Link href="/jobs/listing?job_types=Full Time">
                                    <button

                                        className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-[#FF8A65] hover:text-white rounded-full transition-all"
                                    >
                                        Full Time
                                    </button>
                                </Link>

                                <Link href="/jobs/listing?job_types=Internship">
                                    <button

                                        className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-[#FF8A65] hover:text-white rounded-full transition-all"
                                    >
                                        Internship
                                    </button>

                                </Link>


                                <Link href="/jobs/listing?experience_levels=Fresher">
                                    <button

                                        className="px-4 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-[#FF8A65] hover:text-white rounded-full transition-all"
                                    >
                                        Fresher Jobs
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Popup (Rendered outside section to avoid z-index issues if needed, but here is fine with portal usually) */}
            {showFilters && (
                <JobFilterPopup
                    onClose={() => setShowFilters(false)}
                    onApply={handleApplyFilters}
                    initialFilters={advancedFilters}
                />
            )}
        </>
    );
}

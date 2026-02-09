"use client";

import { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { JobFilters } from './types';
import Link from 'next/link';

interface Job {
    id: number;
    title: string;
    company: string;
    salary: string;
    type: string;
    experience: string;
    qualification: string;
    location: string;
    postedTime: string;
}

interface JobListingsProps {
    filters: JobFilters;
}

export default function JobListings({ filters }: JobListingsProps) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    useEffect(() => {
        async function fetchJobsData() {
            setLoading(true);
            try {
                // Build API URL with filter parameters
                const params = new URLSearchParams();
                params.set('category_id', '7');
                params.set('per_page', itemsPerPage.toString());
                params.set('page', currentPage.toString());

                if (filters.search) params.set('search', filters.search);
                if (filters.location) params.set('location', filters.location);
                if (filters.qualification) params.set('qualification', filters.qualification);
                if (filters.keywords) params.set('keywords', filters.keywords);

                if (filters.jobType.length > 0) {
                    params.set('job_type', filters.jobType.join(','));
                }
                if (filters.experience.length > 0) {
                    params.set('experience', filters.experience.join(','));
                }
                if (filters.salaryRange > 0) {
                    params.set('min_salary', filters.salaryRange.toString());
                }
                if (filters.salaryRanges && filters.salaryRanges.length > 0) {
                    params.set('salary_ranges', filters.salaryRanges.join(','));
                }
                if (filters.workMode.length > 0) {
                    params.set('work_mode', filters.workMode.join(','));
                }
                if (filters.jobRoles && filters.jobRoles.length > 0) {
                    params.set('job_roles', filters.jobRoles.join(','));
                }

                const response = await fetch(`/api/products?${params.toString()}`);
                if (!response.ok) throw new Error('Failed to fetch data');

                const result = await response.json();
                const products = result.data || [];

                if (result.pagination) {
                    setTotalPages(result.pagination.total_pages);
                }

                // Transform API data to Job format
                const transformed: Job[] = products.map((product: any) => ({
                    id: product.id,
                    title: product.title,
                    company: product.product_attributes?.company || 'Company',
                    salary: product.product_attributes?.specs?.salary || `₹${product.price.toLocaleString('en-IN')}/month`,
                    type: product.product_attributes?.specs?.type || 'Full-time',
                    experience: product.product_attributes?.specs?.experience || 'N/A',
                    qualification: product.product_attributes?.specs?.qualification || 'Any',
                    location: product.product_attributes?.location || product.city || 'New Delhi',
                    postedTime: getTimeAgo(new Date(product.created_at))
                }));

                setJobs(transformed);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        // Add a small delay to avoid double fetch race conditions if filters change quickly, 
        // though standard debounce is handled in parent usually.
        fetchJobsData();
    }, [filters, currentPage]);

    function getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hr ago`;
        return 'just now';
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Optional: scroll to top of list
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="w-full">
            {/* Mobile Breadcrumbs */}
            <div className="md:hidden px-4 py-2 text-xs text-gray-500 bg-white border-b border-gray-50">
                <Link href="/" className="hover:text-brand-orange">Home</Link>
                <span className="mx-1">{'>'}</span>
                <span className="text-gray-900 front-medium">Jobs</span>
            </div>

            <div className="max-w-4xl mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm mt-4 md:mt-0 mx-4 md:mx-auto w-[calc(100%-2rem)] md:w-full">
                <div>
                    {/* Desktop Breadcrumbs (Hidden on mobile) */}
                    <div className="hidden md:flex items-center text-xs text-gray-500 mb-2">
                        <Link href="/" className="hover:text-brand-orange">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">Jobs</span>
                    </div>

                    <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                        Latest Openings
                    </h1>
                    <p className="text-xs md:text-sm text-gray-500 font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        {jobs.length} jobs found on this page
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="relative group w-full md:w-auto">
                    <select className="appearance-none w-full md:w-auto bg-gray-50 pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#FF8A65] focus:ring-1 focus:ring-[#FF8A65]/20 cursor-pointer transition-all hover:bg-white hover:border-gray-300">
                        <option>Sort by: Newest</option>
                        <option>Sort by: Salary (High)</option>
                        <option>Sort by: Experience</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-[#FF8A65] transition-colors"></i>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-0">
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading jobs...</p>
                    </div>
                )}

                {error && (
                    <div className="text-center py-12 text-red-600">
                        <p>Error: {error}</p>
                    </div>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <div className="text-center py-12 text-gray-600">
                        <p>No jobs found matching your filters.</p>
                    </div>
                )}

                {!loading && !error && jobs.map((job: Job) => (
                    <JobCard key={job.id} job={job} />
                ))}

                {/* Pagination Controls */}
                {!loading && !error && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8 mb-12">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#FF8A65] hover:border-[#FF8A65] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                        >
                            <i className="ri-arrow-left-s-line"></i> Previous
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-600">
                                Page <span className="text-gray-900 font-bold">{currentPage}</span> of <span className="text-gray-900 font-bold">{totalPages}</span>
                            </span>
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#FF8A65] hover:border-[#FF8A65] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                        >
                            Next <i className="ri-arrow-right-s-line"></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

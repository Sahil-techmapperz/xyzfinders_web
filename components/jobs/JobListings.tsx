"use client";

import { useState, use } from 'react';
import JobCard from './JobCard';
import { JobFilters } from './types';
import Link from 'next/link';
import { Product } from '@/types';
import { formatDate } from '@/lib/utils';

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
    jobsPromise: Promise<Product[]>;
    locationsPromise: Promise<{ name: string; active: boolean }[]>;
}

export default function JobListings({ filters, jobsPromise, locationsPromise }: JobListingsProps) {
    const products = use(jobsPromise);
    const initialLocations = use(locationsPromise);

    // Map API products to Job format
    const allJobs: Job[] = products.map(p => {
        let attributes: any = {};
        if (typeof p.product_attributes === 'string') {
            try {
                attributes = JSON.parse(p.product_attributes);
            } catch (e) {
                console.error('Failed to parse product_attributes', e);
            }
        } else if (typeof p.product_attributes === 'object') {
            attributes = p.product_attributes;
        }

        const specs = attributes.specs || {};

        return {
            id: p.id,
            title: p.title,
            company: attributes.company || 'Company',
            salary: specs.salary || `₹${p.price.toLocaleString()}/month`,
            type: specs.type || 'Full-time',
            experience: specs.experience || 'N/A',
            qualification: specs.qualification || 'Any',
            location: p.city ? `${p.city}, ${p.location?.state || ''}` : 'Unknown Location',
            postedTime: formatDate(p.created_at)
        };
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Client-side filtering based on filters prop
    const filteredJobs = allJobs.filter(job => {
        // Search filter
        if (filters.search && !job.title.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }

        // Location filter
        if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
            return false;
        }

        // Qualification filter
        if (filters.qualification && !job.qualification.toLowerCase().includes(filters.qualification.toLowerCase())) {
            return false;
        }

        // Keywords filter
        if (filters.keywords) {
            const keywords = filters.keywords.toLowerCase();
            if (!job.title.toLowerCase().includes(keywords) && !job.company.toLowerCase().includes(keywords)) {
                return false;
            }
        }

        // Job type filter
        if (filters.jobType.length > 0) {
            const matchesType = filters.jobType.some(type =>
                job.type.toLowerCase().includes(type.toLowerCase())
            );
            if (!matchesType) return false;
        }

        // Experience filter
        if (filters.experience.length > 0) {
            const matchesExp = filters.experience.some(exp =>
                job.experience.toLowerCase().includes(exp.toLowerCase())
            );
            if (!matchesExp) return false;
        }

        return true;
    });

    // Pagination
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
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
                        {filteredJobs.length} jobs found
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
                {currentJobs.map((job: Job) => (
                    <JobCard key={job.id} job={job} />
                ))}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 mb-12">
                        {/* Previous button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${currentPage === 1
                                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                    : 'text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                }`}
                        >
                            <i className="ri-arrow-left-s-line text-lg"></i>
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${currentPage === page
                                        ? 'bg-[#4A90E2] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-blue-50 hover:text-[#4A90E2]'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 transition-colors ${currentPage === totalPages
                                    ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
                                    : 'text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                }`}
                        >
                            <i className="ri-arrow-right-s-line text-lg"></i>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

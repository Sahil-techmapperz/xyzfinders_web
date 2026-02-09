"use client";

import Link from "next/link";

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

export default function JobCard({ job }: { job: Job }) {
    const createSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };
    const seoUrl = `/jobs/${job.id}-${createSlug(job.title)}`;

    // Generate random color for logo placeholder based on company name
    const colors = ['bg-blue-100 text-blue-600', 'bg-orange-100 text-orange-600', 'bg-purple-100 text-purple-600', 'bg-green-100 text-green-600', 'bg-pink-100 text-pink-600'];
    const colorIndex = job.company ? job.company.length % colors.length : 0;
    const logoColor = colors[colorIndex];
    const companyInitial = job.company ? job.company.charAt(0).toUpperCase() : 'C';

    return (
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 mb-4 md:mb-5 group relative overflow-hidden">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">

                {/* Logo Section */}
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold shrink-0 shadow-inner ${logoColor}`}>
                    {companyInitial}
                </div>

                {/* Content Section */}
                <div className="flex-1 w-full">
                    <div className="flex flex-wrap justify-between items-center gap-3 md:gap-4 mb-2">
                        <div className="flex-1">
                            <Link href={seoUrl} className="block group-hover:text-[#FF8A65] transition-colors">
                                <h3 className="text-base md:text-xl font-bold text-gray-900 line-clamp-2">
                                    {job.title}
                                </h3>
                            </Link>
                            <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
                                {job.company}
                            </p>
                        </div>
                        {/* Salary Badge */}
                        <div className="bg-green-50 text-green-700 font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg text-xs md:text-sm border border-green-100 whitespace-nowrap">
                            ₹ {job.salary}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 my-3 md:my-4">
                        <span className="bg-gray-50 text-gray-600 text-[10px] md:text-[11px] font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-gray-100 flex items-center gap-1.5">
                            <i className="ri-briefcase-line text-gray-400"></i> {job.type}
                        </span>
                        <span className="bg-gray-50 text-gray-600 text-[10px] md:text-[11px] font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-gray-100 flex items-center gap-1.5">
                            <i className="ri-user-star-line text-gray-400"></i> {job.experience}
                        </span>
                        <span className="bg-gray-50 text-gray-600 text-[10px] md:text-[11px] font-bold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-gray-100 flex items-center gap-1.5">
                            <i className="ri-graduation-cap-line text-gray-400"></i> {job.qualification}
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 font-medium">
                            <i className="ri-map-pin-line"></i>
                            <span className="truncate max-w-[120px] md:max-w-[150px]">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400">
                            <i className="ri-time-line"></i>
                            <span>Posted {job.postedTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Details Button (Desktop: Hover | Mobile: Always visible but small) */}
            <div className="hidden md:block absolute right-6 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={seoUrl} className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF8A65] text-white shadow-lg transform translate-x-4 group-hover:translate-x-0 transition-all">
                    <i className="ri-arrow-right-line"></i>
                </Link>
            </div>

            {/* Mobile Overlay Link for better touch target */}
            <Link href={seoUrl} className="md:hidden absolute inset-0 z-10" aria-label={`View details for ${job.title}`}></Link>
        </div>
    );
}

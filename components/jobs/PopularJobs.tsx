"use client";

import Link from 'next/link';
import { MOCK_JOBS } from '@/data/mock-data';

// Map category to icon and color
const getCategoryStyle = (category: string) => {
    const styles: Record<string, { icon: string; color: string }> = {
        'Sales': { icon: 'ri-briefcase-4-line', color: 'bg-red-50 text-red-400' },
        'IT': { icon: 'ri-code-s-slash-line', color: 'bg-blue-50 text-blue-400' },
        'Marketing': { icon: 'ri-megaphone-line', color: 'bg-orange-50 text-orange-400' },
        'HR': { icon: 'ri-user-star-line', color: 'bg-green-50 text-green-400' },
        'Content': { icon: 'ri-edit-line', color: 'bg-purple-50 text-purple-400' }
    };
    return styles[category] || { icon: 'ri-briefcase-line', color: 'bg-gray-50 text-gray-400' };
};

export default function PopularJobs() {
    return (
        <section className="container mx-auto px-4 py-16 bg-[#FFFBF0]">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Popular Job's</h2>
                <Link href="/jobs/listing" className="text-[#FF4D4D] font-bold text-sm hover:underline">
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_JOBS.slice(0, 4).map((job) => {
                    const createSlug = (text: string) =>
                        text
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, '');
                    const style = getCategoryStyle(job.category);
                    return (
                        <Link key={job.id} href={`/jobs/${job.id}-${createSlug(job.title)}`}>
                            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col h-full cursor-pointer">
                                {/* Icon Header */}
                                <div className="mb-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${style.color}`}>
                                        <i className={`${style.icon} text-2xl`}></i>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2">
                                    {job.title}
                                </h3>

                                {/* Tags Details */}
                                <div className="space-y-2 text-xs text-gray-500 mb-6 flex-1">
                                    <div className="flex items-center gap-2">
                                        <i className="ri-time-line"></i> {job.specs.type}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="ri-user-star-line"></i> {job.specs.experience}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <i className="ri-money-dollar-circle-line"></i>
                                        <span className="font-medium text-gray-700">{job.specs.salary}</span>
                                    </div>
                                </div>

                                {/* Location Footer */}
                                <div className="border-t border-gray-100 pt-3 mt-auto">
                                    <div className="flex items-start gap-1 text-[10px] text-gray-400">
                                        <i className="ri-map-pin-line mt-0.5"></i>
                                        <p className="leading-tight">{job.location}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

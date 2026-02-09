"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface JobDetailData {
    id: number;
    title: string;
    company: string;
    salary: string;
    location: string;
    type: string;
    experience: string;
    gender: string;
    qualification: string;
    applicants: string | number;
    postedTime: string;
    description: string;
    lookingFor: string;
    responsibilities: string[];
    benefits: string[];
}

export default function JobDetail({ id }: { id: string }) {
    const [job, setJob] = useState<JobDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        async function fetchJobDetail() {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    if (response.status === 404) throw new Error('Job not found');
                    throw new Error('Failed to fetch job details');
                }

                const result = await response.json();
                const data = result.data;

                // Transform API data
                const specs = data.product_attributes?.specs || {};
                const attributes = data.product_attributes || {};

                // Default benefits and responsibilities if not in data
                const defaultResponsibilities = [
                    "Plan, manage, and optimise social media marketing",
                    "Execute and monitor ad campaigns",
                    "Support SEO and SEM activities",
                    "Track, analyse, and report performance"
                ];

                const defaultBenefits = [
                    "Health Insurance",
                    "Provident Fund",
                    "Leave Encashment"
                ];

                setJob({
                    id: data.id,
                    title: data.title.toUpperCase(),
                    company: attributes.company || 'Unknown Company',
                    salary: specs.salary || 'Not Disclosed',
                    location: data.location || data.city || 'Location N/A',
                    type: specs.type || 'Full Time',
                    experience: specs.experience || 'Freshers',
                    gender: specs.gender || "Male/Female Candidate",
                    qualification: specs.qualification || 'Any Graduate',
                    applicants: attributes.applicants || Math.floor(Math.random() * 50) + 1,
                    postedTime: getTimeAgo(new Date(data.created_at)),
                    description: data.description || 'No description available.',
                    lookingFor: attributes.lookingFor || "We are looking to expand our team with a skilled and motivated professional.",
                    responsibilities: attributes.responsibilities || defaultResponsibilities,
                    benefits: attributes.benefits || defaultBenefits
                });

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }

        fetchJobDetail();
    }, [id]);

    function getTimeAgo(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
        return 'just now';
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <i className="ri-error-warning-line text-4xl text-red-500 mb-2"></i>
                <p className="text-gray-800 font-bold text-lg mb-2">{error || 'Job not found'}</p>
                <Link href="/jobs" className="text-blue-500 underline font-medium">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <section className="container mx-auto px-4 py-8 pb-8 min-h-screen font-jost">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Job Content */}
                <div className="lg:col-span-2 bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-100">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6 relative">
                        <div className="flex-1 pr-12 md:pr-0">
                            <h1 className="text-xl md:text-3xl font-extrabold text-gray-900 mb-2 uppercase leading-tight">
                                {job.title}
                            </h1>
                            <p className="text-gray-500 font-bold underline cursor-pointer hover:text-[#FF8A65] text-sm md:text-base">
                                {job.company}
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 md:relative md:top-auto md:right-auto flex gap-3 shrink-0">
                            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition shadow-sm">
                                <i className="ri-heart-line text-sm md:text-lg"></i>
                            </button>
                            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition shadow-sm">
                                <i className="ri-share-line text-sm md:text-lg"></i>
                            </button>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        {/* Row 1 */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-sm">
                                <i className="ri-wallet-3-line text-lg"></i>
                            </div>
                            <span className="font-semibold text-gray-800">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-sm">
                                <i className="ri-map-pin-line text-lg"></i>
                            </div>
                            <span className="leading-tight font-medium">{job.location}</span>
                        </div>

                        {/* Row 2 */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-sm">
                                <i className="ri-time-line text-lg"></i>
                            </div>
                            <span className="font-medium">{job.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-sm">
                                <i className="ri-briefcase-line text-lg"></i>
                            </div>
                            <span className="font-medium">{job.experience}</span>
                        </div>

                        {/* Row 3 */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-sm">
                                <i className="ri-user-line text-lg"></i>
                            </div>
                            <span className="font-medium">{job.gender}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-sm">
                                <i className="ri-graduation-cap-line text-lg"></i>
                            </div>
                            <span className="font-medium">{job.qualification}</span>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 mb-6 sm:mb-8 border-b border-gray-100 pb-6 sm:pb-8">
                        <button className="w-full sm:w-auto bg-[#FF8A65] hover:bg-[#FF7043] text-white font-bold py-2.5 sm:py-3.5 px-6 sm:px-8 rounded-xl shadow-lg shadow-orange-100 transition transform active:scale-95 text-center text-sm sm:text-base">
                            Apply Now
                        </button>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-[#FF8A65] transition font-medium text-xs sm:text-sm">
                                <i className="ri-bookmark-line text-base sm:text-lg"></i>
                                Save Job
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-[#FF8A65] transition font-medium text-xs sm:text-sm">
                                <i className="ri-share-line text-base sm:text-lg"></i>
                                Share
                            </button>
                        </div>
                    </div>

                    {/* Job Details Content */}
                    <div className="space-y-8 text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <i className="ri-file-list-3-line text-[#FF8A65]"></i> Job Description
                            </h2>
                            <p className="text-sm md:text-base text-gray-600 bg-gray-50/50 p-4 rounded-xl border border-gray-50">
                                {job.description}
                            </p>
                            <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100 text-sm md:text-base text-gray-700 italic">
                                "{job.lookingFor}"
                            </div>
                        </div>

                        {job.responsibilities.length > 0 && (
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="ri-task-line text-[#FF8A65]"></i> Key Responsibilities
                                </h3>
                                <ul className="space-y-3">
                                    {job.responsibilities.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group">
                                            <i className="ri-checkbox-circle-line text-[#FF8A65] mt-1 shrink-0 group-hover:scale-110 transition-transform"></i>
                                            <span className="text-sm md:text-base text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {job.benefits.length > 0 && (
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="ri-gift-line text-[#FF8A65]"></i> Benefits & Perks
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {job.benefits.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors border border-gray-100 hover:border-orange-100 group">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF8A65] shadow-xs group-hover:bg-[#FF8A65] group-hover:text-white transition-colors">
                                                <i className="ri-star-smile-line"></i>
                                            </div>
                                            <span className="text-sm md:text-base font-medium text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column: Sidebar Ads */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <div className="bg-gray-100 w-full rounded-xl flex flex-col items-center justify-center text-gray-400 font-bold border border-gray-200 min-h-[400px] p-8 text-center gap-4">
                            <i className="ri-advertisement-line text-4xl"></i>
                            <div>
                                <p className="text-lg text-gray-500">Structured Ad Space</p>
                                <p className="text-xs font-normal mt-2 text-gray-400">Perfect for targeted recruitment campaigns</p>
                            </div>
                            <button className="mt-4 text-xs bg-white px-4 py-2 rounded-lg text-gray-500 hover:text-[#FF8A65] transition shadow-sm">
                                Advertise Here
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        </section >
    );
}

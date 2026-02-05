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
        <section className="container mx-auto px-4 py-8  min-h-screen font-jost">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Job Content */}
                <div className="lg:col-span-2  rounded-xl p-6 md:p-8 ">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 uppercase">
                                {job.title}
                            </h1>
                            <p className="text-gray-500 font-bold underline cursor-pointer hover:text-[#FF8A65]">
                                {job.company}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="w-10 h-10 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition">
                                <i className="ri-heart-line text-lg"></i>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition">
                                <i className="ri-share-line text-lg"></i>
                            </button>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-sm text-gray-600">
                        {/* Row 1 */}
                        <div className="flex items-start gap-3">
                            <i className="ri-wallet-3-line text-lg text-gray-400"></i>
                            <span className="font-semibold">{job.salary}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <i className="ri-map-pin-line text-lg text-gray-400"></i>
                            <span className="leading-tight">{job.location}</span>
                        </div>

                        {/* Row 2 */}
                        <div className="flex items-start gap-3">
                            <i className="ri-time-line text-lg text-gray-400"></i>
                            <span>{job.type}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <i className="ri-briefcase-line text-lg text-gray-400"></i>
                            <span>{job.experience}</span>
                        </div>

                        {/* Row 3 */}
                        <div className="flex items-start gap-3">
                            <i className="ri-user-line text-lg text-gray-400"></i>
                            <span>{job.gender}</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <i className="ri-graduation-cap-line text-lg text-gray-400"></i>
                            <span>{job.qualification}</span>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 border-b border-gray-100 pb-8">
                        <button className="bg-[#FF8A65] hover:bg-[#FF7043] text-white font-bold py-3 px-8 rounded shadow-lg transition transform active:scale-95">
                            Apply
                        </button>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                            {job.applicants} Applicant
                        </div>
                        <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Posted {job.postedTime}
                        </div>
                    </div>

                    {/* Job Details Content */}
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Job Details</h2>
                            <p className="mb-4 text-sm">{job.description}</p>
                            <p className="text-sm">{job.lookingFor}</p>
                        </div>

                        {job.responsibilities.length > 0 && (
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Key Responsibilities:</h3>
                                <ul className="list-disc pl-5 space-y-1 text-sm marker:text-gray-400">
                                    {job.responsibilities.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {job.benefits.length > 0 && (
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">Benefits</h3>
                                <ul className="list-disc pl-5 space-y-1 text-sm marker:text-gray-400">
                                    {job.benefits.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>

                {/* Right Column: Sidebar Ads */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-full rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300 min-h-[500px]">
                        Google Ads
                    </div>

                </div>

            </div>
        </section>
    );
}

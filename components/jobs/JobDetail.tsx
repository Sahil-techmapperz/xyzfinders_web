"use client";

import { useState } from 'react';
import Link from 'next/link';

// Mock Data for a single job (matching the reference image)
const JOB_DETAIL = {
    id: 1,
    title: "OPERATION EXECUTIVE / SALES COORDINATOR",
    company: "Company Name",
    salary: "17,000 - 23,000/ Month",
    location: "Tower B4, SPAZE ITECH PARK, UN 616, Badshahpur Sohna Rd, Sector 49, Gurugram, Haryana...",
    type: "Full-time",
    experience: "1-2 Years",
    gender: "Male/Female Candidate",
    qualification: "Bachelors Degree",
    applicants: 156,
    postedTime: "14hr ago",
    description: "DTC Group is a diversified conglomerate with operations across real estate development, mining, construction chemicals, and interior design. With over 65 lakh square feet of developed and ongoing projects, the Group is steadily strengthening its digital presence to support brand building and lead generation across business verticals.",
    lookingFor: "We are looking to expand our in-house digital marketing team with a skilled and motivated professional.",
    responsibilities: [
        "Plan, manage, and optimise social media marketing across LinkedIn, Instagram, and Facebook",
        "Execute and monitor Google Ads and Meta (Facebook/Instagram) Ads campaigns",
        "Support SEO and SEM activities, including keyword research and on-page optimisation",
        "Track, analyse, and report performance using Google Analytics and platform insights",
        "Assist in content planning for digital campaigns and brand communication",
        "Coordinate with internal teams and external agencies for campaign execution",
        "Stay updated with current digital marketing trends and best practices"
    ],
    benefits: [
        "Cell Phone Reimbursement",
        "Commuter Assistance",
        "Health Insurance",
        "Internet Reimbursement",
        "Leave Encashment",
        "Life Insurance",
        "Provident Fund"
    ]
};

export default function JobDetail({ id }: { id: string }) {
    // In a real app, use id to fetch data. Using mock data for now.
    const job = JOB_DETAIL;

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

                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Key Responsibilities:</h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm marker:text-gray-400">
                                {job.responsibilities.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">Benefits</h3>
                            <ul className="list-disc pl-5 space-y-1 text-sm marker:text-gray-400">
                                {job.benefits.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Right Column: Sidebar Ads */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-full rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                    
                </div>

            </div>
        </section>
    );
}

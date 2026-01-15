"use client";

import Link from 'next/link';

// Mock Data
const POPULAR_JOBS = [
    {
        id: 1,
        title: "Sales Marketing Executive",
        type: "Fulltime",
        experience: "2-3 Year",
        salary: "10,000 - 15,000",
        location: "New Sabji Mandi Teacher Colony Kashipur, New Delhi - India",
        icon: "ri-briefcase-4-line",
        color: "bg-red-50 text-red-400"
    },
    {
        id: 2,
        title: "Accounts",
        type: "Fulltime",
        experience: "5-7 Year",
        salary: "25,000 - 35,000",
        location: "New Sabji Mandi Teacher Colony Kashipur, New Delhi - India",
        icon: "ri-calculator-line",
        color: "bg-orange-50 text-orange-400"
    },
    {
        id: 3,
        title: "Software Development Engineer",
        type: "Fulltime",
        experience: "7-10 Year",
        salary: "50,000 - 60,000",
        location: "New Sabji Mandi Teacher Colony Kashipur, New Delhi - India",
        icon: "ri-code-s-slash-line",
        color: "bg-blue-50 text-blue-400"
    },
    {
        id: 4,
        title: "Kitchen Staff",
        type: "Fulltime",
        experience: "2-3 Year",
        salary: "10,000 - 15,000",
        location: "New Sabji Mandi Teacher Colony Kashipur, New Delhi - India",
        icon: "ri-restaurant-2-line",
        color: "bg-green-50 text-green-400"
    }
];

export default function PopularJobs() {
    return (
        <section className="container mx-auto px-4 py-16 bg-[#FFFBF0]">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Popular Job's</h2>
                <Link href="/jobs/all" className="text-[#FF4D4D] font-bold text-sm hover:underline">
                    View All
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {POPULAR_JOBS.map((job) => (
                    <div key={job.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col h-full">
                        {/* Icon Header */}
                        <div className="mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${job.color}`}>
                                <i className={`${job.icon} text-2xl`}></i>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-bold text-gray-900 text-lg mb-4 line-clamp-2">
                            {job.title}
                        </h3>

                        {/* Tags Details */}
                        <div className="space-y-2 text-xs text-gray-500 mb-6 flex-1">
                            <div className="flex items-center gap-2">
                                <i className="ri-time-line"></i> {job.type}
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-user-star-line"></i> {job.experience}
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-money-dollar-circle-line"></i>
                                <span className="font-medium text-gray-700">₹ {job.salary}</span>
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
                ))}
            </div>
        </section>
    );
}

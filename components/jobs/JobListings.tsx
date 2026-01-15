"use client";

import JobCard from './JobCard';
import GoogleAdBanner from '../home/GoogleAdBanner';

// Mock Data matching the design style
const JOBS_DATA = [
    {
        id: 1,
        title: "Operation Executive / Sales Coordinator",
        company: "Tech Solutions Ltd.",
        salary: "12,000 - 17,000",
        type: "Full - Time",
        experience: "1-2 Years",
        qualification: "Bachelors Degree",
        location: "Tower B4, SPAZE ITECH PARK, UN 616, Badshahpur Sohna Rd, Sector 49, Gurugram, Haryana...",
        postedTime: "14 hr ago"
    },
    {
        id: 2,
        title: "Senior Business Development Executive",
        company: "Growth Hacking Inc.",
        salary: "20,000 - 35,000",
        type: "Full - Time",
        experience: "2-4 Years",
        qualification: "MBA / PGDM",
        location: "Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana 122002",
        postedTime: "8 days ago"
    },
    {
        id: 3,
        title: "Digital Marketing Specialist",
        company: "Creative Agency",
        salary: "15,000 - 25,000",
        type: "Part - Time",
        experience: "0-1 Years",
        qualification: "Diploma / Certification",
        location: "Sector 18, Noida, Uttar Pradesh, India",
        postedTime: "2 days ago"
    },
    {
        id: 4,
        title: "Human Resources (HR) Intern",
        company: "Corporate Services",
        salary: "8,000 - 10,000",
        type: "Internship",
        experience: "Fresher",
        qualification: "BBA / MBA Pursuing",
        location: "Connaught Place, New Delhi, Delhi 110001",
        postedTime: "1 day ago"
    },
    {
        id: 5,
        title: "Customer Support Representative",
        company: "Global BPO",
        salary: "18,000 - 22,000",
        type: "Full - Time",
        experience: "0-2 Years",
        qualification: "12th Pass / Graduate",
        location: "Okhla Industrial Estate, Phase III, New Delhi",
        postedTime: "Just now"
    }
];

export default function JobListings() {
    return (
        <section className="container mx-auto px-4 py-8 bg-[#FFFBF0] min-h-screen">

            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Sales / Business Development Jobs, New Delhi
                </h1>

                {/* Pill Filters */}
                <div className="flex items-center flex-wrap gap-2 text-xs">
                    <span className="font-bold text-gray-800 mr-2">Job Roles :-</span>

                    <button className="px-3 py-1.5 bg-[#FF8A65] text-white rounded-full font-bold flex items-center gap-1 shadow-sm transition hover:bg-[#FF7043]">
                        Business Development <i className="ri-close-line"></i>
                    </button>

                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full hover:border-[#FF8A65] hover:text-[#FF8A65] transition">
                        Retails Sales (+45)
                    </button>

                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full hover:border-[#FF8A65] hover:text-[#FF8A65] transition">
                        Field Sales (+12)
                    </button>

                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full hover:border-[#FF8A65] hover:text-[#FF8A65] transition">
                        Sale Coordinator (+56)
                    </button>

                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-500 rounded-full hover:border-[#FF8A65] hover:text-[#FF8A65] transition">
                        IT Sales (+98)
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Listings */}
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {JOBS_DATA.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-10 flex items-center justify-center gap-2">
                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            <i className="ri-arrow-left-s-line text-lg"></i>
                        </button>

                        <button className="w-10 h-10 rounded-full bg-[#FF8A65] text-white font-bold flex items-center justify-center shadow-md">
                            1
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            2
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            3
                        </button>

                        <span className="text-gray-400 px-2">...</span>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 font-medium hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            10
                        </button>

                        <button className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-500 hover:border-[#FF8A65] hover:text-[#FF8A65] flex items-center justify-center transition shadow-sm">
                            <i className="ri-arrow-right-s-line text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Right Column: Google Ads */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                    <div className="bg-gray-200 w-full h-[600px] rounded-xl flex items-center justify-center text-gray-400 font-bold text-xl border border-gray-300">
                        Google Ads
                    </div>
                </div>

            </div>
        </section>
    );
}

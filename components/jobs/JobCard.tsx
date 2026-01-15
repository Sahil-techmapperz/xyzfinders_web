"use client";

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
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 mb-4">

            {/* Title & Company */}
            <h3 className="text-xl font-bold text-gray-800 mb-1 uppercase tracking-wide">
                {job.title}
            </h3>
            <p className="text-sm text-gray-500 font-medium underline mb-4 hover:text-brand-orange cursor-pointer">
                {job.company}
            </p>

            {/* Salary */}
            <div className="flex items-center gap-2 mb-6">
                <i className="ri-money-dollar-circle-fill text-gray-400 text-lg"></i>
                <span className="text-gray-900 font-extrabold text-lg">₹ {job.salary}</span>
                <span className="text-xs text-gray-400">/ Monthly</span>
            </div>

            {/* Tags Grid */}
            <div className="flex flex-wrap gap-4 mb-6">
                {/* Type */}
                <div className="bg-[#FF8A65] text-white rounded-lg px-4 py-2 min-w-[140px]">
                    <span className="block text-[10px] uppercase opacity-90 font-semibold mb-0.5">Employment Type</span>
                    <span className="block text-xs font-bold uppercase">{job.type}</span>
                </div>

                {/* Experience */}
                <div className="bg-[#FF8A65] text-white rounded-lg px-4 py-2 min-w-[140px]">
                    <span className="block text-[10px] uppercase opacity-90 font-semibold mb-0.5">Min. Work Experience</span>
                    <span className="block text-xs font-bold uppercase">{job.experience}</span>
                </div>

                {/* Qualification */}
                <div className="bg-[#FF8A65] text-white rounded-lg px-4 py-2 min-w-[140px]">
                    <span className="block text-[10px] uppercase opacity-90 font-semibold mb-0.5">Min. Qualification Level</span>
                    <span className="block text-xs font-bold uppercase">{job.qualification}</span>
                </div>
            </div>

            {/* Footer: Location & Posted Time */}
            <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2 text-xs text-gray-600 font-bold">
                    <i className="ri-map-pin-line mt-0.5 text-gray-400"></i>
                    <p className="opacity-80 leading-relaxed">{job.location}</p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    <span className="text-[10px] text-green-600 font-bold">Posted {job.postedTime}</span>
                </div>
            </div>
        </div>
    );
}

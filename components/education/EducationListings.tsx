"use client";

import EducationCard, { EducationData } from './EducationCard';

const EDUCATION_DATA: EducationData[] = [
    {
        id: 1,
        title: "Mathematics & Science Tuition (Class 9-10)",
        category: "Tuition",
        subject: "Maths & Science",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
        description: "Experienced tutor with 10+ years of experience. Focus on concept building and exam preparation. Weekly tests and doubt sessions.",
        specs: {
            mode: "Offline/Home",
            level: "High School",
            duration: "Monthly",
            language: "English"
        },
        fees: "₹ 3,500/-",
        location: "Dwarka Sector 12, New Delhi",
        postedTime: "Posted 2 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "IELTS & TOEFL Coaching - Guaranteed 7+ Band",
        category: "Exam Prep",
        subject: "English",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        description: "Comprehensive coaching for IELTS/TOEFL. Study material included. Mock tests every weekend. Flexible timings.",
        specs: {
            mode: "Online/Offline",
            level: "Professional",
            duration: "3 Months",
            language: "English"
        },
        fees: "₹ 12,000/-",
        location: "Rajouri Garden, New Delhi",
        postedTime: "Posted 5 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Personal Fitness Trainer Certification Course",
        category: "Vocational",
        subject: "Fitness",
        image: "https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2070&auto=format&fit=crop",
        description: "Become a certified fitness trainer. Practical training included. Job placement assistance provided after course completion.",
        specs: {
            mode: "Offline",
            level: "Adult",
            duration: "6 Months",
            language: "English/Hindi"
        },
        fees: "₹ 45,000/-",
        location: "Saket, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: false,
        premium: false
    },
    {
        id: 4,
        title: "French Language Classes for Beginners",
        category: "Language",
        subject: "French",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
        description: "Learn French from a level A1 certified trainer. Small batch size for personal attention. Weekend classes available.",
        specs: {
            mode: "Online",
            level: "Beginner",
            duration: "3 Months",
            language: "French"
        },
        fees: "₹ 8,000/-",
        location: "Vasant Kunj, New Delhi",
        postedTime: "Posted 3 days ago",
        verified: true,
        premium: false
    }
];

const LOCATIONS = [
    { name: "South Delhi", active: true },
    { name: "North Delhi", active: false },
    { name: "West Delhi", active: false },
    { name: "East Delhi", active: false },
    { name: "Noida", active: false },
    { name: "Gurugram", active: false },
];

export default function EducationListings() {
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header / Titles */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Education & Learning in New Delhi - <span className="text-gray-500 font-normal">850 results</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Newest First <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Location :</span>
                    <div className="flex flex-wrap gap-2">
                        {LOCATIONS.map((loc, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${loc.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#FF8A65]"
                                    }`}
                            >
                                {loc.name}
                                {loc.active && <i className="ri-close-line"></i>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {EDUCATION_DATA.map(item => (
                        <EducationCard key={item.id} item={item} />
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-left-double-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white font-bold rounded-lg shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">2</button>
                        <span className="text-gray-300">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-right-double-line"></i></button>
                    </div>
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">RECOMMENDED</div>
                            <div className="text-xs text-gray-400 mb-8">Featured Institutes</div>

                            {/* Styled Ad Content */}
                            <div className="bg-[#1E88E5] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-white drop-shadow-sm">
                                    Learn<br />Code,<br />Create
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-white text-[#1E88E5] font-bold py-3 rounded-lg shadow-lg hover:bg-[#E3F2FD] transition-colors">
                                        Join Bootcamp
                                    </button>
                                </div>

                                {/* Abstract shapes/image placeholder */}
                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#1565C0] to-[#1E88E5]">
                                        {/* Mock Coding Image */}
                                        <img src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

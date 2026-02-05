"use client";

import { JobFilters } from './types';

interface JobSidebarProps {
    filters: JobFilters;
    setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
}

export default function JobSidebar({ filters, setFilters }: JobSidebarProps) {

    const handleCheckboxChange = (category: keyof JobFilters, value: string) => {
        setFilters(prev => {
            const currentValues = prev[category] as string[];
            if (currentValues.includes(value)) {
                return { ...prev, [category]: currentValues.filter(item => item !== value) };
            } else {
                return { ...prev, [category]: [...currentValues, value] };
            }
        });
    };

    const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, salaryRange: Number(e.target.value) }));
    };

    const clearAllMatches = () => {
        setFilters({
            jobType: [],
            experience: [],
            salaryRange: 0,
            workMode: []
        });
    }

    const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-8 last:mb-0">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">{title}</h3>
            {children}
        </div>
    );

    const CheckboxOption = ({ label, category }: { label: string, category: keyof JobFilters }) => {
        const isChecked = (filters[category] as string[]).includes(label);
        return (
            <label className="flex items-center gap-3 cursor-pointer group mb-3 last:mb-0">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCheckboxChange(category, label)}
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded checked:bg-[#FF8A65] checked:border-[#FF8A65] transition-colors"
                    />
                    <i className="ri-check-line absolute text-white text-sm opacity-0 peer-checked:opacity-100 left-0.5 transition-opacity"></i>
                </div>
                <span className={`text-sm transition-colors flex-1 ${isChecked ? 'text-gray-900 font-bold' : 'text-gray-600 group-hover:text-gray-900'}`}>{label}</span>
            </label>
        );
    };

    return (
        <div className="space-y-8">
            {/* Filters Container */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <i className="ri-filter-3-line text-[#FF8A65]"></i> Filters
                    </h2>
                    <button onClick={clearAllMatches} className="text-xs text-gray-500 hover:text-[#FF8A65] font-medium transition-colors">
                        Clear All
                    </button>
                </div>

                {/* Job Type */}
                <FilterSection title="Job Type">
                    <CheckboxOption label="Full Time" category="jobType" />
                    <CheckboxOption label="Part Time" category="jobType" />
                    <CheckboxOption label="Internship" category="jobType" />
                    <CheckboxOption label="Freelance" category="jobType" />
                    <CheckboxOption label="Contract" category="jobType" />
                </FilterSection>

                {/* Experience */}
                <FilterSection title="Experience">
                    <CheckboxOption label="Fresher" category="experience" />
                    <CheckboxOption label="1-3 Years" category="experience" />
                    <CheckboxOption label="3-5 Years" category="experience" />
                    <CheckboxOption label="5-10 Years" category="experience" />
                    <CheckboxOption label="10+ Years" category="experience" />
                </FilterSection>

                {/* Salary Range */}
                <FilterSection title="Min Salary (LPA)">
                    <div className="px-2">
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={filters.salaryRange}
                            onChange={handleSalaryChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF8A65]"
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-600 font-medium">
                            <span>0</span>
                            <span className="text-[#FF8A65] font-bold">{filters.salaryRange} LPA</span>
                            <span>50+</span>
                        </div>
                    </div>
                </FilterSection>

                {/* Work Mode */}
                <FilterSection title="Work Mode">
                    <div className="flex gap-2">
                        {['On-site', 'Remote', 'Hybrid'].map((mode) => {
                            const isSelected = filters.workMode.includes(mode);
                            return (
                                <button
                                    key={mode}
                                    onClick={() => handleCheckboxChange('workMode', mode)}
                                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-colors ${isSelected
                                        ? 'bg-orange-50 border-[#FF8A65] text-[#FF8A65]'
                                        : 'border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]'
                                        }`}
                                >
                                    {mode}
                                </button>
                            );
                        })}
                    </div>
                </FilterSection>
            </div>

            {/* Google Advertisement Section */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 overflow-hidden relative group">
                <div className="absolute top-2 right-2 bg-gray-100 text-[10px] text-gray-500 px-1.5 rounded">Ad</div>

                <div className="flex flex-col items-center text-center mt-4">
                    <div className="w-16 h-16 bg-[#E3F2FD] rounded-full flex items-center justify-center mb-4 text-blue-500">
                        <i className="ri-google-fill text-3xl"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Boost Your Skills</h3>
                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                        Master the latest technologies with Premium Courses. Get certified today!
                    </p>
                    <button className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white text-sm font-bold py-2.5 rounded-xl transition-colors">
                        Learn More
                    </button>
                    <div className="hidden"></div>
                </div>
            </div>

            <div className="bg-linear-to-br from-[#FF8A65] to-[#FF7043] rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
                <i className="ri-briefcase-4-line absolute -bottom-4 -right-4 text-9xl opacity-20"></i>
                <h3 className="font-bold text-xl mb-2 relative z-10">Hiring?</h3>
                <p className="text-sm opacity-90 mb-4 relative z-10">Post a job today and find the perfect candidate.</p>
                <button className="bg-white text-[#FF7043] font-bold text-sm py-2 px-6 rounded-lg shadow-sm hover:shadow-md transition relative z-10">
                    Post a Job
                </button>
            </div>
        </div>
    );
}

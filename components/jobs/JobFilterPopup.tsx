"use client";

import { useState } from 'react';

interface JobFilterPopupProps {
    onClose: () => void;
    onApply: (filters: AdvancedFilters) => void;
    initialFilters?: AdvancedFilters;
}

export interface AdvancedFilters {
    keywords: string;
    jobTypes: string[];
    experienceLevels: string[];
    salaryRanges: string[];
    workModes: string[];
    jobRoles: string[];
}

export default function JobFilterPopup({ onClose, onApply, initialFilters }: JobFilterPopupProps) {
    const [filters, setFilters] = useState<AdvancedFilters>(initialFilters || {
        keywords: '',
        jobTypes: [],
        experienceLevels: [],
        salaryRanges: [],
        workModes: [],
        jobRoles: []
    });

    const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">{title}</h3>
            {children}
        </div>
    );

    const PillOption = ({
        label,
        active = false,
        onClick
    }: {
        label: string;
        active?: boolean;
        onClick?: () => void;
    }) => (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${active
                ? "border-[#FF8A65] text-[#FF8A65] bg-orange-50"
                : "border-gray-200 text-gray-600 hover:border-[#FF8A65] hover:text-[#FF8A65]"
                }`}
        >
            {label}
        </button>
    );

    const toggleFilter = (category: keyof AdvancedFilters, value: string) => {
        if (category === 'keywords') return;

        setFilters(prev => {
            const currentArray = prev[category] as string[];
            const newArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value];

            return { ...prev, [category]: newArray };
        });
    };

    const handleClear = () => {
        setFilters({
            keywords: '',
            jobTypes: [],
            experienceLevels: [],
            salaryRanges: [],
            workModes: [],
            jobRoles: []
        });
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="w-[90%] md:w-[600px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col font-jost overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Filter Jobs</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">

                    {/* Keywords */}
                    <FilterSection title="Keywords/Skills">
                        <div className="relative">
                            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Java, React, Design..."
                                value={filters.keywords}
                                onChange={(e) => setFilters({ ...filters, keywords: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#FF8A65] focus:ring-1 focus:ring-[#FF8A65]/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Job Type */}
                    <FilterSection title="Job Type">
                        <div className="flex flex-wrap gap-3">
                            <PillOption
                                label="Full Time"
                                active={filters.jobTypes.includes("Full Time")}
                                onClick={() => toggleFilter('jobTypes', 'Full Time')}
                            />
                            <PillOption
                                label="Part Time"
                                active={filters.jobTypes.includes("Part Time")}
                                onClick={() => toggleFilter('jobTypes', 'Part Time')}
                            />
                            <PillOption
                                label="Contract"
                                active={filters.jobTypes.includes("Contract")}
                                onClick={() => toggleFilter('jobTypes', 'Contract')}
                            />
                            <PillOption
                                label="Freelance"
                                active={filters.jobTypes.includes("Freelance")}
                                onClick={() => toggleFilter('jobTypes', 'Freelance')}
                            />
                            <PillOption
                                label="Internship"
                                active={filters.jobTypes.includes("Internship")}
                                onClick={() => toggleFilter('jobTypes', 'Internship')}
                            />
                        </div>
                    </FilterSection>

                    {/* Experience */}
                    <FilterSection title="Experience Level">
                        <div className="flex flex-wrap gap-3">
                            <PillOption
                                label="Fresher"
                                active={filters.experienceLevels.includes("Fresher")}
                                onClick={() => toggleFilter('experienceLevels', 'Fresher')}
                            />
                            <PillOption
                                label="1-3 Years"
                                active={filters.experienceLevels.includes("1-3 Years")}
                                onClick={() => toggleFilter('experienceLevels', '1-3 Years')}
                            />
                            <PillOption
                                label="3-5 Years"
                                active={filters.experienceLevels.includes("3-5 Years")}
                                onClick={() => toggleFilter('experienceLevels', '3-5 Years')}
                            />
                            <PillOption
                                label="5-10 Years"
                                active={filters.experienceLevels.includes("5-10 Years")}
                                onClick={() => toggleFilter('experienceLevels', '5-10 Years')}
                            />
                            <PillOption
                                label="10+ Years"
                                active={filters.experienceLevels.includes("10+ Years")}
                                onClick={() => toggleFilter('experienceLevels', '10+ Years')}
                            />
                        </div>
                    </FilterSection>

                    {/* Salary Range */}
                    <FilterSection title="Salary Range (per annum)">
                        <div className="flex flex-wrap gap-3">
                            <PillOption
                                label="Under 3L"
                                active={filters.salaryRanges.includes("Under 3L")}
                                onClick={() => toggleFilter('salaryRanges', 'Under 3L')}
                            />
                            <PillOption
                                label="3L - 6L"
                                active={filters.salaryRanges.includes("3L - 6L")}
                                onClick={() => toggleFilter('salaryRanges', '3L - 6L')}
                            />
                            <PillOption
                                label="6L - 10L"
                                active={filters.salaryRanges.includes("6L - 10L")}
                                onClick={() => toggleFilter('salaryRanges', '6L - 10L')}
                            />
                            <PillOption
                                label="10L - 15L"
                                active={filters.salaryRanges.includes("10L - 15L")}
                                onClick={() => toggleFilter('salaryRanges', '10L - 15L')}
                            />
                            <PillOption
                                label="15L - 25L"
                                active={filters.salaryRanges.includes("15L - 25L")}
                                onClick={() => toggleFilter('salaryRanges', '15L - 25L')}
                            />
                            <PillOption
                                label="25L+"
                                active={filters.salaryRanges.includes("25L+")}
                                onClick={() => toggleFilter('salaryRanges', '25L+')}
                            />
                        </div>
                    </FilterSection>

                    {/* Work Mode */}
                    <FilterSection title="Work Mode">
                        <div className="flex gap-3">
                            <PillOption
                                label="On-site"
                                active={filters.workModes.includes("On-site")}
                                onClick={() => toggleFilter('workModes', 'On-site')}
                            />
                            <PillOption
                                label="Remote"
                                active={filters.workModes.includes("Remote")}
                                onClick={() => toggleFilter('workModes', 'Remote')}
                            />
                            <PillOption
                                label="Hybrid"
                                active={filters.workModes.includes("Hybrid")}
                                onClick={() => toggleFilter('workModes', 'Hybrid')}
                            />
                        </div>
                    </FilterSection>

                    {/* Roles */}
                    <FilterSection title="Job Roles">
                        <div className="flex flex-wrap gap-3">
                            <PillOption
                                label="Developer"
                                active={filters.jobRoles.includes("Developer")}
                                onClick={() => toggleFilter('jobRoles', 'Developer')}
                            />
                            <PillOption
                                label="Designer"
                                active={filters.jobRoles.includes("Designer")}
                                onClick={() => toggleFilter('jobRoles', 'Designer')}
                            />
                            <PillOption
                                label="Marketing"
                                active={filters.jobRoles.includes("Marketing")}
                                onClick={() => toggleFilter('jobRoles', 'Marketing')}
                            />
                            <PillOption
                                label="Sales"
                                active={filters.jobRoles.includes("Sales")}
                                onClick={() => toggleFilter('jobRoles', 'Sales')}
                            />
                            <PillOption
                                label="HR"
                                active={filters.jobRoles.includes("HR")}
                                onClick={() => toggleFilter('jobRoles', 'HR')}
                            />
                            <PillOption
                                label="Management"
                                active={filters.jobRoles.includes("Management")}
                                onClick={() => toggleFilter('jobRoles', 'Management')}
                            />
                        </div>
                    </FilterSection>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex gap-4">
                    <button
                        onClick={handleClear}
                        className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 py-3 bg-[#FF8A65] hover:bg-[#FF7043] text-white rounded-lg font-bold shadow-md transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>

            </div>
        </div>
    );
}

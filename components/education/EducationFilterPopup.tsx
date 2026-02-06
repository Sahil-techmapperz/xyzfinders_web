"use client";

export default function EducationFilterPopup({ onClose }: { onClose: () => void }) {

    const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">{title}</h3>
            {children}
        </div>
    );

    const PillOption = ({ label, active = false }: { label: string, active?: boolean }) => (
        <button className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors ${active
            ? "border-brand-orange text-brand-orange bg-orange-50"
            : "border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange"
            }`}>
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div
                className="w-[90%] md:w-[600px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col font-jost overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Filter Education</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">

                    {/* Keywords */}
                    <FilterSection title="Keywords">
                        <div className="relative">
                            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search courses, institutes..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Course Type */}
                    <FilterSection title="Course Type">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="All" active />
                            <PillOption label="University Degree" />
                            <PillOption label="Diploma" />
                            <PillOption label="Certification" />
                            <PillOption label="Short Course" />
                            <PillOption label="Workshop" />
                        </div>
                    </FilterSection>

                    {/* Mode */}
                    <FilterSection title="Learning Mode">
                        <div className="flex gap-3">
                            <PillOption label="Offline / Classroom" />
                            <PillOption label="Online / Remote" />
                            <PillOption label="Hybrid" />
                        </div>
                    </FilterSection>

                    {/* Subject/Stream */}
                    <FilterSection title="Subject / Stream">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Engineering" />
                            <PillOption label="Management" />
                            <PillOption label="Design" />
                            <PillOption label="Data Science" />
                            <PillOption label="Marketing" />
                            <PillOption label="Languages" />
                            <PillOption label="Arts" />
                        </div>
                    </FilterSection>

                    {/* Duration */}
                    <FilterSection title="Duration">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="< 1 Month" />
                            <PillOption label="1 - 6 Months" />
                            <PillOption label="6 Months - 1 Year" />
                            <PillOption label="1 - 3 Years" />
                            <PillOption label="3+ Years" />
                        </div>
                    </FilterSection>

                    {/* Fees Range */}
                    <FilterSection title="Fees Range">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Free" />
                            <PillOption label="Under ₹10k" />
                            <PillOption label="₹10k - ₹50k" />
                            <PillOption label="₹50k - ₹2L" />
                            <PillOption label="Above ₹2L" />
                        </div>
                    </FilterSection>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-[#FF8A65] hover:bg-[#FF7043] text-white rounded-lg font-bold shadow-md transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>

            </div>
        </div>
    );
}

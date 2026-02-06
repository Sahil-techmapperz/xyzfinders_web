"use client";

export default function ServicesFilterPopup({ onClose }: { onClose: () => void }) {

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
                    <h2 className="text-lg font-bold text-gray-800">Filter Services</h2>
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
                                placeholder="Plumber, Electrician, Cleaning..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Service Category */}
                    <FilterSection title="Service Category">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="All" active />
                            <PillOption label="Home Maintenance" />
                            <PillOption label="Cleaning" />
                            <PillOption label="Appliances Repair" />
                            <PillOption label="Personal Care / Salon" />
                            <PillOption label="Design & Decor" />
                            <PillOption label="Movers & Packers" />
                        </div>
                    </FilterSection>

                    {/* Ratings */}
                    <FilterSection title="Ratings">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="4.5 Star & Above" />
                            <PillOption label="4.0 Star & Above" />
                            <PillOption label="3.0 Star & Above" />
                        </div>
                    </FilterSection>

                    {/* Availability */}
                    <FilterSection title="Availability">
                        <div className="flex gap-3">
                            <PillOption label="Available Now" />
                            <PillOption label="Schedule for Later" />
                            <PillOption label="24/7 Service" />
                        </div>
                    </FilterSection>

                    {/* Budget / Price Type */}
                    <FilterSection title="Price Type">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Fixed Price" />
                            <PillOption label="Hourly Rate" />
                            <PillOption label="Visit Charge Only" />
                            <PillOption label="Free Consultation" />
                        </div>
                    </FilterSection>

                    {/* Verified */}
                    <FilterSection title="Provider Type">
                        <div className="flex gap-3">
                            <PillOption label="Verified Partners" />
                            <PillOption label="Top Rated" />
                            <PillOption label="New" />
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

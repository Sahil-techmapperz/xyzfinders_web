"use client";

export default function MobileFilterPopup({ onClose }: { onClose: () => void }) {

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
                    <h2 className="text-lg font-bold text-gray-800">Filter Mobiles</h2>
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
                                placeholder="iPhone 15, Samsung S24, 5G..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange/20"
                            />
                        </div>
                    </FilterSection>

                    {/* Brand */}
                    <FilterSection title="Brand">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Apple" />
                            <PillOption label="Samsung" />
                            <PillOption label="OnePlus" />
                            <PillOption label="Google" />
                            <PillOption label="Xiaomi" />
                            <PillOption label="Vivo" />
                            <PillOption label="Oppo" />
                            <PillOption label="Realme" />
                        </div>
                    </FilterSection>

                    {/* Condition */}
                    <FilterSection title="Condition">
                        <div className="flex gap-3">
                            <PillOption label="Brand New" />
                            <PillOption label="Like New" />
                            <PillOption label="Used" />
                            <PillOption label="Refurbished" />
                        </div>
                    </FilterSection>

                    {/* RAM */}
                    <FilterSection title="RAM">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="4 GB" />
                            <PillOption label="6 GB" />
                            <PillOption label="8 GB" />
                            <PillOption label="12 GB" />
                            <PillOption label="16 GB+" />
                        </div>
                    </FilterSection>

                    {/* Storage */}
                    <FilterSection title="Internal Storage">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="64 GB" />
                            <PillOption label="128 GB" />
                            <PillOption label="256 GB" />
                            <PillOption label="512 GB" />
                            <PillOption label="1 TB+" />
                        </div>
                    </FilterSection>

                    {/* Price Range */}
                    <FilterSection title="Price Range">
                        <div className="flex flex-wrap gap-3">
                            <PillOption label="Under ₹10k" />
                            <PillOption label="₹10k - ₹20k" />
                            <PillOption label="₹20k - ₹40k" />
                            <PillOption label="₹40k - ₹70k" />
                            <PillOption label="Above ₹70k" />
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

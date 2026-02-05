import Skyline_Banner from "@/public/Skyline_Banner.png";
import Image from "next/image";
export default function ApartmentSearch() {
    return (
        <section className="hidden md:block mb-12 relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image src={Skyline_Banner} alt="Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Title */}
                <h2 className="text-3xl md:text-4xl text-white font-medium text-center mb-10 drop-shadow-md">Get Fast a Apartment for Sale or Buy ?</h2>

                {/* Search Bar Container */}
                <div className="bg-white rounded-2xl p-4 shadow-2xl max-w-7xl mx-auto flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

                    {/* Purpose */}
                    <div className="flex-1 px-4 py-2 lg:py-0">
                        <label className="block text-gray-900 font-bold mb-1 text-sm">Purpose</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-transparent text-gray-500 text-sm focus:outline-none cursor-pointer pr-4">
                                <option>Rent</option>
                                <option>Sell</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-0 top-0 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex-[1.2] px-4 py-2 lg:py-0">
                        <label className="block text-gray-900 font-bold mb-1 text-sm">Location</label>
                        <div className="relative">
                            <input type="text" placeholder="Location" className="w-full bg-transparent text-gray-500 text-sm focus:outline-none placeholder-gray-400 pr-6" />
                            <i className="ri-map-pin-line absolute right-0 top-0 text-gray-400 text-lg"></i>
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="flex-[1.2] px-4 py-2 lg:py-0">
                        <label className="block text-gray-900 font-bold mb-1 text-sm">Property Type</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-transparent text-gray-500 text-sm focus:outline-none cursor-pointer pr-4">
                                <option>All the Residential</option>
                                <option>Commercial</option>
                                <option>Land</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-0 top-0 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="flex-1 px-4 py-2 lg:py-0">
                        <label className="block text-gray-900 font-bold mb-1 text-sm">Price Range</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-transparent text-gray-500 text-sm focus:outline-none cursor-pointer pr-4">
                                <option>Any</option>
                                <option>0 - 10k</option>
                                <option>10k - 50k</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-0 top-0 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    {/* Room Type */}
                    <div className="flex-1 px-4 py-2 lg:py-0">
                        <label className="block text-gray-900 font-bold mb-1 text-sm">Room Type</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-transparent text-gray-500 text-sm focus:outline-none cursor-pointer pr-4">
                                <option>Any</option>
                                <option>1 BHK</option>
                                <option>2 BHK</option>
                            </select>
                            <i className="ri-arrow-down-s-line absolute right-0 top-0 text-gray-400 pointer-events-none"></i>
                        </div>
                    </div>

                    {/* Filters & Button */}
                    <div className="flex-[1.5] pl-4 pr-1 py-2 lg:py-0 flex items-center justify-between gap-2">
                        <div className="flex-grow">
                            <label className="block text-gray-900 font-bold mb-1 text-sm">Filters</label>
                            <div className="relative w-full">
                                <button className="w-full text-left bg-transparent text-gray-500 text-sm focus:outline-none truncate pr-4">
                                    Bath,Area\Size etc.
                                </button>
                                <i className="ri-arrow-down-s-line absolute right-0 top-0 text-gray-400 pointer-events-none"></i>
                            </div>
                        </div>
                        <button className="bg-brand-teal text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#004241] transition shadow-lg whitespace-nowrap">Search Now</button>
                    </div>

                </div>
            </div>
        </section>
    );
}

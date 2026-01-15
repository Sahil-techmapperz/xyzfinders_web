export default function Gadgets() {
    return (
        <section className="container mx-auto px-4 mb-12">
            {/* Gadgets Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular in Gadgets & Electronics.</h2>
                <a href="#" className="text-[#FF4D4D] font-bold text-sm md:text-base hover:underline">View All</a>
            </div>

            {/* Gadgets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                    <div className="relative h-60 rounded-xl overflow-hidden mb-4">
                        <img src="https://placehold.co/400x300/111/FFF?text=Gaming+PC" alt="Gaming PC" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Brand New PC Ryzen 9 9900X RTX ...</h3>
                    <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                        <li className="flex items-center gap-1"><i className="ri-time-line text-gray-300 text-sm"></i> <span className="text-gray-500">1-6 Year Old</span></li>
                    </ul>

                    <div className="relative h-14 w-full">
                        {/* Default State: Location & Price */}
                        <div className="absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
                            <div className="flex items-start gap-1 text-xs text-gray-400 leading-tight">
                                <i className="ri-map-pin-line flex-shrink-0 mt-0.5"></i>
                                <span className="truncate">New Sabji Mandi Teacher Colony Kashi...</span>
                            </div>
                            <div className="text-[#FF4D4D] font-bold text-lg mt-1">₹ 950,000</div>
                        </div>

                        {/* Hover State: Action Buttons */}
                        <div className="absolute inset-0 flex items-end gap-2 transition-all duration-300 ease-in-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                            <button className="w-10 h-10 rounded-lg bg-[#FFF0F0] text-[#FF4D4D] flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition-colors duration-200">
                                <i className="ri-phone-line text-lg"></i>
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center hover:bg-[#2196F3] hover:text-white transition-colors duration-200">
                                <i className="ri-chat-3-line text-lg"></i>
                            </button>
                            <button className="flex-1 bg-[#E8F5E9] text-[#2E7D32] h-10 rounded-lg text-sm font-bold hover:bg-[#2E7D32] hover:text-white transition-colors duration-200">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                    <div className="relative h-60 rounded-xl overflow-hidden mb-4">
                        <img src="https://placehold.co/400x300/EEE/555?text=Earbuds" alt="Samsung SE Earbuds" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Samsung SE Earbuds 21s</h3>
                    <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                        <li className="flex items-center gap-1"><i className="ri-time-line text-gray-300 text-sm"></i> <span className="text-gray-500">6 Month Old</span></li>
                    </ul>
                    <div className="relative h-14 w-full">
                        <div className="absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
                            <div className="flex items-start gap-1 text-xs text-gray-400 leading-tight">
                                <i className="ri-map-pin-line flex-shrink-0 mt-0.5"></i>
                                <span className="truncate">New Sabji Mandi Teacher Colony Kashi...</span>
                            </div>
                            <div className="text-[#FF4D4D] font-bold text-lg mt-1">₹ 2,500</div>
                        </div>
                        <div className="absolute inset-0 flex items-end gap-2 transition-all duration-300 ease-in-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                            <button className="w-10 h-10 rounded-lg bg-[#FFF0F0] text-[#FF4D4D] flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition-colors duration-200">
                                <i className="ri-phone-line text-lg"></i>
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center hover:bg-[#2196F3] hover:text-white transition-colors duration-200">
                                <i className="ri-chat-3-line text-lg"></i>
                            </button>
                            <button className="flex-1 bg-[#E8F5E9] text-[#2E7D32] h-10 rounded-lg text-sm font-bold hover:bg-[#2E7D32] hover:text-white transition-colors duration-200">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                    <div className="relative h-60 rounded-xl overflow-hidden mb-4">
                        <img src="https://placehold.co/400x300/0071c5/FFF?text=Intel+Processor" alt="Intel Processor" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Intel Core i5-13600KF Processor - Un....</h3>
                    <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                        <li className="flex items-center gap-1"><i className="ri-time-line text-gray-300 text-sm"></i> <span className="text-gray-500">6 Month Old</span></li>
                    </ul>
                    <div className="relative h-14 w-full">
                        <div className="absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
                            <div className="flex items-start gap-1 text-xs text-gray-400 leading-tight">
                                <i className="ri-map-pin-line flex-shrink-0 mt-0.5"></i>
                                <span className="truncate">New Sabji Mandi Teacher Colony Kashi...</span>
                            </div>
                            <div className="text-[#FF4D4D] font-bold text-lg mt-1">₹ 750,000</div>
                        </div>
                        <div className="absolute inset-0 flex items-end gap-2 transition-all duration-300 ease-in-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                            <button className="w-10 h-10 rounded-lg bg-[#FFF0F0] text-[#FF4D4D] flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition-colors duration-200">
                                <i className="ri-phone-line text-lg"></i>
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center hover:bg-[#2196F3] hover:text-white transition-colors duration-200">
                                <i className="ri-chat-3-line text-lg"></i>
                            </button>
                            <button className="flex-1 bg-[#E8F5E9] text-[#2E7D32] h-10 rounded-lg text-sm font-bold hover:bg-[#2E7D32] hover:text-white transition-colors duration-200">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                    <div className="relative h-60 rounded-xl overflow-hidden mb-4">
                        <img src="https://placehold.co/400x300/F5F5DC/333?text=iPhone+16" alt="iPhone 16 Pro" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Apple iPhone 16 Pro 256GB Natural...</h3>
                    <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
                        <li className="flex items-center gap-1"><i className="ri-time-line text-gray-300 text-sm"></i> <span className="text-gray-500">6 Month Old</span></li>
                    </ul>
                    <div className="relative h-14 w-full">
                        <div className="absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
                            <div className="flex items-start gap-1 text-xs text-gray-400 leading-tight">
                                <i className="ri-map-pin-line flex-shrink-0 mt-0.5"></i>
                                <span className="truncate">New Sabji Mandi Teacher Colony Kashi...</span>
                            </div>
                            <div className="text-[#FF4D4D] font-bold text-lg mt-1">₹ 3,550,000</div>
                        </div>
                        <div className="absolute inset-0 flex items-end gap-2 transition-all duration-300 ease-in-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                            <button className="w-10 h-10 rounded-lg bg-[#FFF0F0] text-[#FF4D4D] flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition-colors duration-200">
                                <i className="ri-phone-line text-lg"></i>
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center hover:bg-[#2196F3] hover:text-white transition-colors duration-200">
                                <i className="ri-chat-3-line text-lg"></i>
                            </button>
                            <button className="flex-1 bg-[#E8F5E9] text-[#2E7D32] h-10 rounded-lg text-sm font-bold hover:bg-[#2E7D32] hover:text-white transition-colors duration-200">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

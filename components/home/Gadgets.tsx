import Link from 'next/link';

export default function Gadgets() {
    return (
        <section className="bg-[#FEFBF6] py-8 md:mb-12">
            <div className="container mx-auto px-4">
                {/* Gadgets Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] md:text-3xl font-bold text-gray-900 font-jost">Popular in Gadgets & Electronics.</h2>
                    <Link href="/gadgets" className="text-gray-600 hover:text-gray-900">
                        <i className="ri-arrow-right-line text-2xl"></i>
                    </Link>
                </div>

                {/* Gadgets Grid */}
                <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">

                    {/* Card 1 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=60" alt="Gaming PC" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Brand New PC Ryzen 9 9900X RTX ...</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 1-6 Year Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 950,000</div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcShdq8JHYbU_Zvx7WOv5Yh7oM3qCkNUCbskMRX1_B4Ru2Bc1re9wSM18KJQfeMXipVHd8CSo6Ec7RcCIdyVxApB0Rlp5I83DPxT7ayV6Y60l8mq0miQTvgzOS7YkCn3Vun1nHpF9dU&usqp=CAc" alt="Samsung SE Earbuds" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Samsung SE Earbuds 21s</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 6 Month Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 2,500</div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=60" alt="Intel Processor" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Intel Core i5-13600KF Processor - Un....</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 6 Month Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 750,000</div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTv5YUkUBHsFwRuiUIgPb8kcj4iz1DIzN5iCiy7HobYcrMEnpMIaZoXqH9zoxmc7vX6DlvNKmLAD2r8lnDbLp0T4x-PkybyeXwpS4nwPVTCU4tSZYbq6QZsZHdEEAUKtDiy-GRDrA&usqp=CAc" alt="iPhone 16 Pro" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Apple iPhone 16 Pro 256GB Natural...</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 6 Month Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 3,550,000</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

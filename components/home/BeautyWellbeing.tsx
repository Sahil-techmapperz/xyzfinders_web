import Link from 'next/link';

export default function BeautyWellbeing() {
    return (
        <section className="bg-[#FEFBF6] py-8 md:mb-12">
            <div className="container mx-auto px-4">
                {/* Beauty Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] md:text-3xl font-bold text-gray-900 font-jost">Popular in Beauty & Well Being.</h2>
                    <Link href="/beauty-wellbeing" className="text-gray-600 hover:text-gray-900">
                        <i className="ri-arrow-right-line text-2xl"></i>
                    </Link>
                </div>

                {/* Beauty Grid */}
                <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">

                    {/* Card 1 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=60" alt="Sonata Watch" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Sonata Premium Analog Watch</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 3 Year Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 12,000</div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://envyfragrances.com/cdn/shop/files/arnold_george_vibe.jpg?v=1757676420" alt="ENVY Luxury Pack" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">ENVY Luxury Mans pack 3</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 1 Month Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 1,500</div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://www.jiomart.com/images/product/original/rvgytmzq1h/ladyeye-complete-makeup-set-for-girls-combo-of-20-premium-beauty-products-for-regular-use-product-images-orvgytmzq1h-p610043726-0-202409271839.jpg?im=Resize=(1000,1000)" alt="Cosmetics" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Premium Beauty Collection</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• New Arrival</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 65,000</div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=60" alt="Android Watch" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Premium Bolt Android Watch with Pas...</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 1.6 Year Old</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 9,999</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

import Link from 'next/link';

export default function Automobiles() {
    return (
        <section className="bg-[#FEFBF6] py-8 md:mb-12">
            <div className="container mx-auto px-4">
                {/* Automobiles Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-[18px] md:text-3xl font-bold text-gray-900 font-jost">Popular in Automobiles</h2>
                    <Link href="/automobiles" className="text-gray-600 hover:text-gray-900">
                        <i className="ri-arrow-right-line text-2xl"></i>
                    </Link>
                </div>

                {/* Automobiles Grid */}
                <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">

                    {/* Card 1 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&w=400&q=60" alt="Scooty Mantra" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Scooty Mantra E-Bike - Model 2022</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 3 Year Old</li>
                            <li className="flex items-center gap-1">• 65,000 Km</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 35,000</div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://media.istockphoto.com/id/2192428587/photo/tank-300.jpg?s=612x612&w=0&k=20&c=lgoikW-iaZ_2CEwqn1SYoTa_gn4ALFvCgKxeSrhWhXE=" alt="Mahindra Scorpio" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Mahindra Scorpio - Model 2020</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 6 Year Old</li>
                            <li className="flex items-center gap-1">• 145,564 Km</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 25,000</div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://cdn.bajajauto.com/-/media/assets/bajajauto/360degreeimages/3-wheelers-and-qute/maxima-z/cng/eco-green/webp/00.png" alt="Bajaj Maxima Z" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Bajaj Maxima Z - Model 2018</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 8 Year Old</li>
                            <li className="flex items-center gap-1">• 360,456 Km</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 25,000</div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
                        <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
                            <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=60" alt="Scooty Mantra" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Scooty Mantra E-Bike - Model 2022</h3>
                        <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                            <li className="flex items-center gap-1">• 3 Year Old</li>
                            <li className="flex items-center gap-1">• 65,000 Km</li>
                        </ul>
                        <div className="flex flex-col gap-1">
                            <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
                            <div className="text-[#FF4D4D] font-bold text-lg">₹ 65,000</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

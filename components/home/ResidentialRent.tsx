import Link from 'next/link';

export default function ResidentialRent() {
  return (
    <section className="bg-[#FEFBF6] py-8 md:mb-12">
      <div className="container mx-auto px-4">
        {/* Residential Rent Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] md:text-3xl font-bold text-gray-900 font-jost">Popular in Residential for Rent</h2>
          <Link href="/real-estate" className="text-gray-600 hover:text-gray-900">
            <i className="ri-arrow-right-line text-2xl"></i>
          </Link>
        </div>

        {/* Residential Grid */}
        <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">

          {/* Card 1 */}
          <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
            <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=60" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Premium 4BHK Apartment for Rent.</h3>

            {/* Specs */}
            <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <li className="flex items-center gap-1">• 4 Bedroom</li>
              <li className="flex items-center gap-1">• 1 Kitchen</li>
              <li className="flex items-center gap-1">• 2 Bathroom</li>
            </ul>

            {/* Location & Price */}
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
              <div className="text-[#FF4D4D] font-bold text-lg">₹ 59,50,000</div>
            </div>

            {/* Hidden Desktop Actions (Preserved structure but hidden on visual pass if needed, keeping for functionality) */}
            <div className="hidden">
              {/* ... layout logic for hover actions ... */}
            </div>
          </div>

          {/* Card 2 */}
          <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
            <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=60" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Premium 3BHK Apartment for Rent.</h3>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <li className="flex items-center gap-1">• 3 Bedroom</li>
              <li className="flex items-center gap-1">• 1 Kitchen</li>
              <li className="flex items-center gap-1">• 2 Bathroom</li>
            </ul>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
              <div className="text-[#FF4D4D] font-bold text-lg">₹ 950,000</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
            <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
              <img src="https://media.istockphoto.com/id/1218372448/photo/living-room-in-modern-studio-apartments.webp?a=1&b=1&s=612x612&w=0&k=20&c=VJcii7Ja6j4WjyF6McdQTA0FeLeQwjG2eRbfPKvhpqM=" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Premium 2BHK Apartment for Rent.</h3>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <li className="flex items-center gap-1">• 2 Bedroom</li>
              <li className="flex items-center gap-1">• 1 Kitchen</li>
              <li className="flex items-center gap-1">• 1 Bathroom</li>
            </ul>
            <div className="flex flex-col gap-1">
              <div className="text-xs text-gray-400 truncate">New Sabji Mandi Teacher Colony Kashi...</div>
              <div className="text-[#FF4D4D] font-bold text-lg">₹ 750,000</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="min-w-[70%] md:min-w-0 flex-shrink-0 snap-start bg-white rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
            <div className="relative h-48 md:h-60 rounded-xl overflow-hidden mb-3">
              <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=60" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
            </div>
            <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1">Premium 6BHK Apartment for Rent.</h3>
            <ul className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
              <li className="flex items-center gap-1">• 6 Bedroom</li>
              <li className="flex items-center gap-1">• 2 Kitchen</li>
              <li className="flex items-center gap-1">• 4 Bathroom</li>
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

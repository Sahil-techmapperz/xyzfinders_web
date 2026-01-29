import Link from 'next/link';

export default function ResidentialRent() {
  return (
    <section className="container mx-auto px-4 mb-12">
      {/* Residential Rent Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular in Residential for Rent</h2>
        <Link href="/real-estate" className="text-[#FF4D4D] font-bold text-sm md:text-base hover:underline">View All</Link>
      </div>

      {/* Residential Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 group cursor-pointer">
          <div className="relative h-60 rounded-xl overflow-hidden mb-4">
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=60" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Premium 4BHK Apartment for Rent.</h3>
          <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
            <li className="flex items-center gap-1"><i className="ri-hotel-bed-fill text-gray-300 text-sm"></i> <span className="text-gray-500">4 Bedroom</span></li>
            <li className="flex items-center gap-1"><i className="ri-restaurant-fill text-gray-300 text-sm"></i> <span className="text-gray-500">1 Kitchen</span></li>
            <li className="flex items-center gap-1"><i className="ri-drop-fill text-gray-300 text-sm"></i> <span className="text-gray-500">2 Bathroom</span></li>
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
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=60" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Premium 3BHK Apartment for Rent.</h3>
          <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
            <li className="flex items-center gap-1"><i className="ri-hotel-bed-fill text-gray-300 text-sm"></i> <span className="text-gray-500">3 Bedroom</span></li>
            <li className="flex items-center gap-1"><i className="ri-restaurant-fill text-gray-300 text-sm"></i> <span className="text-gray-500">1 Kitchen</span></li>
            <li className="flex items-center gap-1"><i className="ri-drop-fill text-gray-300 text-sm"></i> <span className="text-gray-500">2 Bathroom</span></li>
          </ul>
          <div className="relative h-14 w-full">
            <div className="absolute inset-0 flex flex-col justify-between transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:translate-y-2">
              <div className="flex items-start gap-1 text-xs text-gray-400 leading-tight">
                <i className="ri-map-pin-line flex-shrink-0 mt-0.5"></i>
                <span className="truncate">New Sabji Mandi Teacher Colony Kashi...</span>
              </div>
              <div className="text-[#FF4D4D] font-bold text-lg mt-1">₹ 950,000</div>
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
            <img src="https://media.istockphoto.com/id/1218372448/photo/living-room-in-modern-studio-apartments.webp?a=1&b=1&s=612x612&w=0&k=20&c=VJcii7Ja6j4WjyF6McdQTA0FeLeQwjG2eRbfPKvhpqM=" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Premium 2BHK Apartment for Rent.</h3>
          <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
            <li className="flex items-center gap-1"><i className="ri-hotel-bed-fill text-gray-300 text-sm"></i> <span className="text-gray-500">2 Bedroom</span></li>
            <li className="flex items-center gap-1"><i className="ri-restaurant-fill text-gray-300 text-sm"></i> <span className="text-gray-500">1 Kitchen</span></li>
            <li className="flex items-center gap-1"><i className="ri-drop-fill text-gray-300 text-sm"></i> <span className="text-gray-500">1 Bathroom</span></li>
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
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=60" alt="Apartment" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute top-3 left-3 bg-white text-[#4CAF50] text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-100">Verified</span>
          </div>
          <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-1">Premium 6BHK Apartment for Rent.</h3>
          <ul className="flex flex-wrap gap-3 text-xs text-gray-400 mb-3">
            <li className="flex items-center gap-1"><i className="ri-hotel-bed-fill text-gray-300 text-sm"></i> <span className="text-gray-500">6 Bedroom</span></li>
            <li className="flex items-center gap-1"><i className="ri-restaurant-fill text-gray-300 text-sm"></i> <span className="text-gray-500">2 Kitchen</span></li>
            <li className="flex items-center gap-1"><i className="ri-drop-fill text-gray-300 text-sm"></i> <span className="text-gray-500">4 Bathroom</span></li>
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

import Link from 'next/link';

export default function Wishlist() {
    const wishlistItems = [
        {
            id: 1,
            title: 'iPhone 14 Pro Max - 256GB Deep Purple',
            price: '₹ 105,000',
            image: 'https://images.unsplash.com/photo-1695504239663-c91836173428?auto=format&fit=crop&w=300&q=80',
            location: 'Connaught Place, New Delhi',
            date: 'Today',
            verified: true
        },
        {
            id: 2,
            title: 'Royal Enfield Classic 350 - Gunmetal Grey',
            price: '₹ 185,000',
            image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=60',
            location: 'Adyar, Chennai',
            date: 'Yesterday',
            verified: true
        },
        {
            id: 3,
            title: 'Modern 3 Seater Sofa Set',
            price: '₹ 25,000',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
            location: 'Indiranagar, Bangalore',
            date: '2 Days Ago',
            verified: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost flex flex-col">

            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                        <p className="text-gray-500 text-sm mt-1">{wishlistItems.length} items saved</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group relative">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {item.verified && (
                                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#4CAF50] text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm border border-gray-100 flex items-center gap-1">
                                        <i className="ri-shield-check-fill"></i> Verified
                                    </span>
                                )}
                                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 transition border border-gray-100">
                                    <i className="ri-close-line text-lg"></i>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 text-base mb-1 line-clamp-1 group-hover:text-brand-orange transition-colors">
                                    {item.title}
                                </h3>
                                <div className="text-brand-orange font-bold text-lg mb-3">
                                    {item.price}
                                </div>

                                <div className="flex items-center text-gray-400 text-xs mb-4 gap-3">
                                    <div className="flex items-center gap-1 truncate max-w-[60%]">
                                        <i className="ri-map-pin-line"></i>
                                        <span className="truncate">{item.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <i className="ri-time-line"></i>
                                        <span>{item.date}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                                    <button className="flex-1 bg-brand-orange text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#e07a46] transition flex items-center justify-center gap-2">
                                        <i className="ri-phone-line"></i>
                                        Contact Seller
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State Suggestion (Optional, removing for MVP simplicity or keeping if list is empty) */}
                    {wishlistItems.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <i className="ri-heart-line text-4xl"></i>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
                            <p className="text-gray-500 mb-6">Seems like you haven't found anything yet.</p>
                            <Link href="/" className="bg-brand-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e07a46] transition">
                                Start Exploring
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

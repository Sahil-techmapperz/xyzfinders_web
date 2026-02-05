import Link from 'next/link';

export interface FurnitureData {
    id: number;
    title: string;
    category: string;
    image: string;
    brand?: string; // Brand name to show on image
    specs: {
        material: string;
        condition: string;
        dimensions?: string;
        age?: string;
    };
    description?: string; // Short description
    price: string;
    location: string;
    postedTime: string;
    verified: boolean;
    premium?: boolean; // Premium listing badge
}

interface FurnitureCardProps {
    item: FurnitureData;
}

export default function FurnitureCard({ item }: FurnitureCardProps) {
    // Extract brand from category or title
    const brand = item.brand || item.category;

    const createSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };
    const seoUrl = `/furniture/${item.id}-${createSlug(item.title)}`;

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full">

            {/* Image Section - Fixed Height */}
            <div className="relative w-full h-64 bg-gray-100 overflow-hidden cursor-pointer">
                <Link href={seoUrl}>
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Verified Badge */}
                {item.verified && (
                    <div className="absolute top-4 left-4 z-10 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center shadow-sm text-white" title="Verified Seller">
                        <i className="ri-check-line text-sm font-bold"></i>
                    </div>
                )}

                {/* Premium Badge */}
                {item.premium && (
                    <div className="absolute top-4 right-0 z-10 bg-[#FFF8E1] text-[#FFB300] text-[10px] font-bold px-3 py-1 shadow-sm border-l border-b border-[#FFE082] uppercase tracking-wide">
                        Premium
                    </div>
                )}

                {/* Brand/Category Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xs font-semibold px-2 py-1 bg-black/30 rounded-full backdrop-blur-sm border border-white/20">
                        {item.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <Link href={seoUrl}>
                        <h3 className="font-bold text-lg text-gray-800 leading-tight mb-2 line-clamp-2 group-hover:text-[#8D6E63] transition-colors">
                            {item.title}
                        </h3>
                    </Link>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-500 mb-4 mt-3">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63]">
                                <i className="ri-paint-brush-line"></i>
                            </div>
                            <span className="font-medium truncate">{item.specs.material}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63]">
                                <i className="ri-checkbox-circle-line"></i>
                            </div>
                            <span className="font-medium truncate">{item.specs.condition}</span>
                        </div>
                        {item.specs.dimensions && (
                            <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63]">
                                    <i className="ri-ruler-line"></i>
                                </div>
                                <span className="font-medium truncate">{item.specs.dimensions}</span>
                            </div>
                        )}
                        {item.specs.age && (
                            <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                                <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#8D6E63]">
                                    <i className="ri-calendar-line"></i>
                                </div>
                                <span className="font-medium truncate">{item.specs.age}</span>
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-50">
                        <i className="ri-map-pin-line"></i>
                        <span className="truncate">{item.location}</span>
                    </div>
                </div>

                {/* Footer: Price & Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[#D32F2F] text-xl font-bold font-rubik tracking-tight">
                            {item.price}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Fixed Price</span>
                    </div>

                    <div className="flex gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#FFF0F0] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition-all shadow-sm border border-[#FFCDD2]/50" title="Call Seller">
                            <i className="ri-phone-fill text-lg"></i>
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#E3F2FD] text-[#1976D2] hover:bg-[#1976D2] hover:text-white transition-all shadow-sm border border-[#BBDEFB]/50" title="Chat with Seller">
                            <i className="ri-chat-3-fill text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

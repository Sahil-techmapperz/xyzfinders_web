import Link from 'next/link';

export interface GadgetData {
    id: number;
    title: string;
    category: string;
    image: string;
    specs: {
        brand: string;
        condition: string;
        warranty: string;
        age?: string;
    };
    price: string;
    location: string;
    postedTime: string;
    verified: boolean;
    premium: boolean;
}

interface GadgetCardProps {
    item: GadgetData;
}

export default function GadgetCard({ item }: GadgetCardProps) {
    return (
        <Link href={`/gadgets/${item.id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100 flex gap-4 p-4">
                {/* Image Section - Smaller on left */}
                <div className="w-[180px] h-[180px] shrink-0 relative rounded-xl overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                    {item.verified && (
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            <i className="ri-shield-check-fill"></i> VERIFIED SELLER
                        </div>
                    )}
                </div>

                {/* Content Section - Right side */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    {/* Title */}
                    <div>
                        <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2">
                            {item.title}
                        </h3>

                        {/* Specs Pills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-[#FFCCBC] text-[#FF6E40] text-xs font-bold px-3 py-1.5 rounded-md">
                                {item.category}
                            </span>
                            <span className="bg-[#FFCCBC] text-[#FF6E40] text-xs font-bold px-3 py-1.5 rounded-md">
                                {item.specs.brand}
                            </span>
                            <span className="bg-[#FFCCBC] text-[#FF6E40] text-xs font-bold px-3 py-1.5 rounded-md">
                                {item.specs.condition}
                            </span>
                            {item.specs.age && (
                                <span className="bg-[#FFCCBC] text-[#FF6E40] text-xs font-bold px-3 py-1.5 rounded-md">
                                    {item.specs.age}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div>
                        {/* Price */}
                        <div className="text-2xl font-bold text-[#FF6E40] mb-2">
                            {item.price}
                        </div>

                        {/* Location & Chat */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 min-w-0">
                                <i className="ri-map-pin-line text-[#FF6E40] shrink-0"></i>
                                <span className="truncate">{item.location}</span>
                            </div>

                            <button className="flex items-center gap-1.5 bg-[#E3F2FD] text-[#2196F3] text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#BBDEFB] transition-colors shrink-0">
                                <i className="ri-chat-3-line"></i> Chat
                            </button>
                        </div>

                        {/* Posted Time */}
                        <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium mt-2">
                            <i className="ri-time-line"></i>
                            {item.postedTime}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

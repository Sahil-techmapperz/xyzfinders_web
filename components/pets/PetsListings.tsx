"use client";

import PetsCard, { PetData } from './PetsCard';

const PETS_DATA: PetData[] = [
    {
        id: 1,
        title: "Golden Retriever Puppies KCI Registered",
        category: "Dogs",
        type: "Dog",
        image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?q=80&w=2069&auto=format&fit=crop",
        description: "Adorbale Golden Retriever puppies available. KCI registered, first vaccination done. Very playful and healthy...",
        specs: {
            age: "45 Days",
            breed: "Golden Retriever",
            gender: "Male/Female",
            vaccinated: "Yes"
        },
        price: "₹ 25,000/-",
        location: "Vasant Vihar, New Delhi",
        postedTime: "Posted 3 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 2,
        title: "Persian Cat Kittens (Doll Face)",
        category: "Cats",
        type: "Cat",
        image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1887&auto=format&fit=crop",
        description: "Pure white Persian kittens with blue eyes. Litter trained and very friendly. Looking for a loving home.",
        specs: {
            age: "2 Months",
            breed: "Persian",
            gender: "Male",
            vaccinated: "No"
        },
        price: "₹ 12,000/-",
        location: "Lajpat Nagar, New Delhi",
        postedTime: "Posted 6 hr ago",
        verified: true,
        premium: true
    },
    {
        id: 3,
        title: "Large Dog Cage / Crate (Heavy Duty)",
        category: "Accessories",
        type: "Accessory",
        image: "https://images.unsplash.com/photo-1598585226456-ccde20937a0c?q=80&w=2072&auto=format&fit=crop",
        description: "Heavy duty customized dog cage suitable for large breeds like German Shepherd, Rottweiler. Size 4x3x3 feet.",
        specs: {
            age: "New",
            breed: "Universal",
            gender: "N/A",
            vaccinated: "N/A"
        },
        price: "₹ 4,500/-",
        location: "Dwarka, New Delhi",
        postedTime: "Posted 10 hr ago",
        verified: false,
        premium: false
    },
    {
        id: 4,
        title: "Pedigree Adult Dog Food Chicken & Vegetables 20kg",
        category: "Food",
        type: "Food",
        image: "https://images.unsplash.com/photo-1585846888147-3fe14c130048?q=80&w=1887&auto=format&fit=crop",
        description: "Unopened bag of Pedigree Adult Dog Food. Selling because my dog switched to a different diet. Market price 3800, selling for cheap.",
        specs: {
            age: "New",
            breed: "All Breeds",
            gender: "N/A",
            vaccinated: "N/A"
        },
        price: "₹ 2,800/-",
        location: "Rohini, New Delhi",
        postedTime: "Posted 1 day ago",
        verified: true,
        premium: false
    }
];

const LOCATIONS = [
    { name: "South Delhi", active: true },
    { name: "Gurugram", active: false },
    { name: "Noida", active: false },
    { name: "West Delhi", active: false },
    { name: "East Delhi", active: false },
    { name: "Faridabad", active: false },
];

export default function PetsListings() {
    return (
        <section className="container mx-auto px-4 py-8 font-jost">

            {/* Header / Titles */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Pets & Animals Accessories in New Delhi - <span className="text-gray-500 font-normal">1,240 results</span>
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-600">Sort By :</span>
                        <button className="bg-[#FFF0EB] border border-[#FFCCBC] text-[#FF7043] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                            Newest First <i className="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-gray-900">Location :</span>
                    <div className="flex flex-wrap gap-2">
                        {LOCATIONS.map((loc, i) => (
                            <button
                                key={i}
                                className={`text-[10px] font-bold px-3 py-1 rounded-full transition-colors ${loc.active
                                    ? "bg-[#FF8A65] text-white flex items-center gap-1"
                                    : "text-gray-600 hover:text-[#FF8A65]"
                                    }`}
                            >
                                {loc.name}
                                {loc.active && <i className="ri-close-line"></i>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Left: Listings */}
                <div className="xl:col-span-2 grid grid-cols-1 gap-6">
                    {PETS_DATA.map(pet => (
                        <PetsCard key={pet.id} item={pet} />
                    ))}

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 pt-8">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-left-double-line"></i></button>
                        <button className="w-8 h-8 flex items-center justify-center bg-[#FF8A65] text-white font-bold rounded-lg shadow-sm">1</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">2</button>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 font-medium rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors">3</button>
                        <span className="text-gray-300">...</span>
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg hover:border-[#FF8A65] hover:text-[#FF8A65] transition-colors"><i className="ri-arrow-right-double-line"></i></button>
                    </div>
                </div>

                {/* Right: Ad Banner */}
                <div className="hidden xl:block xl:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-[#FFF0EB] rounded-2xl p-6 text-center border border-orange-100">
                            <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-1">SPONSORED</div>
                            <div className="text-xs text-gray-400 mb-8">Pet Care Services</div>

                            {/* Styled Ad Content */}
                            <div className="bg-[#4DB6AC] rounded-xl overflow-hidden shadow-xl text-white relative min-h-[600px] flex flex-col pt-12">
                                <h3 className="text-4xl font-extrabold leading-none mb-4 px-4 text-left text-white drop-shadow-sm">
                                    Happy<br />Pets,<br />Happy You
                                </h3>

                                <div className="px-6 mb-8">
                                    <button className="w-full bg-white text-[#009688] font-bold py-3 rounded-lg shadow-lg hover:bg-[#E0F2F1] transition-colors">
                                        Book Grooming
                                    </button>
                                </div>

                                {/* Abstract shapes/image placeholder */}
                                <div className="mt-auto relative h-[400px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-[#00897B] to-[#4DB6AC]">
                                        {/* Mock Pet Image */}
                                        <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

"use client";

const CATEGORIES = [
    {
        id: 1,
        title: "Accounts/Finance Job's",
        count: 200,
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80"
    },
    {
        id: 2,
        title: "Real Estate Job's",
        count: 50,
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80"
    },
    {
        id: 3,
        title: "Software Development Engin...",
        count: 250,
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&q=80"
    },
    {
        id: 4,
        title: "Sale Marketing Executive Job's",
        count: 150,
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80"
    }
];

export default function JobCategories() {
    return (
        <section className="container mx-auto px-4 pb-20 pt-8 bg-[#FFFBF0]">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Job's by Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {CATEGORIES.map((cat) => (
                    <div key={cat.id} className="bg-white rounded-lg shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="h-40 overflow-hidden relative">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay (optional) */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition"></div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-1 truncate">{cat.title}</h3>
                            <p className="text-[10px] text-gray-400 font-medium">(+{cat.count} jobs)</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <button className="text-[#FF7F50] font-bold text-sm hover:underline hover:text-[#FF6347] transition">
                    View More Categories
                </button>
            </div>
        </section>
    );
}

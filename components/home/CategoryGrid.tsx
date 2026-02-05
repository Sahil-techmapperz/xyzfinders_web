"use client";
import Link from "next/link";
import { BROWSE_CATEGORIES } from "../../data/navigation";

export default function CategoryGrid() {
    return (
        <section className="container mx-auto px-4 py-4 md:py-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 font-jost">Browse By Category</h2>
                <Link href="/categories" className="text-brand-orange font-medium text-xs md:text-sm hover:underline flex items-center gap-1">
                    View All <i className="ri-arrow-right-line"></i>
                </Link>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
                {BROWSE_CATEGORIES.map((cat, idx) => (
                    <Link
                        key={idx}
                        href={cat.link}
                        className="flex flex-col items-center justify-center p-2 md:p-4 bg-white border border-gray-100 rounded-xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:border-brand-orange/20 transition group"
                    >
                        <div className="w-10 h-10 md:w-16 md:h-16 mb-1.5 md:mb-3 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-brand-orange/5 rounded-full scale-0 group-hover:scale-100 transition duration-300"></div>
                            {/* @ts-ignore */}
                            {cat.isImage ? (
                                <img
                                    src={cat.icon}
                                    alt={cat.name}
                                    className="w-full h-full object-contain drop-shadow-sm group-hover:scale-110 transition duration-300"
                                />
                            ) : (
                                <i className={`${cat.icon} text-xl md:text-3xl text-gray-400 group-hover:text-brand-orange transition duration-300`}></i>
                            )}
                        </div>
                        <span className="font-semibold text-gray-700 text-[10px] md:text-base group-hover:text-brand-orange transition text-center leading-tight">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}

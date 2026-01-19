"use client";

import Link from 'next/link';

export default function PlaceAdPage() {
    const categories = [
        { name: "Property for Rent\\Sale", icon: "ri-community-line", active: true, href: "/seller/place-ad/property" },
        { name: "Gadgets & Electronics", icon: "ri-cpu-line", active: false, href: "/seller/place-ad/gadgets/create" },
        { name: "Automobiles", icon: "ri-car-line", active: false, href: "/seller/place-ad/automobiles/create" },
        { name: "Services", icon: "ri-calendar-check-line", active: false, href: "/seller/place-ad/services/create" },
        { name: "Education & Learning", icon: "ri-book-open-line", active: false, href: "/seller/place-ad/education/create" },
        { name: "Furniture & Appliances", icon: "ri-armchair-line", active: false, href: "/seller/place-ad/furniture/create" },
        { name: "Beauty & Well Being", icon: "ri-women-line", active: false, href: "/seller/place-ad/beauty/create" },
        { name: "Mobile and Tablets", icon: "ri-smartphone-line", active: false, href: "/seller/place-ad/mobiles/create" },
        { name: "Pets Accessories", icon: "ri-bear-smile-line", active: false, href: "/seller/place-ad/pets/create" },
    ];

    return (
        <div className="bg-[#FFFBF7] min-h-screen font-jost flex flex-col items-center py-16">
            <div className="text-center mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Hello, What are you listed today ?</h1>
                <p className="text-gray-600 text-sm md:text-base">Select the area that best suits your ads.</p>
            </div>

            <div className="w-full max-w-xl px-4 space-y-4">
                {categories.map((cat, index) => (
                    <Link
                        href={cat.href}
                        key={index}
                        className={`
                            flex items-center justify-between px-6 py-4 rounded-xl shadow-sm border transition-all duration-200 group
                            ${cat.active
                                ? 'bg-brand-orange text-white border-brand-orange hover:bg-[#e07a46]'
                                : 'bg-white text-gray-800 border-gray-100 hover:shadow-md hover:border-brand-orange'
                            }
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-8 h-8 rounded flex items-center justify-center text-xl
                                ${cat.active ? 'text-white' : 'text-[#FF8A65]'}
                            `}>
                                <i className={cat.icon}></i>
                            </div>
                            <span className="font-semibold text-sm md:text-base">{cat.name}</span>
                        </div>
                        <i className={`ri-arrow-right-s-line text-xl ${cat.active ? 'text-white' : 'text-gray-300 group-hover:text-brand-orange'}`}></i>
                    </Link>
                ))}
            </div>
        </div>
    );
}

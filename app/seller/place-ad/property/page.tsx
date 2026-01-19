"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function PlaceAdPropertyPage() {
    // State to track expanded sections. Defaulting 'rent-residential' to open as per image.
    const [expanded, setExpanded] = useState<string | null>('rent-residential');

    const toggle = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };

    const sections = [
        {
            title: "Property for Rent",
            items: [
                {
                    id: "rent-residential",
                    label: "Residential",
                    subItems: ["Apartment", "Villa", "House", "Hotel Apartment", "Residential Buildings"]
                },
                {
                    id: "rent-commercial",
                    label: "Commercial",
                    subItems: ["Office", "Shop", "Warehouse"]
                },
                {
                    id: "rent-room",
                    label: "Room for Rent",
                    subItems: ["Private Room", "Shared Room"]
                }
            ]
        },
        {
            title: "Property for Sale",
            items: [
                {
                    id: "sale-residential",
                    label: "Residential",
                    subItems: ["Apartment", "Villa", "Penthouse"]
                },
                {
                    id: "sale-commercial",
                    label: "Commercial",
                    subItems: ["Office", "Retail", "Industrial"]
                },
                {
                    id: "sale-land",
                    label: "Land",
                    subItems: ["Residential Land", "Commercial Land"]
                }
            ]
        }
    ];

    return (
        <div className="bg-[#FFFBF7] min-h-screen font-jost flex justify-center items-center p-4 lg:p-12">
            <div className="container mx-auto max-w-8xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Image */}
                <div className="h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-sm relative">
                    <img
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                        alt="Property Building"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Column: Menu */}
                <div className="pt-8 pl-4 lg:pl-12">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Hello, What are you listed today ?</h1>

                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500 mb-8 font-medium">
                        <i className="ri-home-4-fill text-brand-orange"></i>
                        <span>Property for sale</span>
                        <i className="ri-arrow-right-s-line"></i>
                        <span>Residential</span>
                        <i className="ri-arrow-right-s-line"></i>
                        <span>Landlord</span>
                        <i className="ri-arrow-right-s-line text-brand-orange"></i>
                        <span className="text-brand-orange">Apartment</span>
                    </div>

                    <div className="space-y-10">
                        {sections.map((section, idx) => (
                            <div key={idx}>
                                <h2 className="text-brand-orange text-lg font-bold mb-4">{section.title}</h2>
                                <div className="space-y-4">
                                    {section.items.map((item) => (
                                        <div key={item.id} className="border-b border-gray-200 pb-2">
                                            <button
                                                onClick={() => toggle(item.id)}
                                                className="w-full flex items-center justify-between py-2 text-left font-bold text-gray-800 hover:text-brand-orange transition-colors"
                                            >
                                                <span>{item.label}</span>
                                                <i className={`ri-arrow-${expanded === item.id ? 'down' : 'right'}-s-line text-xl text-gray-400`}></i>
                                            </button>

                                            {/* Sub Menu */}
                                            {expanded === item.id && (
                                                <div className="pl-4 py-2 space-y-2 animate-fadeIn">
                                                    {item.subItems.map((sub, i) => (
                                                        <Link href="/seller/place-ad/property/create" key={i} className="block text-gray-500 hover:text-brand-orange text-sm font-medium transition-colors">
                                                            {sub}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}

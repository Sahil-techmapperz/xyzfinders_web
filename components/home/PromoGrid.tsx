"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
    {
        id: 1,
        image: "https://placehold.co/800x400/EAF2F5/005251?text=Furniture+Collection+Banner",
        alt: "Best Furniture Collection"
    },
    {
        id: 2,
        image: "https://placehold.co/800x400/F4E9D8/A05842?text=Modern+Lighting+Banner",
        alt: "Modern Lighting Setup"
    },
    {
        id: 3,
        image: "https://placehold.co/800x400/FDF2F8/FF6B6B?text=Sofa+Collection+Banner",
        alt: "Comfortable Sofa Sets"
    }
];

export default function PromoGrid() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Large Item: Carousel */}
                {/* Large Item: Carousel */}
                <div className="lg:col-span-2 relative overflow-hidden rounded-xl h-[300px] shadow-sm group">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <img
                                src={slide.image}
                                alt={slide.alt}
                                className="w-full h-full object-cover"
                            />
                            {/* Clickable Area */}
                            <a href="#" className="absolute inset-0 z-20"></a>
                        </div>
                    ))}

                    {/* Dots Navigation */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 shadow-sm border border-white/20 ${currentSlide === idx
                                    ? "w-8 bg-[#005251]"
                                    : "w-2.5 bg-[#005251]/50 hover:bg-[#005251]/80"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Tall Item: Stylish Looks */}
                {/* Spans 1 column, 2 rows on large screens */}
                <div className="lg:col-span-1 lg:row-span-2 relative group overflow-hidden rounded-xl h-full w-full">
                    <img
                        src="https://placehold.co/400x600/F6E6D9/A05842?text=Stylish+Looks+Banner"
                        alt="Stylish Looks For Any Season"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <a href="#" className="absolute inset-0 z-10"></a>
                </div>

                {/* Small Item 1: Stylish Men's Fashion */}
                <div className="relative group overflow-hidden rounded-xl h-[240px]">
                    <img
                        src="https://placehold.co/400x300/EBEFF4/333333?text=Men's+Fashion+Banner"
                        alt="Stylish Men's Fashion"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <a href="#" className="absolute inset-0 z-10"></a>
                </div>

                {/* Small Item 2: Mid Summer Sale */}
                <div className="relative group overflow-hidden rounded-xl h-[240px]">
                    <img
                        src="https://placehold.co/400x300/FFF0F0/FF6B6B?text=Mid+Summer+Sale+Banner"
                        alt="Mid Summer Sale"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <a href="#" className="absolute inset-0 z-10"></a>
                </div>

            </div>
        </section>
    );
}

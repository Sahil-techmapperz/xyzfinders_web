"use client";

import { useState } from 'react';

interface ProductPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
    images: string[];
    category: string;
}

export default function ProductPreview({ isOpen, onClose, data, images, category }: ProductPreviewProps) {
    const [activeImage, setActiveImage] = useState(0);

    if (!isOpen) return null;

    const specs = Object.entries(data)
        .filter(([key, value]) =>
            value &&
            !['title', 'price', 'description', 'phone', 'city', 'state', 'landmark', 'termsAccepted'].includes(key)
        )
        .map(([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
            value: value as string
        }));

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-brand-orange/10 text-brand-orange text-xs font-bold rounded-full uppercase tracking-wider">
                            Preview Mode
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{data.title || 'Untitled Ad'}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 transition flex items-center justify-center text-gray-500 hover:text-gray-900"
                    >
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 lg:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Gallery */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative group">
                                {images.length > 0 ? (
                                    <img
                                        src={images[activeImage]}
                                        alt="Preview"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                                        <i className="ri-image-line text-6xl"></i>
                                        <p className="font-medium text-lg">No images uploaded</p>
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 shadow-sm">
                                    <i className="ri-shield-check-fill"></i> VERIFIED LISTING
                                </div>
                            </div>
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-brand-orange scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 text-brand-orange text-sm font-bold uppercase tracking-wider mb-2">
                                        <i className="ri-price-tag-3-line"></i>
                                        {category}
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{data.title || 'Product Title'}</h1>
                                    <div className="text-3xl font-black text-brand-orange">
                                        ₹ {data.price ? Number(data.price).toLocaleString('en-IN') : '0'}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="ri-map-pin-line text-brand-orange"></i>
                                        <span>{data.landmark ? `${data.landmark}, ` : ''}{data.city}, {data.state}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <i className="ri-time-line text-brand-orange"></i>
                                        <span>Just now</span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Specs */}
                            {specs.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i className="ri-list-check text-brand-orange"></i>
                                        Key Specifications
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {specs.map((spec, idx) => (
                                            <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">{spec.label}</div>
                                                <div className="text-sm font-bold text-gray-900">{spec.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="ri-file-text-line text-brand-orange"></i>
                                    Description
                                </h3>
                                <div className="text-sm text-gray-600 leading-relaxed max-h-[200px] overflow-y-auto pr-2 scrollbar-thin">
                                    {data.description || 'No description provided.'}
                                </div>
                            </div>

                            {/* Seller Note (Placeholder) */}
                            <div className="bg-brand-orange/5 rounded-2xl p-6 border border-brand-orange/10">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <i className="ri-shield-user-line text-brand-orange"></i>
                                    Seller Verification
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Your profile will be shown to buyers. Ensure your contact details are correct.
                                    Buyers will be able to reach you at <span className="font-bold text-gray-900">{data.phone || 'your phone number'}</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
                    <p className="text-xs text-gray-400">This is a simulation of your ad on XYZ Finders.</p>
                    <button
                        onClick={onClose}
                        className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-black/10"
                    >
                        Close Preview
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}

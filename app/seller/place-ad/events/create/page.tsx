"use client";

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ImageUpload from '@/components/shared/ImageUpload';
import ProductPreview from '@/components/shared/ProductPreview';

function EventsCreateForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get('edit');
    const isEditMode = !!editId;

    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        phone: '',
        price: '',
        description: '',
        category: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        organizer: '',
        city: '',
        state: '',
        landmark: '',
        highlights: '',
        termsAccepted: false
    });
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (isEditMode) {
            fetchProductDetails();
        }
    }, [editId]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/seller/products/${editId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                const product = data.data;
                setFormData({
                    title: product.title || '',
                    phone: product.contact_phone || '',
                    price: product.price?.toString() || '',
                    description: product.description || '',
                    category: product.subcategory_name || '',
                    eventDate: product.event_date ? new Date(product.event_date).toISOString().split('T')[0] : '',
                    eventTime: product.event_time || '',
                    venue: product.venue_name || '',
                    organizer: product.organizer_name || '',
                    highlights: Array.isArray(product.product_attributes?.highlights)
                        ? product.product_attributes.highlights.join('\n')
                        : (typeof product.product_attributes === 'string'
                            ? (JSON.parse(product.product_attributes).highlights || []).join('\n')
                            : ''),
                    city: product.city_name || '',
                    state: product.state_name || '',
                    landmark: product.location_name || '',
                    termsAccepted: true
                });
                setImages(product.images || []);
                setCharCount(product.description?.length || 0);
            } else {
                toast.error('Failed to load product details');
            }
        } catch (error) {
            console.error('Error fetching product', error);
        } finally {
            setLoading(false);
        }
    };
    const [charCount, setCharCount] = useState(0);
    const maxChars = 10000;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'description') {
            if (value.length <= maxChars) {
                setFormData(prev => ({ ...prev, [name]: value }));
                setCharCount(value.length);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckbox = () => {
        setFormData(prev => ({ ...prev, termsAccepted: !prev.termsAccepted }));
    };

    const handleSubmit = async () => {
        const requiredFields = ['title', 'phone', 'price', 'description', 'category', 'eventDate', 'eventTime', 'venue', 'city', 'state'];
        const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
            return;
        }

        if (!formData.termsAccepted) {
            toast.error('Please accept the terms and conditions');
            return;
        }

        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const url = isEditMode ? `/api/seller/products/${editId}` : '/api/seller/products/create';
            const method = isEditMode ? 'PATCH' : 'POST';

            // Construct product_attributes
            const product_attributes = {
                highlights: formData.highlights.split('\n').filter((h: string) => h.trim() !== '')
            };

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    product_attributes: JSON.stringify(product_attributes),
                    images
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(isEditMode ? 'Event updated successfully!' : 'Event listed successfully!');
                router.push('/seller/my-ads');
            } else {
                toast.error(data.message || 'Failed to save event');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Failed to save event');
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        { number: 1, title: 'Basic Info', icon: 'ri-information-line' },
        { number: 2, title: 'Details', icon: 'ri-list-check' },
        { number: 3, title: 'Images', icon: 'ri-image-line' },
        { number: 4, title: 'Location', icon: 'ri-map-pin-line' },
    ];

    return (
        <div className="min-h-screen font-jost bg-linear-to-br from-violet-50 via-white to-purple-50">
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm">
                <div className="container mx-auto px-4 py-4 max-w-5xl">
                    <div className="flex items-center justify-between">
                        <Link href={isEditMode ? "/seller/my-ads" : "/seller/place-ad"} className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-orange transition">
                            <i className="ri-arrow-left-line text-xl"></i>
                            <span className="font-medium">Back</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <i className="ri-calendar-event-line text-2xl text-brand-orange"></i>
                            <span className="font-bold text-gray-900">{isEditMode ? 'Edit Event' : 'Events'}</span>
                        </div>
                        <div className="w-16"></div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-12">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${currentStep >= step.number
                                        ? 'bg-linear-to-br from-brand-orange to-orange-600 text-white shadow-lg scale-110'
                                        : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        <i className={step.icon}></i>
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${currentStep >= step.number ? 'text-brand-orange' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${currentStep > step.number ? 'bg-brand-orange' : 'bg-gray-200'
                                        }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-information-line text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <i className="ri-price-tag-3-line text-brand-orange"></i>
                                            Event Title*
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., Music Concert 2024, Python Workshop"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                                <i className="ri-folder-3-line text-brand-orange"></i>
                                                Category*
                                            </label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            >
                                                <option value="">Select category</option>
                                                <option value="Concert">Concert / Live Performance</option>
                                                <option value="Workshop">Workshop / Seminar</option>
                                                <option value="Meetup">Meetup / Networking</option>
                                                <option value="Party">Party / Social Gathering</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                                <i className="ri-money-rupee-circle-line text-brand-orange"></i>
                                                Ticket Price*
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                    placeholder="500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <i className="ri-phone-line text-brand-orange"></i>
                                            Contact Number*
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="+91 9876543210"
                                        />
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                                            <i className="ri-file-text-line text-brand-orange"></i>
                                            Event Description*
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition resize-none"
                                            placeholder="Describe the event agenda, performers, what attendees should bring..."
                                        ></textarea>
                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-sm text-gray-400">Be detailed to attract more attendees</span>
                                            <span className="text-sm text-gray-400">{charCount}/{maxChars}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="mt-8 w-full bg-linear-to-r from-brand-orange to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                >
                                    Continue to Details
                                    <i className="ri-arrow-right-line text-xl"></i>
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-list-check text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Event Date*</label>
                                            <input
                                                type="date"
                                                name="eventDate"
                                                value={formData.eventDate}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">Event Time*</label>
                                            <input
                                                type="time"
                                                name="eventTime"
                                                value={formData.eventTime}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Venue Name / Address*</label>
                                        <input
                                            type="text"
                                            name="venue"
                                            value={formData.venue}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., City Convention Center, Bandra"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Organizer (Optional)</label>
                                        <input
                                            type="text"
                                            name="organizer"
                                            value={formData.organizer}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., Global Events Ltd."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Event Highlights (Optional)</label>
                                        <textarea
                                            name="highlights"
                                            value={formData.highlights}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition resize-none"
                                            placeholder="Enter highlights (one per line)&#10;e.g., Live Music&#10;Free Snacks&#10;Meet & Greet"
                                        ></textarea>
                                        <p className="text-xs text-gray-400 mt-1">Enter each highlight on a new line.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentStep(1)}
                                        className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex-1 bg-linear-to-r from-brand-orange to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
                                    >
                                        Continue
                                        <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-image-line text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Images</h2>
                                </div>

                                <div className="mb-4 p-4 bg-violet-50 rounded-xl border border-violet-200">
                                    <div className="flex items-start gap-3">
                                        <i className="ri-lightbulb-line text-violet-600 text-xl mt-0.5"></i>
                                        <div>
                                            <h4 className="font-semibold text-violet-900 mb-1">Tips for great photos</h4>
                                            <ul className="text-sm text-violet-700 space-y-1">
                                                <li>• Use high-quality banners or flyers</li>
                                                <li>• Include photos of past events if available</li>
                                                <li>• Show the venue or ambiance</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <ImageUpload
                                    onImagesChange={setImages}
                                    maxImages={5}
                                    maxSizeMB={5}
                                />

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentStep(2)}
                                        className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back
                                    </button>
                                    <button
                                        onClick={() => setCurrentStep(4)}
                                        className="flex-1 bg-linear-to-r from-brand-orange to-orange-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2"
                                    >
                                        Continue
                                        <i className="ri-arrow-right-line"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-orange to-orange-600 flex items-center justify-center">
                                        <i className="ri-map-pin-line text-white text-xl"></i>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">City*</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Mumbai"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">State*</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                                placeholder="e.g., Maharashtra"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">Landmark / Area (Optional)</label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={formData.landmark}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition"
                                            placeholder="e.g., Near City Center"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={formData.termsAccepted}
                                                onChange={handleCheckbox}
                                                className="mt-1 w-5 h-5 text-brand-orange border-gray-300 rounded focus:ring-brand-orange"
                                            />
                                            <span className="text-sm text-gray-600 leading-relaxed">
                                                I confirm that the information provided is accurate and complete. I agree to the{' '}
                                                <Link href="/terms" className="text-brand-orange underline hover:text-orange-700">
                                                    Terms & Conditions
                                                </Link>
                                            </span>
                                        </label>
                                        <p className="text-xs text-gray-400 mt-4 flex items-center gap-2">
                                            <i className="ri-time-line"></i>
                                            Your ad will be active for 15 days and automatically deactivated after
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setCurrentStep(3)}
                                        className="flex-1 bg-gray-100 text-gray-700 font-bold py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-arrow-left-line"></i>
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <i className="ri-loader-4-line animate-spin"></i>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-check-line text-xl"></i>
                                                {isEditMode ? 'Update Event' : 'Publish Listing'}
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => setShowPreview(true)}
                                        className="w-full bg-white text-gray-700 font-bold py-4 rounded-xl border-2 border-gray-100 hover:border-brand-orange hover:text-brand-orange transition-all flex items-center justify-center gap-2"
                                    >
                                        <i className="ri-eye-line text-xl"></i>
                                        Preview Your Ad
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Modal */}
                <ProductPreview
                    isOpen={showPreview}
                    onClose={() => setShowPreview(false)}
                    data={formData}
                    images={images}
                    category="Events"
                />
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default function EventsCreatePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EventsCreateForm />
        </Suspense>
    );
}

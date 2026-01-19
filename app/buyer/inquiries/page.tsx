'use client';

import Link from 'next/link';

export default function MyInquiries() {
    const inquiries = [
        {
            id: 1,
            product: 'iPhone 14 Pro Max - 256GB Deep Purple',
            seller: 'Mobile City',
            price: '₹ 105,000',
            image: 'https://images.unsplash.com/photo-1695504239663-c91836173428?auto=format&fit=crop&w=300&q=80',
            status: 'replied',
            lastMessage: 'Yes, the bill box and charger are included.',
            date: 'Today, 10:30 AM'
        },
        {
            id: 2,
            product: '3BHK Apartment in Indiranagar',
            seller: 'Rahul Property Dealer',
            price: '₹ 25,000 / month',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=100&q=80',
            status: 'pending',
            lastMessage: 'When would you like to visit the apartment?',
            date: 'Yesterday'
        },
        {
            id: 3,
            product: 'Royal Enfield Classic 350',
            seller: 'RK Motors',
            price: '₹ 185,000',
            image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=60',
            status: 'closed',
            lastMessage: 'Thank you, I found another option.',
            date: '3 days ago'
        },
    ];

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Inquiries</h1>
                    <p className="text-gray-500">{inquiries.length} products you've inquired about</p>
                </div>

                {/* Inquiries List */}
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                                {/* Image */}
                                <div className="relative w-full sm:w-40 h-40 flex-shrink-0 bg-gray-100">
                                    <img src={inquiry.image} alt={inquiry.product} className="w-full h-full object-cover" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{inquiry.product}</h3>
                                            <p className="text-brand-orange font-bold text-lg">{inquiry.price}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ml-3 flex-shrink-0 ${inquiry.status === 'replied' ? 'bg-green-100 text-green-700' :
                                            inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {inquiry.status === 'replied' ? 'REPLIED' :
                                                inquiry.status === 'pending' ? 'PENDING' : 'CLOSED'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                        <i className="ri-user-line"></i>
                                        <span>Seller: <span className="font-medium text-gray-700">{inquiry.seller}</span></span>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-100">
                                        <p className="text-sm text-gray-600 italic line-clamp-2">"{inquiry.lastMessage}"</p>
                                        <p className="text-xs text-gray-400 mt-1">{inquiry.date}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 flex-wrap">
                                        <Link href="/buyer/messages" className="px-4 py-2 bg-brand-orange text-white rounded-lg text-sm font-medium hover:bg-[#e07a46] transition flex items-center gap-1">
                                            <i className="ri-message-3-line"></i>
                                            View Chat
                                        </Link>
                                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center gap-1">
                                            <i className="ri-eye-line"></i>
                                            View Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {inquiries.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-question-answer-line text-3xl text-gray-400"></i>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No inquiries yet</h3>
                        <p className="text-gray-500 mb-6">You haven't contacted any sellers yet</p>
                        <Link href="/" className="inline-block bg-brand-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#e07a46] transition">
                            Start Browsing
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

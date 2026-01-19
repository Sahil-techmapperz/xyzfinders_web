'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function SellerMessages() {
    // Mock leads/inquiries
    const [leads, setLeads] = useState([
        {
            id: 1,
            buyerName: 'Amit Kapoor',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
            inquiryMessage: 'Is the price negotiable?',
            time: '09:45 AM',
            unread: 1,
            product: 'Royal Enfield Classic 350',
            productImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=100&q=60',
            status: 'New Lead'
        },
        {
            id: 2,
            buyerName: 'Sneha Sharma',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
            inquiryMessage: 'Can you share the exact location?',
            time: 'Yesterday',
            unread: 0,
            product: 'Royal Enfield Classic 350',
            productImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=100&q=60',
            status: 'Interested'
        }
    ]);

    const [selectedLeadId, setSelectedLeadId] = useState<number | null>(1);
    const [messageInput, setMessageInput] = useState('');

    const activeLead = leads.find(l => l.id === selectedLeadId);

    // Mock messages
    const [messages, setMessages] = useState([
        { id: 1, sender: 'them', text: 'Hi, I saw your ad for the Royal Enfield.', time: '09:40 AM' },
        { id: 2, sender: 'them', text: 'Is the price negotiable? I am a serious buyer.', time: '09:45 AM' },
    ]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        setMessages([...messages, {
            id: messages.length + 1,
            sender: 'me',
            text: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setMessageInput('');
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] font-jost flex flex-col">

            <div className="flex-grow container mx-auto px-4 py-6 flex flex-col h-[calc(100vh-140px)]">

                {/* Seller Dashboard Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Seller Inbox</h1>
                        <p className="text-sm text-gray-500">Manage your leads and inquiries</p>
                    </div>
                    <div className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex items-center gap-2 text-sm font-medium text-gray-700">
                        <i className="ri-filter-3-line text-brand-orange"></i>
                        Filter: All Chats
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex overflow-hidden flex-grow">

                    {/* Sidebar - Leads List */}
                    <div className={`${selectedLeadId ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-200 bg-white`}>
                        <div className="p-3 border-b border-gray-100">
                            <input
                                type="text"
                                placeholder="Search buyers..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-orange"
                            />
                        </div>

                        <div className="overflow-y-auto flex-grow">
                            {leads.map((lead) => (
                                <div
                                    key={lead.id}
                                    onClick={() => setSelectedLeadId(lead.id)}
                                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors flex gap-3 ${selectedLeadId === lead.id ? 'bg-orange-50/50 border-l-4 border-l-brand-orange' : 'border-l-4 border-l-transparent'}`}
                                >
                                    <img src={lead.avatar} alt={lead.buyerName} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-semibold text-gray-900 text-sm">{lead.buyerName}</h3>
                                            <span className="text-[10px] text-gray-400">{lead.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate mb-2">{lead.inquiryMessage}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 bg-gray-100 rounded px-1.5 py-0.5 max-w-[120px]">
                                                <img src={lead.productImage} className="w-3 h-3 rounded-full" />
                                                <span className="text-[10px] text-gray-600 truncate">{lead.product}</span>
                                            </div>
                                            {lead.status === 'New Lead' && (
                                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Window */}
                    {selectedLeadId ? (
                        <div className="flex-1 flex flex-col w-full bg-slate-50">

                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm z-10">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSelectedLeadId(null)} className="md:hidden text-gray-500">
                                        <i className="ri-arrow-left-line text-xl"></i>
                                    </button>
                                    <div>
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                            {activeLead?.buyerName}
                                            <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full font-normal">Potential Buyer</span>
                                        </h3>
                                        <p className="text-xs text-gray-500">Inquiry for: <span className="font-medium text-brand-orange">{activeLead?.product}</span></p>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="flex items-center gap-2">
                                    <button className="bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1">
                                        <i className="ri-checkbox-circle-line"></i> Mark Sold
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <i className="ri-more-2-fill"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                                {/* System Note */}
                                <div className="flex justify-center my-4">
                                    <span className="bg-yellow-50 text-yellow-700 text-xs px-3 py-1 rounded-full border border-yellow-100">
                                        Tip: Always meet in a public place for safety.
                                    </span>
                                </div>

                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${msg.sender === 'me'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                            }`}>
                                            <p>{msg.text}</p>
                                            <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white border-t border-gray-200">
                                <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                                    {/* Quick Replies */}
                                    <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full transition" onClick={() => setMessageInput("Yes, it's available.")}>Yes, it's available</button>
                                    <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full transition" onClick={() => setMessageInput("The price is fixed, sorry.")}>Price is fixed</button>
                                    <button className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-full transition" onClick={() => setMessageInput("When can you visit?")}>When to visit?</button>
                                </div>
                                <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
                                    <div className="flex-1 bg-gray-100 rounded-2xl flex items-center px-4 py-2 border border-transparent focus-within:border-brand-orange/50 focus-within:bg-white transition-colors">
                                        <input
                                            type="text"
                                            placeholder="Write a reply..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            className="flex-1 bg-transparent text-sm focus:outline-none"
                                        />
                                        <button type="button" className="text-gray-400 hover:text-gray-600 ml-2">
                                            <i className="ri-image-add-line"></i>
                                        </button>
                                        <button type="button" className="text-gray-400 hover:text-gray-600 ml-2">
                                            <i className="ri-map-pin-line"></i>
                                        </button>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-sm transition-colors flex-shrink-0"
                                    >
                                        <i className="ri-send-plane-2-fill"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden md:flex flex-1 items-center justify-center text-center p-8 text-gray-500">
                            Select a lead to view details and reply
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function BuyerMessages() {
    // Mock conversations
    const [conversations, setConversations] = useState([
        {
            id: 1,
            sellerName: 'Mobile City',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
            lastMessage: 'Yes, the bill box and charger are all included.',
            time: '10:30 AM',
            unread: 2,
            product: 'iPhone 14 Pro Max',
            productImage: 'https://images.unsplash.com/photo-1695504239663-c91836173428?auto=format&fit=crop&w=100&q=80',
            price: '₹ 105,000'
        },
        {
            id: 2,
            sellerName: 'Rahul Property Dealer',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
            lastMessage: 'When would you like to visit the apartment?',
            time: 'Yesterday',
            unread: 0,
            product: '3BHK Apartment in Indiranagar',
            productImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=100&q=80',
            price: '₹ 25,000 / month'
        }
    ]);

    const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
    const [messageInput, setMessageInput] = useState('');

    const activeChat = conversations.find(c => c.id === selectedChatId);

    // Mock messages for the active chat
    const [messages, setMessages] = useState([
        { id: 1, sender: 'them', text: 'Hi! Is this still available?', time: '10:00 AM' },
        { id: 2, sender: 'me', text: 'Yes, it is available.', time: '10:05 AM' },
        { id: 3, sender: 'them', text: 'Does it come with the original accessories?', time: '10:15 AM' },
        { id: 4, sender: 'me', text: 'Yes, the bill box and charger are all included.', time: '10:30 AM' }
    ]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'me',
            text: messageInput,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessageInput('');
    };

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost flex flex-col">

            <div className="flex-grow container mx-auto px-4 py-6 flex flex-col items-stretch h-[calc(100vh-140px)]">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex overflow-hidden flex-grow">

                    {/* Sidebar - Chat List */}
                    <div className={`${selectedChatId ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-200`}>
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                        </div>

                        <div className="overflow-y-auto flex-grow">
                            {conversations.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChatId(chat.id)}
                                    className={`p-4 border-b border-gray-50 hover:bg-orange-50 cursor-pointer transition-colors flex gap-3 ${selectedChatId === chat.id ? 'bg-orange-50/60' : ''}`}
                                >
                                    <div className="relative">
                                        <img src={chat.avatar} alt={chat.sellerName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                        {chat.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-semibold text-gray-900 truncate">{chat.sellerName}</h3>
                                            <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
                                        </div>
                                        <p className={`text-sm truncate ${chat.unread > 0 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                                            {chat.lastMessage}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1.5 bg-gray-50 p-1 rounded-md max-w-fit">
                                            <img src={chat.productImage} alt="" className="w-4 h-4 rounded object-cover" />
                                            <span className="text-[10px] text-gray-500 truncate max-w-[120px]">{chat.product}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Window */}
                    {selectedChatId ? (
                        <div className="flex-1 flex flex-col w-full">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSelectedChatId(null)} className="md:hidden text-gray-500 hover:text-brand-orange">
                                        <i className="ri-arrow-left-line text-xl"></i>
                                    </button>
                                    <img src={activeChat?.avatar} alt={activeChat?.sellerName} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{activeChat?.sellerName}</h3>
                                        {activeChat && <span className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <img src={activeChat?.productImage} alt="" className="w-8 h-8 rounded object-cover" />
                                        <div>
                                            <div className="text-xs font-medium text-gray-900 line-clamp-1">{activeChat?.product}</div>
                                            <div className="text-xs font-bold text-brand-orange">{activeChat?.price}</div>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500">
                                        <i className="ri-more-2-fill"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F8F9FA]">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] lg:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'me'
                                            ? 'bg-brand-orange text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                            }`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'me' ? 'text-orange-100' : 'text-gray-400'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <button type="button" className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 hover:text-brand-orange flex items-center justify-center transition">
                                        <i className="ri-attachment-line text-lg"></i>
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange/50 transition"
                                    />
                                    <button
                                        type="submit"
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm ${messageInput.trim()
                                            ? 'bg-brand-orange text-white hover:bg-[#e07a46]'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        disabled={!messageInput.trim()}
                                    >
                                        <i className="ri-send-plane-fill text-lg"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        // Empty State for Desktop
                        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 text-center p-8">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                <i className="ri-chat-smile-3-line text-4xl"></i>
                            </div>
                            <h3 className="text-gray-900 font-bold mb-1">Select a conversation</h3>
                            <p className="text-gray-500 text-sm">Choose a chat from the sidebar to start messaging</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

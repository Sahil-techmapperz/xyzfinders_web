'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import useSWR from 'swr';
import { apiClient } from '@/lib/api-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export interface MessagesSystemProps {
    role: 'buyer' | 'seller';
}

const fetcher = (url: string) => apiClient.get(url);

export default function MessagesSystem({ role }: MessagesSystemProps) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [initializingChat, setInitializingChat] = useState<any>(null);

    // 1. Get current user
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        } else {
            // Optional: Redirect
        }
    }, []);

    // 2. Fetch Conversations
    const { data: conversationsResponse, error: conversationsError, mutate: mutateConversations } = useSWR(
        user ? '/messages/conversations' : null,
        fetcher,
        {
            refreshInterval: 5000,
            onError: (err) => {
                console.error("Failed to fetch conversations", err);
            }
        }
    );

    const conversations = useMemo(() => {
        if (!conversationsResponse?.data || !user) return [];
        return conversationsResponse.data.map((c: any) => {
            const isMeSender = c.sender_id === user.id;
            const otherUser = isMeSender
                ? { id: c.receiver_id, name: c.receiver_name }
                : { id: c.sender_id, name: c.sender_name };

            let images = [];
            try {
                if (typeof c.product_images === 'string') {
                    if (c.product_images.startsWith('[')) {
                        images = JSON.parse(c.product_images);
                    } else {
                        images = [c.product_images];
                    }
                } else if (Array.isArray(c.product_images)) {
                    images = c.product_images;
                }
            } catch (e) {
                images = [];
            }

            let productImage = '/placeholder.png';
            if (c.product_image) {
                if (c.product_image.startsWith('http') || c.product_image.startsWith('data:')) {
                    productImage = c.product_image;
                } else {
                    productImage = `data:image/jpeg;base64,${c.product_image}`;
                }
            } else if (images.length > 0) {
                productImage = images[0] || '/placeholder.png';
            }

            return {
                id: `${c.product_id}-${otherUser.id}`, // composite ID
                rawId: c.id,
                otherUserId: otherUser.id,
                otherUserName: otherUser.name || 'Unknown User',
                productId: c.product_id,
                productTitle: c.product_title || 'Unknown Item',
                productPrice: c.product_price,
                productImage: productImage,
                lastMessage: c.message,
                time: new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: new Date(c.created_at),
                unread: c.unread_count || 0,
                sender_id: c.sender_id,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name || 'User')}&background=random`
            };
        });
    }, [conversationsResponse, user]);

    const activeChat = useMemo(() => {
        if (selectedChatId) {
            const existing = conversations.find((c: any) => c.id === selectedChatId);
            if (existing) return existing;
        }
        return initializingChat;
    }, [conversations, selectedChatId, initializingChat]);

    // 3. Fetch Messages
    const { data: messagesResponse, mutate: mutateMessages } = useSWR(
        activeChat ? `/messages/${activeChat.productId}/${activeChat.otherUserId}` : null,
        fetcher,
        {
            refreshInterval: 3000,
        }
    );

    const messages = useMemo(() => {
        if (!messagesResponse?.data) return [];
        return messagesResponse.data.map((m: any) => ({
            id: m.id,
            sender: m.sender_id === user?.id ? 'me' : 'them',
            text: m.message,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date(m.created_at)
        }));
    }, [messagesResponse, user]);

    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length, selectedChatId]);

    // 4. Handle Query Params (e.g. from "Chat with Seller" button)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams(window.location.search);
        const productId = params.get('productId');
        const otherUserId = params.get('sellerId') || params.get('buyerId');

        if (productId && otherUserId && user) {
            const compositeId = `${productId}-${otherUserId}`;

            // Check if conversation already exists
            const existing = conversations.find((c: any) => c.id === compositeId);
            if (existing) {
                setSelectedChatId(compositeId);
                setInitializingChat(null);
            } else {
                // Fetch product info to show in header for new chat
                const fetchProductInfo = async () => {
                    try {
                        const res = await apiClient.get(`/products/${productId}`);
                        if (res.success && res.data) {
                            const p = res.data;
                            let images: any[] = [];
                            try {
                                if (typeof p.images === 'string') {
                                    images = p.images.startsWith('[') ? JSON.parse(p.images) : [p.images];
                                } else if (Array.isArray(p.images)) {
                                    images = p.images;
                                }
                            } catch (e) { }

                            let primaryImage = '/placeholder.png';
                            if (images.length > 0) {
                                const img = images[0];
                                if (typeof img === 'string') {
                                    primaryImage = img;
                                } else if (typeof img === 'object' && img.image) {
                                    primaryImage = `data:image/jpeg;base64,${img.image}`;
                                }
                            }

                            setInitializingChat({
                                id: compositeId,
                                otherUserId: parseInt(otherUserId),
                                otherUserName: p.seller?.name || 'Seller',
                                productId: p.id,
                                productTitle: p.title,
                                productPrice: p.price,
                                productImage: primaryImage,
                                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(p.seller?.name || 'Seller')}&background=random`
                            });
                            setSelectedChatId(compositeId);
                        }
                    } catch (err) {
                        console.error("Failed to fetch product for new chat", err);
                    }
                };
                fetchProductInfo();
            }
        }
    }, [conversations, user]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageInput.trim() || !activeChat) return;

        const tempData = {
            product_id: activeChat.productId,
            receiver_id: activeChat.otherUserId,
            message: messageInput
        };

        try {
            await apiClient.post('/messages', tempData);
            setMessageInput('');
            mutateMessages();
            mutateConversations();
        } catch (error) {
            console.error(error);
            toast.error('Failed to send message');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#FFFBF7] font-jost flex flex-col">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Please log in to view messages</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBF7] font-jost flex flex-col">
            <div className="grow container mx-auto px-4 py-6 flex flex-col items-stretch h-[calc(100vh-140px)]">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex overflow-hidden grow">

                    {/* Sidebar */}
                    <div className={`${selectedChatId ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-gray-200`}>
                        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-800">{role === 'seller' ? 'Seller Messages' : 'My Messages'}</h2>
                        </div>

                        <div className="overflow-y-auto grow">
                            {conversations.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    <p>No conversations found.</p>
                                </div>
                            ) : (
                                conversations.map((chat: any) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChatId(chat.id)}
                                        className={`p-4 border-b border-gray-50 hover:bg-orange-50 cursor-pointer transition-colors flex gap-3 ${selectedChatId === chat.id ? 'bg-orange-50/60' : ''}`}
                                    >
                                        <div className="relative">
                                            <img src={chat.avatar} alt={chat.otherUserName} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                            {chat.unread > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[10px] flex items-center justify-center text-white">{chat.unread}</span>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-semibold text-gray-900 truncate">{chat.otherUserName}</h3>
                                                <span className="text-xs text-gray-400 shrink-0">{chat.time}</span>
                                            </div>
                                            <p className={`text-sm truncate ${chat.unread > 0 ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>
                                                {chat.lastMessage}
                                            </p>
                                            <div className="flex items-center gap-1 mt-1.5 bg-gray-50 p-1 rounded-md max-w-fit">
                                                <img
                                                    src={chat.productImage || '/placeholder.png'}
                                                    alt=""
                                                    onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png' }}
                                                    className="w-4 h-4 rounded object-cover"
                                                />
                                                <span className="text-[10px] text-gray-500 truncate max-w-[120px]">{chat.productTitle}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Chat Window */}
                    {selectedChatId ? (
                        <div className="flex-1 flex flex-col w-full h-full">
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 shrink-0">
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setSelectedChatId(null)} className="md:hidden text-gray-500 hover:text-brand-orange">
                                        <i className="ri-arrow-left-line text-xl"></i>
                                    </button>
                                    <img src={activeChat?.avatar} alt={activeChat?.otherUserName} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                    <div>
                                        <h3 className="font-bold text-gray-900">{activeChat?.otherUserName}</h3>
                                        <span className="text-xs text-gray-500">{role === 'buyer' ? 'Seller' : 'Buyer'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <img
                                            src={activeChat?.productImage || '/placeholder.png'}
                                            alt=""
                                            onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png' }}
                                            className="w-8 h-8 rounded object-cover"
                                        />
                                        <div>
                                            <div className="text-xs font-medium text-gray-900 line-clamp-1">{activeChat?.productTitle}</div>
                                            <div className="text-xs font-bold text-brand-orange">
                                                {activeChat?.productPrice ? `₹ ${activeChat.productPrice}` : 'Price on Request'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="grow p-4 overflow-y-auto space-y-4 bg-[#F8F9FA] h-0">
                                {messages.map((msg: any) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[75%] lg:max-w-[60%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'me'
                                            ? 'bg-brand-orange text-white rounded-br-none'
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                            }`}>
                                            <p className="text-sm break-words">{msg.text}</p>
                                            <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'me' ? 'text-orange-100' : 'text-gray-400'}`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-orange/50 transition"
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

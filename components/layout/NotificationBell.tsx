'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    link?: string;
    is_read: boolean;
    created_at: string;
    sender_name?: string;
    // sender_avatar?: string; // Removed from backend for now
}


export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);

        // Close dropdown when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            clearInterval(interval);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch('/api/notifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                if (res.ok) {
                    const response = await res.json();
                    if (response.success && response.data) {
                        setNotifications(response.data.notifications || []);
                        setUnreadCount(response.data.unreadCount || 0);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const markAsRead = async (id: number, link?: string) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));

        try {
            await fetch(`/api/notifications/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error marking as read:', error);
        }

        setIsOpen(false);

        if (link) {
            router.push(link);
        }
    };

    const deleteNotification = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        const token = localStorage.getItem('token');
        if (!token) return;

        setNotifications(prev => prev.filter(n => n.id !== id));

        try {
            await fetch(`/api/notifications/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error deleting notification:', error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition text-gray-600"
            >
                <i className="ri-notification-3-line text-xl"></i>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                    <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && <span className="text-xs text-brand-orange font-medium">{unreadCount} New</span>}
                    </div>

                    <div className="max-h-[400px] overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                <div className="mb-2 text-4xl opacity-20"><i className="ri-notification-off-line"></i></div>
                                <p className="text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id, notif.link)}
                                        className={`p-4 hover:bg-gray-50 cursor-pointer transition relative group ${!notif.is_read ? 'bg-blue-50/30' : ''}`}
                                    >
                                        <div className="flex gap-3">
                                            <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'order' ? 'bg-green-100 text-green-600' :
                                                notif.type === 'message' ? 'bg-blue-100 text-blue-600' :
                                                    'bg-orange-100 text-brand-orange'
                                                }`}>
                                                {notif.sender_name ? (
                                                    <span className="font-bold text-xs">{notif.sender_name.charAt(0).toUpperCase()}</span>
                                                ) : (
                                                    <i className={`${notif.type === 'order' ? 'ri-shopping-bag-3-fill' :
                                                        notif.type === 'message' ? 'ri-message-3-fill' :
                                                            'ri-information-fill'
                                                        }`}></i>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm ${!notif.is_read ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                                                    {notif.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                                <p className="text-[10px] text-gray-400 mt-2">
                                                    {new Date(notif.created_at).toLocaleDateString()} • {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => deleteNotification(e, notif.id)}
                                                className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50"
                                                title="Delete"
                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                        {!notif.is_read && (
                                            <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-brand-orange"></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                        <button className="text-xs font-semibold text-gray-500 hover:text-brand-orange transition">
                            Mark all as read
                        </button>
                        <Link href="/notifications" className="text-xs font-semibold text-brand-orange hover:text-orange-600 transition" onClick={() => setIsOpen(false)}>
                            View all
                        </Link>
                    </div>
                </div>
            )
            }
        </div >
    );
}

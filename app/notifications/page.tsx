'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    link?: string;
    is_read: boolean;
    created_at: string;
    sender_name?: string;
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const res = await fetch('/api/notifications', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const response = await res.json();
                if (response.success && response.data) {
                    setNotifications(response.data.notifications || []);
                }
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // ... (rest of methods unchanged)

    // ... (rest of methods unchanged)

    const markAsRead = async (id: number, link?: string) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Optimistic update
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));

        try {
            await fetch(`/api/notifications/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error marking as read:', error);
        }

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

    const markAllAsRead = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
        if (unreadIds.length === 0) return;

        // Optimistic update
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));

        try {
            // Depending on API, we might need a specific endpoint or loop loop.
            // For now, loop through unread (or ideally backend has a mark-all endpoint)
            // Assuming we loop for now as per previous conversation context which didn't specify bulk update
            // But to be efficient, let's just update UI. Real-world would surely have a bulk endpoint.
            // Let's assume hitting all at once is okay for this demo scale, or just update UI.

            // Simulating bulk update by one-by-one (not ideal but safe given current API knowledge)
            // Or better, stick to UI only if no bulk API exists? 
            // Let's wait for user to ask for bulk API or implementing it later.
            // Actually, I'll implement a loop here to be safe and consistent with backend constraints.
            await Promise.all(unreadIds.map(id =>
                fetch(`/api/notifications/${id}`, {
                    method: 'PUT',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ));
        } catch (error) {
            console.error('Error marking all as read:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                    {notifications.some(n => !n.is_read) && (
                        <button
                            onClick={markAllAsRead}
                            className="text-sm font-semibold text-brand-orange hover:text-orange-600 transition"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>

                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="animate-pulse flex p-4 bg-white rounded-xl border border-gray-100">
                                <div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="text-6xl text-gray-200 mb-4"><i className="ri-notification-off-line"></i></div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications yet</h3>
                        <p className="text-gray-500">We'll notify you when something important happens.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map(notif => (
                            <div
                                key={notif.id}
                                onClick={() => markAsRead(notif.id, notif.link)}
                                className={`flex items-start gap-4 p-4 rounded-xl border transition cursor-pointer group hover:shadow-md ${!notif.is_read
                                    ? 'bg-white border-blue-100 shadow-sm'
                                    : 'bg-gray-50/50 border-gray-100 hover:bg-white'
                                    }`}
                            >
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${notif.type === 'order' ? 'bg-green-100 text-green-600' :
                                    notif.type === 'message' ? 'bg-blue-100 text-blue-600' :
                                        'bg-orange-100 text-brand-orange'
                                    }`}>
                                    {notif.sender_name ? (
                                        <span className="font-bold text-sm">{notif.sender_name.charAt(0).toUpperCase()}</span>
                                    ) : (
                                        <i className={`text-xl ${notif.type === 'order' ? 'ri-shopping-bag-3-fill' :
                                            notif.type === 'message' ? 'ri-message-3-fill' :
                                                'ri-information-fill'
                                            }`}></i>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`text-base ${!notif.is_read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                                            {notif.title}
                                        </h3>
                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                                            {new Date(notif.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => deleteNotification(e, notif.id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition opacity-0 group-hover:opacity-100"
                                    title="Delete notification"
                                >
                                    <i className="ri-delete-bin-line"></i>
                                </button>
                                {!notif.is_read && (
                                    <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-orange"></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function TestNotificationsPage() {
    const [userId, setUserId] = useState<number | null>(null);
    const [title, setTitle] = useState('Test Notification');
    const [message, setMessage] = useState('This is a test notification message.');
    const [type, setType] = useState('system');
    const [link, setLink] = useState('/notifications');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserId(user.id);
            } catch (e) {
                console.error('Error parsing user from local storage', e);
            }
        }
    }, []);

    const sendNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) {
            toast.error('You must be logged in to test notifications');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/notifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    receiver_id: userId, // This is the target user
                    title,
                    message,
                    type,
                    link
                })
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Notification sent!');
            } else {
                toast.error(data.message || 'Failed to send notification');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (!userId) {
        return (
            <div className="container mx-auto p-8 text-center">
                <p>Please log in to use this test page.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-md py-12 px-4">
            <h1 className="text-2xl font-bold mb-6">Test Notifications</h1>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={sendNotification} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target User ID</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={userId || ''}
                                onChange={(e) => setUserId(parseInt(e.target.value))}
                                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange/50 outline-none bg-gray-50"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const stored = localStorage.getItem('user');
                                    if (stored) setUserId(JSON.parse(stored).id);
                                }}
                                className="px-3 py-2 text-xs bg-gray-200 hover:bg-gray-300 rounded text-gray-700 whitespace-nowrap"
                            >
                                Reset to Me
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">This is the ID of the user who will receive the notification.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange/50 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange/50 outline-none"
                            rows={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange/50 outline-none"
                        >
                            <option value="system">System (Info)</option>
                            <option value="order">Order (Green)</option>
                            <option value="message">Message (Blue)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-orange/50 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Notification'}
                    </button>
                </form>
            </div>
        </div>
    );
}

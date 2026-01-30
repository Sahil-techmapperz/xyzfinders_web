'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface ContactSellerButtonProps {
    productId: string | number;
    sellerId: string | number;
    className?: string;
    label?: string;
    icon?: string;
}

export default function ContactSellerButton({
    productId,
    sellerId,
    className = "w-full bg-[#0078D4] hover:bg-[#006cbd] text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors",
    label = "Chat with Seller",
    icon = "ri-chat-3-fill"
}: ContactSellerButtonProps) {
    const router = useRouter();

    const handleChat = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (!token || !user) {
            toast.error('Please login to chat with the seller');
            // Optional: trigger login modal if accessible, but redirect is safer
            return;
        }

        const parsedUser = JSON.parse(user);
        if (parsedUser.id === Number(sellerId)) {
            toast.error("You cannot chat with yourself");
            return;
        }

        // Redirect to messages with params
        router.push(`/buyer/messages?productId=${productId}&sellerId=${sellerId}`);
    };

    return (
        <button onClick={handleChat} className={className}>
            {icon && <i className={icon}></i>}
            {label}
        </button>
    );
}

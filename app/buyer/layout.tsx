'use client';

import { usePathname } from 'next/navigation';
import BuyerNav from '@/components/layout/BuyerNav';

export default function BuyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const shouldHideNav = pathname?.includes('/buyer/messages') || pathname?.includes('/buyer/wishlist') || pathname === '/buyer/profile';

    return (
        <>
            {!shouldHideNav && <BuyerNav />}
            {children}
        </>
    );
}

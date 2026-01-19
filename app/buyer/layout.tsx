'use client';

import BuyerNav from '@/components/layout/BuyerNav';

export default function BuyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BuyerNav />
            {children}
        </>
    );
}

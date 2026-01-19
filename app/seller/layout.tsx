'use client';

import SellerNav from '@/components/layout/SellerNav';

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SellerNav />
            {children}
        </>
    );
}

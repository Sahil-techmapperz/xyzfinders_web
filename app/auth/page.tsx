'use client';

import AuthPage from "@/components/auth/AuthPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AuthPageWrapper() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
    return <AuthPage initialMode={mode} />;
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthPageWrapper />
        </Suspense>
    );
}

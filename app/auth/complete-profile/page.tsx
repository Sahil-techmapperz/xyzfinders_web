'use client';

import CompleteProfile from "@/components/auth/CompleteProfile";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CompleteProfile />
        </Suspense>
    );
}

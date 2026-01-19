import BeautyDetail from '@/components/beauty/BeautyDetail';


export default async function BeautyDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <BeautyDetail id={id} />
        </main>
    );
}

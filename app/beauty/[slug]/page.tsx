import BeautyDetail from '@/components/beauty/BeautyDetail';


export default async function BeautyDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    // Extract ID from slug (format: id-title-slug)
    const id = slug.split('-')[0];

    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <BeautyDetail id={id} />
        </main>
    );
}

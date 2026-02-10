import FashionDetail from '@/components/fashion/FashionDetail';

export default async function FashionDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <FashionDetail id={id} />
        </main>
    );
}

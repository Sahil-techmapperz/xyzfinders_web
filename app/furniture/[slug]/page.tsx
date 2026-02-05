import FurnitureDetail from '@/components/furniture/FurnitureDetail';


export default async function FurnitureDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <FurnitureDetail id={id} />
        </main>
    );
}

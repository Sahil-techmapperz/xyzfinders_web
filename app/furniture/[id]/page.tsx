import FurnitureDetail from '@/components/furniture/FurnitureDetail';


export default async function FurnitureDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <FurnitureDetail id={id} />
        </main>
    );
}

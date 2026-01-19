import GadgetDetail from '@/components/gadgets/GadgetDetail';


export default async function GadgetDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <GadgetDetail id={id} />
        </main>
    );
}

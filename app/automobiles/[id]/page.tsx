import AutomobileDetail from '@/components/automobiles/AutomobileDetail';


export default async function AutomobileDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <AutomobileDetail id={id} />
        </main>
    );
}

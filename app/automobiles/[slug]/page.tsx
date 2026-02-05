import AutomobileDetail from '@/components/automobiles/AutomobileDetail';


export default async function AutomobileDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <AutomobileDetail id={id} />
        </main>
    );
}

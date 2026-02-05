import GadgetDetail from '@/components/gadgets/GadgetDetail';


export default async function GadgetDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return (
        <main className="min-h-screen bg-[#FFFBF7]">
            <GadgetDetail id={id} />
        </main>
    );
}

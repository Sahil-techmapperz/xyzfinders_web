
import MobileDetail from '@/components/mobiles/MobileDetail';

export default async function MobileDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main>
            <MobileDetail id={id} />
        </main>
    );
}

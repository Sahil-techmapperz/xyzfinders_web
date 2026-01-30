
import ServicesDetail from '@/components/services/ServicesDetail';

export default async function ServicesDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main>
            <ServicesDetail id={id} />
        </main>
    );
}

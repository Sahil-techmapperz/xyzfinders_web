
import PetsDetail from '@/components/pets/PetsDetail';

export default async function PetsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main>
            <PetsDetail id={id} />
        </main>
    );
}

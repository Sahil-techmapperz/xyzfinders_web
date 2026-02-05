import PetsDetail from '@/components/pets/PetsDetail';

export default async function PetDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return (
        <main>
            <PetsDetail id={id} />
        </main>
    );
}

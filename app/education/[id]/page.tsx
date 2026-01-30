
import EducationDetail from '@/components/education/EducationDetail';

export default async function EducationDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main>
            <EducationDetail id={id} />
        </main>
    );
}

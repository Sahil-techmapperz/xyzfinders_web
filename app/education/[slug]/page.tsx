import EducationDetail from '@/components/education/EducationDetail';

export default async function EducationDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return <EducationDetail id={id} />;
}

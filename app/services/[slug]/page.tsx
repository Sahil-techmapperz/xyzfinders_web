import ServicesDetail from '@/components/services/ServicesDetail';

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const id = slug.split('-')[0];
    return <ServicesDetail id={id} />;
}

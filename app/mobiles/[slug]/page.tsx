import MobileDetail from '@/components/mobiles/MobileDetail';

export default async function MobileDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return <MobileDetail id={id} />;
}

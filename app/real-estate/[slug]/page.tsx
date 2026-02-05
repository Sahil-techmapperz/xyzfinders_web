import type { Metadata } from 'next';
import PropertyDetail from '@/components/real-estate/PropertyDetail';

export const metadata: Metadata = {
    title: 'Property Details | XYZ Finders',
    description: 'View detailed information about this property.',
};

export default async function PropertyDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    // Extract ID from slug (format: id-title-slug or just id)
    const id = slug.split('-')[0];

    return <PropertyDetail id={id} />;
}

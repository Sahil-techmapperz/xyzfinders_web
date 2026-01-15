import type { Metadata } from 'next';
import PropertyDetail from '@/components/real-estate/PropertyDetail';

export const metadata: Metadata = {
    title: 'Property Details | XYZ Finders',
    description: 'View detailed information about this property.',
};

export default async function PropertyDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return <PropertyDetail id={id} />;
}

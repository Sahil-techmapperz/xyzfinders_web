import EventsDetail from '@/components/events/EventsDetail';

export default async function EventDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const id = slug.split('-')[0];

    return <EventsDetail id={id} />;
}

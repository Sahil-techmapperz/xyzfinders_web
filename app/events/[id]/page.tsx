
import EventsDetail from '@/components/events/EventsDetail';

export default async function EventsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main>
            <EventsDetail id={id} />
        </main>
    );
}

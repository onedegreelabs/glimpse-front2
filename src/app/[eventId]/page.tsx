import { cookies } from 'next/headers';

import { ParticipantsSearchParams } from '@/types/types';

import EmailAccessForm from './components/EmailAccessForm';
import EventDetails from './components/EventDetails';
import ParticipantsNav from './components/ParticipantsNav';
import SearchParticipants from './components/SearchParticipants';
import ParticipantCard from './components/ParticipantCard';

export default async function page({
  params: { eventId },
  searchParams,
}: {
  params: { eventId: string };
  searchParams: ParticipantsSearchParams;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  return (
    <main className="relative flex size-full flex-col">
      {!accessToken && <EmailAccessForm />}
      <EventDetails eventId={eventId} />
      {/* 추후 suspensive 적용 */}
      <section className="relative size-full text-white">
        <ParticipantsNav
          {...searchParams}
          eventId={eventId}
          participantCount={null}
        />

        <div className="px-6">
          <SearchParticipants
            search={searchParams.search ?? ''}
            eventId={eventId}
          />

          <ParticipantCard participantRole="HOST" />

          <div className="h-5" />

          <ParticipantCard participantRole="GUEST" />
        </div>
      </section>
    </main>
  );
}

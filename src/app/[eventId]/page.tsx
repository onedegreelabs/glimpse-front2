import { cookies } from 'next/headers';
import {
  ParticipantsResponseDto,
  ParticipantsSearchParams,
} from '@/types/types';
import { redirect } from 'next/navigation';
import { getParticipantsInfo } from '@/lib/apis/server/eventsApi';
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
  let participantsInfo: ParticipantsResponseDto | null = null;

  if (
    searchParams.nav &&
    searchParams.nav !== 'ALL' &&
    searchParams.nav !== 'FORYOU'
  ) {
    redirect(`/${eventId}?nav=ALL`);
  }

  if (accessToken) {
    participantsInfo = await getParticipantsInfo({
      eventId,
      take: 15,
      accessToken,
    });
  }

  return (
    <main className="relative flex size-full flex-col">
      {!accessToken && <EmailAccessForm />}
      <EventDetails eventId={eventId} />
      {/* 추후 suspensive 적용 */}
      <section className="relative size-full text-white">
        <ParticipantsNav
          {...searchParams}
          eventId={eventId}
          participantCount={participantsInfo?.totalItemCount}
        />

        <div className="px-6">
          {searchParams.nav === 'ALL' && (
            <SearchParticipants
              search={searchParams.search ?? ''}
              eventId={eventId}
            />
          )}

          <ParticipantCard participantRole="HOST" />

          <ParticipantCard participantRole="GUEST" />
        </div>
      </section>
    </main>
  );
}

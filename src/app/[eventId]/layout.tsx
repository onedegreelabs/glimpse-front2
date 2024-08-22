import { cookies } from 'next/headers';
import { ParticipantsResponseDto } from '@/types/types';
import { getParticipantsInfo } from '@/lib/apis/server/eventsApi';
import { PARTICIPANTS_TAKE } from '@/constant/constant';
import EmailAccessForm from './_components/EmailAccessForm';
import EventDetails from './_components/EventDetails';
import ParticipantsNav from './_components/ParticipantsNav';

export default async function layout({
  params: { eventId },
  children,
}: Readonly<{
  params: { eventId: string };
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  let participantsInfo: ParticipantsResponseDto | null = null;

  if (accessToken) {
    participantsInfo = await getParticipantsInfo({
      eventId,
      take: PARTICIPANTS_TAKE,
      lastItemId: 0,
      accessToken,
    });
  }

  return (
    <main className="relative flex size-full flex-col pb-4">
      {!accessToken && <EmailAccessForm />}
      <EventDetails eventId={eventId} />
      {/* 추후 suspensive 적용 */}
      <section className="relative size-full text-white">
        <ParticipantsNav
          eventId={eventId}
          participantCount={participantsInfo?.totalItemCount}
        />
        {children}
      </section>
    </main>
  );
}

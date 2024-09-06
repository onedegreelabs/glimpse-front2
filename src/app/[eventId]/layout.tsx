import { cookies } from 'next/headers';
import { CurationsResponseDto, ParticipantsResponseDto } from '@/types/types';
import {
  getCurationsInfo,
  getParticipantsInfo,
} from '@/lib/apis/server/eventsApi';
import { PARTICIPANTS_TAKE } from '@/constant/constant';
import ScrollUpBtn from '@/components/ScrollUpBtn';
import EventDetails from './_components/EventDetails';
import ParticipantsNav from './_components/ParticipantsNav';
import MatchSlide from './_components/MatchSlide';

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
  let curationsInfo: CurationsResponseDto | null = null;

  if (accessToken) {
    participantsInfo = await getParticipantsInfo({
      eventId,
      take: PARTICIPANTS_TAKE,
      lastItemId: 0,
    });

    curationsInfo = await getCurationsInfo({ eventId, accessToken });
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col pb-4">
      <EventDetails eventId={eventId} accessToken={accessToken} />
      {/* 추후 suspensive 적용 */}
      <section className="relative size-full flex-grow text-white">
        <ParticipantsNav
          eventId={eventId}
          participantCount={participantsInfo?.totalItemCount}
        />
        <ScrollUpBtn />
        {children}
      </section>
      {accessToken && curationsInfo?.totalAttempts === 0 && <MatchSlide />}
    </main>
  );
}

import { cookies } from 'next/headers';
import { ParticipantsResponseDto } from '@/types/types';
import { getParticipantsInfo } from '@/lib/apis/server/eventsApi';
import { PARTICIPANTS_TAKE } from '@/constant/constant';
import { SadFaceSVG } from '@/icons/index';
import ParticipantCard from '@/components/ParticipantCard';
import SearchParticipants from './_components/SearchParticipants';
import Participants from '../_components/participants/Participants';

export default async function page({
  params: { eventId },
  searchParams,
}: {
  params: { eventId: string };
  searchParams: { search?: string };
}) {
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
    <>
      <div className="px-6">
        <SearchParticipants
          search={searchParams.search ?? ''}
          eventId={eventId}
        />

        {participantsInfo ? (
          <Participants participantsInfo={participantsInfo} eventId={eventId} />
        ) : (
          <ul className="flex flex-col gap-3">
            <ParticipantCard participantRole="HOST" />
            <ParticipantCard participantRole="GUEST" />
            <ParticipantCard participantRole="GUEST" />
          </ul>
        )}
      </div>

      {participantsInfo && participantsInfo.totalItemCount === 0 && (
        <div className="absolute left-1/2 top-1/2 my-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-[18px]">
          <SadFaceSVG />
          <p className="text-white/60">No matching results.</p>
        </div>
      )}
    </>
  );
}

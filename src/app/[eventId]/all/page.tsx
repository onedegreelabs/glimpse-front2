import { cookies, headers } from 'next/headers';
import { ParticipantsResponseDto } from '@/types/types';
import { getParticipantsInfo } from '@/lib/apis/server/eventsApi';
import { PARTICIPANTS_TAKE } from '@/constant/constant';
import { SadFaceSVG } from '@/icons/index';
import ParticipantCard from '@/components/ParticipantCard/ParticipantCard';
import SearchParticipants from './_components/SearchParticipants';
import Participants from '../_components/participants/Participants';
import EmailAccessForm from '../_components/EmailAccessForm';

export default async function page({
  params: { eventId },
  searchParams = { search: '' },
}: {
  params: { eventId: string };
  searchParams: { search?: string };
}) {
  const userId = headers().get('X-User-Id') as string;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  let participantsInfo: ParticipantsResponseDto | null = null;

  if (accessToken) {
    participantsInfo = await getParticipantsInfo({
      eventId,
      take: PARTICIPANTS_TAKE,
      lastItemId: 0,
      search: searchParams.search ?? '',
    });
  }

  console.log(participantsInfo);

  return (
    <>
      {!accessToken && <EmailAccessForm eventId={eventId} />}
      <div className="px-6">
        <SearchParticipants
          search={searchParams.search ?? ''}
          eventId={eventId}
        />
        {searchParams.search &&
          participantsInfo &&
          participantsInfo.totalItemCount !== 0 && (
            <div className="my-[18px] flex gap-1 text-base font-medium">
              <p className="text-yellow-primary">
                {participantsInfo.totalItemCount}
              </p>
              results
            </div>
          )}

        {participantsInfo ? (
          <Participants
            userId={Number(userId)}
            initialParticipants={participantsInfo.participants}
            totalItemCount={participantsInfo.totalItemCount}
            eventId={eventId}
            search={searchParams.search ?? ''}
          />
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

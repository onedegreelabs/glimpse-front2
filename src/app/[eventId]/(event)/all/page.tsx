import { ParticipantsResponseDto } from '@/types/types';
import { getParticipantsInfo } from '@/lib/apis/server/eventsApi';
import { PARTICIPANTS_TAKE } from '@/constant/constant';
import { SadFaceSVG } from '@/icons/index';
import ParticipantCard from '@/components/ParticipantCard/ParticipantCard';
import getTokenInfo from '@/utils/auth/getTokenInfo';
import SearchParticipants from './_components/SearchParticipants';
import Participants from '../_components/participants/Participants';
import EmailAccessForm from '../_components/RegistrationBlurOverlay';
import MyParticipants from '../_components/participants/MyParticipants';

export default async function page({
  params: { eventId },
  searchParams = { search: '' },
}: {
  params: { eventId: string };
  searchParams: { search?: string };
}) {
  const userInfo = await getTokenInfo();
  let participantsInfo: ParticipantsResponseDto | null = null;

  if (userInfo) {
    participantsInfo = await getParticipantsInfo({
      eventId,
      take: PARTICIPANTS_TAKE,
      lastItemId: 0,
      search: searchParams.search ?? '',
    });
  }

  return (
    <>
      {(!userInfo || !participantsInfo) && (
        <EmailAccessForm eventId={eventId} isLogin={!!userInfo} />
      )}
      <div className="px-6">
        <SearchParticipants
          search={searchParams.search ?? ''}
          eventId={eventId}
        />
        {searchParams.search &&
          participantsInfo &&
          participantsInfo.totalItemCount !== 0 && (
            <div className="my-[1.125rem] flex gap-1 text-base font-medium">
              <p className="text-yellow-primary">
                {participantsInfo.totalItemCount}
              </p>
              results
            </div>
          )}

        {participantsInfo && userInfo ? (
          <ul className="flex flex-col gap-3">
            {!searchParams.search && (
              <MyParticipants
                accessToken={userInfo.accessToken}
                eventId={eventId}
                userId={userInfo.userId}
              />
            )}

            <Participants
              userId={Number(userInfo.userId)}
              initialParticipants={participantsInfo.participants}
              totalItemCount={participantsInfo.totalItemCount}
              eventId={eventId}
              search={searchParams.search ?? ''}
            />
          </ul>
        ) : (
          <ul className="flex flex-col gap-3">
            <ParticipantCard participantRole="HOST" eventId={eventId} />
            <ParticipantCard participantRole="GUEST" eventId={eventId} />
            <ParticipantCard participantRole="GUEST" eventId={eventId} />
          </ul>
        )}
      </div>

      {participantsInfo && participantsInfo.totalItemCount === 0 && (
        <div className="absolute left-1/2 top-1/2 my-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-[1.125rem]">
          <SadFaceSVG />
          <p className="text-white/60">No matching results.</p>
        </div>
      )}
    </>
  );
}

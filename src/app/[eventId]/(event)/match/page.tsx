import { getCurationsInfo } from '@/lib/apis/server/eventsApi';
import { CurationsResponseDto } from '@/types/types';
import { cookies } from 'next/headers';
import React from 'react';
import ParticipantCard from '@/components/ParticipantCard/ParticipantCard';
import MatchingComponent from './_components/MatchingComponent';
import Curations from './_components/Curations';
import EmailAccessForm from '../_components/RegistrationBlurOverlay';

const page = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  let curationsInfo: CurationsResponseDto | null = null;

  if (accessToken) {
    curationsInfo = await getCurationsInfo({ eventId, accessToken });
  }

  const isCurated = !!curationsInfo && curationsInfo.totalAttempts !== 0;

  return (
    <>
      {(!accessToken || !curationsInfo) && (
        <EmailAccessForm eventId={eventId} isLogin={!!accessToken} />
      )}
      <div className="px-6 pb-28 pt-1">
        <MatchingComponent eventId={eventId} isCurated={isCurated} />
        {isCurated ? (
          <Curations curationsInfo={curationsInfo!} eventId={eventId} />
        ) : (
          <ul className="flex flex-col gap-3">
            <ParticipantCard
              participantRole="GUEST"
              isCuration
              eventId={eventId}
            />
            <ParticipantCard
              participantRole="GUEST"
              isCuration
              eventId={eventId}
            />
            <ParticipantCard
              participantRole="GUEST"
              isCuration
              eventId={eventId}
            />
          </ul>
        )}
      </div>
    </>
  );
};

export default page;

import { getCurationsInfo } from '@/lib/apis/server/eventsApi';
import { CurationsResponseDto } from '@/types/types';
import { cookies } from 'next/headers';
import React from 'react';
import ParticipantCard from '@/components/ParticipantCard';
import MatchingComponent from './_components/MatchingComponent';
import Curations from './_components/Curations';
import Blur from './_components/Blur';

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
    <div className="px-6 pb-20 pt-1">
      {isCurated ? (
        <>
          <MatchingComponent eventId={eventId} />
          <Curations curationsInfo={curationsInfo!} />
        </>
      ) : (
        <>
          <Blur />
          <ul className="flex flex-col gap-3">
            <ParticipantCard participantRole="GUEST" isCuration />
            <ParticipantCard participantRole="GUEST" isCuration />
            <ParticipantCard participantRole="GUEST" isCuration />
          </ul>
        </>
      )}
    </div>
  );
};

export default page;

import { getCurationsInfo } from '@/lib/apis/server/eventsApi';
import { CurationsResponseDto } from '@/types/types';
import { cookies } from 'next/headers';
import React from 'react';
import ParticipantCard from '@/components/ParticipantCard';
import MatchingBlur from './_components/MatchingBlur';
import Curations from './_components/Curations';

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

  return (
    <div className="px-6 pt-1">
      {curationsInfo?.totalAttempts === 0 ? (
        <MatchingBlur eventId={eventId} />
      ) : (
        <Curations />
      )}

      {!accessToken || curationsInfo?.totalAttempts === 0 ? (
        <ul className="flex flex-col gap-3">
          <ParticipantCard participantRole="GUEST" />
          <ParticipantCard participantRole="GUEST" />
          <ParticipantCard participantRole="GUEST" />
        </ul>
      ) : (
        <ul className="flex flex-col gap-3">
          <ParticipantCard participantRole="GUEST" isCuration />
          <ParticipantCard participantRole="GUEST" isCuration />
        </ul>
      )}
    </div>
  );
};

export default page;

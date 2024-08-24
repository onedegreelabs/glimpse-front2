import { getCurationsInfo } from '@/lib/apis/server/eventsApi';
import { CurationsResponseDto } from '@/types/types';
import { cookies } from 'next/headers';
import React from 'react';
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
    </div>
  );
};

export default page;

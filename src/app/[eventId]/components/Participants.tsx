'use client';

import { PARTICIPANTS_TAKE } from '@/constant/constant';
import { getParticipantsInfo } from '@/lib/apis/eventsApi';
import { ParticipantsResponseDto } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ParticipantCard from './ParticipantCard';

interface ParticipantsProps {
  eventId: string;
  participantsInfo: ParticipantsResponseDto;
}

function Participants({ participantsInfo, eventId }: ParticipantsProps) {
  const { data } = useInfiniteQuery({
    queryKey: ['participants'],
    queryFn: ({ pageParam }) =>
      getParticipantsInfo({
        eventId: pageParam.eventId,
        take: pageParam.take,
      }),
    initialPageParam: { eventId, take: PARTICIPANTS_TAKE },
    initialData: {
      pages: [participantsInfo],
      pageParams: [{ eventId, take: PARTICIPANTS_TAKE }],
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMorePages =
        allPages[0].totalItemCount > allPages.length * PARTICIPANTS_TAKE;
      if (hasMorePages) {
        return {
          eventId,
          take: PARTICIPANTS_TAKE,
          lastItemId: lastPage.participants.at(-1)?.id,
        };
      }
      return undefined;
    },
  });

  const participants = useMemo(
    () => data?.pages.flatMap((page) => page.participants) ?? [],
    [data],
  );

  return (
    <ul className="flex flex-col gap-3">
      {participants.map((info) => (
        <ParticipantCard key={info.id} {...info} participantRole={info.role} />
      ))}
    </ul>
  );
}

export default Participants;

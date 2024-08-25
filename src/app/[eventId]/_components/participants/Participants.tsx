'use client';

import { PARTICIPANTS_TAKE } from '@/constant/constant';
import { getParticipantsInfo } from '@/lib/apis/eventsApi';
import { EventParticipantProfileCardDto } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import { v4 as uuidv4 } from 'uuid';
import ParticipantCard from '@/components/ParticipantCard';
import Loading from './Loading';

interface ParticipantsProps {
  eventId: string;
  initialParticipants: EventParticipantProfileCardDto[];
  totalItemCount: number;
  search?: string;
}

function Participants({
  initialParticipants,
  totalItemCount,
  eventId,
  search,
}: ParticipantsProps) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['participants', search],
      queryFn: ({ pageParam }) =>
        getParticipantsInfo({
          eventId: pageParam.eventId,
          take: pageParam.take,
          lastItemId: pageParam.lastItemId,
          search,
        }),
      initialPageParam: {
        eventId,
        take: PARTICIPANTS_TAKE,
        lastItemId: 0,
        search,
      },
      initialData: {
        pages: [{ participants: initialParticipants, totalItemCount }],
        pageParams: [
          { eventId, take: PARTICIPANTS_TAKE, lastItemId: 0, search },
        ],
      },
      getNextPageParam: (lastPage, allPages) => {
        const hasMorePages =
          totalItemCount > allPages.length * PARTICIPANTS_TAKE;

        if (hasMorePages) {
          return {
            eventId,
            take: PARTICIPANTS_TAKE,
            lastItemId: lastPage.participants.at(-1)?.id ?? 0,
            search,
          };
        }
        return undefined;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
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
      {isFetchingNextPage ? (
        Array.from({ length: PARTICIPANTS_TAKE }, () => (
          <Loading key={uuidv4()} />
        ))
      ) : (
        <InView
          as="div"
          onChange={(inView) => {
            if (inView && hasNextPage) {
              fetchNextPage();
            }
          }}
          threshold={0}
          triggerOnce
          className="h-[1px]"
        />
      )}
    </ul>
  );
}

export default Participants;

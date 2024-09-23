'use client';

import ParticipantCard from '@/components/ParticipantCard/ParticipantCard';
import { CurationsResponseDto } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

interface CurationsProps {
  curationsInfo: CurationsResponseDto;
  eventId: string;
}

function Curations({ curationsInfo, eventId }: CurationsProps) {
  const { data: curationsList } = useQuery({
    queryKey: ['curations'],
    initialData: curationsInfo.participants,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <ul className="flex flex-col gap-3">
      {curationsList.map((info) => (
        <ParticipantCard
          key={info.id}
          participantRole={info.role}
          info={info}
          isCuration
          eventId={eventId}
        />
      ))}
    </ul>
  );
}

export default Curations;

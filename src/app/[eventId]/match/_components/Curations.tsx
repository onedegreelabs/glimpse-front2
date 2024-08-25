'use client';

import ParticipantCard from '@/components/ParticipantCard';
import { CurationsResponseDto } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

interface CurationsProps {
  curationsInfo: CurationsResponseDto;
}

function Curations({ curationsInfo }: CurationsProps) {
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
          {...info}
          isCuration
        />
      ))}
    </ul>
  );
}

export default Curations;

'use client';

import { useEffect } from 'react';
import ParticipantCard from '@/components/ParticipantCard';
import { useMatchStore } from '@/store/matchStore';
import { postCurations } from '@/lib/apis/eventsApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

function MatchingBlur({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { isComplete } = useMatchStore((state) => ({
    isComplete: state.isComplete,
  }));

  const { mutate } = useMutation({
    mutationFn: (id: string) => postCurations({ eventId: id }),
    onSuccess: () => {
      router.refresh();
    },
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isComplete) {
      mutate(eventId);
    }
  }, [eventId, isComplete, mutate]);

  return (
    <>
      <div className="fixed inset-0 z-10 mx-auto max-w-sm bg-gradient-to-b from-transparent from-0% to-blue-secondary to-[88%] backdrop-blur-[2px]" />
      <ul className="flex flex-col gap-3">
        <ParticipantCard participantRole="GUEST" />
        <ParticipantCard participantRole="GUEST" />
        <ParticipantCard participantRole="GUEST" />
      </ul>
    </>
  );
}

export default MatchingBlur;

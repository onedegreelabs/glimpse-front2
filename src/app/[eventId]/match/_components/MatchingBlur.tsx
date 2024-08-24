'use client';

import { useEffect } from 'react';
import { useMatchStore } from '@/store/matchStore';
import { postCurations } from '@/lib/apis/eventsApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Spinner2 } from '@/icons/index';

function MatchingBlur({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { isComplete } = useMatchStore((state) => ({
    isComplete: state.isComplete,
  }));

  const { mutate, isPending } = useMutation({
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
    <div className="fixed inset-0 z-10 mx-auto max-w-sm bg-gradient-to-b from-transparent from-0% to-blue-secondary to-[88%] backdrop-blur-[2px]">
      {isPending && (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-5">
          <Spinner2 className="animate-spin" />
          <p className="text-xs">Finding the best match...</p>
        </div>
      )}
    </div>
  );
}

export default MatchingBlur;

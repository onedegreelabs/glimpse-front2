'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SadFaceSVG } from '@/icons/index';
import BaseButton from '@/components/BaseButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute left-1/2 top-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-[1.125rem] text-white/60">
      <SadFaceSVG />
      <p className="text-base font-bold">
        An error occurred while loading the page.
      </p>
      <div className="text-main-color mt-6 flex flex-col gap-4 text-lg font-bold">
        <BaseButton
          onClick={() => router.back()}
          className="w-56 rounded-[0.625rem] bg-yellow-primary py-[1.375rem] text-center text-blue-secondary"
        >
          Go Back
        </BaseButton>

        <BaseButton
          onClick={() => reset()}
          className="w-56 rounded-[0.625rem] bg-gray-B30/20 py-[1.375rem] text-center text-white/40"
        >
          Retry
        </BaseButton>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SadFaceSVG } from '@/icons/index';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="absolute left-1/2 top-1/2 z-20 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-[18px] text-white/60">
      <SadFaceSVG />
      <p className="text-base font-bold">
        An error occurred while loading the page.
      </p>
      <div className="text-main-color mt-6 flex flex-col gap-4 text-lg font-bold">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-56 rounded-[10px] bg-yellow-primary py-[22px] text-center text-blue-secondary"
        >
          Go Back
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className="w-56 rounded-[10px] bg-gray-B30/20 py-[22px] text-center text-white/40"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

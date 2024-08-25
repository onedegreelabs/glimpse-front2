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
    <div className="z-20 my-auto flex flex-col items-center justify-center gap-[18px] text-white/60">
      <SadFaceSVG />
      <p className="text-base font-bold">
        An error occurred while loading the page.
      </p>
      <div className="text-main-color mt-6 flex flex-col gap-4 text-lg font-bold">
        <button
          type="button"
          onClick={() => router.back()}
          className="border-main-color w-56 rounded-[3rem] border border-solid py-3 text-center"
        >
          이전 페이지로 이동
        </button>

        <button
          type="button"
          onClick={() => reset()}
          className="border-main-color w-56 rounded-[3rem] border border-solid py-3"
        >
          재시도
        </button>
      </div>
    </div>
  );
}

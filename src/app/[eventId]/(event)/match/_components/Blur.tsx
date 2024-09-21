'use client';

import { useEffect } from 'react';
import { Spinner2 } from '@/icons/index';

interface BlurProps {
  isPending?: boolean;
}

function Blur({ isPending }: BlurProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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

export default Blur;

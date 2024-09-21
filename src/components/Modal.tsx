'use client';

import { useClickAway } from '@uidotdev/usehooks';
import React, { useEffect } from 'react';

function Modal({
  children,
  closeHandler,
}: Readonly<{
  children: React.ReactNode;
  closeHandler: () => void;
}>) {
  const ref = useClickAway<HTMLDivElement>(() => {
    closeHandler();
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed left-1/2 top-1/2 z-modal flex size-full max-w-sm -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-black/40 px-6 text-gray-B80">
      <div ref={ref} className="relative w-full rounded-3xl bg-white">
        {children}
      </div>
    </div>
  );
}

export default Modal;

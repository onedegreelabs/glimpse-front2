'use client';

import { CrossSVG } from '@/icons/index';
import { useClickAway } from '@uidotdev/usehooks';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface BottomModalProps {
  children: React.ReactNode;
  closeHandler: () => void;
}

function BottomModal({ children, closeHandler }: BottomModalProps) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    window.history.pushState(null, '', pathname);

    const handlePopState = () => {
      closeHandler();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = 'auto';
    };
  }, [pathname, closeHandler]);

  const ref = useClickAway<HTMLElement>(() => {
    closeHandler();
  });

  return (
    <article className="fixed left-1/2 top-1/2 z-event h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform bg-black/40">
      <section
        ref={ref}
        className="absolute bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 transform rounded-t-3xl bg-white px-[26px] pb-[50px] pt-[42px]"
      >
        <button
          type="button"
          className="absolute right-[18px] top-[18px]"
          aria-label="close-modal"
          onClick={closeHandler}
        >
          <CrossSVG className="size-6" />
        </button>
        {children}
      </section>
    </article>
  );
}

export default BottomModal;

'use client';

import { useEffect, useState } from 'react';
import { ArrowSVG } from '@/icons/index';
import { usePathname } from 'next/navigation';

function ScrollUpBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const currentPathname = pathname.split('/').at(-1);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    setIsVisible(window.scrollY !== 0);

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative ml-auto mr-14 size-[1px]">
      {isVisible && (
        <button
          type="button"
          className={`${currentPathname === 'all' ? 'mb-4' : 'mb-[90px]'} fixed bottom-0 z-10 flex size-[46px] items-center justify-center rounded-full bg-yellow-primary`}
          aria-label="scroll-up-button"
          onClick={handleScrollUp}
        >
          <ArrowSVG className="size-[16.5px] -rotate-90 transform" />
        </button>
      )}
    </div>
  );
}

export default ScrollUpBtn;

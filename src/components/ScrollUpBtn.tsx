'use client';

import { useEffect, useState } from 'react';
import { ArrowSVG } from '@/icons/index';
import { usePathname } from 'next/navigation';
import BaseButton from './BaseButton';

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
    <div className="relative ml-auto mr-14 size-[0.063rem]">
      {isVisible && (
        <BaseButton
          className={`${currentPathname === 'match' ? 'mb-[5.625rem]' : 'mb-4'} fixed bottom-0 z-10 flex size-[2.875rem] items-center justify-center rounded-full bg-yellow-primary`}
          aria-label="scroll-up-button"
          onClick={handleScrollUp}
        >
          <ArrowSVG className="size-[1.031rem] -rotate-90 transform" />
        </BaseButton>
      )}
    </div>
  );
}

export default ScrollUpBtn;

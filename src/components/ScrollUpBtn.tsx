'use client';

import { ArrowSVG } from '@/icons/index';
import { usePathname } from 'next/navigation';

function ScrollUpBtn() {
  const pathname = usePathname();
  const currentPathname = pathname.split('/').at(-1);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative ml-auto mr-14 size-[1px]">
      <button
        type="button"
        className={`${currentPathname === 'all' ? 'mb-4' : 'mb-[90px]'} fixed bottom-0 z-10 flex size-[46px] items-center justify-center rounded-full bg-yellow-primary`}
        aria-label="scroll-up-button"
        onClick={handleScrollUp}
      >
        <ArrowSVG className="size-[16.5px] -rotate-90 transform" />
      </button>
    </div>
  );
}

export default ScrollUpBtn;

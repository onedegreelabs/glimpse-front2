'use client';

import { PanInfo, motion } from 'framer-motion';
import { ArrowSVG, ArrowSVG2 } from '@/icons/index';
import { usePathname, useRouter } from 'next/navigation';
import { useMatchStore } from '@/store/matchStore';
import { useRef, useState } from 'react';

function MatchSlide() {
  const router = useRouter();
  const pathname = usePathname();
  const eventId = pathname.split('/')[1];
  const currenPathname = pathname.split('/').at(-1);
  const constraintsRef = useRef(null);

  const [currentX, setCurrentX] = useState(0);

  const { isComplete, setIsComplete } = useMatchStore((state) => ({
    isComplete: state.isComplete,
    setIsComplete: state.setIsComplete,
  }));

  const handleDrag = (_: MouseEvent, info: PanInfo) => {
    setCurrentX(info.offset.x);
  };

  const handleDragEnd = () => {
    const threshold = 50;
    if (currentX >= threshold) {
      setCurrentX(166);
      setTimeout(() => {
        setIsComplete(true);
        router.push(`/${eventId}/match`);
      }, 300);
    } else {
      setCurrentX(1);
    }
  };

  return (
    !isComplete && (
      <article className="fixed bottom-7 left-1/2 z-event h-[4.125rem] w-[14.625rem] -translate-x-1/2 transform rounded-full bg-custom-gradient">
        <motion.div
          ref={constraintsRef}
          className="relative mx-0.5 my-0.5 flex h-[3.875rem] w-[14.375rem] items-center justify-center rounded-full bg-blue-B50"
        >
          <motion.div
            className="absolute left-[0.313rem] flex size-14 cursor-pointer items-center justify-center rounded-full bg-yellow-primary"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={{ x: currentX }}
            transition={{ type: 'none' }}
          >
            <ArrowSVG className="h-[0.875rem] w-[1.063rem]" />
          </motion.div>
          <div className="ml-7 bg-gradient-to-r from-blue-B30 to-yellow-primary bg-clip-text text-transparent">
            <p className="select-none text-lg font-bold">Go match</p>
          </div>
          <div className="absolute right-6 flex gap-1">
            <ArrowSVG2 className="h-4 w-[0.563rem] stroke-white" />
            <ArrowSVG2 className="h-4 w-[0.563rem] stroke-white" />
          </div>
        </motion.div>
        {currenPathname === 'match' && (
          <p className="absolute -top-20 w-[14.938rem] text-center text-xl font-bold text-yellow-600">
            Curious about the perfect match for you?
          </p>
        )}
      </article>
    )
  );
}

export default MatchSlide;

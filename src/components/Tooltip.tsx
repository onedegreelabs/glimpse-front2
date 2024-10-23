'use client';

import { CrossSVG, QuestionSVG } from '@/icons/index';
import { useClickAway } from '@uidotdev/usehooks';
import { useState } from 'react';
import BaseButton from './BaseButton';

interface TooltipProps {
  children: React.ReactNode;
  tooltipClassName?: string; // 툴팁에 적용할 클래스
  buttonClassName?: string; // 버튼에 적용할 클래스
}

function Tooltip({
  children,
  tooltipClassName = '',
  buttonClassName = '',
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const toggleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div ref={ref} className="relative inline-block">
      <BaseButton
        onClick={toggleOpen}
        aria-label="edit-profile-tooltip"
        className={`relative ${buttonClassName}`}
      >
        <QuestionSVG />
      </BaseButton>
      {isOpen && (
        <div className={`absolute ${tooltipClassName}`}>
          <BaseButton
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 z-10"
            aria-label="close-tooltip"
          >
            <CrossSVG className="size-4 fill-black" />
          </BaseButton>
          {children}
        </div>
      )}
    </div>
  );
}

export default Tooltip;

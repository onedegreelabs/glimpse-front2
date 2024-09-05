'use client';

import BottomModal from '@/components/BottomModal';
import { ArrowSVG3 } from '@/icons/index';
import { useState } from 'react';

function JobCategory() {
  const [isOpen, setIsOpen] = useState(false);

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 text-sm font-semibold text-gray-B80/55"
      >
        Select job category
        <ArrowSVG3 className="absolute -right-7 top-5 size-16 fill-gray-B40" />
      </button>
      {isOpen && <BottomModal closeHandler={closeHandler}>adsasd</BottomModal>}
    </>
  );
}

export default JobCategory;

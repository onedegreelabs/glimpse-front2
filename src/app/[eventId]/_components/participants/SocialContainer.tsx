'use client';

import {
  LinkSVG,
  FacebookSVG,
  GoogleSVG,
  InstagramSVG,
  LineSVG,
  LinkedinSVG,
  PinterestSVG,
  SNSSVG,
  SkypeSVG,
  TwitterSVG,
  YoutubeSVG,
} from '@/icons/index';
import { useClickAway } from '@uidotdev/usehooks';
import { useState } from 'react';

import Link from 'next/link';

interface SocialContainerProps {
  participantRole: 'HOST' | 'GUEST';
}

function SocialContainer({ participantRole }: SocialContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickAway<HTMLUListElement>(() => {
    setIsOpen(false);
  });

  const handleOpenModal = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpenModal}
        aria-label="Share participant link"
        className={`flex size-8 items-center justify-center rounded-full fill-white hover:fill-yellow-primary ${participantRole === 'HOST' ? 'bg-white/15' : 'bg-gray-B25/30'}`}
      >
        <LinkSVG />
      </button>
      {isOpen && (
        <ul
          ref={ref}
          className="absolute right-0 mt-1 grid grid-cols-[auto_auto_auto] gap-2 rounded-lg bg-white p-2"
        >
          <li>
            <Link href="mailto:">
              <SNSSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <FacebookSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <GoogleSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <InstagramSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <LineSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <LinkedinSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <PinterestSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <SkypeSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <TwitterSVG />
            </Link>
          </li>
          <li>
            <Link href="/">
              <YoutubeSVG />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default SocialContainer;

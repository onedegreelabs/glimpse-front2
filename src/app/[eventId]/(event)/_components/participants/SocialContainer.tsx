'use client';

import { LinkSVG, SNSSVG } from '@/icons/index';
import { useClickAway } from '@uidotdev/usehooks';
import { useState } from 'react';

import Link from 'next/link';
import { EventParticipantProfileCardDto, SocialMediaDto } from '@/types/types';
import GetSocialIcon from '@/components/GetSocialIcon';

interface SocialContainerProps {
  participantRole: EventParticipantProfileCardDto['role'];
  email: string | undefined;
  socialList: SocialMediaDto[];
}

function SocialContainer({
  participantRole,
  email,
  socialList,
}: SocialContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleOpenModal = () => {
    setIsOpen((perv) => !perv);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleOpenModal}
        aria-label="Share participant link"
        className={`flex size-8 items-center justify-center rounded-full hover:fill-yellow-primary ${isOpen ? 'fill-yellow-primary' : 'fill-white'} ${participantRole === 'HOST' ? 'bg-white/15' : 'bg-gray-B25/30'}`}
      >
        <LinkSVG className="size-4" />
      </button>
      {isOpen && (
        <ul
          className={`${socialList.length === 0 || (socialList.length >= 2 ? 'grid-cols-[auto_auto_auto]' : 'grid-cols-[auto_auto]')} absolute right-0 z-10 mt-1 grid gap-2 rounded-lg bg-white p-2`}
        >
          <li>
            <Link href={`mailto:${email}`}>
              <SNSSVG />
            </Link>
          </li>
          {socialList.map(({ id, type, url }) => (
            <li key={id}>
              <Link href={url} target="_blank">
                {GetSocialIcon(type, 'size-[20px]', 'size-[10px]')}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SocialContainer;

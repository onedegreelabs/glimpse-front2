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
  GithubSVG,
  TelegramSVG,
} from '@/icons/index';
import { useClickAway } from '@uidotdev/usehooks';
import { useState } from 'react';

import Link from 'next/link';
import { EventParticipantProfileCardDto, SocialMediaDto } from '@/types/types';

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

  const SOCIAL_SVG = {
    GITHUB: <GithubSVG className="size-[20px]" />,
    FACEBOOK: <FacebookSVG className="size-[20px]" />,
    GOOGLE: <GoogleSVG />,
    INSTAGRAM: <InstagramSVG className="size-[20px]" />,
    LINE: <LineSVG />,
    LINKEDIN: <LinkedinSVG className="size-[20px]" />,
    PINTEREST: <PinterestSVG className="size-[20px]" />,
    SKYPE: <SkypeSVG />,
    TWITTER: <TwitterSVG />,
    YOUTUBE: <YoutubeSVG />,
    TELEGRAM: <TelegramSVG className="size-[20px]" />,
  } as { [key: string]: React.ReactNode };

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
          className={`${socialList.length === 0 || (socialList.length >= 2 ? 'grid-cols-[auto_auto_auto]' : 'grid-cols-[auto_auto]')} absolute right-0 mt-1 grid gap-2 rounded-lg bg-white p-2`}
        >
          <li>
            <Link href={`mailto:${email}`}>
              <SNSSVG />
            </Link>
          </li>
          {socialList.map(({ id, type, url }) => (
            <li key={id}>
              <Link href={url} target="_blank">
                {SOCIAL_SVG[type]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SocialContainer;

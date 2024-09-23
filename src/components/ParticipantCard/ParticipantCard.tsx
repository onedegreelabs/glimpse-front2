'use client';

import { CommentSVG, DefaultProfileSVG, TagSVG } from '@/icons/index';
import {
  CuratedParticipantDto,
  EventParticipantProfileCardDto,
} from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ParticipantDetailModal from './ParticipantDetailModal';
import WishlistButton from './WishlistButton';
import EditButton from './EditButton';

type ParticipantCardProps = {
  participantRole: 'HOST' | 'GUEST';
  eventId: string;
  isCuration?: boolean;
  isUserCard?: boolean;
  info?: Partial<CuratedParticipantDto>;
};

function ParticipantCard({
  eventId,
  info,
  participantRole,
  isUserCard,
  isCuration = false,
}: ParticipantCardProps) {
  const {
    user,
    isWishlisted,
    krComment,
    tags,
    enComment = 'Park I-cheol is an entrepreneur in the AI.',
    intro = 'A kiddo who uses Bootstrap and Laravel in web development. Currently playing around with design via Figma. Currently playing around ...',
  } = info ?? {};
  const [isDetailView, setIsDetailView] = useState(false);
  const name = user?.name ?? 'Emma Stone';
  const jobs = user?.jobTitle ?? 'Designer';
  const belong = user?.belong ?? 'Glimpse';

  const closeDetailView = () => {
    setIsDetailView(false);
  };

  const openDetailView = () => {
    setIsDetailView(true);
  };

  return (
    <>
      <li
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
        role="button"
        onClick={openDetailView}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openDetailView();
          }
        }}
        tabIndex={0}
        className="flex w-full flex-col items-center"
      >
        <div
          className={`relative flex min-h-40 w-full flex-col rounded-3xl border border-solid py-6 pl-5 pr-4 ${isUserCard ? 'border-yellow-primary bg-blue-B70/50' : 'border-white/30 bg-white/20'}`}
        >
          <dl className="mb-[0.875rem] flex w-full gap-[0.875rem]">
            <div className="relative flex size-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-B35/40 fill-white">
              {user?.profileImageUrl ? (
                <Link
                  href={`/image?src=${user.profileImageUrl}`}
                  className="absolute left-0 top-0 size-full overflow-hidden rounded-full"
                  scroll={false}
                >
                  <Image
                    src={user.profileImageUrl}
                    alt={`${name} profile`}
                    fill
                    sizes="48px"
                  />
                </Link>
              ) : (
                <DefaultProfileSVG className="size-[1.875rem]" />
              )}
              {participantRole === 'HOST' && (
                <span className="absolute -bottom-2 rounded-3xl bg-yellow-primary px-[0.469rem] py-[0.25rem] text-[0.563rem] font-bold text-blue-B50">
                  HOST
                </span>
              )}
            </div>
            <div className="min-w-0 flex-grow self-center">
              <dt className="mb-0.5 truncate pr-11 text-base font-semibold">
                {name}
              </dt>
              <dd className="flex flex-wrap text-xs text-white/60">
                <span>{jobs}&nbsp;</span>
                <span>@ {belong}</span>
              </dd>
            </div>
          </dl>
          <p className="mb-[0.625rem] line-clamp-2 break-words text-sm font-light">
            {intro}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex items-center gap-[0.375rem] break-all text-xs text-yellow-primary">
              <div className="flex size-3 flex-shrink-0 items-center justify-center rounded-full bg-yellow-primary">
                <TagSVG />
              </div>
              {tags.map(({ name: tagName }) => tagName).join(', ')}
            </div>
          )}
          <div className="absolute right-2 top-2">
            {isUserCard ? (
              <EditButton eventId={eventId} />
            ) : (
              <WishlistButton id={user?.id} isWishlisted={isWishlisted} />
            )}
          </div>
          {isCuration && (
            <div className="absolute -bottom-0.5 left-1/2 h-[0.688rem] w-[86.7%] -translate-x-1/2 transform rounded-t-full bg-yellow-primary" />
          )}
        </div>
        {isCuration && (
          <div className="mr-[0.1px] grid w-[86.31%] grid-cols-[auto_1fr] items-center gap-[0.375rem] rounded-b-xl bg-yellow-primary pb-[0.688rem] pl-[0.875rem] pr-[0.688rem] pt-[1px] text-xs font-medium text-blue-B50">
            <CommentSVG className="self-start" />
            {enComment}
            <br />
            <br />
            {krComment}
          </div>
        )}
      </li>
      {isDetailView && info?.id && (
        <ParticipantDetailModal
          eventId={eventId}
          isUserCard={!!isUserCard}
          closeDetailView={closeDetailView}
          participantRole={participantRole}
          {...(info as EventParticipantProfileCardDto)}
        />
      )}
    </>
  );
}

export default ParticipantCard;

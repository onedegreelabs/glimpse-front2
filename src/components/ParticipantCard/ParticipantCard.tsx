import WishlistButton from '@/app/[eventId]/(event)/_components/participants/WishlistButton';
import { CommentSVG, DefaultProfileSVG, TagSVG } from '@/icons/index';
import { CuratedParticipantDto } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

type ParticipantCardProps = {
  participantRole: 'HOST' | 'GUEST';
  isCuration?: boolean;
  userId?: number;
} & Partial<CuratedParticipantDto>;

function ParticipantCard({
  participantRole,
  user,
  userId,
  isWishlisted,
  krComment,
  enComment = 'Park I-cheol is an entrepreneur in the AI.',
  isCuration = false,
  intro = 'A kiddo who uses Bootstrap and Laravel in web development. Currently playing around with design via Figma. Currently playing around ...',
}: ParticipantCardProps) {
  const name = user?.name ?? 'Emma Stone';
  const jobs = user?.jobCategory ?? { id: 1, engName: 'Designer' };
  const belong = user?.belong ?? 'Glimpse';

  return (
    <li className="flex w-full flex-col items-center">
      <div className="relative flex min-h-40 w-full flex-col rounded-3xl border border-solid border-white/30 bg-white/20 py-6 pl-5 pr-4">
        <dl className="mb-[14px] flex w-full gap-[14px]">
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
              <DefaultProfileSVG />
            )}
            {participantRole === 'HOST' && (
              <span className="absolute -bottom-2 rounded-3xl bg-yellow-primary px-[7.5px] py-[4px] text-[9px] font-bold text-blue-B50">
                HOST
              </span>
            )}
          </div>
          <div className="min-w-0 flex-grow self-center">
            <dt className="mb-0.5 truncate pr-11 text-base font-semibold">
              {name}
            </dt>
            <dd className="flex flex-wrap text-xs text-white/60">
              <span>{jobs.engName}</span> <span>@ {belong}</span>
            </dd>
          </div>
        </dl>
        <p className="mb-[10px] line-clamp-2 break-words text-sm font-light">
          {intro}
        </p>
        <div className="flex items-center gap-[6px] text-xs text-yellow-primary">
          <div className="flex size-3 items-center justify-center rounded-full bg-yellow-primary">
            <TagSVG />
          </div>
          dasdada
        </div>
        <div className="absolute right-2 top-2">
          {userId !== user?.id && (
            <WishlistButton id={user?.id} isWishlisted={isWishlisted} />
          )}
        </div>
        {isCuration && (
          <div className="absolute -bottom-0.5 left-1/2 h-[11px] w-[86.7%] -translate-x-1/2 transform rounded-t-full bg-yellow-primary" />
        )}
      </div>
      {isCuration && (
        <div className="mr-[0.1px] grid w-[86.31%] grid-cols-[auto_1fr] items-center gap-[6px] rounded-b-xl bg-yellow-primary pb-[11px] pl-[14px] pr-[11px] pt-[1px] text-xs font-medium text-blue-B50">
          <CommentSVG className="self-start" />
          {enComment}
          <br />
          <br />
          {krComment}
        </div>
      )}
    </li>
  );
}

export default ParticipantCard;

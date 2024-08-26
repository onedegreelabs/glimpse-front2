import { CommentSVG, DefaultProfileSVG } from '@/icons/index';
import { CuratedParticipantDto } from '@/types/types';
import Image from 'next/image';
import SocialContainer from '../app/[eventId]/_components/participants/SocialContainer';
import WishlistButton from '../app/[eventId]/_components/participants/WishlistButton';

type ParticipantCardProps = {
  participantRole: 'HOST' | 'GUEST';
  isCuration?: boolean;
} & Partial<CuratedParticipantDto>;

function ParticipantCard({
  participantRole,
  user,
  isWishlisted,
  email,
  socialMedia,
  krComment = 'Park I-cheol is an entrepreneur in the AI.',
  isCuration = false,
  name = 'Emma Stone',
  jobs = [{ id: 1, name: 'Designer' }],
  intro = 'A kiddo who uses Bootstrap and Laravel in web development. Currently playing around with design via Figma. Currently playing around ...',
}: ParticipantCardProps) {
  return (
    <li className="relative flex flex-col items-center">
      <div
        className={`relative flex min-h-40 w-full flex-col rounded-3xl border border-solid pb-6 pl-5 pr-4 pt-4 ${participantRole === 'HOST' ? 'border-white/30 bg-blue-B70/50' : 'border-white/30 bg-white/20'}`}
      >
        <header className="flex w-full">
          <div className="grid w-full grid-cols-[1fr_auto]">
            <div className="mt-3 grid grid-cols-[auto_1fr] gap-[10px]">
              <div
                className={`relative flex size-12 flex-shrink-0 items-center justify-center rounded-full ${participantRole === 'HOST' ? 'mb-3 border-[4px] border-solid border-yellow-primary bg-white fill-gray-B40' : 'mb-3 bg-gray-B35/40 fill-white'}`}
              >
                {user?.profileImageUrl ? (
                  <div className="absolute left-0 top-0 size-full overflow-hidden rounded-full">
                    <Image
                      src={user.profileImageUrl}
                      alt={`${name} profile`}
                      fill
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <DefaultProfileSVG />
                )}
                {participantRole === 'HOST' && (
                  <span className="absolute -bottom-4 rounded-full bg-yellow-primary px-2 py-1 text-[10px] font-black text-black">
                    HOST
                  </span>
                )}
              </div>
              <dl className="flex w-full min-w-0 flex-col justify-center">
                <dt className="truncate text-lg font-bold">{name}</dt>
                <dd className="truncate text-xs text-white/60">
                  {jobs.map((job) => job.name).join(', ')}
                </dd>
              </dl>
            </div>
            <div className="flex gap-[6px]">
              <WishlistButton
                id={user?.id}
                participantRole={participantRole}
                isWishlisted={isWishlisted}
              />
              <SocialContainer
                participantRole={participantRole}
                email={email}
                socialList={socialMedia ?? []}
              />
            </div>
          </div>
        </header>
        <p className="mt-4 line-clamp-2 text-sm">{intro}</p>
        {isCuration && (
          <div className="absolute -bottom-0.5 left-1/2 h-[11px] w-[86.7%] -translate-x-1/2 transform rounded-t-full bg-yellow-primary" />
        )}
      </div>
      {isCuration && (
        <div className="mr-[0.1px] grid w-[86.31%] grid-cols-[auto_1fr] items-center gap-[6px] rounded-b-xl bg-yellow-primary pb-[11px] pl-[14px] pr-[11px] pt-[1px] text-xs font-medium text-blue-B50">
          <CommentSVG className="self-start" />
          {krComment}
        </div>
      )}
    </li>
  );
}

export default ParticipantCard;

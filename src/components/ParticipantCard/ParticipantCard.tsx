import { CommentSVG, DefaultProfileSVG } from '@/icons/index';
import { CuratedParticipantDto } from '@/types/types';
import Image from 'next/image';
import SocialContainer from '../../app/[eventId]/_components/participants/SocialContainer';
import WishlistButton from '../../app/[eventId]/_components/participants/WishlistButton';
import IntroText from './IntroText';

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
  const socialMedia = user?.socialMedia ?? [];
  const jobTitle = user?.jobTitle ?? 'Management & Business';
  const belong = user?.belong ?? 'Glimpse';

  return (
    <li className="relative flex flex-col items-center">
      <div
        className={`relative flex min-h-40 w-full flex-col rounded-3xl border border-solid pb-4 pl-5 pr-4 pt-4 ${participantRole === 'HOST' ? 'border-white/30 bg-blue-B70/50' : 'border-white/30 bg-white/20'}`}
      >
        <header className="flex w-full">
          <div className="w-full">
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
              <dl
                className={`flex w-full min-w-0 flex-col ${participantRole === 'HOST' ? 'justify-center' : ''}`}
              >
                <dt className="relative grid grid-cols-[1fr_auto] text-lg font-bold">
                  <div className="truncate">{name}</div>
                  <div className="w-[74px]" />
                  <div className="absolute -top-3 right-0 flex gap-[6px]">
                    {userId !== user?.id && (
                      <WishlistButton
                        id={user?.id}
                        participantRole={participantRole}
                        isWishlisted={isWishlisted}
                      />
                    )}
                    <SocialContainer
                      email={user?.email}
                      participantRole={participantRole}
                      socialList={socialMedia}
                    />
                  </div>
                </dt>
                <dd className="flex flex-wrap pb-2 text-xs text-white/60">
                  <span className="mr-1">{jobs.engName}</span>
                  <span className="truncate whitespace-nowrap">@ {belong}</span>
                </dd>
              </dl>
            </div>
          </div>
        </header>
        <span
          className={`${participantRole === 'HOST' ? 'my-2' : 'mb-2'} w-fit rounded-full bg-white/20 px-2 py-[5px] text-xs`}
        >
          {jobTitle}
        </span>
        <IntroText intro={intro} id={user?.id} isCuration={isCuration} />
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

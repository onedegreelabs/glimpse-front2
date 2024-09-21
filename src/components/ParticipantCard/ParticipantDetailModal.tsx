import { EventParticipantProfileCardDto } from '@/types/types';
import Image from 'next/image';
import { CrossSVG, DefaultProfileSVG } from '@/icons/index';
import Link from 'next/link';
import Modal from '../Modal';
import GetSocialIcon from '../GetSocialIcon';
import WishlistButton from './WishlistButton';
import EditButton from './EditButton';

interface ParticipantDetailModalProps extends EventParticipantProfileCardDto {
  isUserCard: boolean;
  participantRole: 'HOST' | 'GUEST';
  eventId: string;
  closeDetailView: () => void;
}

function ParticipantDetailModal({
  eventId,
  isUserCard,
  user,
  tags,
  isWishlisted,
  intro,
  participantRole,
  closeDetailView,
}: ParticipantDetailModalProps) {
  const {
    id: participantId,
    profileImageUrl,
    name,
    jobCategory,
    belong,
    jobTitle,
    socialMedia,
  } = user;
  return (
    <Modal closeHandler={closeDetailView}>
      <article className="relative pb-8 pt-[72px]">
        <div className="absolute -top-[60px] left-1/2 flex size-[120px] -translate-x-1/2 transform items-center justify-center overflow-hidden rounded-full bg-gray-B35">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={`${name} profile`}
              fill
              sizes="48px"
            />
          ) : (
            <DefaultProfileSVG className="size-24" />
          )}
          {participantRole === 'HOST' && (
            <div className="absolute left-1/2 size-[120px] -translate-x-1/2 transform rounded-full border-[3px] border-solid border-yellow-primary" />
          )}
        </div>
        {participantRole === 'HOST' && (
          <span className="absolute left-1/2 top-[40px] -translate-x-1/2 transform rounded-3xl bg-yellow-primary px-[10px] py-[2px] text-sm font-bold text-blue-B50">
            HOST
          </span>
        )}
        <dl className="flex flex-col items-center gap-1">
          <dt className="text-lg font-bold">{name}</dt>
          <dd className="mb-1.5 flex flex-wrap gap-1 text-xs text-black/60">
            <span>{jobCategory.engName}</span> <span>@ {belong}</span>
          </dd>
          <dd className="mb-3 rounded-3xl border border-solid border-gray-B50 px-3 py-[10px] text-xs text-black">
            {jobTitle}
          </dd>
          <ul className="mb-4 flex gap-[10px]">
            {socialMedia.map(({ id, type, url }) => (
              <li key={id}>
                <Link href={url} target="_blank">
                  {GetSocialIcon(type, 'size-[24px]', 'size-[13px]')}
                </Link>
              </li>
            ))}
          </ul>
          <div className="max-h-[200px] overflow-auto px-6">
            <p className="mb-5 break-all text-xs text-black">{intro}</p>
            <ul className="flex flex-wrap gap-[10px]">
              {tags.map(({ id, name: tagName }) => (
                <li
                  key={id}
                  className="rounded-3xl bg-gray-B32 px-[11px] py-2 text-xs text-blue-B50"
                >
                  {tagName}
                </li>
              ))}
            </ul>
          </div>
        </dl>
        <div className="absolute right-4 top-4">
          {isUserCard ? (
            <EditButton isDetail eventId={eventId} />
          ) : (
            <WishlistButton
              id={participantId}
              isWishlisted={isWishlisted}
              isDetail
            />
          )}
        </div>
        <button
          type="button"
          onClick={closeDetailView}
          className="absolute -bottom-[70px] left-1/2 flex size-14 -translate-x-1/2 transform items-center justify-center rounded-full bg-black/80"
          aria-label="close-modal"
        >
          <CrossSVG className="size-6 fill-white" />
        </button>
      </article>
    </Modal>
  );
}

export default ParticipantDetailModal;

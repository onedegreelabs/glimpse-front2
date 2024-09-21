import { EventParticipantProfileCardDto } from '@/types/types';
import Image from 'next/image';
import { CrossSVG, DefaultProfileSVG } from '@/icons/index';
import Link from 'next/link';
import Modal from '../Modal';
import GetSocialIcon from '../GetSocialIcon';
import WishlistButton from '../WishlistButton';

interface ParticipantDetailModalProps extends EventParticipantProfileCardDto {
  closeDetailView: () => void;
}

function ParticipantDetailModal({
  user,
  tags,
  isWishlisted,
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
      <article className="relative pb-8 pt-20">
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
        </div>
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
            <p className="mb-5 text-xs text-black">
              The sky was painted in shades of orange and pink as the sun began
              to set over the horizon. Birds flew in graceful patterns, their
              silhouettes cutting across the vivid backdrop. A gentle breeze
              carried the scent of blooming flowers, filling the air with a
              refreshing fragrance. People gathered along the shoreline,
              watching as the day slowly faded into night. Children laughed,
              their carefree joy blending with the sound of waves crashing
              softly against the shore. It was a perfect evening, a moment of
              calm in a busy world. The sky was painted in shades of orange and
              pink as the sun began to set over the horizon. Birds flew in
              graceful patterns, their silhouettes cutting across the vivid
              backdrop. A gentle breeze carried the scent of blooming flowers,
              filling the air with a refreshing fragrance. People gathered along
              the shoreline, watching as the day slowly faded into night.
              Children laughed, their carefree joy blending with the sound of
              waves crashing softly against the shore. It was a perfect evening,
              a moment of calm in a busy world.
            </p>
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
          <WishlistButton
            id={participantId}
            isWishlisted={isWishlisted}
            isDetail
          />
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

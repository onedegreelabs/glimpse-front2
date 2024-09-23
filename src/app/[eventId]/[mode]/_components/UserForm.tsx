import GetSocialIcon from '@/components/GetSocialIcon';
import { PersonSVG } from '@/icons/index';
import {
  getParticipantsUserInfo,
  getUserInfo,
} from '@/lib/apis/server/userApi';
import Image from 'next/image';
import Link from 'next/link';
import { EventParticipantProfileCardDto, UserInfo } from '@/types/types';
import Tooltip from '@/components/Tooltip';
import UserFormClient from './UserFormClient';
import ProfileEditPrompt from './ProfileEditPrompt';

interface RegisterProps {
  accessToken: string;
  eventId: string;
  isRegister: boolean;
}

async function UserForm({ accessToken, eventId, isRegister }: RegisterProps) {
  let userInfo: UserInfo | EventParticipantProfileCardDto;

  if (isRegister) {
    userInfo = await getUserInfo(accessToken);
  } else {
    userInfo = await getParticipantsUserInfo(accessToken, eventId);
  }

  const { name, profileImageUrl, jobCategory, jobTitle, belong, socialMedia } =
    'user' in userInfo ? userInfo.user : userInfo;

  const { intro, tags } = userInfo;

  return (
    <section className="flex flex-col gap-6 px-5 pb-11 pt-5">
      <div className="relative grid w-full grid-cols-[auto_1fr] space-x-4 rounded-3xl bg-gray-B20 pb-[1.625rem] pl-5 pr-7 pt-7">
        <div className="absolute right-3 top-3 z-20">
          <Tooltip tooltipClassName="top-full right-0 ">
            <ProfileEditPrompt eventId={eventId} />
          </Tooltip>
        </div>
        <div
          className={`relative flex size-[6.25rem] items-center justify-center self-center overflow-hidden rounded-full ${profileImageUrl ? '' : 'bg-white'}`}
        >
          {profileImageUrl ? (
            <Image
              priority
              src={profileImageUrl}
              alt={`${name} profile`}
              fill
              sizes="100px"
              className="rounded-full object-cover object-center"
            />
          ) : (
            <PersonSVG className="h-12 w-[2.894rem]" />
          )}
        </div>
        <dl className="flex min-w-0 max-w-full flex-col gap-1">
          <dt className="truncate text-base font-bold text-black">{name}</dt>
          <dd className="mb-[0.375rem] flex flex-wrap gap-1 text-xs text-black/60">
            <span>{jobTitle}</span>
            <span className="truncate">@ {belong}</span>
          </dd>
          <dd className="mb-[0.375rem] text-xs font-medium text-blue-B20">
            <span className="inline-block max-w-44 truncate rounded-3xl bg-white px-3 py-2">
              {jobCategory?.engName}
            </span>
          </dd>
          <ul className="flex w-full gap-[0.375rem]">
            {socialMedia.map(({ id, type, url }) => (
              <li key={id} className="size-6">
                <Link href={url} target="_blank">
                  {GetSocialIcon(type, 'size-6', 'size-[0.875rem]')}
                </Link>
              </li>
            ))}
          </ul>
        </dl>
      </div>
      <UserFormClient
        isRegister={isRegister}
        intro={intro ?? ''}
        tags={tags ?? []}
        eventId={eventId}
      />
    </section>
  );
}

export default UserForm;

import GetSocialIcon from '@/components/GetSocialIcon';
import { PersonSVG } from '@/icons/index';
import {
  getParticipantsUserInfo,
  getUserInfo,
} from '@/lib/apis/server/userApi';
import Image from 'next/image';
import Link from 'next/link';
import { EventParticipantProfileCardDto, UserInfo } from '@/types/types';
import UserFormClient from './UserFormClient';

interface RegisterProps {
  accessToken: string;
  eventId: string;
  isRegister: boolean;
  userId: number;
}

async function UserForm({
  accessToken,
  eventId,
  isRegister,
  userId,
}: RegisterProps) {
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
      <div className="grid w-full grid-cols-[auto_1fr] space-x-4 rounded-3xl bg-gray-B20 pb-[26px] pl-5 pr-7 pt-7">
        <div
          className={`relative flex size-[100px] items-center justify-center self-center overflow-hidden rounded-full ${profileImageUrl ? '' : 'bg-white'}`}
        >
          {profileImageUrl ? (
            <Image
              priority
              src={profileImageUrl}
              alt={`${name} profile`}
              fill
              sizes="100px"
            />
          ) : (
            <PersonSVG className="h-12 w-[46.31px]" />
          )}
        </div>
        <dl className="flex min-w-0 max-w-full flex-col gap-1">
          <dt className="truncate text-base font-bold text-black">{name}</dt>
          <dd className="mb-[6px] flex flex-wrap gap-1 text-xs text-black/60">
            <span>{jobCategory?.engName}</span>
            <span className="truncate">@ {belong}</span>
          </dd>
          <dd className="mb-[6px] text-xs font-medium text-blue-B20">
            <span className="inline-block max-w-44 truncate rounded-3xl bg-white px-3 py-2">
              {jobTitle}
            </span>
          </dd>
          <ul className="flex w-full gap-[6px]">
            {socialMedia.map(({ id, type, url }) => (
              <li key={id} className="size-6">
                <Link href={url} target="_blank">
                  {GetSocialIcon(type, 'size-6', 'size-[14px]')}
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
        userId={userId}
      />
    </section>
  );
}

export default UserForm;

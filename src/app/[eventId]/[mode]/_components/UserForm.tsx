import GetSocialIcon from '@/components/GetSocialIcon';
import { PersonSVG } from '@/icons/index';
import { getUserInfo } from '@/lib/apis/server/userApi';
import Image from 'next/image';
import Link from 'next/link';
import RegisterClient from './UserFormClient';

interface RegisterProps {
  accessToken: string;
  eventId: string;
  isRegister: boolean;
}

async function UserForm({ accessToken, eventId, isRegister }: RegisterProps) {
  const userInfo = await getUserInfo(accessToken);
  const {
    name,
    profileImageUrl,
    belong,
    jobCategory,
    jobTitle,
    socialMedia,
    intro,
    tags,
  } = userInfo;

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
          <dt className="truncate text-base font-bold text-black">{name} </dt>
          <dd className="mb-[6px] flex flex-wrap gap-1 text-xs text-black/60">
            <span>{jobCategory.engName}</span>
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
      <RegisterClient
        isRegister={isRegister}
        intro={intro ?? ''}
        tags={tags ?? []}
        eventId={eventId}
      />
    </section>
  );
}

export default UserForm;

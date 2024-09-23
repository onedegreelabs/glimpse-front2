'use client';

import Cookies from 'js-cookie';
import { ArrowSVG4 } from '@/icons/index';
import Link from 'next/link';

function ProfileEditPrompt({ eventId }: { eventId: string }) {
  return (
    <div className="flex flex-col items-center gap-5 text-nowrap rounded-2xl bg-white px-5 pb-5 pt-7 text-sm font-medium drop-shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
      <p className="text-center">
        Collected from your profile. <br /> You can change your profile
        information in
      </p>
      <Link
        href="/profile-edit"
        onClick={() => Cookies.set('eventId', eventId)}
        className="flex w-fit items-center rounded-3xl bg-blue-B30 p-2 pl-3 text-white"
      >
        Edit profile
        <ArrowSVG4 className="size-4 rotate-180 transform fill-white" />
      </Link>
    </div>
  );
}

export default ProfileEditPrompt;

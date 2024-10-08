'use client';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/Logo.png';
import { usePathname } from 'next/navigation';

interface ParticipantsNavProps {
  eventId: string;
  participantCount: number | undefined;
}

function ParticipantsNav({
  participantCount = 32,
  eventId,
}: ParticipantsNavProps) {
  const pathname = usePathname();
  const currentPathname = pathname.split('/').at(-1);

  return (
    <nav className="sticky top-0 z-20 bg-background px-6 pb-3 pt-10">
      <Image
        src={Logo}
        alt="Glimpse Logo"
        className="absolute right-[0.875rem] top-[0.875rem]"
        priority
      />
      <div className="flex w-full gap-[1.875rem]">
        <Link
          href={`/${eventId}/all`}
          className={`relative flex items-center text-[2rem] font-black ${currentPathname === 'match' ? 'text-white/30 hover:text-white/60' : 'text-white'} ${
            currentPathname === 'match'
              ? ''
              : 'after:absolute after:-right-3 after:top-1.5 after:size-2 after:rounded-full after:bg-yellow-primary after:content-[""]'
          }`}
        >
          All<p className="mb-1 text-[1.625rem]">(</p>
          <p className="text-[1.5rem]">{participantCount}</p>
          <p className="mb-1 text-[1.625rem]">)</p>
        </Link>
        <Link
          href={`/${eventId}/match`}
          className={`relative text-[2rem] font-black ${currentPathname === 'match' ? 'text-white' : 'text-white/30 hover:text-white/60'} ${
            currentPathname === 'match' &&
            'after:absolute after:-right-3 after:top-1.5 after:size-2 after:rounded-full after:bg-yellow-primary after:content-[""]'
          }`}
        >
          For You
        </Link>
      </div>
    </nav>
  );
}

export default ParticipantsNav;

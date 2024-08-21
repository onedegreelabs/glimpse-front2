import { ParticipantsSearchParams } from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/Logo.png';

interface ParticipantsNavProps extends ParticipantsSearchParams {
  eventId: string;
  participantCount: number | undefined;
}

function ParticipantsNav({
  participantCount = 32,
  nav = 'ALL',
  search = '',
  eventId,
}: ParticipantsNavProps) {
  return (
    <nav className="sticky top-0 z-header bg-background px-6 py-3">
      <div className="mx-auto mb-6 h-1 w-[46px] rounded-md bg-white/50" />
      <Image
        src={Logo}
        alt="Glimpse Logo"
        className="absolute right-[14px] top-[14px]"
      />
      <div className="flex w-full gap-[30px]">
        <Link
          href={`/${eventId}?nav=ALL&search=${search}`}
          className={`relative text-2xl font-black ${nav === 'ALL' ? 'text-white' : 'text-white/30 hover:text-white/60'} ${
            nav === 'ALL' &&
            'after:absolute after:-right-3 after:top-1.5 after:size-2 after:rounded-full after:bg-yellow-primary after:content-[""]'
          }`}
        >
          All({participantCount})
        </Link>
        <Link
          href={`/${eventId}?nav=FORYOU&search=${search}`}
          className={`relative text-2xl font-black ${nav === 'FORYOU' ? 'text-white' : 'text-white/30 hover:text-white/60'} ${
            nav === 'FORYOU' &&
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

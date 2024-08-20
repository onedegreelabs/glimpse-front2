import { ParticipantsSearchParams } from '@/types/types';
import Link from 'next/link';

interface ParticipantsNavProps extends ParticipantsSearchParams {
  eventId: string;
  participantCount: number | null;
}

function ParticipantsNav({
  participantCount,
  nav = 'ALL',
  search = '',
  eventId,
}: ParticipantsNavProps) {
  return (
    <nav className="sticky flex w-full gap-[30px]">
      <Link
        href={`/${eventId}?nav=ALL&search=${search}`}
        className={`relative text-2xl font-black ${nav === 'ALL' ? 'text-white' : 'text-white/30 hover:text-white/60'} ${
          nav === 'ALL' &&
          'after:absolute after:-right-3 after:top-1.5 after:size-2 after:rounded-full after:bg-yellow-primary after:content-[""]'
        }`}
      >
        All({participantCount ?? 32})
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
    </nav>
  );
}

export default ParticipantsNav;

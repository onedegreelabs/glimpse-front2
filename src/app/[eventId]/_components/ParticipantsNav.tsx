import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/images/Logo.png';
import { headers } from 'next/headers';

interface ParticipantsNavProps {
  eventId: string;
  participantCount: number | undefined;
}

function ParticipantsNav({
  participantCount = 32,
  eventId,
}: ParticipantsNavProps) {
  const headersPathname = headers().get('x-next-pathname') as string;
  const pathname = headersPathname.split('/').at(-1);

  return (
    <nav className="sticky top-0 z-20 bg-background px-6 py-3">
      <div className="mx-auto mb-6 h-1 w-[46px] rounded-md bg-white/50" />
      <Image
        src={Logo}
        alt="Glimpse Logo"
        className="absolute right-[14px] top-[14px]"
      />
      <div className="flex w-full gap-[30px]">
        <Link
          href={`/${eventId}/all`}
          className={`relative text-2xl font-black ${pathname === 'all' ? 'text-white' : 'text-white/30 hover:text-white/60'} ${
            pathname === 'all' &&
            'after:absolute after:-right-3 after:top-1.5 after:size-2 after:rounded-full after:bg-yellow-primary after:content-[""]'
          }`}
        >
          All({participantCount})
        </Link>
        <Link
          href={`/${eventId}/match`}
          className={`relative text-2xl font-black ${pathname === 'match' ? 'text-white' : 'text-white/30 hover:text-white/60'} ${
            pathname === 'match' &&
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

import { ArrowSVG2, DateSVG, LocationSVG } from '@/icons/index';
import { getEventInfo } from '@/lib/apis/server/eventsApi';
import Link from 'next/link';

async function Header({ eventId }: { eventId: string }) {
  const { title, startAt, location, locationType } =
    await getEventInfo(eventId);

  return (
    <header className="flex w-full flex-col">
      <div className="relative mt-1 flex w-full items-center justify-center py-3">
        <Link
          href={`/${eventId}/all`}
          className="absolute left-4 flex size-6 items-center justify-center"
        >
          <ArrowSVG2 className="size-4 rotate-180 transform stroke-black stroke-2" />
        </Link>
        <h1 className="text-sm font-bold text-black">Register for event</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center px-5 py-4">
        <h2 className="mb-3 w-full truncate text-center text-sm font-medium text-blue-secondary">
          {title}
        </h2>
        <div className="flex gap-4 text-xs text-black/40">
          <div className="flex items-center gap-1">
            <LocationSVG className="fill-black/30" aria-label="Location" />{' '}
            {locationType === 'OFFLINE' ? location : locationType}
          </div>
          <time className="flex items-center gap-1">
            <DateSVG className="fill-black/30" aria-label="Date" />
            {startAt}
          </time>
        </div>
      </div>
    </header>
  );
}

export default Header;

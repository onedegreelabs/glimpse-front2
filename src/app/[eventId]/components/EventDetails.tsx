import { ArrowSVG, DateSVG, LocationSVG } from '@/icons/index';
import { getEventInfo } from '@/lib/apis/server/eventsApi';
import Link from 'next/link';
import ScrollHeader from './ScrollHeader';

async function EventDetails({ eventId }: { eventId: string }) {
  const { title, startAt, externalLink, location, locationType } =
    await getEventInfo(eventId);

  return (
    <ScrollHeader>
      <div className="flex w-4/5 flex-col gap-3">
        <h1 className="truncate text-sm font-medium text-blue-secondary">
          {title}
        </h1>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <LocationSVG aria-label="Location" />{' '}
            {locationType === 'OFFLINE' ? location : locationType}
          </div>
          <time className="flex items-center gap-1">
            <DateSVG aria-label="Date" />
            {startAt}
          </time>
        </div>
      </div>
      <Link
        href={externalLink ?? '/'}
        className="flex h-8 w-16 items-center justify-center rounded-lg bg-blue-secondary/20 text-xs font-semibold text-blue-secondary hover:font-bold"
      >
        Details
        <ArrowSVG />
      </Link>
    </ScrollHeader>
  );
}

export default EventDetails;

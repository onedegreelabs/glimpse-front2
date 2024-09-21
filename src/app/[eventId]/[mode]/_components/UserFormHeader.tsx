import { ArrowSVG2, DateSVG, LocationSVG } from '@/icons/index';
import { getEventInfo } from '@/lib/apis/server/eventsApi';
import Link from 'next/link';

interface UserFormHeaderProps {
  eventId: string;
  isRegister: boolean;
}

async function UserFormHeader({ eventId, isRegister }: UserFormHeaderProps) {
  const { title, startAt, location, locationType } =
    await getEventInfo(eventId);

  return (
    <header
      className={`sticky top-0 z-header flex w-full max-w-sm flex-col bg-white ${isRegister ? 'drop-shadow-[0_12px_20px_rgba(0,0,0,0.04)]' : ''}`}
    >
      <div className="relative mt-1 flex w-full items-center justify-center py-3">
        <Link
          href={`/${eventId}/all`}
          className="absolute left-4 flex size-6 items-center justify-center"
        >
          <ArrowSVG2 className="size-4 rotate-180 transform stroke-black stroke-2" />
        </Link>
        <h1 className="text-sm font-bold text-black">
          {isRegister ? 'Register for event' : 'Edit participant card'}
        </h1>
      </div>
      {isRegister && (
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
      )}
    </header>
  );
}

export default UserFormHeader;

import { cookies } from 'next/headers';

import { ParticipantsSearchParams } from '@/types/types';
import Image from 'next/image';
import Logo from '@/images/Logo.png';
import { SearchSVG } from '@/icons/index';
import EmailAccessForm from './components/EmailAccessForm';
import EventDetails from './components/EventDetails';
import ParticipantsNav from './components/ParticipantsNav';

export default async function page({
  params: { eventId },
  searchParams,
}: {
  params: { eventId: string };
  searchParams: ParticipantsSearchParams;
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  return (
    <main className="relative flex size-full flex-col">
      {!accessToken && <EmailAccessForm />}
      <EventDetails eventId={eventId} />
      {/* 추후 suspensive 적용 */}
      <section className="relative size-full px-6 text-white">
        <div className="mx-auto mb-6 mt-3 h-1 w-[46px] rounded-md bg-white/50" />
        <Image
          src={Logo}
          alt="Glimpse Logo"
          className="absolute right-[14px] top-[14px]"
        />
        <ParticipantsNav
          {...searchParams}
          eventId={eventId}
          participantCount={null}
        />
        <div className="relative mb-4 mt-5">
          <input
            id="searchParticipants"
            type="text"
            className="peer h-12 w-full rounded-2xl py-4 pl-[42px] pr-4 font-medium text-black outline-none placeholder:text-sm placeholder:text-gray-B70"
            placeholder="Search in app"
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            htmlFor="searchParticipants"
            className="absolute left-4 top-4 fill-gray-B70 peer-focus:fill-black"
          >
            <SearchSVG />
          </label>
        </div>
        <div className="h-96 w-full" />
        <div className="h-96 w-full" />
        <div className="h-96 w-full" />
        <div className="h-96 w-full" />
      </section>
    </main>
  );
}

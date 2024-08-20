import { cookies } from 'next/headers';

import { ParticipantsSearchParams } from '@/types/types';
import Image from 'next/image';
import Logo from '@/images/Logo.png';
import EmailAccessForm from './components/EmailAccessForm';
import EventDetails from './components/EventDetails';
import ParticipantsNav from './components/ParticipantsNav';
import SearchParticipants from './components/SearchParticipants';

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
        <SearchParticipants
          search={searchParams.search ?? ''}
          eventId={eventId}
        />
        <div className="h-96 w-full" />
        <div className="h-96 w-full" />
        <div className="h-96 w-full" />
        <div className="h-96 w-full" />
      </section>
    </main>
  );
}

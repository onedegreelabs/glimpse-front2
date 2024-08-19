// import { cookies } from 'next/headers';

import Blur from '@/app/[eventId]/components/Blur';
import EventDetails from './components/EventDetails';

export default async function page({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  //   const cookieStore = cookies();
  console.log(eventId);

  return (
    <main className="relative size-full flex flex-col">
      <Blur />
      <EventDetails />
      <p className="text-white">sdasdasdasd</p>
      <div className="w-full h-96" />
      <div className="w-full h-96" />
      <div className="w-full h-96" />
      <div className="w-full h-96" />
    </main>
  );
}

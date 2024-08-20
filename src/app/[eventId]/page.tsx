import { cookies } from 'next/headers';

import EmailAccessForm from './components/EmailAccessForm';
import EventDetails from './components/EventDetails';

export default async function page({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  return (
    <main className="relative flex size-full flex-col">
      {!accessToken && <EmailAccessForm />}
      <EventDetails eventId={eventId} />
      <p className="text-white">sdasdasdasd</p>
      <div className="h-96 w-full" />
      <div className="h-96 w-full" />
      <div className="h-96 w-full" />
      <div className="h-96 w-full" />
    </main>
  );
}

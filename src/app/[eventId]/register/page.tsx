import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterHeader from './_components/RegisterHeader';
import Register from './_components/Register';

export default async function page({
  params: { eventId },
}: {
  params: { eventId: string };
}) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect(`/${eventId}/all`);
  }

  return (
    <main className="background-mask relative flex min-h-screen w-full flex-col bg-white text-gray-B80">
      <RegisterHeader eventId={eventId} />
      <Register accessToken={accessToken} eventId={eventId} />
    </main>
  );
}

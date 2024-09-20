// import { getUserInfo } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Header from './_components/Header';

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

  //   const userInfo = await getUserInfo(accessToken);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white text-gray-B80">
      <Header eventId={eventId} />
      <div className="absolute top-0 -z-10 h-screen w-full bg-white" />
    </main>
  );
}

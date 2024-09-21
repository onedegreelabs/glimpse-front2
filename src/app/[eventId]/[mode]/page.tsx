import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import getTokenInfo from '@/utils/auth/getTokenInfo';
import UserFormHeader from './_components/UserFormHeader';
import UserForm from './_components/UserForm';

export default async function page({
  params: { eventId, mode },
}: {
  params: { eventId: string; mode: string };
}) {
  const userInfo = await getTokenInfo();

  if ((mode !== 'register' && mode !== 'edit') || !userInfo) {
    notFound();
  }

  const isRegister = mode === 'register';
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect(`/${eventId}/all`);
  }

  return (
    <main className="background-mask relative flex min-h-screen w-full flex-col bg-white text-gray-B80">
      <UserFormHeader eventId={eventId} isRegister={isRegister} />
      <UserForm
        accessToken={accessToken}
        eventId={eventId}
        isRegister={isRegister}
        userId={userInfo.userId}
      />
    </main>
  );
}

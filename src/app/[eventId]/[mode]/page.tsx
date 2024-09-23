import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import UserFormHeader from './_components/UserFormHeader';
import UserForm from './_components/UserForm';

export default async function page({
  params: { eventId, mode },
}: {
  params: { eventId: string; mode: string };
}) {
  if (mode !== 'register' && mode !== 'edit') {
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
      <UserFormHeader
        eventId={eventId}
        isRegister={isRegister}
        accessToken={accessToken}
      />
      <UserForm
        accessToken={accessToken}
        eventId={eventId}
        isRegister={isRegister}
      />
    </main>
  );
}

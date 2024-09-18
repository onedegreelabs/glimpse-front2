import { ArrowSVG4 } from '@/icons/index';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SigninFunnel from './_components/SigninFunnel';

const page = async () => {
  const cookieStore = cookies();
  const eventId = cookieStore.get('eventId')?.value;

  if (!eventId) {
    redirect('/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all'); // 추후 수정
  }

  return (
    <main className="relative z-0 flex h-dvh w-full flex-col bg-white text-gray-B80">
      <header className="px-4 pt-4">
        <button type="button" aria-label="back-router">
          <ArrowSVG4 className="size-6 fill-black" />
        </button>
      </header>
      <SigninFunnel eventId={eventId} />
      <div className="absolute top-0 -z-10 h-screen w-full bg-white" />
    </main>
  );
};

export default page;

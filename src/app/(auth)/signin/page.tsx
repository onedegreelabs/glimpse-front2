import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SigninFunnel from './_components/SigninFunnel';

const page = async () => {
  const cookieStore = cookies();
  const eventId = cookieStore.get('eventId')?.value;

  if (!eventId) {
    redirect('/02974b24-bcb5-4f43-882b-5e653c6da75e/all'); // 추후 수정
  }

  return (
    <main className="relative z-0 flex h-dvh w-full flex-col bg-white text-gray-B80">
      <SigninFunnel eventId={eventId} />
      <div className="absolute top-0 -z-10 h-screen w-full bg-white" />
    </main>
  );
};

export default page;

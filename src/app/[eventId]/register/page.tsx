import { getUserInfo } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect('/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all');
  }

  const userInfo = await getUserInfo(accessToken);
  console.log(userInfo);

  return (
    <main className="flex min-h-screen w-full flex-col bg-white text-gray-B80">
      <div className="absolute top-0 -z-10 h-screen w-full bg-white" />
    </main>
  );
}

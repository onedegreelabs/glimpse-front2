import { getJobCategories } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignupClient from '../_components/SignupClient';

const REDIRECT_URL = '/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all'; // 추후 수정

export default async function page() {
  const cookieStore = cookies();
  const eventId = cookieStore.get('eventId')?.value;
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!eventId || !accessToken) {
    return redirect(REDIRECT_URL);
  }

  const jobCategories = await getJobCategories();

  return <SignupClient jobCategories={jobCategories} eventId={eventId!} />;
}

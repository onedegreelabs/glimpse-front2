import { getJobCategories } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import SignupClient from './_components/SignupClient';

async function SignupPage() {
  const cookieStore = cookies();
  const eventId = cookieStore.get('eventId')?.value;
  const email = cookieStore.get('email')?.value;

  // if (!eventId || !email) {
  //   return null;
  // }

  const jobCategories = await getJobCategories();

  return (
    <SignupClient
      jobCategories={jobCategories}
      eventId={eventId!}
      email={email!}
    />
  );
}

export default SignupPage;

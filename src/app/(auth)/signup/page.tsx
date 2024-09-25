import { getJobCategories } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { AuthToken } from '@/types/types';
import SignupClient from '../_components/SignupClient';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN_SECRET;
const REDIRECT_URL = '/02974b24-bcb5-4f43-882b-5e653c6da75e/all'; // 추후 수정

const getEmailFromToken = async (authToken: string): Promise<string | null> => {
  if (!JWT_SECRET) return null;

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify<AuthToken>(authToken, secret);
    return payload.email;
  } catch (error) {
    return null;
  }
};

export default async function SignupPage() {
  const cookieStore = cookies();
  const eventId = cookieStore.get('eventId')?.value;
  const authToken = cookieStore.get('auth_token')?.value;

  if (!eventId || !authToken) {
    return redirect(REDIRECT_URL);
  }

  const email = await getEmailFromToken(authToken);
  if (!email) {
    return redirect(REDIRECT_URL);
  }

  const jobCategories = await getJobCategories();

  return (
    <SignupClient
      jobCategories={jobCategories}
      eventId={eventId!}
      email={email}
    />
  );
}

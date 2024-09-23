import { getJobCategories, getUserInfo } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SocialMediaType } from '@/types/types';
import SignupClient from '../_components/SignupClient';

const REDIRECT_URL = '/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all'; // 추후 수정

export default async function page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const eventId =
    cookieStore.get('eventId')?.value ?? '8d6fdb11-f7cf-4771-a172-71d6da10d72c';

  if (!accessToken) {
    return redirect(REDIRECT_URL);
  }

  const jobCategories = await getJobCategories();

  const userInfo = await getUserInfo(accessToken);

  const socialMediaObject = userInfo.socialMedia.reduce(
    (acc, media) => {
      acc[media.type] = media.url;
      return acc;
    },
    {} as Record<SocialMediaType, string>,
  );

  const initalUserInfo = {
    ...userInfo,
    socialMediaObject,
  };

  return (
    <SignupClient
      jobCategories={jobCategories}
      initalUserInfo={initalUserInfo}
      eventId={eventId}
    />
  );
}

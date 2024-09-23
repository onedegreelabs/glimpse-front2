import { getJobCategories, getUserInfo } from '@/lib/apis/server/userApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import s3UrlToFile from '@/utils/s3UrlToFile';
import { SocialMediaType } from '@/types/types';
import SignupClient from '../_components/SignupClient';

const REDIRECT_URL = '/8d6fdb11-f7cf-4771-a172-71d6da10d72c/all'; // 추후 수정

export default async function page() {
  let file: File | undefined;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return redirect(REDIRECT_URL);
  }

  const jobCategories = await getJobCategories();

  const userInfo = await getUserInfo(accessToken);

  if (userInfo.profileImageUrl) {
    file = await s3UrlToFile(userInfo.profileImageUrl, 's3');
  }

  const socialMediaObject = userInfo.socialMedia.reduce(
    (acc, media) => {
      acc[media.type] = media.url;
      return acc;
    },
    {} as Record<SocialMediaType, string>,
  );

  const initalUserInfo = {
    ...userInfo,
    initalImageFile: file,
    socialMediaObject,
  };

  return (
    <SignupClient
      jobCategories={jobCategories}
      initalUserInfo={initalUserInfo}
    />
  );
}

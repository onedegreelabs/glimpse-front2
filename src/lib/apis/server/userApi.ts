import {
  EventParticipantProfileCardDto,
  FetchError,
  JobCategorie,
  UserInfo,
} from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const getJobCategories = async (): Promise<JobCategorie[]> => {
  const response = await fetch(`${END_POINT}/job-categories`);

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '직군 전체 조회 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  const responseData = await response.json();

  return responseData.data;
};

export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
  const response = await fetch(`${END_POINT}/users/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '유저 정보 조회 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  const responseData = await response.json();

  return responseData.data;
};

export const getParticipantsUserInfo = async (
  accessToken: string,
  eventId: string,
): Promise<EventParticipantProfileCardDto> => {
  const response = await fetch(
    `${END_POINT}/events/${eventId}/participants/me`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '유저 정보 조회 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  const responseData = await response.json();

  return responseData.data;
};

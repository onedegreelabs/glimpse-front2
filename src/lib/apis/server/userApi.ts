import { FetchError, JobCategorie } from '@/types/types';

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

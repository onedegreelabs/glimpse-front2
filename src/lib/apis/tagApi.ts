import { FetchError, Tag } from '@/types/types';

export const createTag = async (tagName: string): Promise<Tag> => {
  const response = await fetch('/api/tag', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ tagName }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '태그 생성 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  const result = await response.json();
  return result.data;
};

import { FetchError } from '@/types/types';

export const userEdit = async (data: FormData) => {
  const response = await fetch(`/api/user/edit`, {
    method: 'PATCH',
    body: data,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '유저 프로필 수정 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }
};

export const deleteProfileImage = async () => {
  const response = await fetch(`/api/user/delete-image`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '유저 프로필 이미지 삭제 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }
};

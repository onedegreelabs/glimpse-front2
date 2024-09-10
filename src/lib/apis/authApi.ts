import { FetchError } from '@/types/types';

export const login = async (email: string) => {
  const response = await fetch(`/api/auth/login?email=${email}`);

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '로그인 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }
};

export const reissue = async () => {
  const response = await fetch(`/api/auth/refresh`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '토큰 재발급 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  return '200';
};

export const register = async (data: FormData) => {
  const response = await fetch(`/api/auth/register`, {
    method: 'POST',
    body: data,
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '회원가입 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }
};

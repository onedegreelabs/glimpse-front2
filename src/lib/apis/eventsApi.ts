import {
  FetchError,
  GetParticipantsInfoParams,
  ParticipantsResponseDto,
} from '@/types/types';

export const getParticipantsInfo = async ({
  eventId,
  take,
  lastItemId,
  search,
}: GetParticipantsInfoParams): Promise<ParticipantsResponseDto> => {
  const response = await fetch(
    `/api/events/participants?eventId=${eventId}&take=${take}&lastItemId=${lastItemId}&search=${search}`,
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '참가자 목록 조회 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  const responseData = await response.json();

  return responseData.data;
};

export const postCurations = async ({ eventId }: { eventId: string }) => {
  const response = await fetch(`/api/events/curations?eventId=${eventId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '참가자 큐레이팅 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }
};

export const eventJoin = async (eventId: string, intro: string) => {
  const response = await fetch(`/api/events/eventJoin?eventId=${eventId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ intro }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '이벤트 참가자 등록 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }
};

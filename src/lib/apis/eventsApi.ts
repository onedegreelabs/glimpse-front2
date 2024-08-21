import {
  FetchError,
  GetParticipantsInfoParams,
  ParticipantsResponseDto,
} from '@/types/types';

export const getParticipantsInfo = async ({
  eventId,
  take,
  lastItemId,
}: GetParticipantsInfoParams): Promise<ParticipantsResponseDto> => {
  const response = await fetch(
    `/api/events/participants?eventId=${eventId}&take=${take}&lastItemId=${lastItemId}`,
  );

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '참가자 목록 조회 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    console.log(errorData);
    throw error;
  }

  const responseData = await response.json();

  return responseData.data;
};

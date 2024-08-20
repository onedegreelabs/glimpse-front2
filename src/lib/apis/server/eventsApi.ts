import { EventInfo, FetchError } from '@/types/types';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const getEventInfo = async (eventId: string): Promise<EventInfo> => {
  const response = await fetch(`${END_POINT}/events/${eventId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const error: FetchError = new Error(
      errorData.message || '이벤트 정보 조회 오류',
    ) as FetchError;
    error.status = response.status;
    error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
    throw error;
  }

  const responseData = await response.json();

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    month: 'short',
    day: '2-digit',
  }).format(new Date(responseData.data.startAt));

  return {
    id: responseData.data.id,
    title: responseData.data.title,
    startAt: formattedDate,
    externalLink: responseData.data.externalLink
      ? new URL(responseData.data.externalLink)
      : null,
    locationType: responseData.data.locationType,
    location: responseData.data.location,
    coverImageUrl: responseData.data.coverImageUrl
      ? new URL(responseData.data.coverImageUrl)
      : null,
  };
};

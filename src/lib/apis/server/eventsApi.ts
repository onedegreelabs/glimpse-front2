import {
  CurationsResponseDto,
  EventInfo,
  FetchError,
  GetParticipantsInfoParams,
  ParticipantsResponseDto,
} from '@/types/types';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const END_POINT = process.env.NEXT_PUBLIC_API_END_POINT_DOMAIN;

export const getEventInfo = async (eventId: string): Promise<EventInfo> => {
  try {
    const response = await fetch(`${END_POINT}/events/${eventId}`);

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
      externalLink: responseData.data.externalLink,
      locationType: responseData.data.locationType,
      location: responseData.data.location,
      coverImageUrl: responseData.data.coverImageUrl,
    };
  } catch (error) {
    const fetchError = error as FetchError;

    if (
      fetchError &&
      (fetchError.status === 400 || fetchError.status === 404)
    ) {
      notFound();
    }

    throw error;
  }
};

interface GetParticipantsInfo extends GetParticipantsInfoParams {
  accessToken: RequestCookie;
}

export const getParticipantsInfo = cache(
  async (params: GetParticipantsInfo): Promise<ParticipantsResponseDto> => {
    try {
      const response = await fetch(
        `${END_POINT}/events/${params.eventId}/participants?take=${params.take}`,
        {
          method: 'GET',
          headers: {
            Cookie: `accessToken=${params.accessToken.value}`,
          },
        },
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
    } catch (error) {
      const fetchError = error as FetchError;

      if (fetchError && fetchError.status === 400) {
        notFound();
      }

      throw error;
    }
  },
);

export const getCurationsInfo = cache(
  async (params: {
    eventId: string;
    accessToken: RequestCookie;
  }): Promise<CurationsResponseDto> => {
    try {
      const response = await fetch(
        `${END_POINT}/events/${params.eventId}/curations`,
        {
          // cache: 'no-store',
          method: 'GET',
          headers: {
            Cookie: `accessToken=${params.accessToken.value}`,
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        const error: FetchError = new Error(
          errorData.message || '큐레이팅 결과 조회 오류',
        ) as FetchError;

        error.status = response.status;
        error.errorCode = errorData.errorCode || 'UNKNOWN_ERROR';
        throw error;
      }

      const responseData = await response.json();

      return responseData.data;
    } catch (error) {
      const fetchError = error as FetchError;

      if (fetchError && fetchError.status === 400) {
        notFound();
      }

      throw error;
    }
  },
);

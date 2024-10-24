import {
  CurationsResponseDto,
  EventInfo,
  FetchError,
  GetParticipantsInfoParams,
  ParticipantsResponseDto,
} from '@/types/types';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { cache } from 'react';

import { END_POINT } from '@/constant/constant';

export const getEventInfo = async (
  eventId: string,
  accessToken?: string,
): Promise<EventInfo> => {
  try {
    const response = await fetch(`${END_POINT}/events/${eventId}`, {
      headers: {
        Cookie: accessToken ? `accessToken=${accessToken}` : '',
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

    const startAtUTC = new Date(responseData.data.startAt);

    const startAtKST = new Date(startAtUTC.getTime() + 9 * 60 * 60 * 1000);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: '2-digit',
    }).format(startAtKST);

    return {
      ...responseData.data,
      startAt: formattedDate,
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

export const getParticipantsInfo = cache(
  async (
    params: GetParticipantsInfoParams,
  ): Promise<ParticipantsResponseDto | null> => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');

    try {
      const response = await fetch(
        `${END_POINT}/events/${params.eventId}/participants?take=${params.take}&search=${params.search ?? ''}`,
        {
          method: 'GET',
          headers: {
            Cookie: `accessToken=${accessToken?.value}`,
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

      if (fetchError.status === 400) {
        if (fetchError.errorCode === 'G06001') {
          return null;
        }
      } else {
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
  }): Promise<CurationsResponseDto | null> => {
    try {
      const response = await fetch(
        `${END_POINT}/events/${params.eventId}/curations`,
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

      if (fetchError.status === 404) {
        if (fetchError.errorCode === 'G06001') {
          return null;
        }
      } else {
        notFound();
      }

      throw error;
    }
  },
);

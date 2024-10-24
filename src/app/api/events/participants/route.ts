import { NextRequest, NextResponse } from 'next/server';
import { END_POINT } from '@/constant/constant';

export const GET = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const eventId = request.nextUrl.searchParams.get('eventId');
  const take = request.nextUrl.searchParams.get('take');
  const lastItemId = request.nextUrl.searchParams.get('lastItemId');
  const search = request.nextUrl.searchParams.get('search');
  const accessToken = request.cookies.get('accessToken')?.value;

  const lastItemIdParam =
    lastItemId && lastItemId !== 'undefined' ? `&lastItemId=${lastItemId}` : '';

  const searchParam =
    search && search !== 'undefined' ? `&search=${search}` : '';

  const response = await fetch(
    `${END_POINT}/events/${eventId}/participants?take=${take}${lastItemIdParam}${searchParam}`,
    {
      method: 'GET',
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    const { message, errorCode } = await response.json();
    return NextResponse.json(
      {
        status: response.status,
        message,
        errorCode,
      },
      { status: response.status },
    );
  }

  const result = await response.json();

  return NextResponse.json(result);
};

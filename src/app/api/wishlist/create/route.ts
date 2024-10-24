import { NextRequest, NextResponse } from 'next/server';

import { END_POINT } from '@/constant/constant';

export const POST = async (request: NextRequest) => {
  if (!END_POINT) {
    return NextResponse.json({
      status: 500,
      message: '환경 변수가 설정되지 않았습니다.',
    });
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const { targetUserId } = await request.json();

  const response = await fetch(
    `${END_POINT}/wishlist/${targetUserId}?targetUserId=${targetUserId}`,
    {
      method: 'POST',
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

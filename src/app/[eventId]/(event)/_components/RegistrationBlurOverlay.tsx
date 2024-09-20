'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { CommentUserSVG } from '@/icons/index';

interface RegistrationBlurOverlayProps {
  eventId: string;
  isLogin: boolean;
}

function RegistrationBlurOverlay({
  eventId,
  isLogin,
}: RegistrationBlurOverlayProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleRegisterClick = () => {
    if (isLogin) return;
    Cookies.set('eventId', eventId);
  };

  return (
    <article className="fixed inset-0 z-blur mx-auto flex size-full max-w-[386px] flex-col items-center bg-blue-B50/60 text-gray-B80 backdrop-blur-[8px]">
      <div className="mt-16 flex size-full w-[256px] flex-col items-center justify-center gap-[22px]">
        <CommentUserSVG />
        <p className="mb-[12px] text-center font-semibold text-white">
          {isLogin ? (
            <>
              Register your participant card
              <br />
              to interact with other participants!
            </>
          ) : (
            <>
              To register your participant card
              <br />
              for this event, please sign in.
            </>
          )}
        </p>
        <Link
          href={isLogin ? `/${eventId}/register` : '/signin'}
          onClick={handleRegisterClick}
          className="flex h-[54px] w-full items-center justify-center rounded-2xl bg-yellow-primary text-sm font-bold text-blue-secondary"
        >
          {isLogin ? 'Register for event' : 'Sign up/Sign in'}
        </Link>
      </div>
    </article>
  );
}

export default RegistrationBlurOverlay;

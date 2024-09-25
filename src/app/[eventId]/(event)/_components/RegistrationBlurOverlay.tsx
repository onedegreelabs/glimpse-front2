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
    <article
      className={`${isLogin ? 'absolute' : 'fixed'} inset-0 z-blur mx-auto flex size-full max-w-[24.125rem] flex-col items-center bg-blue-B50/60 text-gray-B80 backdrop-blur-[8px]`}
    >
      <div className="flex size-full w-[16rem] flex-col items-center justify-center gap-[1.375rem]">
        <CommentUserSVG />
        <p className="mb-[0.75rem] text-center font-semibold text-white">
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
          className="flex h-[3.375rem] w-full items-center justify-center rounded-2xl bg-yellow-primary text-sm font-bold text-blue-secondary"
        >
          {isLogin ? 'Register for event' : 'Sign up/Sign in'}
        </Link>
      </div>
      {!isLogin && (
        <div className="mb-7 px-8 text-[10px] text-white/60">
          By signing up, you agree to our{' '}
          <Link href="/" className="text-yellow-primary">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/" className="text-yellow-primary">
            Privacy Policy
          </Link>
          . <div className="mb-0.5" />
          가입하시면 귀하는 당사의{' '}
          <Link href="/" className="text-yellow-primary">
            이용약관
          </Link>{' '}
          및{' '}
          <Link href="/" className="text-yellow-primary">
            개인정보 처리방침
          </Link>
          에 동의하게 됩니다.
        </div>
      )}
    </article>
  );
}

export default RegistrationBlurOverlay;

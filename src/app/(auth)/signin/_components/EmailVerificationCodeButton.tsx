import { RefreshSVG } from '@/icons/index';
import React, { useEffect, useState } from 'react';
import { formatTime } from '@/utils/auth/date';
import Button from '@/components/Button';
import {
  DEFAULT_RESEND_TIME,
  DEFAULT_VERIFICATION_CODE_TIME,
} from '@/constant/constant';

interface EmailVerificationButtonProps {
  isResendButtonDisabled: boolean;
  isVerificationButtonDisabled: boolean;
  isVerifyingCode: boolean;
  isSendVerificationSuccess: boolean;
  onVerifyCode: () => void;
  onSendVerificationCode: () => void;
  displayResendLimitMessage: () => void;
}

function EmailVerificationButton({
  isResendButtonDisabled,
  displayResendLimitMessage,
  onSendVerificationCode,
  onVerifyCode,
  isVerificationButtonDisabled,
  isVerifyingCode,
  isSendVerificationSuccess,
}: EmailVerificationButtonProps) {
  const [verificationCodeTimer, setVerificationCodeTimer] = useState(
    DEFAULT_VERIFICATION_CODE_TIME,
  );
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (verificationCodeTimer <= 0 && resendTimer <= 0) {
      return () => {};
    }

    const timerId = setInterval(() => {
      if (verificationCodeTimer > 0) {
        setVerificationCodeTimer((prevTime) => prevTime - 1);
      }
      if (resendTimer > 0) {
        setResendTimer((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [verificationCodeTimer, resendTimer]);

  useEffect(() => {
    if (isSendVerificationSuccess) {
      setVerificationCodeTimer(DEFAULT_VERIFICATION_CODE_TIME);
      setResendTimer(DEFAULT_RESEND_TIME);
    }
  }, [isSendVerificationSuccess]);

  return (
    <div className="flex flex-col items-center gap-[1.125rem]">
      <button
        type="submit"
        disabled={isResendButtonDisabled}
        onClick={
          resendTimer === 0 ? onSendVerificationCode : displayResendLimitMessage
        }
        className={`group flex items-center gap-[0.188rem] text-sm disabled:text-gray-B60 ${resendTimer === 0 ? 'text-blue-B50' : 'text-gray-B60'}`}
      >
        <RefreshSVG
          className={`size-[0.625rem] group-disabled:fill-gray-B60 ${resendTimer === 0 ? 'fill-blue-B50 stroke-blue-B50' : 'fill-gray-B60 stroke-gray-B60'} ${isResendButtonDisabled && 'animate-spin'}`}
        />{' '}
        Resend code
        {resendTimer !== 0 && <span>{resendTimer}s</span>}
      </button>
      <Button
        onClick={onVerifyCode}
        type="submit"
        disabled={isVerificationButtonDisabled || verificationCodeTimer === 0}
        isPending={isVerifyingCode}
      >
        {verificationCodeTimer > 0 ? formatTime(verificationCodeTimer) : 'Next'}
        {verificationCodeTimer === 0 && (
          <div className="absolute bottom-12 left-1/2 w-11/12 max-w-sm -translate-x-1/2 transform rounded-md bg-red-B10 px-[0.625rem] py-3 text-xs text-white">
            Input time has expired. Please resend the verification code.
          </div>
        )}
      </Button>
    </div>
  );
}

export default EmailVerificationButton;

import { RefreshSVG } from '@/icons/index';
import React, { useEffect, useState } from 'react';
import { formatTime } from '@/utils/auth/date';
import Button from '@/components/Button';
import {
  DEFAULT_RESEND_TIME,
  DEFAULT_VERIFICATION_CODE_TIME,
} from '@/constant/constant';
import { toast } from 'react-toastify';
import BaseButton from '@/components/BaseButton';

interface EmailVerificationButtonProps {
  isResendButtonDisabled: boolean;
  isVerificationButtonDisabled: boolean;
  isVerifyingCode: boolean;
  isSendVerificationSuccess: boolean;
  onVerifyCode: () => void;
  onSendVerificationCode: () => void;
}

function EmailVerificationButton({
  isResendButtonDisabled,
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
    if (verificationCodeTimer === 0) {
      toast.error(
        'Input time has expired. Please resend the verification code.',
      );
    }
  }, [verificationCodeTimer]);

  useEffect(() => {
    if (isSendVerificationSuccess) {
      setVerificationCodeTimer(DEFAULT_VERIFICATION_CODE_TIME);
      setResendTimer(DEFAULT_RESEND_TIME);
    }
  }, [isSendVerificationSuccess]);

  return (
    <div className="flex flex-col items-center gap-[1.125rem]">
      <BaseButton
        type="submit"
        disabled={isResendButtonDisabled}
        onClick={
          resendTimer === 0
            ? onSendVerificationCode
            : () => {
                toast.info('You can resend the code only once per minute.');
              }
        }
        className={`group flex items-center gap-[0.188rem] text-sm disabled:text-gray-B60 ${resendTimer === 0 ? 'text-blue-B50' : 'text-gray-B60'}`}
      >
        <RefreshSVG
          className={`size-[0.625rem] group-disabled:fill-gray-B60 ${resendTimer === 0 ? 'fill-blue-B50 stroke-blue-B50' : 'fill-gray-B60 stroke-gray-B60'} ${isResendButtonDisabled && 'animate-spin'}`}
        />{' '}
        Resend code
        {resendTimer !== 0 && <span>{resendTimer}s</span>}
      </BaseButton>
      <Button
        onClick={onVerifyCode}
        type="submit"
        disabled={isVerificationButtonDisabled || verificationCodeTimer === 0}
        isPending={isVerifyingCode}
      >
        {verificationCodeTimer >= 0
          ? formatTime(verificationCodeTimer)
          : 'Next'}
      </Button>
    </div>
  );
}

export default EmailVerificationButton;

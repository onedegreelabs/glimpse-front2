import { login, sendVerificationCode } from '@/lib/apis/authApi';
import {
  FetchError,
  LoginDto,
  SigninFormInputs,
  VerificationCode,
} from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { captureException } from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import EmailVerificationCodeButton from './EmailVerificationCodeButton';

interface EmailVerificationCodeProps {
  eventId: string;
}

function EmailVerificationCode({ eventId }: EmailVerificationCodeProps) {
  const router = useRouter();

  const { getValues } = useFormContext<SigninFormInputs>();
  const { control, watch, setValue, reset, handleSubmit } =
    useForm<VerificationCode>();

  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [autoFocusIndex, setAutoFocusIndex] = useState(0);

  const currentEmail = getValues('email');

  const {
    mutate: handleSendVerificationCode,
    isPending: resendCodePending,
    isSuccess,
  } = useMutation({
    mutationFn: (email: string) => sendVerificationCode(email),
    onSuccess: () => {
      reset();
      setIsInvalidCode(false);
      toast.info(
        'A new verification code has been sent. Please check your inbox.',
      );
    },
    onError: (error) => {
      const fetchError = error as FetchError;

      if (
        fetchError.errorCode === 'G01017' ||
        fetchError.errorCode === 'G01018'
      ) {
        toast.error(
          `You've reached the resend limit. Please try again an hour later.`,
        );
      } else {
        toast.error('An unknown error occurred. Please contact support.');
        captureException(error);
      }
    },
    retry: false,
  });

  const { mutate: handleLogin, isPending: loginPending } = useMutation({
    mutationFn: ({ email, code }: LoginDto) => login({ email, code }),
    onSuccess: () => {
      Cookies.remove('eventId');
      router.push(`/${eventId}/all`);
      router.refresh();
    },
    onError: (error) => {
      const fetchError = error as FetchError;

      switch (fetchError.errorCode) {
        case 'G01001':
          router.push('/signup');
          break;
        case 'G01014':
          setIsInvalidCode(true);
          break;
        case 'G01015':
        case 'G01016':
          toast.error(
            `You've reached the resend limit for email verification requests. Please try again an hour later.`,
          );
          break;
        default:
          toast.error('An unknown error occurred. Please contact support.');
          captureException(error);
      }
    },
    retry: false,
  });

  const onSubmit: SubmitHandler<VerificationCode> = async (data) => {
    const code = Object.values(data).join('');
    handleLogin({ email: currentEmail, code });
  };

  const verificationCode = watch([
    'code0',
    'code1',
    'code2',
    'code3',
    'code4',
    'code5',
  ]);

  const isCodeComplete = !verificationCode.every((code) => code);

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    if (isInvalidCode) {
      setIsInvalidCode(false);
    }

    const { value } = e.target;
    const digit = value.replace(/\D/g, '').charAt(0);

    setValue(`code${currentIndex}`, digit);

    if (currentIndex < 5 && digit) {
      setAutoFocusIndex(currentIndex + 1);
    } else if (currentIndex > 0 && !digit) {
      setAutoFocusIndex(currentIndex - 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const digits = e.clipboardData.getData('text').replace(/\D/g, '');

    for (let i = 0; i < 6; i += 1) {
      setValue(`code${i}`, digits[i]);
    }

    setAutoFocusIndex(digits.length);
  };

  return (
    <>
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-xl font-bold text-blue-B50">
          Enter confirmation code
        </h1>
        <p className="mb-5 text-center text-sm text-gray-B60">
          Enter the 6-digit code sent to <br /> {currentEmail}
        </p>
        <div className="relative mb-6 flex w-full justify-center gap-[0.313rem]">
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {Array.from({ length: 6 }, (_, index) => (
            <Controller
              key={uuidv4()}
              name={`code${index}`}
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: (value) => {
                  const numValue = parseInt(value, 10);
                  return (
                    (numValue >= 0 && numValue <= 9) ||
                    'Only integers between 0 and 9 are allowed'
                  );
                },
              }}
              render={({ field }) => {
                const isCodeEntered = !!verificationCode[index];
                const borderColorClass = isInvalidCode
                  ? 'border-red-B10 text-red-B10 focus:border-red-B10'
                  : 'border-blue-B50';
                const inputClassName = `h-[3.375rem] w-1/6 max-w-[2.875rem] rounded-xl text-center text-sm ${
                  isCodeEntered ? borderColorClass : ''
                }`;

                return (
                  <input
                    {...field}
                    inputMode="numeric"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus={index === autoFocusIndex}
                    type="number"
                    max="9"
                    min="0"
                    className={inputClassName}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !field.value) {
                        e.preventDefault();
                        if (index > 0) {
                          setAutoFocusIndex(index - 1);
                        }
                      } else if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit(onSubmit)();
                      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                        e.preventDefault();
                      }
                    }}
                    onPaste={handlePaste}
                    onChange={(e) => {
                      handleCodeChange(e, index);
                    }}
                  />
                );
              }}
            />
          ))}
          {isInvalidCode && (
            <p className="absolute -bottom-5 left-4 text-xs text-red-B10">
              Invalid code, please try again.
            </p>
          )}
        </div>
      </form>
      <EmailVerificationCodeButton
        isResendButtonDisabled={resendCodePending}
        onSendVerificationCode={() => handleSendVerificationCode(currentEmail)}
        isVerificationButtonDisabled={
          isCodeComplete || resendCodePending || loginPending || isInvalidCode
        }
        isVerifyingCode={loginPending}
        onVerifyCode={handleSubmit(onSubmit)}
        isSendVerificationSuccess={isSuccess}
      />
    </>
  );
}

export default EmailVerificationCode;

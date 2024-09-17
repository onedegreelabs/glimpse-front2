import Button from '@/components/Button';
import { RefreshSVG } from '@/icons/index';
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
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { captureException } from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EmailVerificationCodeProps {
  handleMessage: ({
    message,
    isErrors,
  }: {
    message: string;
    isErrors?: boolean;
  }) => void;
}

function EmailVerificationCode({ handleMessage }: EmailVerificationCodeProps) {
  const router = useRouter();
  const { getValues } = useFormContext<SigninFormInputs>();
  const { control, watch, setFocus, setValue, reset, handleSubmit } =
    useForm<VerificationCode>();
  const [isInvalidCode, setIsInvalidCode] = useState(false);

  const currentEmail = getValues('email');

  const { mutate: handleSendVerificationCode, isPending: resendCodePending } =
    useMutation({
      mutationFn: (email: string) => sendVerificationCode(email),
      onSuccess: () => {
        reset();
        handleMessage({
          message:
            'A new verification code has been sent. Please check your inbox.',
          isErrors: false,
        });
      },
      onError: (error) => {
        handleMessage({
          message: 'An unknown error occurred. Please contact support.',
        });
        captureException(error);
      },
    });

  const { mutate: handleLogin, isPending: loginPending } = useMutation({
    mutationFn: ({ email, code }: LoginDto) => login({ email, code }),
    onSuccess: () => {
      // router.refresh();
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
        default:
          handleMessage({
            message: 'An unknown error occurred. Please contact support.',
          });
          captureException(error);
      }
    },
  });

  const onSubmit: SubmitHandler<VerificationCode> = async (data) => {
    const code = Object.values(data).join('');
    handleLogin({ email: currentEmail, code });
  };

  const onSubmitError: SubmitErrorHandler<VerificationCode> = () => {
    // if (errors.email) {
    //   handleMessage({ message: errors.email.message ?? '' });
    // }
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

  const updateFocus = (index: number) => {
    setTimeout(() => {
      setFocus(`code${index}`);
    }, 0);
  };

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    if (isInvalidCode) {
      setIsInvalidCode(false);
    }

    const { value } = e.target;

    const digits = value.replace(/\D/g, '');

    setValue(`code${currentIndex}`, digits.charAt(0));

    digits.split('').forEach((digit, i) => {
      const targetIndex = currentIndex + i;
      if (targetIndex < 6) {
        setValue(`code${targetIndex}`, digit);
      }
    });

    if (currentIndex < 5 && digits) {
      updateFocus(currentIndex + digits.length);
    } else if (currentIndex > 0 && !digits) {
      updateFocus(currentIndex - 1);
    }
  };

  return (
    <>
      <form className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-blue-B50">
          Enter confirmation code
        </h1>
        <p className="mb-5 text-center text-sm text-gray-B60">
          Enter the 6-digit code sent to <br /> {currentEmail}
        </p>
        <div className="relative mb-6 flex w-full justify-center gap-[5px]">
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {Array.from({ length: 6 }, (_, index) => (
            <Controller
              key={uuidv4()}
              name={`code${index}`}
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => {
                const isCodeEntered = !!verificationCode[index];
                const borderColorClass = isInvalidCode
                  ? 'outline-red-B10 text-red-B10 focus:outline-red-B10'
                  : 'outline-blue-B50';
                const inputClassName = `h-[54px] w-1/6 max-w-[46px] rounded-xl text-center text-sm ${
                  isCodeEntered ? borderColorClass : ''
                }`;

                return (
                  <input
                    {...field}
                    onChange={(e) => {
                      handleCodeChange(e, index);
                    }}
                    type="number"
                    max="9"
                    min="0"
                    className={inputClassName}
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
      <div className="flex flex-col items-center gap-[18px]">
        <button
          type="submit"
          disabled={resendCodePending}
          onClick={() => handleSendVerificationCode(currentEmail)}
          className="group flex items-center gap-[3px] text-sm text-blue-B50 disabled:text-gray-B60"
        >
          <RefreshSVG className="stroke-blue-Bfill-blue-B50 size-[10px] fill-blue-B50 group-disabled:animate-spin group-disabled:fill-gray-B60" />{' '}
          Resend code
        </button>
        <Button
          onClick={handleSubmit(onSubmit, onSubmitError)}
          type="submit"
          disabled={
            isCodeComplete || resendCodePending || loginPending || isInvalidCode
          }
          isPending={loginPending}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default EmailVerificationCode;

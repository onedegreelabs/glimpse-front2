'use client';

import Link from 'next/link';
import { CheckSVG, LockSVG, Spinner1 } from '@/icons/index';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { login } from '@/lib/apis/authApi';
import { FetchError } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

function ErrorMessage({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <p className="absolute -top-3 w-full rounded-md bg-[#E7001B] px-[10px] py-3 text-xs text-white">
      {message}
    </p>
  );
}

type EmailFormInputs = {
  email: string;
  isAgreedToTerms: boolean;
};

function EmailAccessForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailFormInputs>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (email: string) => login(email),
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      const fetchError = error as FetchError;

      if (fetchError && fetchError.errorCode === 'G01001') {
        setErrorMessage(
          'Wrong email address. Please enter the email address that you provided in the match application (Google form).',
        );
      } else {
        setErrorMessage('An unknown error occurred. Please contact support.');
      }
    },
  });

  const onSubmit: SubmitHandler<EmailFormInputs> = async (data) => {
    handleLogin(data.email);
  };

  const SubmitError: SubmitErrorHandler<EmailFormInputs> = () => {
    if (errors.email) {
      setErrorMessage(errors.email.message ?? '');
    } else if (errors.isAgreedToTerms) {
      setErrorMessage(errors.isAgreedToTerms.message ?? '');
    }
  };

  return (
    <section className="fixed inset-0 z-blur mx-auto max-w-sm bg-gradient-to-b from-transparent from-15% via-white via-60% to-white backdrop-blur-[2px]">
      <form
        className="flex size-full flex-col items-center"
        onSubmit={handleSubmit(onSubmit, SubmitError)}
      >
        <div className="mt-16 flex size-full flex-col items-center justify-center gap-3">
          <LockSVG />
          <p className="mb-[18px] max-w-[262px] text-center font-bold text-blue-secondary">
            Unlock to view participants profiles and find your matches!
          </p>
          <input
            {...register('email', {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address.',
              },
            })}
            type="email"
            placeholder="Enter your registration email"
            className="w-[246px] rounded-md bg-white p-2 outline outline-1 outline-blue-secondary focus:outline-2"
          />
        </div>
        <div className="mb-14 flex w-full flex-col gap-4 px-7">
          <div className="relative flex gap-2">
            {errorMessage && (
              <ErrorMessage
                message={errorMessage}
                onClose={() => setErrorMessage('')}
              />
            )}
            <input
              {...register('isAgreedToTerms', {
                required: 'You must agree to the terms and conditions.',
              })}
              id="agreement"
              type="checkbox"
              className="peer hidden"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              htmlFor="agreement"
              className="size-4 cursor-pointer rounded-sm border border-solid border-gray-500 fill-none peer-checked:bg-yellow-primary peer-checked:fill-blue-secondary"
            >
              <CheckSVG className="size-4" />
            </label>
            <div className="text-xs">
              <div>
                <Link
                  href="/"
                  className="text-blue-secondary underline underline-offset-1"
                >
                  개인정보수집
                </Link>{' '}
                및{' '}
                <Link
                  href="/"
                  className="text-blue-secondary underline underline-offset-1"
                >
                  이용동의
                </Link>
              </div>
              Consent to Collect and Use Personal Information
            </div>
          </div>
          <button
            type="submit"
            disabled={
              !(watch('email') && watch('isAgreedToTerms')) || isPending
            }
            className="group h-14 w-full rounded-lg bg-yellow-primary disabled:bg-gray-B30"
          >
            {isPending ? (
              <div className="flex justify-center">
                <Spinner1 className="-ml-1 mr-3 size-6 animate-spin text-white" />
              </div>
            ) : (
              <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
                Unlock
              </p>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EmailAccessForm;

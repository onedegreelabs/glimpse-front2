'use client';

import { LockSVG, Spinner1 } from '@/icons/index';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { login } from '@/lib/apis/authApi';
import { FetchError } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import TermsModal from './TermsModal';

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
};

function EmailAccessForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
    }
  };

  const closeTermsModal = () => {
    setIsOpen(false);
  };

  return (
    <section className="fixed inset-0 z-blur mx-auto max-w-[386px] bg-blue-B50/60 text-gray-B80 backdrop-blur-[8px]">
      <form
        className="flex size-full flex-col items-center"
        onSubmit={handleSubmit(onSubmit, SubmitError)}
      >
        <div className="mt-16 flex size-full w-[256px] flex-col items-center justify-center gap-3">
          <LockSVG />
          <p className="mb-[40px] text-center font-bold text-yellow-primary">
            Register your profile card to view participants profiles and find
            your matches!
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
            placeholder="Enter your email"
            className="w-full rounded-2xl bg-white px-4 py-[14px] text-sm outline outline-1 outline-blue-secondary focus:outline-2"
          />
          <button
            type="submit"
            disabled={!watch('email') || isPending}
            className="group h-[54px] w-full rounded-2xl bg-yellow-primary disabled:bg-gray-B30"
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <Spinner1 className="size-6 animate-spin text-white" />
              </div>
            ) : (
              <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
                Sign In
              </p>
            )}
          </button>
        </div>
        <div className="mb-[26px] flex w-full flex-col gap-4 px-7">
          <div className="relative flex gap-2">
            {errorMessage && (
              <ErrorMessage
                message={errorMessage}
                onClose={() => setErrorMessage('')}
              />
            )}
            <div className="text-xs">
              <div>
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="text-yellow-primary underline underline-offset-1"
                >
                  개인정보수집 및 이용동의
                </button>
              </div>
              <p className="text-gray-B65">
                Consent to Collect and Use Personal Information
              </p>
            </div>
          </div>
        </div>
      </form>
      {isOpen && <TermsModal closeHandler={closeTermsModal} />}
    </section>
  );
}

export default EmailAccessForm;

import Button from '@/components/Button';
import { sendVerificationCode } from '@/lib/apis/authApi';
import { SigninFormInputs } from '@/types/types';
import { captureException } from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';

interface EmailAccessFormProps {
  handleNextStep: () => void;
  handleMessage: ({
    message,
    isErrors,
  }: {
    message: string;
    isErrors?: boolean;
  }) => void;
}

function EmailAccessForm({
  handleNextStep,
  handleMessage,
}: EmailAccessFormProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SigninFormInputs>();

  const { mutate: handleSendVerificationCode, isPending } = useMutation({
    mutationFn: (email: string) => sendVerificationCode(email),
    onSuccess: () => {
      handleNextStep();
    },
    onError: (error) => {
      handleMessage({
        message: 'An unknown error occurred. Please contact support.',
      });
      captureException(error);
    },
  });

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    handleSendVerificationCode(data.email);
  };

  const onSubmitError: SubmitErrorHandler<SigninFormInputs> = () => {
    if (errors.email) {
      handleMessage({ message: errors.email.message ?? '' });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onSubmitError)}
        className="flex flex-col items-center gap-[30px]"
      >
        <h1 className="text-xl font-bold text-blue-B50">
          Enter your email address
        </h1>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address. Please try again.',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="e.g. addresses12@gmail.com"
              className="mb-4 h-[54px] w-full rounded-2xl px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
            />
          )}
        />
      </form>
      <Button
        onClick={handleSubmit(onSubmit, onSubmitError)}
        type="submit"
        disabled={!watch('email') || isPending}
        isPending={isPending}
      >
        Continue with email
      </Button>
    </>
  );
}

export default EmailAccessForm;

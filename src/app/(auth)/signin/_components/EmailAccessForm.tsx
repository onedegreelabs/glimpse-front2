import Button from '@/components/Button';
import { sendVerificationCode } from '@/lib/apis/authApi';
import { FetchError, SigninFormInputs } from '@/types/types';
import { captureException } from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { toast } from 'react-toastify';

interface EmailAccessFormProps {
  handleNextStep: () => void;
}

function EmailAccessForm({ handleNextStep }: EmailAccessFormProps) {
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
      const fetchError = error as FetchError;

      if (
        fetchError.errorCode === 'G01017' ||
        fetchError.errorCode === 'G01018'
      ) {
        toast.error(
          "You've reached the resend limit. Please try again an hour later.",
        );
      } else {
        toast.error('An unknown error occurred. Please contact support.');
        captureException(error);
      }
    },
  });

  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    handleSendVerificationCode(data.email);
  };

  const onSubmitError: SubmitErrorHandler<SigninFormInputs> = () => {
    if (errors.email) {
      toast.error(errors.email.message ?? '');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onSubmitError)}
        className="flex flex-col items-center gap-[1.875rem]"
        noValidate
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
              className="mb-4 h-[3.375rem] w-full rounded-2xl px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium"
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

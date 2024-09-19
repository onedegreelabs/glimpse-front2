'use client';

import { Spinner1 } from '@/icons/index';
import { FetchError, JobCategorie, RegisterInputs } from '@/types/types';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/apis/authApi';
import { useRouter } from 'next/navigation';
import { SOCIAL_MEDIA_KEYS } from '@/constant/constant';
import Message from '@/components/Message';
import { useState } from 'react';
import SocialsLinks from './SocialsLinks';
import SignupHeader from './SignupHeader';
import BasicInformation from './BasicInformation';
import ProfileImage from './ProfileImage';
import AccordionButton from './AccordionButton';
// import { useState } from 'react';

interface SignupClientProps {
  email: string;
  eventId: string;
  jobCategories: JobCategorie[];
}

function SignupClient({ email, jobCategories, eventId }: SignupClientProps) {
  const formMethods = useForm<RegisterInputs>();
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    watch,
    setError,
  } = formMethods;

  const router = useRouter();

  const [isOpenBasicInfo, setIsOpenBasicInfo] = useState(true);

  const toggleBasicInfo = () => {
    setIsOpenBasicInfo((prev) => !prev);
  };

  const formValues = watch();
  const name = watch('name');
  const jobTitle = watch('jobTitle');
  const belong = watch('belong');
  const jobCategory = watch('jobCategory');

  const isFormValid = !!(name && jobTitle && belong && jobCategory);

  const { mutate: handleSignup, isPending: signupPending } = useMutation({
    mutationFn: (data: FormData) => register(data),
    onSuccess: () => {
      router.push(`/${eventId}/all`);
      router.refresh();
    },
    onError: (error) => {
      const fetchError = error as FetchError;

      if (fetchError && fetchError.errorCode === 'G01002') {
        setError('jobCategory', {
          type: 'manual',
          message: 'This user already exists.',
        });
      }

      // eslint-disable-next-line no-console
      console.error(error);
      throw error;
    },
  });

  const normalizeUrl = (url: string) =>
    /^(http|https):\/\//i.test(url) ? url : `https://${url}`;

  const processSocialMedia = (data: RegisterInputs) =>
    Object.entries(data)
      .filter(
        ([key, value]) =>
          SOCIAL_MEDIA_KEYS.includes(
            key as (typeof SOCIAL_MEDIA_KEYS)[number],
          ) && value,
      )
      .map(([key, value]) => ({
        type: [
          'WEBSITE',
          'GITHUB',
          'LINKEDIN',
          'INSTAGRAM',
          'TELEGRAM',
        ].includes(key)
          ? key
          : 'OTHERS',
        url: normalizeUrl(value),
      }));

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.jobCategory) {
      const formData = new FormData();

      if (data.image) {
        formData.append('image', data.image);
      }

      const socialMedia = processSocialMedia(data);

      const { image, ...remainingData } = data;
      const filteredData = Object.fromEntries(
        Object.entries(remainingData).filter(
          ([key]) =>
            !SOCIAL_MEDIA_KEYS.includes(
              key as (typeof SOCIAL_MEDIA_KEYS)[number],
            ),
        ),
      );
      const reqData = {
        ...filteredData,
        email,
        socialMedia,
        method: 'EMAIL',
        terms: [{ termId: 2, agreed: true }],
      };

      formData.append('data', JSON.stringify(reqData));

      handleSignup(formData);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white text-gray-B80">
      <SignupHeader formValues={formValues} />
      <form
        className="w-full px-[26px] pb-[50px] pt-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-1 text-xl font-bold text-blue-B50">
          Welcome to Glimpse!
        </h1>
        <p className="text-xs font-light">
          Complete your profile now,
          <br />
          enjoy hassle-free event registration later!
        </p>

        <Controller
          name="image"
          control={control}
          render={({ field }) => <ProfileImage onChange={field.onChange} />}
        />

        <AccordionButton
          isOpen={isOpenBasicInfo}
          label="Basic Information"
          state="COMPLETED"
          toggleHandler={toggleBasicInfo}
        />
        {isOpenBasicInfo && (
          <BasicInformation control={control} jobCategories={jobCategories} />
        )}

        <AccordionButton
          isOpen={isOpenBasicInfo}
          label="Basic Information"
          state="PROGRESS"
          toggleHandler={toggleBasicInfo}
        />
        <FormProvider {...formMethods}>
          <SocialsLinks />
        </FormProvider>

        <button
          type="submit"
          disabled={!isFormValid || signupPending}
          className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
        >
          {signupPending ? (
            <div className="flex items-center justify-center">
              <Spinner1 className="size-6 animate-spin text-white" />
            </div>
          ) : (
            <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
              Start Networking
            </p>
          )}
        </button>
      </form>
      {Object.values(errors).length > 0 && (
        <Message errors={errors} onClose={() => clearErrors()} isErrors />
      )}
    </main>
  );
}

export default SignupClient;

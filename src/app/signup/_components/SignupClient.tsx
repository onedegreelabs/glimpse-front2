'use client';

import { Spinner1 } from '@/icons/index';
import { FetchError, JobCategorie, RegisterInputs } from '@/types/types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/apis/authApi';
import { useSignupStore } from '@/store/signupStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { eventJoin } from '@/lib/apis/eventsApi';
import ProfileImage from './ProfileImage';
import JobCategory from './JobCategory';
import SocialsLinks from './SocialsLinks';
import SignupHeader from './SignupHeader';

function SignupClient({ jobCategories }: { jobCategories: JobCategorie[] }) {
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    watch,
    setError,
    getValues,
  } = useForm<RegisterInputs>();

  const router = useRouter();

  const { userInfo } = useSignupStore((state) => ({
    userInfo: state.userInfo,
  }));

  useEffect(() => {
    if (!(userInfo.email || userInfo.eventId)) {
      router.back();
    }
  }, [router, userInfo.email, userInfo.eventId]);

  const formValues = watch();
  const name = watch('name');
  const jobTitle = watch('jobTitle');
  const belong = watch('belong');
  const jobCategory = watch('jobCategory');

  const isFormValid = !!(name && jobTitle && belong && jobCategory);

  const { mutate: handleEventJoin, isPending: eventJoinPending } = useMutation({
    mutationFn: () => eventJoin(userInfo.eventId, getValues('intro')),
    onSuccess: () => {
      router.push(`/${userInfo.eventId}/all`);
      router.refresh();
    },
  });

  const { mutate: handleSignup, isPending: signupPending } = useMutation({
    mutationFn: (data: FormData) => register(data),
    onSuccess: () => {
      handleEventJoin();
    },
    onError: (error) => {
      const fetchError = error as FetchError;

      if (fetchError && fetchError.errorCode === 'G01002') {
        setError('jobCategory', {
          type: 'manual',
          message: 'This user already exists.',
        });
      }
    },
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.jobCategory) {
      const formData = new FormData();

      if (data.image) {
        formData.append('image', data.image);
      }

      const modifiedSocialMedia = data.socialMedia
        .filter(({ url }) => url)
        .map(({ type, url }) => ({
          type:
            ['WEBSITE', 'GITHUB', 'LINKEDIN', 'INSTAGRAM'].includes(type) ||
            type.startsWith('OTHERS')
              ? 'OTHERS'
              : type,
          url,
        }));

      const { image, ...filteredData } = data;

      const reqData = {
        ...filteredData,
        email: userInfo.email,
        socialMedia: modifiedSocialMedia,
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
        <h1 className="mb-[50px] text-xl font-bold text-blue-B50">
          Register your profile card
        </h1>
        <Controller
          name="image"
          control={control}
          render={({ field }) => <ProfileImage onChange={field.onChange} />}
        />
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: 'Please enter your name.',
            maxLength: {
              value: 70,
              message: 'Please enter your name between 1 and 70 characters.',
            },
            validate: {
              validCharacters: (value) => {
                const isValid = /^[a-zA-Z가-힣]*$/.test(value);
                return (
                  isValid ||
                  'Please enter your name using only Korean or English characters.'
                );
              },
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Name"
              value={field.value}
              onChange={(e) => {
                if (e.target.value.length <= 70) {
                  field.onChange(e);
                }
              }}
              maxLength={70}
              className="mb-4 h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
            />
          )}
        />
        <Controller
          name="intro"
          control={control}
          defaultValue=""
          rules={{
            maxLength: {
              value: 500,
              message: 'Please enter your bio up to 500 characters.',
            },
          }}
          render={({ field }) => (
            <div className="relative mb-7 h-64 w-full rounded-2xl border border-solid border-gray-B40 pb-8 pt-4 has-[:focus]:border-2 has-[:focus]:border-black">
              <textarea
                {...field}
                placeholder="Brief intro"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    field.onChange(e);
                  }
                }}
                className="size-full resize-none px-4 text-sm font-semibold outline-none placeholder:font-medium"
              />
              <div className="px-4 text-right text-xs font-light text-gray-B45">
                {field.value.length}/500
              </div>
            </div>
          )}
        />

        <h2 className="mb-4 text-base font-bold text-blue-B50">Job category</h2>
        <Controller
          name="jobCategory"
          control={control}
          defaultValue={null}
          rules={{ required: 'Please select a job category.' }}
          render={({ field }) => (
            <JobCategory
              jobCategories={jobCategories}
              onChange={field.onChange}
            />
          )}
        />

        <h2 className="mb-4 text-base font-bold text-blue-B50">Job title</h2>
        <Controller
          name="jobTitle"
          control={control}
          defaultValue=""
          rules={{
            required: 'Please enter your job title.',
            maxLength: {
              value: 30,
              message:
                'Please enter your job title between 1 and 30 characters.',
            },
            validate: {
              validCharacters: (value) => {
                const isValid = /^[a-zA-Z가-힣\s]*$/.test(value);
                return isValid || 'Special characters are not supported.';
              },
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              placeholder="e.g.) Product Manager"
              value={field.value}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  field.onChange(e);
                }
              }}
              className="mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
            />
          )}
        />

        <h2 className="mb-4 text-base font-bold text-blue-B50">
          Company/Organization
        </h2>
        <Controller
          name="belong"
          control={control}
          defaultValue=""
          rules={{
            required: 'Please enter your company/organization.',
            maxLength: {
              value: 30,
              message:
                'Please enter your company/organization up to 30 characters.',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              value={field.value}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  field.onChange(e);
                }
              }}
              className="mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
              placeholder="e.g.) Glimpse"
            />
          )}
        />
        <Controller
          name="socialMedia"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <SocialsLinks socialList={field.value} onChange={field.onChange} />
          )}
        />

        <button
          type="submit"
          disabled={!isFormValid || signupPending || eventJoinPending}
          className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
        >
          {signupPending || eventJoinPending ? (
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
        <ErrorMessage errors={errors} onClose={() => clearErrors()} />
      )}
    </main>
  );
}

export default SignupClient;

'use client';

import { ArrowSVG2 } from '@/icons/index';
import { JobCategorie, RegisterInputs } from '@/types/types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/apis/authApi';
import ProfileImage from './ProfileImage';
import JobCategory from './JobCategory';
import SocialsLinks from './SocialsLinks';

function SignupClient({ jobCategories }: { jobCategories: JobCategorie[] }) {
  const {
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>();

  const name = watch('name');
  const jobTitle = watch('jobTitle');
  const belong = watch('belong');
  const jobCategory = watch('jobCategory');

  const isFormValid = !!(name && jobTitle && belong && jobCategory);

  const { mutate: handleSignup } = useMutation({
    mutationFn: (data: FormData) => register(data),
    onSuccess: () => {
      console.log('성공');
    },
    onError: () => {
      console.log('실패');
    },
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.jobCategory) {
      const formData = new FormData();

      if (data.image) {
        formData.append('image', data.image);
      }

      const reqData = {
        ...data,
        email: 'test3@test.com',
        method: 'EMAIL',
        terms: [{ termId: 2, agreed: true }],
      };

      console.log(reqData);

      formData.append('data', JSON.stringify(reqData));

      handleSignup(formData);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white text-gray-B80">
      <header className="my-[6px] px-1 py-[10px]">
        <button type="button" aria-label="back-router" className="px-1 py-1">
          <ArrowSVG2 className="size-4 rotate-180 transform stroke-black stroke-2" />
        </button>
      </header>
      <div className="relative h-1 w-full bg-gray-B25">
        <span className="absolute top-0 h-1 w-4 bg-blue-B50" />
      </div>
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
          disabled={!isFormValid}
          className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
        >
          <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
            Start Networking
          </p>
        </button>
      </form>
      {Object.values(errors).length > 0 && (
        <ErrorMessage errors={errors} onClose={() => clearErrors()} />
      )}
    </main>
  );
}

export default SignupClient;

'use client';

import { ArrowSVG2 } from '@/icons/index';
import { JobCategorie, RegisterInputs } from '@/types/types';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import ProfileImage from './ProfileImage';
import JobCategory from './JobCategory';
import SocialsLinks from './SocialsLinks';

function SignupClient({ jobCategories }: { jobCategories: JobCategorie[] }) {
  const { handleSubmit, control } = useForm<RegisterInputs>({
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    console.log(data);
  };

  const SubmitError: SubmitErrorHandler<RegisterInputs> = (data) => {
    console.log('error:::', data);
  };

  return (
    <main className="text-gr min-h-screen w-full bg-white text-gray-B80">
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
        onSubmit={handleSubmit(onSubmit, SubmitError)}
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
          //   rules={{ required: true }}
          render={({ field }) => (
            <input
              placeholder="Name"
              value={field.value}
              onChange={field.onChange}
              className="mb-4 h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
            />
          )}
        />
        <Controller
          name="intro"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="relative mb-7 h-64 w-full rounded-2xl border border-solid border-gray-B40 pb-8 pt-4 has-[:focus]:border-2 has-[:focus]:border-black">
              <textarea
                placeholder="Brief intro"
                value={field.value}
                onChange={field.onChange}
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
          //   rules={{ required: true }}
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
          //   rules={{ required: true }}
          render={({ field }) => (
            <input
              placeholder="e.g.) Product Manager"
              value={field.value}
              onChange={field.onChange}
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
          //   rules={{ required: true }}
          render={({ field }) => (
            <input
              value={field.value}
              onChange={field.onChange}
              className="mb-[30px] h-[54px] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
              placeholder="e.g.) Glimpse"
            />
          )}
        />
        <Controller
          name="socialMedia"
          control={control}
          defaultValue={[]}
          //   rules={{ required: true }}
          render={({ field }) => (
            <SocialsLinks socialList={field.value} onChange={field.onChange} />
          )}
        />

        <button
          type="submit"
          className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
        >
          <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
            Start Networking
          </p>
        </button>
      </form>
    </main>
  );
}

export default SignupClient;

import { JobCategorie, RegisterInputs } from '@/types/types';
import { Control, Controller } from 'react-hook-form';
import JobCategory from './JobCategory';

interface BasicInformationProps {
  control: Control<RegisterInputs, any>;
  jobCategories: JobCategorie[];
}

function BasicInformation({ control, jobCategories }: BasicInformationProps) {
  return (
    <>
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
              const isValid = /^[a-zA-Z가-힣\s]*$/.test(value);
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
            message: 'Please enter your job title between 1 and 30 characters.',
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
    </>
  );
}

export default BasicInformation;

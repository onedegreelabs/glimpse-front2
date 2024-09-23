import { JobCategorie, RegisterInputs } from '@/types/types';
import { Control, Controller, UseFormSetError } from 'react-hook-form';
import Title from '@/components/Title';
import JobCategory from './JobCategory';

interface BasicInformationProps {
  isOpenBasicInfo: boolean;
  control: Control<RegisterInputs, any>;
  jobCategories: JobCategorie[];
  setError: UseFormSetError<RegisterInputs>;
}

function BasicInformation({
  isOpenBasicInfo,
  control,
  jobCategories,
  setError,
}: BasicInformationProps) {
  return (
    <ul className={`flex flex-col gap-6 ${isOpenBasicInfo ? '' : 'hidden'}`}>
      <Title name="name" title="Name" required>
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
                return isValid || 'Special characters are not supported.';
              },
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="name"
              type="text"
              placeholder="e.g.) Michael Lee"
              value={field.value}
              onChange={(e) => {
                if (e.target.value.length <= 70) {
                  field.onChange(e);
                }
              }}
              maxLength={70}
              className="h-[3.375rem] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium"
            />
          )}
        />
      </Title>

      <Title name="intro" title="About" required={false}>
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
            <div className="relative h-64 w-full rounded-2xl border border-solid border-gray-B40 pb-8 pt-4 has-[:focus]:border-2 has-[:focus]:border-black">
              <textarea
                {...field}
                id="intro"
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
      </Title>

      <Title title="Job category" required>
        <Controller
          name="jobCategoryId"
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
      </Title>

      <Title name="jobTitle" title="Job title" required>
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
              id="jobTitle"
              placeholder="e.g.) Product Manager"
              value={field.value}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  field.onChange(e);
                } else {
                  setError('jobTitle', {
                    type: 'manual',
                    message:
                      'Please enter your job title between 1 and 30 characters.',
                  });
                }
              }}
              className="h-[3.375rem] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium"
            />
          )}
        />
      </Title>

      <Title name="belong" title="Company/Organization" required={false}>
        <Controller
          name="belong"
          control={control}
          defaultValue=""
          rules={{
            maxLength: {
              value: 30,
              message:
                'Please enter your company/organization up to 30 characters.',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id="belong"
              value={field.value}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  field.onChange(e);
                }
              }}
              className="mb-[1.875rem] h-[3.375rem] w-full rounded-2xl border border-solid border-gray-B40 px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium"
              placeholder="e.g.) Glimpse"
            />
          )}
        />
      </Title>
    </ul>
  );
}

export default BasicInformation;

import { InitalUserInfo, JobCategorie, RegisterInputs } from '@/types/types';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetError,
} from 'react-hook-form';
import Title from '@/components/Title';
import Tooltip from '@/components/Tooltip';
import JobCategory from './JobCategory';

interface BasicInformationProps {
  initalUserInfo?: InitalUserInfo;
  isOpenBasicInfo: boolean;
  control: Control<RegisterInputs, any>;
  jobCategories: JobCategorie[];
  setError: UseFormSetError<RegisterInputs>;
  errors: FieldErrors<RegisterInputs>;
}

function BasicInformation({
  isOpenBasicInfo,
  control,
  jobCategories,
  setError,
  errors,
  initalUserInfo,
}: BasicInformationProps) {
  return (
    <ul className={`flex flex-col gap-6 ${isOpenBasicInfo ? '' : 'hidden'}`}>
      <Title name="name" title="Name" required>
        <Controller
          name="name"
          control={control}
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
                } else {
                  setError('name', {
                    type: 'maxLength',
                    message:
                      'Please enter your name between 1 and 70 characters.',
                  });
                }
              }}
              className={`${errors.name ? 'border-red-B30' : 'border-gray-B40'} h-[3.375rem] w-full rounded-2xl border border-solid px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium`}
            />
          )}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-B30">{errors.name.message}</p>
        )}
      </Title>

      <Title
        name="intro"
        title="About"
        required={false}
        tooltip={
          <Tooltip>
            <div className="text-nowrap rounded-2xl bg-white px-[1.625rem] pb-[1.563rem] pt-7 text-sm font-medium drop-shadow-[0_4px_14px_rgba(0,0,0,0.25)]">
              <p className="text-center">
                Changes made here will NOT <br /> be reflected to participant
                cards <br />
                that are already existing.
              </p>
            </div>
          </Tooltip>
        }
      >
        <Controller
          name="intro"
          control={control}
          rules={{
            maxLength: {
              value: 500,
              message: 'Please enter your bio up to 500 characters.',
            },
          }}
          render={({ field }) => (
            <div
              className={`${errors.intro ? 'border-red-B30' : 'border-gray-B40'} relative h-64 w-full rounded-2xl border border-solid pb-8 pt-4 has-[:focus]:border-2 has-[:focus]:border-black`}
            >
              <textarea
                {...field}
                id="intro"
                placeholder="Brief intro"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    field.onChange(e);
                  } else {
                    setError('intro', {
                      type: 'maxLength',
                      message: 'Please enter your bio up to 500 characters.',
                    });
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
        {errors.intro && (
          <p className="mt-2 text-xs text-red-B30">{errors.intro.message}</p>
        )}
      </Title>

      <Title title="Job category" required>
        <Controller
          name="jobCategoryId"
          control={control}
          rules={{ required: 'Please select a job category.' }}
          render={({ field }) => (
            <JobCategory
              jobCategories={jobCategories}
              onChange={field.onChange}
              initalValue={initalUserInfo?.jobCategory}
            />
          )}
        />
        {errors.jobCategoryId && (
          <p className="mt-2 text-xs text-red-B30">
            {errors.jobCategoryId.message}
          </p>
        )}
      </Title>

      <Title name="jobTitle" title="Job title" required>
        <Controller
          name="jobTitle"
          control={control}
          rules={{
            required: 'Please enter your job title.',
            maxLength: {
              value: 30,
              message:
                'Please enter your job title between 1 and 30 characters.',
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
                    type: 'maxLength',
                    message:
                      'Please enter your job title between 1 and 30 characters.',
                  });
                }
              }}
              className={`${errors.jobTitle ? 'border-red-B30' : 'border-gray-B40'} h-[3.375rem] w-full rounded-2xl border border-solid px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium`}
            />
          )}
        />
        {errors.jobTitle && (
          <p className="mt-2 text-xs text-red-B30">{errors.jobTitle.message}</p>
        )}
      </Title>

      <Title name="belong" title="Company/Organization" required={false}>
        <Controller
          name="belong"
          control={control}
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
                } else {
                  setError('belong', {
                    type: 'maxLength',
                    message:
                      'Please enter your company/organization up to 30 characters.',
                  });
                }
              }}
              className={`${errors.belong ? 'border-red-B30' : 'border-gray-B40'} h-[3.375rem] w-full rounded-2xl border border-solid px-4 py-[1.375rem] text-sm font-semibold text-black placeholder:font-medium`}
              placeholder="e.g.) Glimpse"
            />
          )}
        />
        {errors.belong && (
          <p className="mt-2 text-xs text-red-B30">{errors.belong.message}</p>
        )}
        <div className="mb-[1.875rem]" />
      </Title>
    </ul>
  );
}

export default BasicInformation;

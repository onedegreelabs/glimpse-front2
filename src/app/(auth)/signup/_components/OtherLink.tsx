import BottomModal from '@/components/BottomModal';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Message from '@/components/Message';
import { URL_REGEX } from '@/constant/constant';
import URLMark from './URLMark';

interface OtherLinkProps {
  handleCloseModal: () => void;
}

function OtherLink({ handleCloseModal }: OtherLinkProps) {
  const { getValues, setValue } = useFormContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm({
    defaultValues: {
      OTHERS2: getValues('OTHERS2') ?? '',
      OTHERS3: getValues('OTHERS3') ?? '',
    },
  });

  const isSaveButtonDisabled = !(watch('OTHERS2') || watch('OTHERS3'));

  const handleSave = (data: any) => {
    setValue('OTHERS2', data.OTHERS2);
    setValue('OTHERS3', data.OTHERS3);

    handleCloseModal();
  };

  return (
    <BottomModal closeModal={handleCloseModal}>
      <div className="flex flex-col gap-[10px] px-[26px] pb-[50px]">
        <h1 className="mb-3 text-lg font-bold text-blue-B50">
          Add Socials/Links
        </h1>
        {(['OTHERS2', 'OTHERS3'] as const).map((id) => (
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label
            key={id}
            htmlFor={id}
            className="mb-[14px] flex w-full items-center gap-[14px]"
          >
            <URLMark />
            <Controller
              name={id}
              control={control}
              rules={{
                validate: (value) => {
                  if (!value) return true;
                  const isValid = URL_REGEX.test(value);
                  return isValid || 'Please check the URL address.';
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  id={id}
                  className="h-[54px] w-full flex-grow rounded-2xl border border-solid px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium"
                  placeholder="Enter URL address"
                />
              )}
            />
          </label>
        ))}
        <button
          type="button"
          className="group h-14 w-full rounded-3xl bg-yellow-primary text-sm disabled:bg-gray-B30"
          onClick={handleSubmit(handleSave)}
          disabled={isSaveButtonDisabled}
        >
          <p className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
            Save
          </p>
        </button>
      </div>
      {Object.values(errors).length > 0 && (
        <Message
          errors={errors}
          isErrors
          message="Please enter a valid URL"
          onClose={() => clearErrors()}
        />
      )}
    </BottomModal>
  );
}

export default OtherLink;

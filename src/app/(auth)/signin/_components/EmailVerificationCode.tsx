// import Button from '@/components/Button';
import { RefreshSVG } from '@/icons/index';
import { SigninFormInputs, VerificationCode } from '@/types/types';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

function EmailVerificationCode() {
  const { getValues } = useFormContext<SigninFormInputs>();
  const { control, watch, setFocus, setValue } = useForm<VerificationCode>();

  const email = getValues('email');

  const verificationCode = watch([
    'code0',
    'code1',
    'code2',
    'code3',
    'code4',
    'code5',
  ]);

  // const isCodeComplete = !verificationCode.every((code) => code);

  const updateFocus = (index: number) => {
    setTimeout(() => {
      setFocus(`code${index}`);
    }, 0);
  };

  const handleCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const { value } = e.target;

    const digits = value.replace(/\D/g, '');

    setValue(`code${currentIndex}`, digits.charAt(0));

    digits.split('').forEach((digit, i) => {
      const targetIndex = currentIndex + i;
      if (targetIndex < 6) {
        setValue(`code${targetIndex}`, digit);
      }
    });

    if (currentIndex < 5 && digits) {
      updateFocus(currentIndex + digits.length);
    } else if (currentIndex > 0 && !digits) {
      updateFocus(currentIndex - 1);
    }
  };

  return (
    <>
      <form className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-blue-B50">
          Enter confirmation code
        </h1>
        <p className="mb-[22px] text-center text-sm text-gray-B60">
          Enter the 6-digit code sent to <br /> {email}
        </p>
        <div className="flex w-full justify-center gap-[5px]">
          {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {Array.from({ length: 6 }, (_, index) => (
            <Controller
              key={uuidv4()}
              name={`code${index}`}
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <input
                  {...field}
                  onChange={(e) => {
                    handleCodeChange(e, index);
                  }}
                  type="number"
                  max="9"
                  min="0"
                  className={`h-[54px] w-1/6 max-w-[46px] rounded-xl text-center ${verificationCode[index] ? 'outline-blue-B50' : ''}`}
                />
              )}
            />
          ))}
        </div>
      </form>
      <div className="flex flex-col items-center gap-[18px]">
        <button
          type="submit"
          className="flex items-center gap-[3px] text-sm text-blue-B50"
        >
          <RefreshSVG className="stroke-blue-Bfill-blue-B50 size-[10px] fill-blue-B50" />{' '}
          Resend code
        </button>
        {/* <Button type="submit" disabled={isCodeComplete}>
          Next
        </Button> */}
      </div>
    </>
  );
}

export default EmailVerificationCode;

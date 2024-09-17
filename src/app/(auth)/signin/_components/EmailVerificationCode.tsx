// import Button from '@/components/Button';
import { RefreshSVG } from '@/icons/index';
import { SigninFormInputs } from '@/types/types';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

function EmailVerificationCode() {
  const { watch } = useFormContext<SigninFormInputs>();

  const email = watch('email');

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
          {Array.from({ length: 6 }, () => (
            <input
              key={uuidv4()}
              type="number"
              max="9"
              min="0"
              className="h-[54px] w-1/6 max-w-[46px] rounded-xl text-center"
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
        {/* <Button type="submit">Next</Button> */}
      </div>
    </>
  );
}

export default EmailVerificationCode;

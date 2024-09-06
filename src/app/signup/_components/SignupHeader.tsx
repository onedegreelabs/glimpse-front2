import { ArrowSVG2 } from '@/icons/index';
import { RegisterInputs } from '@/types/types';
import { useRouter } from 'next/navigation';

function SignupHeader({ formValues }: { formValues: RegisterInputs }) {
  const router = useRouter();

  const filledFieldsCount = Object.values(formValues).filter(
    (value) => value,
  ).length;

  const totalFieldsCount = 7;

  const progressWidth = (filledFieldsCount / totalFieldsCount) * 100;

  return (
    <header className="sticky top-0 z-header mt-[6px] bg-white px-1 pt-[10px]">
      <button
        onClick={() => router.back()}
        type="button"
        aria-label="back-router"
        className="mb-4 px-1 py-1"
      >
        <ArrowSVG2 className="size-4 rotate-180 transform stroke-black stroke-2" />
      </button>
      <div className="relative h-1 w-full bg-gray-B25">
        <span
          className="absolute top-0 h-1 bg-blue-B50"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </header>
  );
}

export default SignupHeader;

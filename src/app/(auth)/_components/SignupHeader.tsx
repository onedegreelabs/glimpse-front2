import { ArrowSVG2 } from '@/icons/index';
import { RegisterInputs } from '@/types/types';
import { useRouter } from 'next/navigation';

interface SignupHeaderProps {
  formValues: RegisterInputs;
  isEditing: boolean;
}

function SignupHeader({ formValues, isEditing }: SignupHeaderProps) {
  const router = useRouter();

  const socialMediaFields = [
    'GITHUB',
    'INSTAGRAM',
    'LINKEDIN',
    'WEBSITE',
    'OTHERS',
  ];

  const filledFieldsCount = Object.entries(formValues).reduce(
    (acc, [key, value]) => {
      if (socialMediaFields.includes(key)) {
        if (value && acc.socialMediaCount === 0) {
          acc.socialMediaCount += 1;
        }
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          acc.otherCount += 1;
        }
      } else if (value) {
        acc.otherCount += 1;
      }

      return acc;
    },
    { socialMediaCount: 0, otherCount: 0 },
  );

  const totalFilledCount =
    filledFieldsCount.socialMediaCount + filledFieldsCount.otherCount;

  const totalFieldsCount = 8;
  const progressWidth = (totalFilledCount / totalFieldsCount) * 100;

  return (
    <header className="sticky top-0 z-header mt-[0.375rem] bg-white px-1 pt-[0.625rem]">
      <div className="flex">
        <button
          onClick={() => router.back()}
          type="button"
          aria-label="back-router"
          className="mb-4 px-1 py-1"
        >
          <ArrowSVG2 className="size-4 rotate-180 transform stroke-black stroke-2" />
        </button>
        {isEditing && (
          <h1 className="flex-grow pr-6 pt-1 text-center text-sm font-bold text-black">
            Edit profile
          </h1>
        )}
      </div>
      <div className="relative h-1 w-full bg-gray-B25">
        <span
          className="absolute top-0 h-1 max-w-full bg-blue-B50"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </header>
  );
}

export default SignupHeader;

import { ArrowSVG2, CheckSVG } from '@/icons/index';

type AccordionButtonState = 'PROGRESS' | 'COMPLETED' | 'EMPTY';

const getInfoState = <T,>(fields: T[]): AccordionButtonState => {
  const isStringOrArray = (field: unknown): field is string | unknown[] =>
    typeof field === 'string' || Array.isArray(field);

  if (
    fields.every((field) => (isStringOrArray(field) ? field.length > 0 : field))
  ) {
    return 'COMPLETED';
  }

  if (
    fields.some((field) => (isStringOrArray(field) ? field.length > 0 : field))
  ) {
    return 'PROGRESS';
  }

  return 'EMPTY';
};

interface AccordionButtonProps<T> {
  image: React.JSX.Element;
  isOpen: boolean;
  label: string;
  toggleHandler: () => void;
  watchInfo: T[];
}

function AccordionButton<T>({
  image,
  isOpen,
  label,
  toggleHandler,
  watchInfo,
}: AccordionButtonProps<T>) {
  const infoState = getInfoState(watchInfo);

  return (
    <button
      type="button"
      aria-label={`open-${label}`}
      onClick={toggleHandler}
      className={`${infoState === 'COMPLETED' ? 'bg-yellow-200/50 pl-[0.688rem]' : 'bg-basic-B10 pl-4'} ${isOpen ? 'mb-7' : 'mb-3'} flex h-16 w-full items-center justify-between rounded-xl pr-6 text-sm text-black`}
    >
      <div
        className={`flex items-center ${infoState === 'COMPLETED' ? 'gap-[0.625rem]' : 'gap-3.5'}`}
      >
        {infoState === 'COMPLETED' ? (
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-primary">
            <CheckSVG className="size-6" />
          </div>
        ) : (
          <div className="flex size-[1.875rem] items-center justify-center rounded-full bg-basic-B20">
            {infoState === 'EMPTY' ? (
              image
            ) : (
              <div className="flex items-center justify-center space-x-[0.188rem]">
                <div className="size-[0.188rem] animate-bounce rounded-full bg-gray-B85 [animation-delay:-0.3s]" />
                <div className="size-[0.188rem] animate-bounce rounded-full bg-gray-B85 [animation-delay:-0.15s]" />
                <div className="size-[0.188rem] animate-bounce rounded-full bg-gray-B85" />
              </div>
            )}
          </div>
        )}
        {label}
      </div>
      <ArrowSVG2
        className={`size-4 transform fill-black ${isOpen ? '-translate-y-1 -rotate-90' : 'translate-y-1 rotate-90'}`}
      />
    </button>
  );
}

export default AccordionButton;

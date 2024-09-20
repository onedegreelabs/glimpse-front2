import { ArrowSVG2, BadgeSVG, CheckSVG } from '@/icons/index';
import debounce from '@/utils/debounce';
import { useEffect, useRef } from 'react';

type AccordionButtonState = 'PROGRESS' | 'COMPLETED' | 'EMPTY';

const getInfoState = <T extends unknown>(fields: T[]): AccordionButtonState => {
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
  isOpen: boolean;
  label: string;
  toggleHandler: () => void;
  watchInfo: T[];
}

function AccordionButton<T>({
  isOpen,
  label,
  toggleHandler,
  watchInfo,
}: AccordionButtonProps<T>) {
  const autoClose = useRef(false);
  const infoState = getInfoState(watchInfo);

  const debouncedToggleHandler = useRef(
    debounce(() => {
      autoClose.current = true;
      toggleHandler();
    }, 2000),
  ).current;

  useEffect(() => {
    if (!autoClose.current && infoState === 'COMPLETED' && isOpen) {
      debouncedToggleHandler();
    } else if (infoState !== 'COMPLETED') {
      autoClose.current = false;
    }
  }, [debouncedToggleHandler, infoState, isOpen, toggleHandler]);

  return (
    <button
      type="button"
      aria-label={`open-${label}`}
      onClick={toggleHandler}
      className={`${infoState === 'COMPLETED' ? 'bg-yellow-200/50 pl-[11px]' : 'bg-basic-B10 pl-4'} ${isOpen ? 'mb-7' : 'mb-3'} flex h-16 w-full items-center justify-between rounded-xl pr-6 text-sm text-black`}
    >
      <div
        className={`flex items-center ${infoState === 'COMPLETED' ? 'gap-[10px]' : 'gap-3.5'}`}
      >
        {infoState === 'COMPLETED' ? (
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-primary">
            <CheckSVG className="size-6" />
          </div>
        ) : (
          <div className="flex size-[30px] items-center justify-center rounded-full bg-basic-B20">
            {infoState === 'EMPTY' ? (
              <BadgeSVG />
            ) : (
              <div className="flex items-center justify-center space-x-[3px]">
                <div className="size-[3px] animate-bounce rounded-full bg-gray-B85 [animation-delay:-0.3s]" />
                <div className="size-[3px] animate-bounce rounded-full bg-gray-B85 [animation-delay:-0.15s]" />
                <div className="size-[3px] animate-bounce rounded-full bg-gray-B85" />
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

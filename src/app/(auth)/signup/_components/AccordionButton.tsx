import { ArrowSVG2, BadgeSVG, CheckSVG } from '@/icons/index';

type AccordionButtonState = 'PROGRESS' | 'COMPLETED' | 'EMPTY';
interface AccordionButtonProps {
  isOpen: boolean;
  label: string;
  state: AccordionButtonState;
  toggleHandler: () => void;
}

function AccordionButton({
  isOpen,
  label,
  state,
  toggleHandler,
}: AccordionButtonProps) {
  return (
    <button
      type="button"
      aria-label={`open-${label}`}
      onClick={toggleHandler}
      className={`${state === 'COMPLETED' ? 'bg-yellow-200/50 pl-[11px]' : 'bg-basic-B10 pl-4'} ${isOpen ? 'mb-7' : 'mb-3'} flex h-16 w-full items-center justify-between rounded-xl pr-6 text-sm text-black`}
    >
      <div
        className={`flex items-center ${state === 'COMPLETED' ? 'gap-[10px]' : 'gap-3.5'}`}
      >
        {state === 'COMPLETED' ? (
          <div className="flex size-10 items-center justify-center rounded-full bg-yellow-primary">
            <CheckSVG className="size-6" />
          </div>
        ) : (
          <div className="flex size-[30px] items-center justify-center rounded-full bg-basic-B20">
            {state === 'PROGRESS' ? (
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

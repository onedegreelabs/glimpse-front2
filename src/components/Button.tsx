import { Spinner1 } from '@/icons/index';
import BaseButton from './BaseButton';

interface ButtonProps {
  children: React.ReactNode;
  type: 'submit' | 'button' | 'reset';
  disabled: boolean;
  isPending: boolean;
  onClick?: () => void;
}

function Button({
  children,
  type = 'button',
  disabled,
  isPending,
  onClick,
}: ButtonProps) {
  return (
    <BaseButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="group h-[3.375rem] w-full rounded-2xl bg-yellow-primary disabled:bg-gray-B30"
    >
      {isPending ? (
        <div className="flex items-center justify-center">
          <Spinner1 className="size-6 animate-spin text-white" />
        </div>
      ) : (
        <div className="text-gray-B60 group-enabled:font-bold group-enabled:text-blue-secondary">
          {children}
        </div>
      )}
    </BaseButton>
  );
}

export default Button;

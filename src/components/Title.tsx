interface LabelProps {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  name?: string;
  title: string;
  required: boolean;
}

function Title({ name, title, required, children, tooltip }: LabelProps) {
  return (
    <li className="flex flex-col">
      <div className="z-10 flex gap-1">
        <label
          htmlFor={name}
          className="mb-4 inline-flex gap-1 text-base font-bold text-blue-B50"
        >
          <span
            className={
              required
                ? 'relative after:absolute after:-right-3 after:rounded-full after:text-red-B10 after:content-["*"]'
                : ''
            }
          >
            {title}
          </span>
        </label>
        {tooltip}
      </div>
      {children}
    </li>
  );
}

export default Title;

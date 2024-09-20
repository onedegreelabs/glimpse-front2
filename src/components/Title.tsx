interface LabelProps {
  children: React.ReactNode;
  name?: string;
  title: string;
  required: boolean;
}

function Title({ name, title, required, children }: LabelProps) {
  return (
    <ul className="flex flex-col gap-4">
      <label
        htmlFor={name}
        className="inline-block text-base font-bold text-blue-B50"
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
      {children}
    </ul>
  );
}

export default Title;

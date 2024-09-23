interface LabelProps {
  children: React.ReactNode;
  name?: string;
  title: string;
  required: boolean;
}

function Title({ name, title, required, children }: LabelProps) {
  return (
    <li className="flex flex-col">
      <label
        htmlFor={name}
        className="mb-4 inline-block text-base font-bold text-blue-B50"
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
    </li>
  );
}

export default Title;

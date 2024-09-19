import { CrossSVG } from '@/icons/index';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

interface TagInputs {
  tag: string;
}

interface Tag {
  id: number;
  name: string;
}

interface HashtagsProps {
  tagList: Tag[];
}

function Hashtags({ tagList }: HashtagsProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TagInputs>();

  const onSubmit: SubmitHandler<TagInputs> = ({ tag }) => {
    console.log('tag', tag);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.key);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmitError: SubmitErrorHandler<TagInputs> = () => {
    console.log(errors);
  };

  return (
    <div className="relative flex flex-col">
      <Controller
        name="tag"
        control={control}
        defaultValue=""
        rules={{
          validate: (tag) => {
            if (tag.length > 20) {
              return 'Please enter your brief intro up to 20 characters.';
            }
            if (tagList.length >= 10) {
              return 'You can only add up to 10 tags.';
            }
            if (!/^[a-zA-Z0-9_가-힣]+$/.test(tag)) {
              return 'Tags can only include letters (English and Korean), numbers, or underscores.';
            }
            if (tag.length > 20) {
              return 'Please enter your brief intro up to 20 characters.';
            }
            if (tagList.some((t) => t.name === tag)) {
              return 'This tag already exists.';
            }

            return true;
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="Enter hashtags that best describe you"
            className={`${tagList.length > 0 ? 'mb-3' : ''} h-[54px] w-full rounded-2xl border border-solid px-4 py-[22px] text-sm font-semibold text-black placeholder:font-medium`}
            onKeyDown={handleKeyPress}
          />
        )}
      />

      <button
        onClick={handleSubmit(onSubmit, onSubmitError)}
        className="absolute right-3 top-[17px] text-sm font-bold text-blue-B50"
        type="button"
      >
        + Add
      </button>

      {tagList.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-[6px] text-sm">
          {tagList.map(({ id, name }) => (
            <li
              key={id}
              className="flex items-center gap-[6px] rounded-3xl bg-blue-B50 px-3 py-[10px] text-white"
            >
              {name}
              <button type="button" aria-label="delete-tag" className="ml-2">
                <CrossSVG className="size-4 fill-white" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Hashtags;

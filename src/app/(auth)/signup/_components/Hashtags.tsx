import { CrossSVG, RefreshSVG } from '@/icons/index';
import { createTag } from '@/lib/apis/tagApi';
import { Tag } from '@/types/types';
import { captureException } from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface TagInputs {
  tagName: string;
}

interface HashtagsProps {
  tagList: Tag[];
  updateTagList: (tags: Tag[]) => void;
}

function Hashtags({ tagList, updateTagList }: HashtagsProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm<TagInputs>();

  const currentTag = watch('tagName');

  const { mutate: handleCreateTag, isPending } = useMutation({
    mutationFn: (tagName: string) => createTag(tagName),
    onSuccess: (tag) => {
      updateTagList([...tagList, tag]);
      setValue('tagName', '');
    },
    onError: (error) => {
      setError('tagName', {
        message: 'An unknown error occurred. Please contact support.',
      });
      captureException(error);
    },
  });

  const onSubmit: SubmitHandler<TagInputs> = ({ tagName }) => {
    handleCreateTag(tagName);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!currentTag) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleRemoveTag = (removeId: number) => {
    const newTagList = tagList.filter(({ id }) => id !== removeId);
    updateTagList(newTagList);
  };

  return (
    <div className="relative flex flex-col">
      <Controller
        name="tagName"
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
              return 'Tags can only include letters, numbers, or underscores.';
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
            type="search"
            disabled={isPending}
            placeholder="Enter hashtags that best describe you"
            className={`${tagList.length > 0 && !errors.tagName ? 'mb-3' : ''} ${errors.tagName ? 'border-red-B10 focus:border-red-B10' : ''} h-[54px] w-full rounded-2xl border border-solid py-[22px] pl-4 pr-16 text-sm font-semibold text-black placeholder:font-medium`}
            onKeyDown={handleKeyPress}
          />
        )}
      />

      {errors.tagName && (
        <p className="mb-3 text-xs text-red-B10">{errors.tagName.message}</p>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isPending || !currentTag || !!errors.tagName}
        className="absolute right-3 top-[17px] flex items-center gap-1 text-sm font-bold text-blue-B50 disabled:text-gray-B65"
        type="submit"
      >
        {isPending ? (
          <RefreshSVG className="size-3 animate-spin fill-gray-B65" />
        ) : (
          '+ '
        )}
        Add
      </button>

      {tagList.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-[6px] px-2 text-sm">
          {tagList.map(({ id, name }) => (
            <li
              key={id}
              className="flex items-center gap-[6px] rounded-3xl bg-blue-B50 px-3 py-[10px] text-white"
            >
              {name}
              <button
                onClick={() => handleRemoveTag(id)}
                type="button"
                aria-label="delete-tag"
                className="ml-2"
              >
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

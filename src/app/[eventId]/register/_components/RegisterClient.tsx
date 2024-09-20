'use client';

import Hashtags from '@/app/(auth)/signup/_components/Hashtags';
import Button from '@/components/Button';
import Message from '@/components/Message';
import Title from '@/components/Title';
import { eventRegister } from '@/lib/apis/eventsApi';
import {
  EventRegisterDto,
  EventRegisterInputs,
  FetchError,
  Tag,
} from '@/types/types';
import { captureException } from '@sentry/nextjs';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface RegisterClientProps {
  intro: string;
  tags: Tag[];
  eventId: string;
}

function RegisterClient({ intro, tags, eventId }: RegisterClientProps) {
  const { handleSubmit, control } = useForm<EventRegisterInputs>();
  const [severError, setSeverError] = useState<string>('');

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (data: EventRegisterDto) => eventRegister(data),
    onSuccess: () => {},
    onError: (error) => {
      const fetchError = error as FetchError;

      if (fetchError.status !== 401) {
        setSeverError('An unknown error occurred. Please contact support.');
        captureException(error);
      }
    },
  });

  const clearErrors = () => {
    setSeverError('');
  };

  const onSubmit: SubmitHandler<EventRegisterInputs> = async (data) => {
    const reqData = {
      ...data,
      eventId,
      tagIds: data.tagIds.map(({ id }) => id),
    };

    handleRegister(reqData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Title name="intro" title="About" required={false}>
        <Controller
          name="intro"
          control={control}
          defaultValue={intro}
          rules={{
            maxLength: {
              value: 500,
              message: 'Please enter your bio up to 500 characters.',
            },
          }}
          render={({ field }) => (
            <div className="relative h-64 w-full rounded-2xl border border-solid border-gray-B40 pb-8 pt-4 has-[:focus]:border-2 has-[:focus]:border-black">
              <textarea
                {...field}
                id="intro"
                placeholder="Brief intro"
                value={field.value}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    field.onChange(e);
                  }
                }}
                className="size-full resize-none px-4 text-sm font-semibold outline-none placeholder:font-medium"
              />
              <div className="px-4 text-right text-xs font-light text-gray-B45">
                {field.value.length}/500
              </div>
            </div>
          )}
        />
      </Title>
      <Title title="Tags" required={false}>
        <Controller
          name="tagIds"
          control={control}
          defaultValue={tags}
          render={({ field }) => (
            <Hashtags tagList={field.value} updateTagList={field.onChange} />
          )}
        />
      </Title>
      <Button type="submit" disabled={isPending} isPending={isPending}>
        Register
      </Button>
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 transform">
        <Message message={severError} onClose={() => clearErrors()} isErrors />
      </div>
    </form>
  );
}

export default RegisterClient;

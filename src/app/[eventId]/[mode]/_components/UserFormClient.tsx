'use client';

import Hashtags from '@/app/(auth)/signup/_components/Hashtags';
import Button from '@/components/Button';
import Message from '@/components/Message';
import Title from '@/components/Title';
import { eventEdit, eventRegister } from '@/lib/apis/eventsApi';
import {
  CuratedParticipantDto,
  EventParticipantProfileCardDto,
  EventRegisterDto,
  EventRegisterInputs,
  FetchError,
  ParticipantsResponseDto,
  Tag,
} from '@/types/types';
import { captureException } from '@sentry/nextjs';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface UserFormClientProps {
  intro: string;
  tags: Tag[];
  eventId: string;
  isRegister: boolean;
  userId: number;
}

function UserFormClient({
  intro,
  tags,
  eventId,
  isRegister,
  userId,
}: UserFormClientProps) {
  const router = useRouter();
  const { handleSubmit, control, getValues } = useForm<EventRegisterInputs>();
  const [severError, setSeverError] = useState<string>('');

  const queryClient = useQueryClient();

  const updateParticipantsData = <T extends EventParticipantProfileCardDto>(
    data: T[] | InfiniteData<{ participants: T[] }>,
  ): T[] | InfiniteData<{ participants: T[] }> | null => {
    if (!data) return null;

    let isUpdated = false;

    const updateParticipant = (participant: T): T => {
      if (participant.user.id === userId) {
        isUpdated = true;
        return {
          ...participant,
          intro: getValues('intro'),
          tags: getValues('tagIds'),
        };
      }
      return participant;
    };

    if (Array.isArray(data)) {
      const updatedParticipants = data.map(updateParticipant);
      return isUpdated ? updatedParticipants : null;
    }
    const updatedPages = data.pages.map((page) => ({
      ...page,
      participants: page.participants.map(updateParticipant),
    }));
    return isUpdated ? { ...data, pages: updatedPages } : null;
  };

  const syncEditParticipants = () => {
    const participantsQueries = queryClient.getQueriesData<
      InfiniteData<ParticipantsResponseDto>
    >({
      queryKey: ['participants'],
    });

    participantsQueries.forEach(([queryKey, value]) => {
      if (value) {
        const updatedData = updateParticipantsData(value);
        if (updatedData) {
          queryClient.setQueryData(queryKey, updatedData);
        }
      }
    });
  };

  const syncEditCurations = () => {
    const data = queryClient.getQueryData<CuratedParticipantDto[]>([
      'curations',
    ]);

    if (!data) return;

    const updatedData = updateParticipantsData(data);
    if (updatedData) {
      queryClient.setQueryData(['curations'], updatedData);
    }
  };

  const userFormHandler = async (data: EventRegisterDto) => {
    if (isRegister) {
      await eventRegister(data);
    } else {
      await eventEdit(data);
    }
  };

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (data: EventRegisterDto) => userFormHandler(data),
    onSuccess: () => {
      syncEditParticipants();
      syncEditCurations();
      router.push(`/${eventId}/all`);
      router.refresh();
    },
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
            <Hashtags
              tagList={field.value}
              updateTagList={field.onChange}
              tagStyle={{
                tagsBgColor: 'bg-gray-B20',
                tagsTextColor: 'text-blue-B50',
                closeColor: 'fill-blue-B50',
              }}
            />
          )}
        />
      </Title>
      <Button type="submit" disabled={isPending} isPending={isPending}>
        {isRegister ? 'Register' : 'Save'}
      </Button>
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 transform">
        <Message message={severError} onClose={() => clearErrors()} isErrors />
      </div>
    </form>
  );
}

export default UserFormClient;

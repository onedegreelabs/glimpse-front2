'use client';

import { HeartSVG } from '@/icons/index';
import { deleteWishlist, postWishlist } from '@/lib/apis/wishlist';
import {
  CuratedParticipantDto,
  EventParticipantProfileCardDto,
  ParticipantsResponseDto,
} from '@/types/types';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const HeartLoading = dynamic(() => import('@/components/HeartLoading'));

interface WishlistButtonProps {
  id?: number;
  isWishlisted?: boolean;
  participantRole: EventParticipantProfileCardDto['role'];
}

function WishlistButton({
  id,
  participantRole,
  isWishlisted: initialWishlisted,
}: WishlistButtonProps) {
  const queryClient = useQueryClient();
  const [isWishlisted, setIsWishlisted] = useState(!!initialWishlisted);

  const toggleWishlist = async (targetUserId: number) => {
    if (isWishlisted) {
      await deleteWishlist(targetUserId);
    } else {
      await postWishlist(targetUserId);
    }
  };

  const syncWishlist = <T extends EventParticipantProfileCardDto>(
    queryKey: ['participants'] | ['curations'],
  ) => {
    const data = queryClient.getQueryData<
      T[] | InfiniteData<{ participants: T[] }>
    >(queryKey);

    if (!data) return;

    let isUpdated = false;

    const updateParticipant = (participant: T): T => {
      if (participant.user.id === id) {
        isUpdated = true;
        return { ...participant, isWishlisted: !isWishlisted };
      }
      return participant;
    };

    if (Array.isArray(data)) {
      const updatedParticipants = data.map(updateParticipant);
      if (isUpdated) {
        queryClient.setQueryData<T[]>(queryKey, updatedParticipants);
      }
    } else {
      const updatedPages = data.pages.map((page) => ({
        ...page,
        participants: page.participants.map(updateParticipant),
      }));
      if (isUpdated) {
        queryClient.setQueryData<InfiniteData<{ participants: T[] }>>(
          queryKey,
          {
            ...data,
            pages: updatedPages,
          },
        );
      }
    }
  };

  const syncWishlistParticipants = () =>
    syncWishlist<ParticipantsResponseDto['participants'][0]>(['participants']);

  const syncWishlistCurations = () =>
    syncWishlist<CuratedParticipantDto>(['curations']);

  const { mutate, isPending } = useMutation({
    mutationFn: (targetUserId: number) => toggleWishlist(targetUserId),
    onSuccess: () => {
      syncWishlistParticipants();
      syncWishlistCurations();
      setIsWishlisted((prev) => !prev);
    },
  });

  return (
    <button
      type="submit"
      disabled={!id}
      onClick={() => mutate(id!)}
      aria-label="Add to wishlist"
      className={`flex size-8 items-center justify-center rounded-full ${isWishlisted ? 'fill-yellow-primary stroke-none hover:fill-none hover:stroke-white' : 'fill-none stroke-white hover:stroke-yellow-primary'} ${participantRole === 'HOST' ? 'bg-white/15' : 'bg-gray-B25/30'}`}
    >
      {isPending ? <HeartLoading initialState={isWishlisted} /> : <HeartSVG />}
    </button>
  );
}

export default WishlistButton;

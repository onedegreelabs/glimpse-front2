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
import { useEffect, useState } from 'react';
import BaseButton from '../BaseButton';

interface WishlistButtonProps {
  id?: number;
  isWishlisted?: boolean;
  isDetail?: boolean;
}

function WishlistButton({
  id,
  isWishlisted: initialWishlisted,
  isDetail,
}: WishlistButtonProps) {
  const queryClient = useQueryClient();
  const [isWishlisted, setIsWishlisted] = useState(!!initialWishlisted);

  useEffect(() => {
    setIsWishlisted(!!initialWishlisted);
  }, [initialWishlisted]);

  const toggleWishlist = async (
    targetUserId: number,
    isInWishlist: boolean,
  ) => {
    if (isInWishlist) {
      await deleteWishlist(targetUserId);
    } else {
      await postWishlist(targetUserId);
    }
  };

  const updateParticipantsData = <T extends EventParticipantProfileCardDto>(
    data: T[] | InfiniteData<{ participants: T[] }>,
  ): T[] | InfiniteData<{ participants: T[] }> | null => {
    if (!data) return null;

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
      return isUpdated ? updatedParticipants : null;
    }
    const updatedPages = data.pages.map((page) => ({
      ...page,
      participants: page.participants.map(updateParticipant),
    }));
    return isUpdated ? { ...data, pages: updatedPages } : null;
  };

  const syncWishlistParticipants = () => {
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

  const syncWishlistCurations = () => {
    const data = queryClient.getQueryData<CuratedParticipantDto[]>([
      'curations',
    ]);

    if (!data) return;

    const updatedData = updateParticipantsData(data);
    if (updatedData) {
      queryClient.setQueryData(['curations'], updatedData);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      targetUserId,
      isInWishlist,
    }: {
      targetUserId: number;
      isInWishlist: boolean;
    }) => toggleWishlist(targetUserId, isInWishlist),
  });

  return (
    <BaseButton
      type="submit"
      disabled={!id || isPending}
      onClick={(event) => {
        event.stopPropagation();
        mutate({ targetUserId: id!, isInWishlist: isWishlisted });
        syncWishlistParticipants();
        syncWishlistCurations();
        setIsWishlisted(!isWishlisted);
      }}
      aria-label="Add to wishlist"
      className={`flex size-10 items-center justify-center rounded-full ${
        isDetail ? 'bg-black/10' : 'bg-white/10'
      }`}
    >
      <HeartSVG
        className={`${isDetail ? `size-5 ${isWishlisted ? 'fill-red-B20 stroke-none' : 'fill-white'}` : `size-[1.125rem] ${isWishlisted ? 'fill-yellow-primary stroke-none' : 'fill-white/25'}`}`}
      />
    </BaseButton>
  );
}

export default WishlistButton;

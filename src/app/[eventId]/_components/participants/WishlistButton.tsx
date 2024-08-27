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

// const HeartLoading = dynamic(() => import('@/components/HeartLoading'));

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
    onSuccess: () => {
      syncWishlistParticipants();
      syncWishlistCurations();
    },
  });

  return (
    <button
      type="submit"
      disabled={!id || isPending}
      onClick={async () => {
        await mutate({ targetUserId: id!, isInWishlist: isWishlisted });
        setIsWishlisted(!isWishlisted);
      }}
      aria-label="Add to wishlist"
      className={`flex size-8 items-center justify-center rounded-full ${isWishlisted ? 'fill-yellow-primary stroke-none' : 'fill-none stroke-white'} ${participantRole === 'HOST' ? 'bg-white/15' : 'bg-gray-B25/30'}`}
    >
      <HeartSVG />
      {/* {isPending ? <HeartLoading initialState={isWishlisted} /> : } */}
    </button>
  );
}

export default WishlistButton;

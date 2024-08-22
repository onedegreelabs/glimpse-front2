'use client';

import { HeartSVG } from '@/icons/index';
import { deleteWishlist, postWishlist } from '@/lib/apis/wishlist';
import { EventParticipantProfileCardDto } from '@/types/types';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

function WishlistButton({
  id,
  participantRole,
  isWishlisted: initialWishlisted,
}: {
  id: number | undefined;
  participantRole: EventParticipantProfileCardDto['role'];
  isWishlisted: boolean | undefined;
}) {
  const [isWishlisted, setIsWishlisted] = useState(!!initialWishlisted);

  const toggleWishlist = async (targetUserId: number) => {
    if (isWishlisted) {
      await deleteWishlist(targetUserId);
    } else {
      await postWishlist(targetUserId);
    }
  };

  const { mutate } = useMutation({
    mutationFn: (targetUserId: number) => toggleWishlist(targetUserId),
    onSuccess: () => {
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
      <HeartSVG />
    </button>
  );
}

export default WishlistButton;

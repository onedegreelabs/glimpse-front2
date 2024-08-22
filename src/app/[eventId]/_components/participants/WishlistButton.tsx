'use client';

import { HeartSVG } from '@/icons/index';
import { EventParticipantProfileCardDto } from '@/types/types';
import { useState } from 'react';

function WishlistButton({
  participantRole,
  isWishlisted: initialWishlisted,
}: {
  participantRole: EventParticipantProfileCardDto['role'];
  isWishlisted: boolean | undefined;
}) {
  const [isWishlisted, setIsWishlisted] = useState(!!initialWishlisted);

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev);
  };

  return (
    <button
      type="submit"
      onClick={toggleWishlist}
      aria-label="Add to wishlist"
      className={`flex size-8 items-center justify-center rounded-full ${isWishlisted ? 'fill-yellow-primary stroke-none hover:fill-none hover:stroke-white' : 'fill-none stroke-white hover:stroke-yellow-primary'} ${participantRole === 'HOST' ? 'bg-white/15' : 'bg-gray-B25/30'}`}
    >
      <HeartSVG />
    </button>
  );
}

export default WishlistButton;

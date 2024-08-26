'use client';

import { useReadMoreStore } from '@/store/readMoreStore';
import { useRef, useState } from 'react';

interface ExpandableTextProps {
  intro: string;
  isExpanded: boolean;
  showMore: () => void;
}

function ExpandableText({ intro, isExpanded, showMore }: ExpandableTextProps) {
  const textMax = 52;

  const words = intro.split('');

  if (words.length > textMax) {
    return (
      <>
        {isExpanded ? intro : `${words.slice(0, textMax).join('')}`}
        &nbsp;
        {!isExpanded && (
          <button
            onClick={showMore}
            type="button"
            className="text-yellow-primary"
          >
            More...
          </button>
        )}
      </>
    );
  }

  return intro;
}

interface IntroTextProps {
  intro: string;
  isCuration: boolean;
  id?: number;
}

export default function IntroText({ intro, id, isCuration }: IntroTextProps) {
  const { expandedItems, setExpandedItems } = useReadMoreStore((state) => ({
    expandedItems: state.expandedItems,
    setExpandedItems: state.setExpandedItems,
  }));

  const expandedItemList = isCuration
    ? expandedItems.curations
    : expandedItems.participants;

  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setExpanded] = useState(
    !!(id && expandedItemList.includes(id)),
  );

  const showMore = () => {
    setExpanded(true);
    if (id) {
      setExpandedItems(id, isCuration);
    }
  };

  return (
    <div>
      <div
        ref={contentRef}
        className={`relative mt-4 text-sm ${!isExpanded ? 'line-clamp-2' : 'line-clamp-none'}`}
      >
        <ExpandableText
          intro={intro}
          isExpanded={isExpanded}
          showMore={showMore}
        />
      </div>
    </div>
  );
}

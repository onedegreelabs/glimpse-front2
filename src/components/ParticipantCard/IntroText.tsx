'use client';

import { ArrowSVG3 } from '@/icons/index';
import { useReadMoreStore } from '@/store/readMoreStore';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  const [isClamped, setClamped] = useState(false);

  const paragraphs = intro.split('\n');

  useEffect(() => {
    function handleResize() {
      if (contentRef.current) {
        setClamped(
          contentRef.current.scrollHeight > contentRef.current.clientHeight ||
            contentRef.current.clientHeight > 190,
        );
      }
    }

    handleResize();
  }, []);

  const toggleHandler = () => {
    if (!id) return;

    if (isExpanded) {
      if (isCuration) {
        setExpandedItems({
          curations: expandedItems.curations.filter(
            (cacheId) => cacheId !== id,
          ),
          participants: expandedItems.participants,
        });
      } else {
        setExpandedItems({
          curations: expandedItems.curations,
          participants: expandedItems.participants.filter(
            (cacheId) => cacheId !== id,
          ),
        });
      }
    } else if (isCuration) {
      setExpandedItems({
        curations: [...expandedItems.curations, id],
        participants: expandedItems.participants,
      });
    } else {
      setExpandedItems({
        curations: expandedItems.curations,
        participants: [...expandedItems.participants, id],
      });
    }

    setExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <div
        ref={contentRef}
        className={`relative mb-3 mt-4 text-sm ${isExpanded ? 'line-clamp-none' : 'line-clamp-2'}`}
      >
        {isExpanded
          ? paragraphs.map((line) => (
              <span key={uuidv4()}>
                {line}
                <br />
              </span>
            ))
          : intro}
      </div>
      {!contentRef.current && !isClamped && <div className="h-8" />}
      {isClamped && (
        <button
          type="button"
          className="text-title flex items-center gap-1 self-end rounded-full bg-white/20 py-2 pl-[10px] pr-2 text-xs font-bold"
          onClick={toggleHandler}
        >
          {isExpanded ? 'see less' : 'see more'}
          <ArrowSVG3
            className={`${isExpanded ? 'rotate-180' : ''} transform`}
          />
        </button>
      )}
    </div>
  );
}

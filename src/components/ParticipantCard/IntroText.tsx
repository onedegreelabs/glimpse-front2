'use client';

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
            more...
          </button>
        )}
      </>
    );
  }

  return intro;
}

interface IntroTextProps {
  intro: string;
}

export default function IntroText({ intro }: IntroTextProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setExpanded] = useState(false);

  const showMore = () => {
    setExpanded(true);
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

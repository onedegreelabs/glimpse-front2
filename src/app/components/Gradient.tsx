'use client';

import { Fragment, useEffect, useState, RefObject } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Gradient({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement>;
}) {
  const baseHeight = 677;
  const baseTranslateY = 207;
  const gap = 900;

  const [numDivs, setNumDivs] = useState(0);

  useEffect(() => {
    const updateDivs = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const newNumDivs = Math.floor(containerHeight / baseHeight);
        setNumDivs(newNumDivs);
      }
    };

    updateDivs();

    const handleResize = () => {
      const currentRef = containerRef.current;
      if (currentRef) {
        const containerHeight = currentRef.clientHeight;
        const newNumDivs = Math.floor(containerHeight / baseHeight);
        setNumDivs(newNumDivs);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return (
    <>
      {Array.from({ length: numDivs }).map((_, index) => {
        const translateY =
          baseTranslateY * (index + 1) + gap * Math.floor(index / 2);

        return (
          <Fragment key={uuidv4()}>
            {index % 2 === 0 ? (
              <>
                <div
                  className="absolute h-[315px] w-[303px] bg-gradient-radial blur-xl from-[#756FD5]"
                  style={{ transform: `translate(170px, ${translateY}px)` }}
                />
                <div
                  className="absolute h-[225px] w-[225px] bg-gradient-radial blur-2xl from-[#2C5EEB]"
                  style={{
                    transform: `translate(102px, ${translateY + 212}px)`,
                  }}
                />
                <div
                  className="absolute h-[288px] w-[288px] bg-gradient-radial blur-2xl from-[#002387]"
                  style={{ transform: `translate(-24px, ${translateY}px)` }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute h-[315px] w-[303px] bg-gradient-radial blur-xl from-[#756FD5]"
                  style={{
                    transform: `translate(-32px, ${translateY + 500}px)`,
                  }}
                />
                <div
                  className="absolute h-[288px] w-[288px] bg-gradient-radial blur-2xl from-[#002387]"
                  style={{
                    transform: `translate(100px, ${translateY + 400}px)`,
                  }}
                />
                <div
                  className="absolute h-[225px] w-[225px] bg-gradient-radial blur-2xl from-[#2C5EEB]"
                  style={{
                    transform: `translate(120px, ${translateY + 700}px)`,
                  }}
                />
              </>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default Gradient;

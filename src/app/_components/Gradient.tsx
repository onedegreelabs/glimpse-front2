'use client';

import { HIDE_GRADIENT_PATHNAME } from '@/constant/constant';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Gradient() {
  const pathname = usePathname();
  const numDivs = 4;
  const baseHeight = 320;
  const gap = 100;

  const isDynamicRegisterPath = /\/[^/]+\/register$/.test(pathname);

  if (HIDE_GRADIENT_PATHNAME.includes(pathname) || isDynamicRegisterPath)
    return null;

  return (
    <div className="fixed top-0 mx-auto h-dvh w-full max-w-sm overflow-hidden">
      {Array.from({ length: numDivs }).map((_, index) => {
        const translateY = baseHeight * (index + 1) + gap * index;

        return (
          <Fragment key={uuidv4()}>
            {index % 2 === 0 ? (
              <>
                <div
                  className="absolute h-[315px] w-[303px] bg-gradient-radial from-[#756FD5] blur-xl"
                  style={{ transform: `translate(170px, ${translateY}px)` }}
                />
                <div
                  className="absolute h-[225px] w-[225px] bg-gradient-radial from-[#2C5EEB] blur-2xl"
                  style={{
                    transform: `translate(102px, ${translateY + 212}px)`,
                  }}
                />
                <div
                  className="absolute h-[288px] w-[288px] bg-gradient-radial from-[#002387] blur-2xl"
                  style={{ transform: `translate(-24px, ${translateY}px)` }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute h-[315px] w-[303px] bg-gradient-radial from-[#756FD5] blur-xl"
                  style={{
                    transform: `translate(-32px, ${translateY + 100}px)`,
                  }}
                />
                <div
                  className="absolute h-[288px] w-[288px] bg-gradient-radial from-[#002387] blur-2xl"
                  style={{
                    transform: `translate(100px, ${translateY}px)`,
                  }}
                />
                <div
                  className="absolute h-[225px] w-[225px] bg-gradient-radial from-[#2C5EEB] blur-2xl"
                  style={{
                    transform: `translate(120px, ${translateY + 300}px)`,
                  }}
                />
              </>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

export default Gradient;

// const [numDivs, setNumDivs] = useState(0);

// useEffect(() => {
//   const currentRef = containerRef.current;

//   const updateDivs = () => {
//     if (currentRef) {
//       const containerHeight = currentRef.clientHeight;
//       const newNumDivs = Math.floor(containerHeight / baseHeight);
//       setNumDivs(newNumDivs);
//     }
//   };

//   updateDivs();

//   const observer = new ResizeObserver(() => {
//     updateDivs();
//   });

//   if (currentRef) {
//     observer.observe(currentRef);
//   }

//   return () => {
//     if (currentRef) {
//       observer.unobserve(currentRef);
//     }
//     observer.disconnect();
//   };
// }, [containerRef]);

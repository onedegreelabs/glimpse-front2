'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function ScrollHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, lastScrollY]);

  return (
    <>
      <header
        ref={headerRef}
        className={`z-header flex w-full max-w-sm items-center justify-between bg-white px-4 py-5 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } fixed`}
      >
        {children}
      </header>
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}

export default ScrollHeader;

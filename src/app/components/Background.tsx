'use client';

import { useRef } from 'react';
import Gradient from './Gradient';

function Background({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="relative bg-background min-h-dvh overflow-x-hidden grid"
      ref={containerRef}
    >
      <Gradient containerRef={containerRef} />
      {children}
    </div>
  );
}

export default Background;

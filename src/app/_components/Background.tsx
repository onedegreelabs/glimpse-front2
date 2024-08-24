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
      className="relative grid min-h-dvh overflow-x-clip bg-background"
      ref={containerRef}
    >
      <Gradient containerRef={containerRef} />
      {children}
    </div>
  );
}

export default Background;

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
      className="background-mask relative grid min-h-dvh bg-background"
      ref={containerRef}
    >
      <Gradient containerRef={containerRef} />
      {children}
    </div>
  );
}

export default Background;

'use client';

import { useTermsModalStore } from '@/store/termsModalStore';

function EventDetailsContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen } = useTermsModalStore((state) => ({
    isOpen: state.isOpen,
  }));

  return (
    <header
      className={`flex w-full max-w-sm items-center justify-between bg-white px-4 py-5 ${isOpen ? '' : 'z-event'}`}
    >
      {children}
    </header>
  );
}

export default EventDetailsContainer;

function Loading() {
  return (
    <li className="flex h-40 w-full flex-col justify-between rounded-3xl border-[1.5px] border-solid border-white/20 bg-white/30 pb-6 pl-5 pr-4 pt-4">
      <div className="flex w-full">
        <div className="grid w-full grid-cols-[1fr_auto]">
          <div className="mt-3 grid grid-cols-[auto_1fr] gap-[10px]">
            <div className="size-12 flex-shrink-0 animate-pulse rounded-full bg-gray-B35/40" />
            <div className="flex w-full min-w-0 flex-col justify-center gap-2">
              <div className="h-[18px] w-3/4 animate-pulse bg-gray-B35/40" />
              <div className="h-3 w-1/2 animate-pulse bg-gray-B35/40" />
            </div>
          </div>
          <div className="flex gap-[6px]">
            <div className="size-8 animate-pulse rounded-full bg-gray-B35/40" />
            <div className="size-8 animate-pulse rounded-full bg-gray-B35/40" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-3 w-full animate-pulse bg-gray-B35/40" />
        <div className="h-3 w-full animate-pulse bg-gray-B35/40" />
      </div>
    </li>
  );
}

export default Loading;

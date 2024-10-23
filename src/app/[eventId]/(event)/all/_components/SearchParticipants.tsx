'use client';

import { SearchSVG } from '@/icons/index';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState, KeyboardEvent } from 'react';

interface SearchParticipantsProps {
  search: string;
  eventId: string;
}

function SearchParticipants({
  search: defaultSearchValue,
  eventId,
}: SearchParticipantsProps) {
  const [searchValue, setSearchValue] = useState(defaultSearchValue);
  const router = useRouter();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const searchHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.replace(`/${eventId}/all?search=${searchValue}`);
    }
  };

  return (
    <div className="relative mb-4 mt-2">
      <input
        id="searchParticipants"
        type="search"
        value={searchValue}
        className="peer h-12 w-full rounded-2xl py-4 pl-[2.625rem] pr-4 font-medium text-black outline-none placeholder:text-sm placeholder:text-gray-B70 search-cancel:hidden"
        placeholder="Search anything in profile"
        onChange={changeHandler}
        aria-label="Search participants"
        onKeyDown={searchHandler}
      />

      <label
        htmlFor="searchParticipants"
        className="absolute left-4 top-4 fill-gray-B70 peer-focus:fill-black"
      >
        <SearchSVG />
      </label>
    </div>
  );
}

export default SearchParticipants;

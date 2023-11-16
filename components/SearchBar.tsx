"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import SearchBreed from "./SearchBreed";

interface SearchBar {
  setBreedsToSearch: Dispatch<SetStateAction<string[]>>;
  setFetchingData: Dispatch<SetStateAction<boolean>>;
}

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-10 z-10 ${otherClasses}`}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
);

const SearchBar = (props: SearchBar) => {
  const { setBreedsToSearch, setFetchingData } = props;
  const [breeds, setBreeds] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (breeds.length === 0) {
      return alert("Please provide some input");
    }

    setBreedsToSearch(breeds);
    setFetchingData(true);
  };

  return (
    <form
      className="flex items-center justify-start max-sm:flex-col 
         w-full relative max-sm:gap-4 max-w-3xl"
      onSubmit={handleSearch}
    >
      <div
        className="flex-1 max-sm:w-full flex justify-start items-center
       relative"
      >
        <SearchBreed breedsToSearch={breeds} setBreedsToSearch={setBreeds} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;

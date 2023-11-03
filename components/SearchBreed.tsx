import { Fragment, useState, useEffect } from "react";

import { Combobox, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";

import { SearchBreedProps } from "../types";

const SearchBreed = ({ breed, setBreed }: SearchBreedProps) => {
  const [query, setQuery] = useState<string>("");
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const breeds = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            withCredentials: true,
          }
        );
        setBreeds(breeds.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBreeds();
  }, []);

  const filteredBreeds =
    query === ""
      ? breeds
      : breeds.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="flex-1 max-sm:w-full flex justify-start items-center">
      <Combobox value={breed} onChange={setBreed}>
        <div className="relative w-full">
          {/* Button for the combobox. Click on the icon to see the complete dropdown */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/dogLogo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="w-full h-[48px] pl-12 p-4 rounded-l-full rounded-full 
            bg-light-white outline-none cursor-pointer text-sm"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)} // Update the search query when the input changes
            placeholder="Yorkshire Terrier..."
          />

          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md
               bg-white py-1 text-base shadow-lg ring-1 ring-black 
               ring-opacity-5 focus:outline-none sm:text-sm z-50"
              static
            >
              {filteredBreeds.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-fetch text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>

                      {/* Show an active blue background color if the option is selected */}
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-pribg-primary-purple"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchBreed;

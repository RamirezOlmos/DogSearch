import { Dogs } from "@/types";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const chunkArray = (array: string[], chunkSize: number) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunkedArray.push(chunk);
  }
  return chunkedArray;
};

export const arrayOfDogs = async (array: string[][]) => {
  const arrayDogs = [];
  for (let i = 0; i < array.length; i += 1) {
    const dogs = await axios.post(
      `https://frontend-take-home-service.fetch.com/dogs`,
      array[i],
      {
        withCredentials: true,
      }
    );
    arrayDogs.push(dogs.data);
  }

  return arrayDogs;
};

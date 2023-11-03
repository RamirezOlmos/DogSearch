"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

import { Dogs } from "@/types";

type LikeContextProviderProps = {
  children: React.ReactNode;
};

type LikeContext = {
  likedDogs: Dogs[];
  setLikedDogs: Dispatch<SetStateAction<Dogs[]>>;
  likedDogsIds: string[];
  setLikedDogsIds: Dispatch<SetStateAction<string[]>>;
};

export const LikeContext = createContext<LikeContext | null>(null);

export default function LikeContextProvider({
  children,
}: LikeContextProviderProps) {
  const [likedDogs, setLikedDogs] = useState<Dogs[]>([]);
  const [likedDogsIds, setLikedDogsIds] = useState<string[]>([]);

  return (
    <LikeContext.Provider
      value={{
        likedDogs,
        setLikedDogs,
        likedDogsIds,
        setLikedDogsIds,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
}

export function useLikeContext() {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLikeContext must be used within a LikeContextProvider");
  }

  return context;
}

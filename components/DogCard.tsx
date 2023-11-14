"use client";

import { useCallback, useEffect, useState } from "react";

import { Dogs } from "@/types";
import Image from "next/image";

import { useLikeContext } from "../contexts/LikeContext";
import { Button } from "./ui/button";

interface DogCard {
  imgSrc: string;
  imgAlt: string;
  name: string;
  age: string;
  breed: string;
  zipCode: string;
  id: string;
}

const NewCard = ({
  imgSrc,
  imgAlt,
  name,
  age,
  breed,
  zipCode,
  id,
}: DogCard) => {
  const { likedDogs, setLikedDogs, likedDogsIds, setLikedDogsIds } =
    useLikeContext();
  const [testLike, setTestLike] = useState<boolean>(false);
  const [stringBig, setStringBig] = useState<boolean>(false);

  const breedArray = breed.split(" ");

  useEffect(() => {
    const foundDog = likedDogs.find((dog) => dog.id === id);
    if (foundDog) setTestLike(true);
  }, [id, likedDogs]);

  useEffect(() => {
    if (breedArray.length > 1) setStringBig(true);
  }, [setStringBig, breedArray]);

  const handleLikes = useCallback(() => {
    if (likedDogs.length > 0 && testLike) {
      const filterLikedDogs = likedDogs.filter((dog) => dog.id !== id);
      const filterLikedDogsIds = likedDogsIds.filter((dogId) => dogId !== id);
      setLikedDogs(filterLikedDogs);
      setLikedDogsIds(filterLikedDogsIds);
      setTestLike(false);
    } else {
      const newLikedDog: Dogs = {
        img: imgSrc,
        name,
        age: parseInt(age),
        breed,
        zip_code: zipCode,
        id,
      };
      setLikedDogs([...likedDogs, newLikedDog]);
      setLikedDogsIds([...likedDogsIds, id]);
      setTestLike(true);
    }
  }, [
    likedDogs,
    testLike,
    id,
    setLikedDogs,
    setTestLike,
    imgSrc,
    name,
    age,
    breed,
    zipCode,
    likedDogsIds,
    setLikedDogsIds,
  ]);

  return (
    <div
      className="flex flex-col p-6 justify-center items-start text-fetch
    bg-white hover:bg-amber-600 hover:text-white shadow-md rounded-3xl group"
    >
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="flex text-[32px] leading-[38px] font-extrabold">
          {name}
        </h2>
      </div>

      <p className="text-[22px] mt-6 leading-[26px] font-bold capitalize">
        Age {age}
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex w-full justify-between text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/zip-code.png"
              width={23}
              height={23}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">{zipCode}</p>
          </div>
          <div
            className={`flex flex-col ${
              stringBig ? "mt-5" : ""
            }  justify-center items-center gap-2`}
          >
            <Image src="/race.png" width={25} height={25} alt="seat" />
            <p className="text-[14px] text-center w-28 leading-[17px]">
              {breed}
            </p>
          </div>
          <div className="flex flex-col mb-5 justify-center items-center gap-2">
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={handleLikes}
            >
              <svg
                fill="#000000"
                height="23px"
                width="23px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 51.997 51.997"
                xmlSpace="preserve"
                className={` ${
                  testLike ? "fill-violet-400" : "fill-slate-400"
                } hover:fill-red-900`}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905 c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478 c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014 C52.216,18.553,51.97,16.611,51.911,16.242z"></path>{" "}
                </g>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCard;

"use client";

import type { PaginationProps } from "antd";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { ConfigProvider, Pagination } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

import Hero from "../components/Hero";
import { useLikeContext } from "../contexts/LikeContext";
import { Dogs } from "../types";
import DogCard from "./DogCard";
import DogDetails from "./MatchedDogCard";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";

export default function DogsShowCase() {
  const router = useRouter();
  const { likedDogs, likedDogsIds } = useLikeContext();
  const [breedToSearch, setBreedToSearch] = useState<string>("");
  const [matchDog, setMatchDog] = useState<Dogs | null>(null);
  const [dogsListBreedSearch, setdogsListBreedSearch] = useState<Dogs[] | null>(
    null
  );

  const dog: Dogs = {
    img: "https://frontend-take-home.fetch.com/dog-images/n02099712-Labrador_retriever/n02099712_1150.jpg",
    name: "Monroe",
    age: 13,
    breed: "Labrador Retriever",
    zip_code: "32159",
    id: "CnGFTIcBOvEgQ5OCx68s",
  };

  const [error, setError] = useState<string>("");
  const [sortDesc, setSortDesc] = useState<boolean>(true);
  const [postsPerPage, setPostsPerPage] = useState<number>(12);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setPostsPerPage(pageSize);
  };
  // pagination states
  const [number, setNumber] = useState<number>(1);
  //   handle Pagination
  const handlePage = (pageNumber: number) => {
    const nextSection: HTMLElement | null = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
    setNumber(pageNumber);
  };

  useEffect(() => {
    const getDogs = async () => {
      try {
        const dogsIds = await axios.get(
          `https://frontend-take-home-service.fetch.com/dogs/search?breeds=${breedToSearch}&size=100`,
          {
            withCredentials: true,
          }
        );

        const dogs = await axios.post(
          `https://frontend-take-home-service.fetch.com/dogs`,
          dogsIds.data.resultIds,
          {
            withCredentials: true,
          }
        );

        const sortAlpha = dogs.data.sort((a: Dogs, b: Dogs) =>
          a.name.localeCompare(b.name)
        );

        setdogsListBreedSearch(sortAlpha);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("Something went wrong!");
        }
      }
    };
    getDogs();
  }, [breedToSearch]);

  const isDataEmpty =
    !Array.isArray(dogsListBreedSearch) ||
    dogsListBreedSearch.length < 1 ||
    !dogsListBreedSearch;

  let newData;

  if (!isDataEmpty) {
    newData = dogsListBreedSearch.slice(
      (number - 1) * postsPerPage,
      postsPerPage * number
    );
  }

  const orderDogList = () => {
    if (sortDesc) {
      if (!isDataEmpty) {
        const sortDesc = dogsListBreedSearch.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setdogsListBreedSearch(sortDesc);
      }
      setSortDesc(false);
    } else {
      if (!isDataEmpty) {
        const sortAsc = dogsListBreedSearch.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setdogsListBreedSearch(sortAsc);
      }
      setSortDesc(true);
    }
  };

  const handleMatchToDog = async () => {
    try {
      const dogId = await axios.post(
        `https://frontend-take-home-service.fetch.com/dogs/match`,
        likedDogsIds,
        {
          withCredentials: true,
        }
      );
      console.log(dogId);
      if (dogId) {
        const matchDog = likedDogs.filter((dog) => dog.id === dogId.data.match);
        console.log(matchDog[0]);
        setMatchDog(matchDog[0]);
        setIsOpen(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      } else {
        console.log("Something went wrong!");
      }
    }
  };

  return (
    <section className="overflow-hidden">
      <Hero />
      <div id="discover"></div>
      <section className="font-primary mt-20 sm:px-16 px-6 py-4 max-w-[1440px] mx-auto">
        <section
          className="flex flex-col items-start justify-start gap-y-2.5 
          text-black-100"
        >
          <h1 className="text-4xl font-extrabold">Pack of Dogs</h1>
          <p>
            Explore the variety of dog breeds, and you might just find your new
            canine companion. Trust your instincts when interacting with the
            dogs you come across. Once you&apos;ve made your choices, simply
            press &apos;Match with My Ideal Companion&apos; and our algorithm
            will pair you with your perfect furry friend.
          </p>
        </section>
        <section className="flex flex-col xl:flex-row  mt-12 w-full gap-10">
          <SearchBar setBreedToSearch={setBreedToSearch} />

          <div className="ml-5 mt-1">
            <Button
              className="w-[100px] rounded-full font-light border border-orange-700
               hover:bg-violet-300 text-base text-orange-700 hover:text-white 
               hover:border-transparent"
              size="sm"
              variant="ghost"
              onClick={orderDogList}
            >
              {sortDesc ? "Sort Z-A" : "Sort A-Z"}
            </Button>
          </div>
        </section>
        <section>
          {!isDataEmpty ? (
            <section>
              <div
                className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2
               grid-cols-1 w-full gap-8 pt-14 "
              >
                {newData?.map((dog) => (
                  <div key={dog.id} className="">
                    <DogCard
                      imgSrc={dog.img}
                      imgAlt={`${dog.name} Picture `}
                      name={dog.name}
                      age={dog.age.toString()}
                      breed={dog.breed}
                      zipCode={dog.zip_code}
                      id={dog.id}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-9">
                <ConfigProvider
                  theme={{
                    components: {
                      Pagination: {
                        itemActiveBg: "light-purple",
                      },
                    },
                    token: {
                      colorText: "#3F1D38",
                      colorPrimary: "#5D12D2",
                    },
                  }}
                >
                  <Pagination
                    defaultCurrent={number}
                    responsive={true}
                    onShowSizeChange={onShowSizeChange}
                    pageSizeOptions={[12, 24, 48, 100]}
                    defaultPageSize={12}
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    total={dogsListBreedSearch.length}
                    onChange={handlePage}
                    className="flex flex-row justify-center"
                  />
                </ConfigProvider>
              </div>
            </section>
          ) : (
            <div className="mt-16 flex justify-center items-center flex-col gap-2">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{error}</p>
            </div>
          )}
        </section>
        <section className="mb-6 mt-12 flex justify-center items-center">
          {likedDogsIds.length > 0 ? (
            <Button
              className="w-94 bg-amber-600 hover:bg-orange-600 text-base"
              size="lg"
              onClick={handleMatchToDog}
            >
              Match with My Ideal Companion
            </Button>
          ) : null}
        </section>
        <DogDetails
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          dog={matchDog}
        />
      </section>
    </section>
  );
}

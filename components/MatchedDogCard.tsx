"use client";

import { Fragment } from "react";
import toast from "react-hot-toast";

import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Dogs } from "../types/index";
import { Button } from "./ui/button";

interface DogDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  dog: Dogs | null;
}

export default function DogDetails({
  isOpen,
  closeModal,
  dog,
}: DogDetailsProps) {
  const router = useRouter();
  const handleGodspeed = async () => {
    try {
      const res = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        toast.success("Goodbye. Enjoy your new Friend!");
        setTimeout(() => router.push("/"), 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <section className="fixed inset-0 overflow-y-auto">
            <section className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <section className="flex-1 flex flex-col gap-3">
                    <div className="relative w-full h-[290px] bg-pattern bg-cover bg-center rounded-md">
                      {dog ? (
                        <Image
                          src={dog.img}
                          alt={`Dog ${dog.name}`}
                          fill
                          priority
                          className="object-contain"
                        />
                      ) : null}
                    </div>
                  </section>

                  <section className="font-primary text-fetch flex-1 flex flex-col gap-2">
                    <h1
                      className="text-center font-bold text-xl bg-gradient-to-r from-violet-600 via-orange-400 to-violet-600 
                  inline-block text-transparent bg-clip-text"
                    >
                      Congratulations You Found your best Friend!
                    </h1>
                    {dog ? (
                      <h2 className="font-semibold text-xl capitalize">
                        {dog.name}
                      </h2>
                    ) : null}

                    <div className="mt-3 flex flex-wrap gap-4">
                      <div className="flex justify-between gap-5 w-full text-right">
                        <h4 className="text-grey capitalize">Breed</h4>
                        {dog ? (
                          <p className="text-black-100 font-semibold">
                            {dog.breed}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex justify-between gap-5 w-full text-right">
                        <h4 className="text-grey capitalize">Age</h4>
                        {dog ? (
                          <p className="text-black-100 font-semibold">
                            {dog.age}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex justify-between gap-5 w-full text-right">
                        <h4 className="text-grey capitalize">Zip Code</h4>
                        {dog ? (
                          <p className="text-black-100 font-semibold">
                            {dog.zip_code}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </section>
                  <div className="flex justify-center">
                    <Button
                      className="border border-orange-700 hover:gradient-bg-rainbow
                     text-orange-700 font-semibold hover:text-white hover:border-white
                     hover:font-bold"
                      size="lg"
                      onClick={handleGodspeed}
                      variant="ghost"
                    >
                      Godspeed
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </section>
          </section>
        </Dialog>
      </Transition>
    </>
  );
}

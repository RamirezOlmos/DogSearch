"use client";

import { useEffect, useCallback, useState } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function NavBar() {
  const router = useRouter();
  const [colorChange, setColorchange] = useState<boolean>(false);

  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY >= 80) {
        setColorchange(true);
      } else {
        setColorchange(false);
      }
    };
    window.addEventListener("scroll", changeNavbarColor);
    // Cleanup function to remove the event listener when the component unmounts
    return () => window.addEventListener("scroll", changeNavbarColor);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        toast.success("Goodbye. Have a good one!");
        router.push("/");
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
    <header
      className={`transition duration-700 ease-in-out ${
        colorChange ? "bg-white" : ""
      } text-fetch w-full fixed top-0 left-0 z-10`}
    >
      <nav
        className="max-w-[1440px] mx-auto flex justify-between 
      items-center sm:px-16 px-6 py-4 bg-transparent"
      >
        <Image
          src="/coolDogLogo.png"
          alt="logo"
          width={60}
          height={18}
          className="object-contain"
        />
        <ul>
          <Button
            variant="ghost"
            className={`font-primary ${
              colorChange
                ? "hover:bg-orange-300"
                : "hover:bg-fetch hover:text-white"
            } `}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </ul>
      </nav>
    </header>
  );
}

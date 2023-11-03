"use client";

import Image from "next/image";

import { Button } from "./ui/button";

const Hero = () => {
  const handleScroll = (): void => {
    const nextSection: HTMLElement | null = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="text-fetch font-primary md:gap-0 flex xl:flex-row flex-col gap-5 relative z-0 
        w-full mx-auto gradient-bg"
    >
      <section className="flex-1 pt-36 ml-6 padding-x">
        <h1
          className="2xl:text-[72px] sm:text-[64px] text-[50px] 
         font-extrabold"
        >
          Find your best Friend!
        </h1>
        <p className="text-[27px] font-light mt-5">
          Browse through our database of shelter dogs, in the quest to help a
          fortunate dog find a loving new home!
        </p>
        <div className="w-32 m-10">
          <Button
            className="w-full rounded-full bg-amber-600 hover:bg-orange-600 text-base"
            size="sm"
            onClick={handleScroll}
          >
            Fetch Dogs
          </Button>
        </div>
      </section>
      <section className="xl:flex-[1.5] flex justify-end items-end w-full xl:h-screen">
        <div className="relative xl:w-full w-[90%] xl:h-full md:h-[590px] h-[290px] lg:h-[590px]">
          <Image
            src="/HeroImage.jpg"
            alt="hero"
            layout="responsive"
            width={590}
            height={590}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain w-full h-full xl:mt-44 xl:ml-4"
          />
        </div>
      </section>
    </section>
  );
};

export default Hero;

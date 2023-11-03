import Image from "next/image";

import { Button } from "./ui/button";

export default function NavBarLogin() {
  return (
    <header className="w-full mt-1 absolute z-10">
      <nav
        className="max-w-[1440px] mx-auto flex justify-between 
      items-center sm:px-16 px-6 py-4 bg-transparent"
      >
        <Image
          src="/Logo.png"
          alt="logo"
          width={118}
          height={18}
          className="object-contain"
        />
      </nav>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "../constants";

export default function Footer() {
  return (
    <footer
      className="font-primary flex flex-col text-slate-100 mt-5 
        border-t bg-footer-texture"
    >
      <ul className="flex max-md:flex-col flex-wrap mt-10 ml-10 justify-between sm:px-16 px-6 py-10">
        <li className="flex items-center">
          <Image
            src="/logoWhite.png"
            alt="logo"
            width={228}
            height={40}
            className="object-contain"
          />
        </li>

        <li className="flex-1 w-full flex md:justify-center flex-wrap max-md:mt-10 gap-20">
          {footerLinks.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-6 text-base min-w-[170px]"
            >
              <div className="flex flex-col gap-5">
                {item.links.map((link) => (
                  <Link
                    key={link.title}
                    href={link.url}
                    className="text-slate-50 font-semibold hover:text-orange-400"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </li>
      </ul>
      <ul className="flex max-md:flex-col flex-row xl:gap-[800px] max-md:gap-4 md:gap-32 items-center sm:px-16 px-6 py-10">
        <p>@2023 Fetch. All rights reserved</p>
        <li className="flex flex-row gap-3">
          <Link href="https://www.facebook.com/FetchRewards/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="40"
              viewBox="0 0 50 50"
              className="fill-white hover:fill-orange-400"
            >
              <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
            </svg>
          </Link>
          <Link href="https://twitter.com/FetchRewards?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="40"
              viewBox="0 0 50 50"
              className="fill-white hover:fill-orange-400"
            >
              <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
            </svg>
          </Link>
          <Link href="https://www.instagram.com/fetchrewards/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="40"
              viewBox="0 0 50 50"
              className="fill-white hover:fill-orange-400"
            >
              <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
            </svg>
          </Link>
          <Link href="https://www.youtube.com/channel/UCwVp3gzavJ7ymM8uv8rJaqg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35"
              height="40"
              viewBox="0 0 50 50"
              className="fill-white hover:fill-orange-400"
            >
              <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
            </svg>
          </Link>
        </li>
      </ul>
    </footer>
  );
}

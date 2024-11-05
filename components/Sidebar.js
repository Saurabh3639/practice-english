"use client";

import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLanguage } from "react-icons/io5";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const basePath = pathname.split("/")[1];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-white">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute z-50 inline-flex items-center p-2 mt-4 ml-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 toggleSidebarBtn"
      >
        <span className="sr-only">Open sidebar</span>
        <RxHamburgerMenu className="w-6 h-6" />
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0 bg-white" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto scrollbar-hide shadow-lg">
          <div className="flex items-center w-full px-3 py-3">
            {/* <svg
              id="logo-15"
              width="48"
              height="38"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                className="ccustom"
                fill="#ed1c24"
              ></path>{" "}
              <path
                d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                className="ccustom"
                fill="#ed1c24"
              ></path>{" "}
              <path
                d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                className="ccustom"
                fill="#ed1c24"
              ></path>{" "}
              <path
                d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                className="ccustom"
                fill="#ed1c24"
              ></path>{" "}
            </svg> */}
            <svg
              id="logo-34"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 20C0 10.5719 0 5.85786 2.92893 2.92893C5.85786 0 10.5719 0 20 0C29.4281 0 34.1421 0 37.0711 2.92893C40 5.85786 40 10.5719 40 20C40 29.4281 40 34.1421 37.0711 37.0711C34.1421 40 29.4281 40 20 40C10.5719 40 5.85786 40 2.92893 37.0711C0 34.1421 0 29.4281 0 20Z"
                className="ccustom"
                fill="#243A5A"
              ></path>{" "}
              <path
                d="M24 26C24.5523 26 25.0101 26.4521 24.9004 26.9934C24.7065 27.9494 24.2355 28.8355 23.5355 29.5355C22.5979 30.4732 21.3261 31 20 31C18.6739 31 17.4022 30.4732 16.4645 29.5355C15.7645 28.8355 15.2935 27.9494 15.0997 26.9934C14.9899 26.4521 15.4477 26 16 26L24 26Z"
                className="ccompli2"
                fill="#2DF8BB"
              ></path>{" "}
              <path
                d="M26.1023 17.7765C25.5688 17.9194 25.2421 18.4775 25.5126 18.959C25.7973 19.4658 26.1911 19.9081 26.6702 20.2514C27.4224 20.7904 28.3382 21.052 29.2617 20.9914C30.1851 20.9309 31.059 20.5521 31.7344 19.9195C32.4099 19.2869 32.845 18.4396 32.9658 17.5221C33.0866 16.6046 32.8856 15.6736 32.3969 14.8877C31.9082 14.1019 31.1621 13.5098 30.2858 13.2123C29.4095 12.9148 28.4572 12.9304 27.5911 13.2564C27.0395 13.464 26.5447 13.7893 26.1385 14.2051C25.7526 14.6002 25.9237 15.2239 26.402 15.5L26.9093 15.7929C27.6808 16.2384 27.5287 17.3943 26.6681 17.6249L26.1023 17.7765Z"
                className="ccompli2"
                fill="#2DF8BB"
              ></path>{" "}
              <path
                d="M13.8978 17.7765C14.4313 17.9194 14.758 18.4775 14.4875 18.959C14.2028 19.4658 13.809 19.9081 13.33 20.2514C12.5778 20.7904 11.6619 21.052 10.7385 20.9914C9.81502 20.9309 8.94113 20.5521 8.2657 19.9195C7.59027 19.2869 7.15508 18.4396 7.03429 17.5221C6.9135 16.6046 7.11457 15.6736 7.60326 14.8877C8.09194 14.1019 8.838 13.5098 9.71431 13.2123C10.5906 12.9148 11.543 12.9304 12.4091 13.2564C12.9606 13.464 13.4555 13.7893 13.8617 14.2051C14.2476 14.6002 14.0764 15.2239 13.5981 15.5L13.0908 15.7929C12.3193 16.2384 12.4715 17.3943 13.332 17.6249L13.8978 17.7765Z"
                className="ccompli2"
                fill="#2DF8BB"
              ></path>{" "}
            </svg>
            <span className="ml-6 text-lg font-bold">LOGO</span>
          </div>
          <div className="flex items-center p-2 space-x-4 border-t border-b">
            <Image
              src="/images/user_default.png"
              className="w-16 h-16 rounded-full dark:bg-gray-500"
              height="66"
              width="66"
              alt=""
              priority={true}
            />
            <div>
              <div className="mb-2">
                <span className="text-lg font-semibold block">User</span>
                <span className="text-xs font-semibold block">(test)</span>
              </div>
            </div>
          </div>

          <ul className="space-y-2 font-medium mt-4">
            <li
              className={`flex items-center p-2 rounded-lg group cursor-pointer ${
                basePath == "practice-english" ? "box-border text-primary" : ""
              }`}
            >
              <Link href="/practice-english">
                <div className="flex">
                  <div>
                    <IoLanguage className="inline" />
                  </div>
                  <div className="pl-2">Practice English</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
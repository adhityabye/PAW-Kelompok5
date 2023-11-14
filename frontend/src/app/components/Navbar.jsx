import Link from "next/link";
import Logo from "../../../public/assets/logo-white.svg";
import Image from "next/image";
export default function Navbar(){
    return (
      <nav class="bg-purple-200 border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div>
            <Link className="flex items-center gap-4" href="/">
              <Image src={Logo} className="h-8 w-min" />
              <span className="text-3xl font-bold text-white-100">
                TeknoVibe
              </span>
            </Link>
          </div>
          <div class="flex md:order-2">
            <Link href="/auth/signin">
              <button
                type="button"
                class="text-black bg-white-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
              >
                Masuk
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-purple-200 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <a
                  href="#tentang"
                  class="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 hover:underline"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="#panduan"
                  class="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 hover:underline"
                >
                  Panduan
                </a>
              </li>
              <li>
                <a
                  href="/"
                  class="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 hover:underline"
                >
                  Cari Event
                </a>
              </li>
              <li>
                <a
                  href="/"
                  class="block py-2 pl-3 pr-4 text-white-100 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 hover:underline"
                >
                  Ajukan Event
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
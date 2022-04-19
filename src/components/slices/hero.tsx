import Link from "next/link";
import { CollectionIcon } from "@heroicons/react/outline";

import FloatingParasol from "../utils/floating-illustration";

const Hero = () => (
  <section id="hero" className="mt-6">
    <div className="mx-auto max-w-7xl px-5 py-6 grid grid-cols-12 gap-0">
      <div className="col-span-12 lg:col-span-6 text-center lg:text-left lg:flex lg:items-center">
        <div className="pb-3">
          <a
            href="https://solana.com/"
            target="_blank"
            className="inline-flex items-center text-white bg-pink-600 bg-opacity-0 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
            rel="noreferrer"
          >
            <svg
              className="h-7"
              viewBox="0 0 96 86"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M95.5053 67.8049L79.658 84.8288C79.3134 85.1986 78.8966 85.4934 78.4334 85.6949C77.9703 85.8964 77.4706 86.0003 76.9656 86H1.8398C1.48134 86 1.13068 85.8951 0.830924 85.6982C0.531164 85.5013 0.295357 85.221 0.152475 84.8917C0.00959266 84.5624 -0.03414 84.1985 0.0266501 83.8446C0.0874403 83.4908 0.250105 83.1624 0.494658 82.8999L16.3543 65.876C16.6979 65.5072 17.1134 65.2129 17.5751 65.0115C18.0368 64.81 18.5349 64.7056 19.0385 64.7048H94.1602C94.5187 64.7048 94.8693 64.8097 95.1691 65.0066C95.4688 65.2035 95.7046 65.4838 95.8475 65.8131C95.9904 66.1424 96.0341 66.5063 95.9734 66.8601C95.9126 67.214 95.7499 67.5423 95.5053 67.8049ZM79.658 33.5236C79.3134 33.1538 78.8966 32.859 78.4334 32.6575C77.9703 32.456 77.4706 32.3521 76.9656 32.3524H1.8398C1.48134 32.3524 1.13068 32.4573 0.830924 32.6542C0.531164 32.8511 0.295357 33.1314 0.152475 33.4607C0.00959266 33.79 -0.03414 34.1539 0.0266501 34.5078C0.0874403 34.8616 0.250105 35.19 0.494658 35.4525L16.3543 52.4764C16.6979 52.8452 17.1134 53.1394 17.5751 53.3409C18.0368 53.5424 18.5349 53.6468 19.0385 53.6476H94.1602C94.5187 53.6476 94.8693 53.5427 95.1691 53.3458C95.4688 53.1489 95.7046 52.8686 95.8475 52.5393C95.9904 52.21 96.0341 51.8461 95.9734 51.4922C95.9126 51.1384 95.7499 50.81 95.5053 50.5475L79.658 33.5236ZM1.8398 21.2952H76.9656C77.4706 21.2955 77.9703 21.1917 78.4334 20.9902C78.8966 20.7887 79.3134 20.4938 79.658 20.124L95.5053 3.1001C95.7499 2.83758 95.9126 2.50922 95.9734 2.15538C96.0341 1.80153 95.9904 1.4376 95.8475 1.10831C95.7046 0.779013 95.4688 0.498699 95.1691 0.301804C94.8693 0.10491 94.5187 1.21255e-05 94.1602 0L19.0385 0C18.5349 0.000858433 18.0368 0.105251 17.5751 0.306715C17.1134 0.508179 16.6979 0.802426 16.3543 1.17124L0.498747 18.1951C0.25443 18.4574 0.0918367 18.7854 0.0309086 19.1389C-0.0300194 19.4923 0.0133662 19.8559 0.155745 20.1851C0.298123 20.5142 0.533305 20.7945 0.832447 20.9918C1.13159 21.189 1.48169 21.2944 1.8398 21.2952Z"
                fill="white"
              />
            </svg>
            <span className="ml-4 text-sm">Built on Solana Blockchain</span>
            <svg
              className="ml-2 w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <h1 className="mt-4 text-3xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-7 lg:text-4xl xl:text-6xl">
            <span className="md:block">The First Community</span>
            <span className="text-transparent bg-clip-text bg-purple-2 leading-normal whitespace-nowrap grid m_sm:block">
              <span className="text-white">Governed</span> IDO Platform
            </span>
          </h1>
          <p className="mt-7 text-base text-gray-200 font-medium text-xl">
            Parasol Finance is the first-ever community governed IDO platform
            built on Solana with the needs of both projects and investors alike.
          </p>
          <div className="flex justify-center mt-6 sm:justify-between">
            <p className="text-gray-200 text-lg font-bold mb-3 truncate">
              Buy your NFT access key now! (limited quantity) 🎉
            </p>
          </div>
          <div className="mt-8 grid lg:flex gap-3 grid-cols-1 lg:grid-cols-2 justify-start">
            <Link href={"/projects"}>
              <a className="button px-10 bg-none bg-purple-2 py-3 text-base">
                <CollectionIcon className={"w-5 h-5"} />
                View Upcoming IDOs
              </a>
            </Link>
            <Link href={"/swap"}>
              <a className="button border border-white bg-none except py-3 text-base">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 125.5752 144.6496"
                >
                  <g>
                    <path
                      fill="currentColor"
                      d="M82.861,51.8818V35.9594L41.3622,12.0413,1.7115,34.8831A3.4155,3.4155,0,0,0,0,37.8557V51.8134l41.362-23.9179Z"
                    />
                    <path
                      fill="currentColor"
                      d="M90.3565,80.8225l13.81-8.2182V23.3165L64.5161.4578a3.4274,3.4274,0,0,0-3.4226,0L49.0118,7.4965,90.3565,31.3289Z"
                    />
                    <path
                      fill="currentColor"
                      d="M43.1591,35.7714,1.6944,59.6894A3.42,3.42,0,0,0,.4622,60.9367,3.2583,3.2583,0,0,0,0,62.6451V144.65H13.7761V68.6929l43.6894-25.131Z"
                    />
                    <path
                      fill="currentColor"
                      d="M35.2015,128.5042V64.729l-13.793,8.0469V144.53h13.793Z"
                    />
                    <path
                      fill="currentColor"
                      d="M84.059,107.44l41.499-23.9181V37.7533a3.257,3.257,0,0,0-.462-1.7085,3.3151,3.3151,0,0,0-1.2323-1.2471L111.765,27.7419V75.424L70.2831,99.3421Z"
                    />
                    <path
                      fill="currentColor"
                      d="M41.3623,91.5344l.1369,15.9223,42.697,24.6527,39.6675-22.8416a3.4142,3.4142,0,0,0,1.7115-2.9556V92.3548L84.2134,116.2722Z"
                    />
                    <path
                      fill="currentColor"
                      d="M41.3623,116.3066v15.94L61.0764,143.59a3.4042,3.4042,0,0,0,3.4226,0l12.0988-6.8334Z"
                    />
                  </g>
                </svg>
                Buy $PSOL With USDC
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative- mt-20 sm:mt-24 lg:mt-0 lg:col-span-6 hidden lg:flex justify-end">
        <FloatingParasol />
      </div>
    </div>
  </section>
);

export default Hero;

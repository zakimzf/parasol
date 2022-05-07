import { useRef } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useWalletModal } from "../wallet-connector";
import Logo from "/public/assets/logos/parasol-logo-mark-full-color-rgb.svg";
import Image from "next/image";

type NftDetails = {
  owned?: boolean,
  poster?: string;
  id: number;
  video: string;
  name: string;
  amount: number;
  vestingPeriod: number;
  index: number;
  buyNFT: any;
  connected: any;
  data: any;
};

const NftCard = ({
  id,
  owned,
  name,
  amount,
  poster,
  video,
  vestingPeriod,
  index,
  buyNFT,
  connected,
  data,
}: NftDetails) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playVideo = () => videoRef.current && videoRef.current.play();
  const pauseVideo = () => videoRef.current && videoRef.current.pause();
  const walletModal = useWalletModal();

  return (
    <article
      onMouseOver={playVideo}
      onMouseOut={pauseVideo}
      className={`card cursor-pointer ${owned ? "scale-105" : ""} lg:mx-0 overflow-hidden mb-5`}
    >
      <div className="">
        <div className="relative">
          <span className="absolute top-0 right-0 m-3 items-center justify-center px-2 py-1 font-medium leading-none purple-2 bg-purple-500 bg-opacity-50 rounded">
            {data && (`${data.currentSupply}/${![0, 1].includes(id) ? data.maxSupply : "∞"}`) || "0/0"}
          </span>
          <video
            ref={videoRef}
            preload="auto"
            poster={poster}
            loop
            className="w-full"
          >
            <source src={video} />
          </video>
        </div>
        <div className="px-6 py-7 flex flex-col gap-y-5 items-start">
          <div className={"flex gap-x-2"}>
            <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-white text-gray-800">
              {name}
            </span>
            {owned && <span
              className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-purple-2 text-white">
              Owned
            </span>}
          </div>
          <div className="flex items-baseline text-4xl xl:text-4xl lg:text-2xl font-extrabold">
            <span className="flex text-white gap-x-3 items-center">
              <Image src={Logo} className="h-8" alt="logo" width={32} height={32} />
              <div className="flex items-end gap-x-2">
                {amount > 10000
                  ? (amount / 1000).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                  }) + "K"
                  : amount.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                  })}
                <span className="text-2xl font-medium text-gray-200">PSOL</span>
              </div>
            </span>
          </div>
          <p className="text-gray-200">
            Guaranteed allocation of the amount of {amount > 10000
              ? (amount / 1000).toLocaleString("en-US", {
                minimumFractionDigits: 0,
              }) + "K"
              : amount.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })} PSOL in dollars at the
            time of the participation.
          </p>
          <ul className="space-y-4" role="list">
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-purple-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-200">
                <span className="font-bold">Dynamic Vesting Period:</span>
                {" "}
                {vestingPeriod} weeks
              </p>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 text-purple-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-200">
                <span className="font-bold">Starting Vesting Fees:</span>
                21%
              </p>
            </li>
          </ul>
          <button
            className="w-full button text-base py-4"
            onClick={() => connected ? buyNFT(index) : walletModal.setVisible(true)}>
            {connected ? (
              <>
                <ShoppingBagIcon className="w-5" />
                Mint NFT Access Key
              </>
            ) : (
              <>Connect Wallet</>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
export default NftCard;
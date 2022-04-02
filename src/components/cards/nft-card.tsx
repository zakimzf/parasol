import { useRef } from "react";
import { ShoppingBagIcon } from "@heroicons/react/outline";
import { useWalletModal } from "../../components/wallet-connector";
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
  offset?: number;
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
  offset,
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
      className={`mt-${offset} cursor-pointer relative mx-4 lg:mx-0 flex-col bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg overflow-hidden`}
    >
      <div className="">
        <div className="relative">
          <span className="absolute top-0 right-0 m-3 items-center justify-center px-2 py-1 font-medium leading-none indigo-500 bg-purple-500 bg-opacity-50 rounded">
            {data && (`${data.currentSupply}/${![0, 1].includes(id) ? data.maxSupply : "∞"}`) || "0/0" }
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
              <Image src={Logo} className="h-8" alt="logo" width={30}  height={30}/>
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
            Guaranteed allocation of the amount of 210 PSOL in dollars at the
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
                <span className="font-bold">Dynamic Vesting Period:</span>{" "}
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
                <span className="font-bold">Starting Vesting Fees:</span> 21%
              </p>
            </li>
          </ul>
          <button
            className="flex gap-x-2 items-center justify-center w-full whitespace-nowrap bg-gradient-to-r from-purple-1 to-purple-2 font-medium rounded-md p-3 hover:bg-white hover:text-purple-2"
            onClick={() =>
              connected ? buyNFT(index) : walletModal.setVisible(true)
            }
          >
            {connected ? (
              <>
                <ShoppingBagIcon className="h-5" />
                Buy NFT Access Key
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
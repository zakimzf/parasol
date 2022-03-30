import React, { Fragment, useState, useEffect, useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Notification from "../../components/slices/notification";
import { NftContext } from "../../context/NftContext";

import CardHost from "../../components/cards/base-card";
import { PublicKey } from "@solana/web3.js";

const Migrate = () => {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();

  const { nfts, setNfts, user, wallet, config } = React.useContext(NftContext);

  useEffect(() => {
    if (!wallet.connected) return;
    if(user) {
      getNFTList();
    }
  }, [wallet.connected, user]);

  useEffect(() => setSelected(nfts[0]), [nfts]);

  const [notificationMsg, setNotificationMsg] = useState({
    msg: "",
    status: "error",
  });

  const [selected, setSelected] = useState<any>();

  const getNFTList = async () => {
    const nftsmetadata = await user.getNFTList();
    setNfts(nftsmetadata);
  };

  const redeemNFT = async () => {
    const mintAddress = new PublicKey(selected.mint);
    try {
      const tx = await user.redeem(mintAddress);
      const signature = await sendTransaction(tx, connection);
      setNotificationMsg({
        msg: "Doing redeem an NFT Now....",
        status: "pending",
      });
      await connection.confirmTransaction(signature, "confirmed");
    } catch (err) {
      setNotificationMsg({
        msg: "Doing redeem an NFT is failed!",
        status: "error",
      });
      return false;
    }
    setNotificationMsg({
      msg: "Successfully did redeem an NFT",
      status: "success",
    });

    setNfts([]);
    getNFTList();
  };

  return (
    <section className={"py-6"}>
      <div className={"mx-auto max-w-md space-y-6"}>
        <Link href={"/tiers"}>
          <a className="inline-flex gap-x-2 items-center py-3 rounded-lg text-gray-300">
            <ArrowLeftIcon className={"w-4"} />
            Back
          </a>
        </Link>
        {notificationMsg.msg.length > 0 ? (
          <Notification
            title={notificationMsg.msg}
            source={notificationMsg.msg}
            color={
              notificationMsg.status == "pending"
                ? "bg-gray-700"
                : notificationMsg.status == "error"
                  ? "bg-red-700"
                  : "bg-green-700"
            }
          />
        ) : (
          ""
        )}
        <CardHost hoverEffect={false} classes={"space-y-6"} padding={6}>
          <div className={"prose prose-lg prose-invert"}>
            <h2>Redeem NFT</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {nfts.length > 0 ? (
            <Listbox value={selected} onChange={setSelected}>
              <div className=" mt-1">
                <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white bg-opacity-5 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate">
                    {selected ? selected.name + " - " + selected.mint : ""}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-64 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {nfts.map((nft: any, index: any) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `cursor-default select-none relative py-2 px-4 ${
                            active ? "text-white bg-purple-2" : "text-gray-900"
                          }`
                        }
                        value={nft}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {nft.name + " - " + nft.mint}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          ) : (
            <div className={"prose prose-lg prose-invert"}>
              <Link href={"/tiers"}>
                <a className="inline-flex gap-x-2 items-centertext-gray-200">
                  No NFT Access Key. Please buy your NFT here.
                </a>
              </Link>
            </div>
          )}
          {nfts.length > 0 ? (
            <button
              className={
                "w-full bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"
              }
              onClick={redeemNFT}
            >
              Redeem My NFT
            </button>
          ) : (
            ""
          )}
        </CardHost>
      </div>
    </section>
  );
};

export default Migrate;

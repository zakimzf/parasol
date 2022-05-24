import React, { FC, Fragment, useEffect, useState } from "react";

import { PublicKey } from "@solana/web3.js";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/outline";
import { TOKEN_LIST_URL } from "@jup-ag/core";

import { Token } from "./constants";
import { TokenChooserMode, useTokenModal } from "./useTokenModal";

export const TokenModal: FC = () => {
  const { visible, setVisible, mode, setInput, setOutput } = useTokenModal();
  const [value, setValue] = useState("");
  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    fetch(TOKEN_LIST_URL["mainnet-beta"])
      .then((response) => response.json())
      .then((result) => setTokens(result));
  }, []);
  const filteredTokens = tokens.filter((token) => {
    if (!value) return true;
    if (
      token.name.toLowerCase().includes(value.toLowerCase()) ||
      token.symbol.toLowerCase().includes(value.toLowerCase()) ||
      token.address.includes(value)
    )
      return true;
  });
  const close = () => {
    setVisible(false);
    setValue("");
  };
  let featuredTokens = [
    {
      name: "SOL",
      icon: tokens.find((x) => x.symbol === "SOL")?.logoURI,
      address: tokens.find((x) => x.symbol === "SOL")?.address,
    },
    {
      name: "PSOL",
      icon: tokens.find((x) => x.symbol === "PSOL")?.logoURI,
      address: tokens.find((x) => x.symbol === "PSOL")?.address,
    },
    {
      name: "USDC",
      icon: tokens.find((x) => x.symbol === "USDC")?.logoURI,
      address: tokens.find((x) => x.symbol === "USDC")?.address,
    },
    {
      name: "USDT",
      icon: tokens.find((x) => x.symbol === "USDT")?.logoURI,
      address: tokens.find((x) => x.symbol === "USDT")?.address,
    },
  ];
  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={close}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-xl text-left align-bottom shadow-strong transition-all sm:w-full sm:max-w-sm sm:align-middle">
              <div className="bg-[#231f38] p-5 text-gray-100 sm:py-7">
                <div className="mb-6 flex items-center gap-x-2 px-3">
                  <SearchIcon className={"w-6 text-gray-400"} />
                  <input
                    type={"search"}
                    spellCheck={"false"}
                    onChange={(e) => setValue(e.target.value)}
                    className={
                      "w-full border-0 bg-transparent p-1 outline-0 focus:outline-none focus:ring-0"
                    }
                    placeholder={"Search by token or address"}
                  />
                </div>
                <div className={"mb-4 flex justify-around gap-x-2"}>
                  {featuredTokens.map((token) => (
                    <button
                      key={`${token.address} ${token.address}`}
                      onClick={() => {
                        if (mode == TokenChooserMode.Input) {
                          setInput(new PublicKey(token.address || ""));
                        }
                        else {
                          setOutput(new PublicKey(token.address || ""));
                        }
                        close();
                      }}
                      className={
                        "flex items-center gap-x-2 rounded-md border-opacity-20 bg-white bg-opacity-5 p-2 text-xs hover:border-purple-2 hover:bg-purple-2 hover:bg-opacity-5"
                      }
                    >
                      <img
                        className={"w-4"}
                        src={token?.icon}
                        alt={token.name}
                      />
                      {token.name}
                    </button>
                  ))}
                </div>
                <div
                  className={
                    "scrollbar-thumb-rounded-full max-h-[30rem] scrollbar-thin scrollbar-thumb-purple-2"
                  }
                >
                  <div className="relative grid gap-y-2">
                    {filteredTokens.length > 0 ? (
                      filteredTokens.map((token) => (
                        <button
                          key={token.address}
                          onClick={() => {
                            if (mode == TokenChooserMode.Input) {
                              setInput(new PublicKey(token.address));
                            }
                            else {
                              setOutput(new PublicKey(token.address));
                            }
                            close();
                          }}
                          className="-focus:ring flex items-center gap-x-4 rounded-lg p-3 text-left hover:bg-white hover:bg-opacity-5 focus:bg-white focus:bg-opacity-5 focus:outline-none focus:ring-purple-2"
                        >
                          <img
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src = "/assets/icons/no-token.png";
                            }}
                            src={token.logoURI}
                            className="h-6 w-6"
                            alt={token.name}
                          />
                          <span
                            className={
                              "w-0 max-w-xs flex-1 truncate font-medium"
                            }
                          >
                            {token.name}
                          </span>
                          <span className="text-sm text-gray-400">
                            {token.symbol}
                          </span>
                        </button>
                      ))
                    ) : (
                      <span className={"pt-6 pb-3 text-gray-300"}>
                        No results found.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

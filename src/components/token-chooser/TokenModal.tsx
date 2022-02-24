import React, { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TokenChooserMode, useTokenModal } from "./useTokenModal";
import { TOKEN_LIST_URL } from "@jup-ag/core";
import { SearchIcon } from "@heroicons/react/outline";
import { PublicKey } from "@solana/web3.js";
import { Token } from "./constants";

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
    },
    {
      name: "PSOL",
      icon: tokens.find((x) => x.symbol === "PSOL")?.logoURI,
    },
    {
      name: "USDC",
      icon: tokens.find((x) => x.symbol === "USDC")?.logoURI,
    },
    {
      name: "USDT",
      icon: tokens.find((x) => x.symbol === "USDT")?.logoURI,
    },
  ];
  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={close}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-30 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
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
            <div className="inline-block align-bottom rounded-xl text-left overflow-hidden shadow-strong transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
              <div className="bg-[#231f38] text-gray-100 p-5 sm:py-7">
                <div className="flex gap-x-2 items-center mb-6 px-3">
                  <SearchIcon className={"w-6 text-gray-400"} />
                  <input
                    type={"search"}
                    spellCheck={"false"}
                    onChange={(e) => setValue(e.target.value)}
                    className={"w-full bg-transparent p-1 border-0 outline-0"}
                    placeholder={"Search by token or address"}
                  />
                </div>
                {/*<div className={"flex gap-x-2 justify-around mb-4"}>*/}
                {/*    {featuredTokens.map(token => (*/}
                {/*        <button className={"flex items-center text-xs gap-x-2 p-2 border border-white border-opacity-20 bg-white bg-opacity-5 rounded-lg hover:border-purple-2 hover:bg-purple-2 hover:bg-opacity-5"}>*/}
                {/*            <img className={"w-4"} src={token?.icon} alt={token.name} />*/}
                {/*            {token.name}*/}
                {/*        </button>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <div
                  className={
                    "max-h-[30rem] scrollbar-thin scrollbar-thumb-purple-2 scrollbar-thumb-rounded-full"
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
                            } else {
                              setOutput(new PublicKey(token.address));
                            }
                            close();
                          }}
                          className="p-3 flex gap-x-4 items-center text-left rounded-lg focus:outline-none -focus:ring focus:ring-purple-2 hover:bg-white hover:bg-opacity-5 focus:bg-white focus:bg-opacity-5"
                        >
                          <img
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src =
                                "https://raw.githubusercontent.com/parasol-labs-org/white-paper/main/logo.png";
                            }}
                            src={token.logoURI}
                            className="w-6 h-6"
                            alt={token.name}
                          />
                          <span
                            className={
                              "flex-1 w-0 max-w-xs font-medium truncate"
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
                      <span className={"text-gray-300 pt-6 pb-3"}>
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

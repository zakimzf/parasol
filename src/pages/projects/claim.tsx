import React, { Fragment, useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  HandIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

import Container from "components/container";
import Layout from "components/layout";
import { NftContext } from "context/NftContext";

const idos = [
  {
    id: "lol",
    name: "Secretum",
    description:
      "Revolutionary Secure Messaging & Trading Dapp powered by Solana.",
  },
];

const TokenClaiming = () => {
  const { nfts } = useContext(NftContext);

  useEffect(() => setSelectedNft(nfts[0]), [nfts]);

  const [selectedNft, setSelectedNft] = useState<any>();
  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Tokens Claiming</title>
        <meta
          name="title"
          content="Parasol Finance ($PSOL) | Tokens Claiming"
        />
        {/*<meta property="og:image" content="/assets/preview/seeding.png" />*/}
        {/*<meta property="twitter:image" content="/assets/preview/seeding.png" />*/}
      </Head>
      <section>
        <Container>
          <div className="grid pt-10 pb-16 md:grid-cols-5">
            <div className="flex items-center gap-x-2" />
            <div className="col-span-3">
              <div className="text-center">
                <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-purple-400">
                  Parasol Finance
                </h2>
                <a className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Tokens Claiming
                </a>
                <p className="mt-5 text-sm text-gray-200 lg:text-base">
                  You can claim your tokens after participating in IDOs here.
                </p>
              </div>
            </div>
            <div className="relative mt-5 flex items-center justify-center gap-x-2 md:justify-end">
              {selectedNft && (
                <Listbox value={selectedNft} onChange={setSelectedNft}>
                  <Listbox.Button className="relative flex cursor-pointer items-center gap-x-3 rounded-lg border-2 border-purple-2 bg-purple-2 bg-opacity-5 p-3 shadow-md focus:outline-none">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img
                          className="h-12 w-12 rounded-md"
                          src={selectedNft.image}
                          alt={selectedNft.name}
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs">{selectedNft.name}</p>
                        <h2 className="whitespace-nowrap text-lg">
                          {selectedNft.attributes[0].value}
                        </h2>
                      </div>
                    </div>
                    <ChevronDownIcon className="h-5 w-5 text-purple-2" />
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {nfts.map((nft: any) => (
                        <Listbox.Option
                          key={nft.name}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-purple-2 text-white"
                                : "text-gray-900"
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
                                {nft.attributes[0].value} - {nft.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-2">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </Listbox>
              )}
            </div>
          </div>
        </Container>
      </section>
      <Layout>
        <section>
          <Container>
            <ul
              role="list"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {idos.map((ido) => (
                <li key={ido.id} className="card col-span-1">
                  <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate font-medium">{ido.name}</h3>
                        <span className="inline-block flex-shrink-0 rounded-full bg-purple-2 px-2 py-0.5 text-xs font-medium">
                          Finished
                        </span>
                      </div>
                      <p className="mt-1 truncate text-sm">{ido.description}</p>
                      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-6">
                        <div>
                          <div className="flex items-center gap-x-3 text-sm font-medium">
                            <span>Purchased</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span className="flex items-center gap-x-1">
                              50$
                            </span>
                          </div>
                          <div className="flex items-center gap-x-3 text-sm font-medium">
                            <span>Released</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span className="flex items-center gap-x-1">
                              25%
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-x-3 text-sm font-medium">
                            <span>Claimed</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span className="flex items-center gap-x-1">
                              25$
                            </span>
                          </div>
                          <div className="flex items-center gap-x-3 text-sm font-medium">
                            <span>Claimable</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span className="flex items-center gap-x-1">
                              30$
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex divide-x divide-gray-800 border-t border-gray-800">
                    <button className="flex flex-1 items-center justify-center gap-x-2 py-4">
                      <HandIcon className="h-5 w-5" aria-hidden="true" />
                      <span>Claim Tokens</span>
                    </button>
                    <Link href="/projects/x">
                      <a className="flex flex-1 items-center justify-center gap-x-2 py-4">
                        <InformationCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span>IDO Details</span>
                      </a>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </Layout>
    </>
  );
};

export default TokenClaiming;

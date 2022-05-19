import React, { Fragment, useContext, useEffect, useState } from "react";
import Head from "next/head";

import { Timestamp } from "firebase/firestore";
import moment from "moment";
import {
  CheckIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

import Container from "components/container";
import Heading from "components/heading";
import Layout from "components/layout";
import Apply from "components/slices/apply";
import { Listbox, Transition } from "@headlessui/react";
import { NftContext } from "context/NftContext";

const projects = [
  {
    splToken: "PFo38bhqnYn9ntEs6GHN5LAi26QX1tBxMabmqu5LtX9",
    projectIcon:
      "https://raw.githubusercontent.com/parasol-finance/white-paper/main/logo.png",
    projectCover: "",
    projectName: "Parasol",
    symbol: "PSOL",
    description: "The First Community Governed IDO Platform.",
    websiteUrl: "https://parasol.finance",
    whitepaperUrl: "",
    tokenPrice: "0.21",
    hardCap: "",
    twitter: "https://twitter.com/parasol_finance",
    telegram: "",
    isFeatured: false,
    created: Timestamp.now(),
    votes: 3290,
  },
  {
    splToken: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    projectIcon:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png",
    projectCover: "",
    projectName: "Raydium",
    symbol: "RAY",
    description: "An avenue for the evolution of DeFi",
    websiteUrl: "https://raydium.io/",
    whitepaperUrl: "",
    tokenPrice: "0.05",
    hardCap: "",
    twitter: "https://twitter.com/RaydiumProtocol",
    telegram: "",
    isFeatured: false,
    created: Timestamp.now(),
    votes: 489,
  },
  {
    splToken: "SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt",
    projectIcon:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt/logo.png",
    projectCover: "",
    projectName: "Serum",
    symbol: "SRM",
    description: "Serum is a decentralized exchange (DEX)",
    websiteUrl: "https://projectserum.com",
    whitepaperUrl: "",
    tokenPrice: "0.82",
    hardCap: "",
    twitter: "https://twitter.com/projectserum",
    telegram: "",
    isFeatured: false,
    created: Timestamp.now(),
    votes: 29,
  },
];

const Seeding = () => {
  const [selectedNft, setSelectedNft] = useState<any>();
  const [participatedReceipts, setParticipatedReceipt] = useState<any>();
  const { nfts, wallet, user } = useContext(NftContext);

  useEffect(() => setSelectedNft(nfts[0]), [nfts]);

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | Projects Seeding</title>
        <meta
          name="title"
          content="Parasol Finance ($PSOL) | Projects Seeding"
        />
        <meta property="og:image" content="/assets/preview/seeding.png" />
        <meta property="twitter:image" content="/assets/preview/seeding.png" />
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
                  Projects Seeding
                </a>
                <p className="mt-5 text-sm text-gray-200 lg:text-base">
                  Vote for the new projects that have just arrived.
                </p>
              </div>
            </div>
            <div className="relative mt-5 flex items-center justify-center gap-x-2 md:justify-end">
              {selectedNft && wallet.connected && (
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
            <div className="flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-800 rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong">
                      <thead className="">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                          >
                            Project Name + Description
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold"
                          >
                            Current Votes
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold"
                          >
                            Submit Date
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold"
                          >
                            End Date
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {projects.map((project) => (
                          <tr key={project.splToken}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={project.projectIcon}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium">
                                    {project.projectName}
                                  </div>
                                  <div className="truncate text-gray-200">
                                    {project.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span className="inline-flex rounded-full bg-purple-2 px-2 text-xs font-semibold leading-5">
                                Active
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <div className="">{project.votes} votes</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <div className="mb-1 text-xs text-gray-200">
                                Project created on:
                              </div>
                              <div className="">
                                {moment(project.created.toDate()).format("LLL")}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <div className="mb-1 text-xs text-gray-200">
                                Voting ends on:
                              </div>
                              <div className="">
                                {moment(project.created.toDate())
                                  .add(5, "days")
                                  .format("LLL")}
                              </div>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <a
                                href="#"
                                className="button gap-x-1 rounded-md bg-purple-2 bg-none p-1 text-sm hover:bg-white"
                              >
                                <ChevronDoubleUpIcon className={"w-3"} />
                                Vote
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
        <Apply />
      </Layout>
    </>
  );
};

export default Seeding;

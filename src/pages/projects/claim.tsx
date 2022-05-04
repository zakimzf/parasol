import Container from "../../components/container";
import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { ChevronDownIcon, HandIcon, InformationCircleIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Layout from "../../components/layout";
import Link from "next/link";

const idos = [
  {
    id: "lol",
    name: "Secretum",
    description: "Revolutionary Secure Messaging & Trading Dapp powered by Solana."
  },
]
const TokenClaiming = () =>
  <>
    <Head>
      <title>Parasol Finance ($PSOL) | Tokens Claiming</title>
      <meta name="title" content="Parasol Finance ($PSOL) | Tokens Claiming" />
      {/*<meta property="og:image" content="/assets/preview/seeding.png" />*/}
      {/*<meta property="twitter:image" content="/assets/preview/seeding.png" />*/}
    </Head>
    <section>
      <Container>
        <div className={"grid md:grid-cols-5 pt-10 pb-16"}>
          <div className={"flex gap-x-2 items-center"} />
          <div className={"col-span-3"}>
            <div className="text-center">
              <h2 className="text-base font-semibold tracking-wider mb-3 text-purple-400 uppercase">Parasol Finance</h2>
              <a className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">Tokens Claiming</a>
              <p className="mt-5 text-sm lg:text-base text-gray-200">
                You can claim your tokens after participating in IDOs here.
              </p>
            </div>
          </div>
          <div className={"flex gap-x-2 md:justify-end items-center justify-center mt-5"}>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className={"flex gap-x-3 items-center border-2 border-purple-2 bg-purple-2 bg-opacity-5 relative rounded-lg shadow-md p-3 cursor-pointer focus:outline-none"}>
                  {/*<Menu.Button className="flex gap-x-3 items-center bg-white bg-opacity-5 hover:bg-opacity-10 p-3 rounded-lg">*/}
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img className="w-12 h-12 rounded-md" src="https://parasol.finance/assets/nft-access-keys/covers/MoonWalker.png" alt="PSOL KEY #404" />
                    </div>
                    <div className={"text-left"}>
                      <p className="text-xs">PSOL KEY #404</p>
                      <h2 className="text-lg whitespace-nowrap">MoonWalker</h2>
                    </div>
                  </div>
                  <ChevronDownIcon className={"h-5 w-5 text-purple-2"} />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="focus:outline-none absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-violet-500 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Container>
    </section>
    <Layout>
      <section>
        <Container>
          <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {idos.map((ido) => (
              <li key={ido.id} className="col-span-1 card">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium truncate">{ido.name}</h3>
                      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium bg-purple-2 rounded-full">
                        Finished
                      </span>
                    </div>
                    <p className="mt-1 text-sm truncate">{ido.description}</p>
                    <div className={"grid grid-cols-2 gap-x-3 gap-y-6 mt-3"}>
                      <div>
                        <div className="flex text-sm font-medium items-center gap-x-3">
                          <span>Purchased</span>
                          <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                          <span className={"flex gap-x-1 items-center"}>50$</span>
                        </div>
                        <div className="flex text-sm font-medium items-center gap-x-3">
                          <span>Released</span>
                          <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                          <span className={"flex gap-x-1 items-center"}>25%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex text-sm font-medium items-center gap-x-3">
                          <span>Claimed</span>
                          <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                          <span className={"flex gap-x-1 items-center"}>25$</span>
                        </div>
                        <div className="flex text-sm font-medium items-center gap-x-3">
                          <span>Claimable</span>
                          <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                          <span className={"flex gap-x-1 items-center"}>30$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={"flex border-t border-gray-800 divide-x divide-gray-800"}>
                  <button className={"flex flex-1 py-4 gap-x-2 justify-center items-center"}>
                    <HandIcon className="w-5 h-5" aria-hidden="true" />
                    <span>Claim Tokens</span>
                  </button>
                  <Link href={"/projects/x"}>
                    <a className={"flex flex-1 py-4 gap-x-2 justify-center items-center"}>
                      <InformationCircleIcon className="w-5 h-5" aria-hidden="true" />
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

export default TokenClaiming;
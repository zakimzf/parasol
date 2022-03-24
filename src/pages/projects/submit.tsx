import {Fragment, useState} from "react"
import {Listbox, Transition} from "@headlessui/react"
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid"
import Container from "../../components/container";
import Heading from "../../components/heading";

const exchanges = [
  { id: 1, name: "Raydium | One of the Biggest Solana AMM" },
]

const SubmitProject = () => {
  const [selected, setSelected] = useState(exchanges[0])
  return (
    <section>
      <Heading tagline={"Parasol Launchpad"} title={"Submit Your Project (IDO)"}
        description={"Create your presale in a few clicks by holding PSOL tokens."}/>
      <Container>
        <div className="grid grid-cols-9">
          <div className="col-span-6">
            <form className="space-y-12 pr-12 divide-y- divide-gray-400">

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                <div className="sm:col-span-6">
                  <h2 className="text-xl font-medium text-blue-gray-900">1. General Information</h2>
                  <p className="mt-1 text-sm text-blue-gray-500">
                    Please provide your SPL token address.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="email-address" className="block text-sm font-medium text-blue-gray-900">
                    Enter your Token Address
                  </label>
                  <input
                    type="text"
                    name="token-address"
                    id="token-address"
                    placeholder={"SPL Token Address"}
                    pattern={"[A-Za-z0-9]*"}
                    className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                  />
                </div>
                <p className="text-sm text-blue-gray-500 sm:col-span-6">
                  The token information will be fetched from the Solana blockchain.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">

                <div className="sm:col-span-6">
                  <label htmlFor="project-cover" className="block text-sm font-medium text-blue-gray-900">
                    Project Cover
                  </label>
                  <div
                    className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-200">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer font-medium text-purple-2 hover:text-purple-1 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-blue-gray-500">
                    We need a cover in the following format: 1920x1080px.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="project-name" className="block text-sm font-medium text-blue-gray-900">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="project-name"
                    id="project-name"
                    className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-blue-gray-900">
                    Short Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm text-blue-gray-500">
                    Brief description of your project, no HTML or Markdown accepted.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="website-url" className="block text-sm font-medium text-blue-gray-900">
                    Website URL
                  </label>
                  <input
                    type="text"
                    name="website-url"
                    id="website-url"
                    className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="white-paper" className="block text-sm font-medium text-blue-gray-900">
                    WhitePaper URL
                  </label>
                  <input
                    type="text"
                    name="white-paper"
                    id="white-paper"
                    className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                  />
                </div>
              </div>


              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                <div className="sm:col-span-6">
                  <h2 className="text-xl font-medium text-blue-gray-900">2. Token &amp; Liquidity</h2>
                  <p className="mt-1 text-sm text-blue-gray-500">
                    Calculate the amount of token for your IDO, and the liquidity.
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <Listbox value={selected} onChange={setSelected}>
                    {({open}) => (
                      <>
                        <Listbox.Label className="block text-sm font-medium text-blue-gray-900">Select your Target AMM (Dex):</Listbox.Label>
                        <div className="mt-1 relative">
                          <Listbox.Button
                            className="w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg px-3 py-2 text-left cursor-default">
                            <span className="block truncate">{selected.name}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                            </span>
                          </Listbox.Button>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                              {exchanges.map((dex) => (
                                <Listbox.Option
                                  key={dex.id}
                                  className={({active}) => `${active ? "text-white bg-indigo-600" : "text-gray-900"} cursor-default select-none relative py-2 pl-3 pr-9`}
                                  value={dex}
                                >
                                  {({selected, active}) => (
                                    <>
                                      <span
                                        className={`${selected ? "font-semibold" : "font-normal"} block truncate`}>
                                        {dex.name}
                                      </span>
                                      {selected ? (
                                        <span className={`${active ? "text-white" : "text-indigo-600"} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                          <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </div>

                <div className={"sm:col-span-3"}>
                  <label htmlFor="token-price" className="block text-sm font-medium text-blue-gray-900">
                    Token Price
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-200 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="token-price"
                      id="token-price"
                      className="block w-full pl-7 pr-12 sm:text-sm w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-200 flex items-center gap-x-1 sm:text-sm" id="price-currency">
                        <img className="w-4" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
                        USDC
                      </span>
                    </div>
                  </div>
                </div>

                <div className={"sm:col-span-3"}>
                  <label htmlFor="hard-cap" className="block text-sm font-medium text-blue-gray-900">
                    Hard Cap
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-200 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="hard-cap"
                      id="hard-cap"
                      className="block w-full pl-7 pr-12 sm:text-sm w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-200 flex items-center gap-x-1 sm:text-sm" id="price-currency">
                        <img className="w-4" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" alt="USDC" />
                        USDC
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
                <div className="sm:col-span-6">
                  <h2 className="text-xl font-medium text-blue-gray-900">3. Social Networks</h2>
                  <p className="mt-1 text-sm text-blue-gray-500">
                    Please indicate your different social networks.
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="twitter" className="block text-sm font-medium text-blue-gray-900">
                    Twitter
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    id="twitter"
                    className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="telegram" className="block text-sm font-medium text-blue-gray-900">
                    Telegram
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    id="telegram"
                    className="mt-1 block w-full bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2"
                  />
                </div>
              </div>

            </form>
          </div>
          <div className="col-span-3">
            <div className="sticky flex flex-col gap-y-6 top-20">
              <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
                <div className={"relative px-6 pt-6 pb-6"}>
                  <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                    [Project Name]
                  </h2>
                  <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
                    <img className="h-8"
                      src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                      alt="USDC"/>
                    <div className="flex items-end gap-x-2 text-4xl font-bold">
                      500,000
                      <span>USDC</span>
                    </div>
                  </div>
                  <div className="prose prose-lg prose-invert">
                    <p>[Project Description]</p>
                  </div>
                  <div className="flex-col space-y-3 mt-6">
                    <div className="flex font-medium items-center text-gray-300 gap-x-3">
                      <span>Hard Cap</span>
                      <span className="flex-1 h-1 border-b border-dashed border-gray-400"/>
                      <span>$500,000</span>
                    </div>
                    <div className="flex font-medium items-center text-gray-300 gap-x-3">
                      <span>Price per Token</span>
                      <span className="flex-1 h-1 border-b border-dashed border-gray-400"/>
                      <span>$0.21</span>
                    </div>
                  </div>
                  <button
                    className={"w-full mt-8 opacity-80-cursor-default bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}>
                    Submit My Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SubmitProject
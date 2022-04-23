import Container from "../../../components/container";
import Card from "../../../components/card";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { NftContext } from "../../../context/NftContext";
import { useWallet } from "@solana/wallet-adapter-react";
import { RadioGroup } from "@headlessui/react"

import { useRouter } from "next/router";
import { NftStore, Project } from "parasol-finance-sdk";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import NumberFormat from "react-number-format";
import { BadgeCheckIcon, CheckIcon, GlobeAltIcon } from "@heroicons/react/outline";
import Layout from "../../../components/layout";
import { ClockIcon, FireIcon } from "@heroicons/react/solid";

const ProjectParticipate = () => {
  const { provider, config } = useContext(NftContext);
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const router = useRouter();
  const [cover, setCover] = useState("");
  const [selected, setSelected] = useState<any>();

  const { projectPubKey }:any = router.query;

  const [ido, setIdo] = useState<any>(null);

  const { nfts, setNfts, user, wallet } = React.useContext(NftContext);

  useEffect(() => setSelected(nfts[0]), [nfts]);

  useEffect(() => {
    if (!wallet.connected) return;
    if (user) {
      getNFTList();
    }
  }, [wallet.connected, user]);

  const getNFTList = async () => {
    const nftsmetadata = await user.getNFTList();
    setNfts(nftsmetadata);
  };

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const nftStore = await new NftStore(provider, config).build();
      const project = await new Project(provider, nftStore, new PublicKey(projectPubKey)).build();
      const data = await project.data()

      setCover(data.cover)
      if (data) {
        if (data.splToken) {
          const requestOne = await axios.get(`https://public-api.solscan.io/token/meta?tokenAddress=${data.splToken}`);
          const requestTwo = await axios.get(`https://public-api.solscan.io/market/token/${data.splToken}`);
          axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            setIdo({ ...data, ...responseOne.data, ...responseTwo.data });
          })).catch(errors => {
            // react on errors.
          })
        }
        else setIdo(data);
      }
      else await router.push("/404");
    };
    if (projectPubKey) getDataByTokenAddress();
  }, [projectPubKey]);

  return (
    <section className={"py-12"}>
      <Container>
        <div className={"px-0"}>
          {ido && (
            <Layout short={true}>
              <div className="grid md:grid-cols-8">
                <div className="md:col-span-5 pt-6 md:pr-16">
                  <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                    <span className={"text-purple-2"}>{ido.name}</span> Presale
                  </h1>
                  <p className="mt-6 prose prose-lg prose-invert line-clamp-5">
                    {ido.description}
                  </p>
                  <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Token Sale Details</p>
                  <div className="flex gap-x-12 lg:flex-row my-3">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img alt="FOXY" className="w-10" src="https://raw.githubusercontent.com/sol-farm/token-logos/main/tuTULIP.png" />
                      </div>
                      <div>
                        <p className="text-sm">Token Symbol</p>
                        <h4 className="text-xl whitespace-nowrap">SCRM</h4>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img alt="USDC" className="w-10" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" />
                      </div>
                      <div>
                        <p className="text-sm">Token Price</p>
                        <h4 className="text-xl whitespace-nowrap">
                          <NumberFormat
                            value={ido.salePrice}
                            displayType={"text"}
                            thousandSeparator={true}
                          /> USDC
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img alt="USDC" className="w-10" src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png" />
                      </div>
                      <div>
                        <p className="text-sm">Hard Cap</p>
                        <h4 className="text-xl whitespace-nowrap">
                          <NumberFormat
                            value={ido.hardCap}
                            displayType={"text"}
                            thousandSeparator={true}
                          /> USDC
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className={"flex gap-x-6 mt-12"}>
                    {ido.twitter && (
                      <a href={ido.twitter} target={"_blank"} rel={"noreferrer"} className={"flex items-center gap-x-2 text-sm"}>
                        <GlobeAltIcon className={"w-5 text-gray-300"} />
                        Website
                      </a>
                    )}
                    {ido.websiteUrl && (
                      <a href={ido.websiteUrl} target={"_blank"} rel={"noreferrer"} className={"flex items-center gap-x-2 text-sm"}>
                        <svg className={"w-5 text-gray-300"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" fill={"currentColor"}/></svg>
                        Twitter
                      </a>
                    )}
                    <div className={"flex items-center gap-x-2 text-sm"}>
                      <ClockIcon className={"w-5 text-gray-300"} />
                      Start At: {ido.startTime.toDateString()}
                    </div>
                    <div className={"flex items-center gap-x-2 text-sm"}>
                      <ClockIcon className={"w-5 text-gray-300"} />
                      End At: {ido.endTime.toDateString()}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Card padded={true}>
                    <div className="p-2">
                      <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                        {ido.name}
                        {ido.isFeatured && (
                          <BadgeCheckIcon className={"h-7 text-purple-2"} />
                        )}
                      </h2>
                      {/*<div className="flex text-white gap-x-3 mt-3 mb-6 items-center">*/}
                      {/*  <img*/}
                      {/*    className="h-8"*/}
                      {/*    src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"*/}
                      {/*    alt="USDC"*/}
                      {/*  />*/}
                      {/*  <div className="flex items-end gap-x-2 text-4xl font-bold">*/}
                      {/*    <NumberFormat*/}
                      {/*      value={ido.hardCap}*/}
                      {/*      displayType={"text"}*/}
                      {/*      thousandSeparator={true}*/}
                      {/*    />*/}
                      {/*    <span>USDC</span>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                      <div className="text-lg text-gray-300 line-clamp-2 mt-5 font-medium">
                        <p>{ido.description}</p>
                      </div>
                      {/*<div className="prose prose-lg prose-invert">*/}
                      {/*  <p>{ido.description}</p>*/}
                      {/*</div>*/}
                      {/*{nfts.length}*/}
                      {/*{nfts.map((nft: any, index: any) => (*/}
                      {/*  <p key={nft.name}>{nft.name}</p>*/}
                      {/*))}*/}
                      <RadioGroup className={"mt-6"} value={selected} onChange={setSelected}>
                        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                        <div className="space-y-2">
                          {nfts.map((nft: any) => (
                            <RadioGroup.Option
                              key={nft.name}
                              value={nft}
                              className={({ active, checked }) => `${active ? "ring-2-ring-offset-2 ring-offset-purple-1 ring-purple-1 ring-opacity-60" : ""} ${checked ? "border-2 border-purple-2 bg-purple-2 bg-opacity-5" : "border-2 border-transparent bg-white bg-opacity-5"} relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`}>
                              {({ active, checked }) => (
                                <>
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                      <div className="text-sm">
                                        <RadioGroup.Label
                                          as="p"
                                          className={`font-medium ${checked ? "text-white" : ""}`}>
                                          <div className="flex items-center">
                                            <div className="mr-4">
                                              <img className={"w-12 h-12 rounded-md"} src={nft.image} alt={nft.name} />
                                              {/*<pre>{JSON.stringify(nft, null, 4)}</pre>*/}
                                            </div>
                                            <div>
                                              <p className="text-sm">{nft.name}</p>
                                              <h4 className="text-xl whitespace-nowrap">
                                                {nft.attributes[0].value}
                                              </h4>
                                            </div>
                                          </div>
                                        </RadioGroup.Label>
                                        {/*<RadioGroup.Description*/}
                                        {/*  as="span"*/}
                                        {/*  className={"inline"}>*/}
                                        {/*  DS*/}
                                        {/*</RadioGroup.Description>*/}
                                      </div>
                                    </div>
                                    {checked && (
                                      <div className="flex-shrink-0 text-purple-2">
                                        <CheckIcon className="w-6 h-6" />
                                      </div>
                                    )}
                                  </div>
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                      <button className={"w-full mt-8 button"}>
                        <FireIcon className={"w-6 h-6"} />
                        Participate Now
                      </button>
                    </div>
                  </Card>
                </div>
              </div>
              <div>
                {/*<pre>{JSON.stringify(ido, null, 4)}</pre>*/}
                {/*<Tab.Group>*/}
                {/*  <Tab.List className={"mb-3"}>*/}
                {/*    <div className="border-b border-gray-500">*/}
                {/*      <nav className="-mb-px flex space-x-8" aria-label="Tabs">*/}
                {/*        <Tab as={Fragment}>*/}
                {/*          {({ selected }) => (*/}
                {/*            <a*/}
                {/*              href={"#details"}*/}
                {/*              className={`${selected ? "border-purple-2 text-purple-2" : "border-transparent hover:text-purple-2 hover:border-purple-2"} whitespace-nowrap pt-2 pb-3 px-1 border-b-2 font-medium text-sm"`}*/}
                {/*              aria-current={selected ? "page" : undefined}>*/}
                {/*              Project Details*/}
                {/*            </a>*/}
                {/*          )}*/}
                {/*        </Tab>*/}
                {/*        <Tab as={Fragment}>*/}
                {/*          {({ selected }) => (*/}
                {/*            <a*/}
                {/*              href={"#details"}*/}
                {/*              className={`${selected ? "border-purple-2 text-purple-2" : "border-transparent hover:text-purple-2 hover:border-purple-2"} whitespace-nowrap pt-2 pb-3 px-1 border-b-2 font-medium text-sm"`}*/}
                {/*              aria-current={selected ? "page" : undefined}>*/}
                {/*              Token Details*/}
                {/*            </a>*/}
                {/*          )}*/}
                {/*        </Tab>*/}
                {/*        <Tab as={Fragment}>*/}
                {/*          {({ selected }) => (*/}
                {/*            <a*/}
                {/*              href={"#details"}*/}
                {/*              className={`${selected ? "border-purple-2 text-purple-2" : "border-transparent hover:text-purple-2 hover:border-purple-2"} whitespace-nowrap pt-2 pb-3 px-1 border-b-2 font-medium text-sm"`}*/}
                {/*              aria-current={selected ? "page" : undefined}>*/}
                {/*              White Paper*/}
                {/*            </a>*/}
                {/*          )}*/}
                {/*        </Tab>*/}
                {/*      </nav>*/}
                {/*    </div>*/}
                {/*  </Tab.List>*/}
                {/*  <Tab.Panels>*/}
                {/*    <Tab.Panel>*/}
                {/*      <div className={"prose prose-lg prose-invert py-6"}>*/}
                {/*        <h2>Lorem ipsum dolor sit amet</h2>*/}
                {/*        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
                {/*        <h2>Lorem ipsum dolor sit amet</h2>*/}
                {/*        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>*/}
                {/*      </div>*/}
                {/*    </Tab.Panel>*/}
                {/*  </Tab.Panels>*/}
                {/*</Tab.Group>*/}
              </div>
            </Layout>
          )}
        </div>
      </Container>
    </section>
  )
}

export default ProjectParticipate;
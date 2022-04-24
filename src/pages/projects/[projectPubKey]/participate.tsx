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
import { ArrowLeftIcon, BellIcon, CheckIcon, ChevronRightIcon, GlobeAltIcon } from "@heroicons/react/outline";
import Layout from "../../../components/layout";
import { BadgeCheckIcon, ClockIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { useReminderModal } from "../../../components/reminder-modal/useReminderModal";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SRLWrapper } from "simple-react-lightbox";
import { ScrollPercentage } from "react-scroll-percentage";
import NProgress from "nprogress";
import { slugify } from "../../../utils/functions";

const EditorJs = dynamic(() => import("../../../components/editorjs"), {
  ssr: false,
});

const USDC_logo = require("../../../../public/assets/logos/usdc-logo.svg");

const ProjectParticipate = ({ setBackgroundCover }: any) => {
  const { provider, config } = useContext(NftContext);
  const { publicKey } = useWallet();
  const { setReminder, setProjectKey } = useReminderModal();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const router = useRouter();
  const [cover, setCover] = useState("");
  const [selected, setSelected] = useState<any>();

  const { projectPubKey }: any = router.query;

  const [ido, setIdo] = useState<any>(null);

  const { nfts, setNfts, user, wallet } = React.useContext(NftContext);

  useEffect(() => setSelected(nfts[0]), [nfts]);

  React.useEffect(() => {
    NProgress.configure({ showSpinner: false, trickle: false });
  }, []);

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
      try {
        const project = await new Project(provider, nftStore, new PublicKey(projectPubKey)).build();
        const data = await project.data();
        setCover(data.cover)
        setBackgroundCover(data.cover)
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
      }
      catch {
        await router.push("/404");
      }
    };
    if (projectPubKey) getDataByTokenAddress();
  }, [projectPubKey]);

  return (
    <section className={"relative overflow-hidden py-12"}>
      {ido && (
        <>
          {ido.startTime >= Date.now() && (
            <div className={"absolute flex flex-col items-center pt-52 pb-12 inset-0 filter backdrop-blur-md z-10"}>
              <h1 className={"text-4xl mb-3 font-bold"}>Scheduled IDO</h1>
              <p className={"text-lg mb-6 font-medium"}>This IDO is not yet launched, come back later.</p>
              <button
                onClick={() => {
                  setReminder(true);
                  setProjectKey("lol");
                }}
                className="button py-3 text-base whitespace-nowrap">
                <BellIcon className={"w-5 h-5"}/>
                Set a Reminder
              </button>
            </div>
          )}
          <Container>
            <div className={"px-0"}>
              <Layout short={true}>
                <div className="grid md:grid-cols-8">
                  <div className="md:col-span-5 pt-12 md:pr-16">
                    <Link href={`/projects/${projectPubKey}`}>
                      <a className="inline-flex gap-x-2 items-center rounded-lg text-gray-300">
                        <ArrowLeftIcon className={"w-4"} />
                        Back to Project
                      </a>
                    </Link>
                    <h1 className="flex gap-x-3 text-4xl tracking-tight font-extrabold text-white mt-5 sm:leading-none lg:text-5xl xl:text-6xl">
                      <span className={"text-purple-2"}>{ido.name}</span>
                      <span>Presale</span>
                      {ido.isFeatured && (
                        <BadgeCheckIcon className={"w-8 h-8 text-purple-2"}/>
                      )}
                    </h1>
                    <p className="mt-6 prose prose-lg prose-invert line-clamp-5">
                      {ido.description}
                    </p>
                    <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">Token Sale Details</p>
                    <div className="flex gap-x-12 lg:flex-row my-3">
                      <div className="flex items-center">
                        <div className="mr-4">
                          <img alt="FOXY" className="w-10" src="https://raw.githubusercontent.com/sol-farm/token-logos/main/tuTULIP.png"/>
                        </div>
                        <div>
                          <p className="text-sm">Token Symbol</p>
                          <h4 className="text-xl whitespace-nowrap">SCRM</h4>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <img className={"w-10 h-10"} src={"/assets/logos/usdc-logo.svg"} alt={"USDC"}/>
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
                          <img className={"w-10 h-10"} src={"/assets/logos/usdc-logo.svg"} alt={"USDC"}/>
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
                    <div className={"flex gap-x-10 mt-12"}>
                      {ido.twitter && (
                        <a href={ido.twitter} target={"_blank"} rel={"noreferrer"} className={"flex items-center gap-x-2 text-sm"}>
                          <GlobeAltIcon className={"w-5 text-gray-300"}/>
                          Website
                        </a>
                      )}
                      {ido.websiteUrl && (
                        <a href={ido.websiteUrl} target={"_blank"} rel={"noreferrer"} className={"flex items-center gap-x-2 text-sm"}>
                          <svg className={"w-5 text-gray-300"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" fill={"currentColor"}/>
                          </svg>
                          Twitter
                        </a>
                      )}
                      <div className={"flex items-center gap-x-2 text-sm"}>
                        <ClockIcon className={"w-5 text-gray-300"}/>
                        Start At: {ido.startTime.toDateString()}
                      </div>
                      <div className={"flex items-center gap-x-2 text-sm"}>
                        <ClockIcon className={"w-5 text-gray-300"}/>
                        End At: {ido.endTime.toDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <Card padded={true}>
                      <div className="p-2">
                        <h2 className="flex gap-x-2 items-center text-3xl font-bold">
                         Participate Now!
                        </h2>
                        <p className="text-lg text-gray-300 line-clamp-2 mt-5 font-medium">
                          To participate in the IDO, please enter your desired amount and choose your NFT.
                        </p>
                        <p className={"mt-3 text-purple-2 font-medium"}>
                          Your IDO&apos;s allocation is $50.
                        </p>
                        <div className={"mt-6"}>
                          <label htmlFor="account-number" className="block text-sm font-medium">
                            Participation Amount
                          </label>
                          <div className="mt-2 relative rounded-md shadow-sm">
                            <input
                              type="text"
                              name="price"
                              id="price"
                              className="w-full p-3 block placeholder:text-gray-300 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg sm:text-sm focus:ring-purple-2 focus:border-purple-2 pr-12"
                              placeholder="0.00"
                              aria-describedby="price-currency"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                              <span className="flex gap-x-1 items-center text-gray-300 sm:text-sm" id="price-currency">
                                <img className={"w-4 h-4"} src={"/assets/logos/usdc-logo.svg"} alt={"USDC"}/>
                                USDC
                              </span>
                            </div>
                          </div>
                        </div>
                        <RadioGroup className={"mt-6"} value={selected} onChange={setSelected}>
                          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                          <div className="space-y-2">
                            {nfts.map((nft: any) => (
                              <RadioGroup.Option
                                key={nft.name}
                                value={nft}
                                className={({
                                  active,
                                  checked
                                }) => `${active ? "ring-2-ring-offset-2 ring-offset-purple-1 ring-purple-1 ring-opacity-60" : ""} ${checked ? "border-2 border-purple-2 bg-purple-2 bg-opacity-5" : "border-2 border-transparent bg-white bg-opacity-5"} relative rounded-lg shadow-md p-3 cursor-pointer flex focus:outline-none`}>
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
                                                <img className={"w-12 h-12 rounded-md"} src={nft.image} alt={nft.name}/>
                                              </div>
                                              <div>
                                                <p className="text-xs">{nft.name}</p>
                                                <h2 className="text-lg whitespace-nowrap">
                                                  {nft.attributes[0].value}
                                                </h2>
                                              </div>
                                            </div>
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                      {checked && (
                                        <div className="flex-shrink-0 text-purple-2">
                                          <CheckIcon className="w-6 h-6"/>
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
                          <PaperAirplaneIcon className={"w-6 h-6"}/>
                          Participate Now
                        </button>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className={"flex gap-x-12"}>
                  <div className={"w-48"}>
                    <ul role="list" className="pt-4 divide-y-divide-gray-200-divide-opacity-10">
                      {JSON.parse(ido.content).blocks.map((block: any) => {
                        if (block.type === "header" && block.data.level == 2) {
                          return (
                            <li
                              key={block.id}
                              className="relative py-2">
                              <a href={`#${slugify(block.data.text)}`} className="block focus:outline-none">
                                <p className={`${block.data.level > 2 ? "pl-3-" : ""} flex items-center gap-x-1 text-sm font-medium text-gray-300 hover:text-gray-200  hover:translate-x-3 duration-300`}>
                                  <ChevronRightIcon className={"w-3 h-3"} />
                                  <span className={"flex-1 truncate"}>{block.data.text}</span>
                                </p>
                              </a>
                            </li>
                          )
                        }
                      })}
                    </ul>
                  </div>
                  <div className={"flex-1"}>
                    <ScrollPercentage
                      as="div"
                      onChange={(percentage) => NProgress.set(percentage)}>
                      <div className={"prose prose-lg prose-invert max-w-full"}>
                        <SRLWrapper>
                          <EditorJs projectPubKey={projectPubKey} content={ido.content || "{}"}/>
                        </SRLWrapper>
                      </div>
                    </ScrollPercentage>
                  </div>
                </div>
              </Layout>
            </div>
          </Container>
        </>
      )}
    </section>
  )
}

export default ProjectParticipate;
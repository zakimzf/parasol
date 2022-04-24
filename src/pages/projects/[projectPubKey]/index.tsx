import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "../../../components/wallet-connector";
import Head from "next/head";
import Container from "../../../components/container";
import Link from "next/link";
import { BadgeCheckIcon, BellIcon, CloudUploadIcon, PencilAltIcon } from "@heroicons/react/outline";
import { SRLWrapper } from "simple-react-lightbox";
import { Tab } from "@headlessui/react";
import { ExternalLinkIcon, FireIcon } from "@heroicons/react/solid";
import NumberFormat from "react-number-format";
import Disqus from "disqus-react";
import Countdown from "react-countdown";
import { useDropzone } from "react-dropzone";
import { getBase64 } from "../../../utils/functions";
import { NftStore, Project } from "parasol-finance-sdk";
import { NftContext } from "../../../context/NftContext";
import { PublicKey } from "@solana/web3.js";
import { useReminderModal } from "../../../components/reminder-modal/useReminderModal";

const EditorJs = dynamic(() => import("../../../components/editorjs"), {
  ssr: false,
});

const ProjectDetails = () => {
  const { setReminder } = useReminderModal();
  const [loading, setLoading] = useState(false);
  const { provider, config } = useContext(NftContext);
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const router = useRouter();
  const walletModal = useWalletModal();
  const [cover, setCover] = useState("");
  const [tempCover, setTempCover] = useState("")
  const [coverFile, setCoverFile] = useState("")

  const { projectPubKey }:any = router.query;

  const [ido, setIdo] = useState<any>(null);

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const nftStore = await new NftStore(provider, config).build();
      try {
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
      }
      catch {
        await router.push("/404");
      }
    };
    if (projectPubKey) getDataByTokenAddress();
  }, [projectPubKey]);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (!completed) {
      return (
        <div className={"flex justify-center items-end text-4xl gap-x-1 font-bold"}>
          <span>{days}</span>
          <span className={"pr-2"}>days</span>
          <span>{hours}</span>
          <span>:</span>
          <span>{minutes}</span>
          <span>:</span>
          <span>{seconds}</span>
        </div>
      );
    }
  };

  const onDrop = useCallback(async (file: any) => {
    setCoverFile(file[0]);
    setTempCover(await getBase64(file[0]))
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL)</title>
        {/*<meta property="og:image" content={`/api/projects/${projectPubKey}?cover`} />*/}
        {/*<meta property="twitter:image" content={`/api/projects/${projectPubKey}?cover`} />*/}
        <meta property="og:image" content="/assets/preview/projects.png" />
        <meta property="twitter:image" content="/assets/preview/projects.png" />
      </Head>
      {ido &&
        <>
          <section className="pt-6">
            <Container>
              <div className="grid md:grid-cols-9">
                <div className="md:col-span-6 md:pr-16">
                  <div className="flex mb-6 gap-x-5">
                    {ido.icon && (
                      <img
                        className="rounded-full h-16 p-1 m-0"
                        src={ido.icon}
                        alt={ido.name}
                      />
                    )}
                    <div className={"w-1/2"}>
                      <a id="features" className="pb-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                        {ido.name}
                      </a>
                      <p className="truncate max-w-prose text-sm lg:text-base text-gray-200">
                        {ido.description}
                      </p>
                    </div>
                    {walletAddress && walletAddress == ido.creator &&
                      (
                        <div className={"flex ml-auto justify-items-end items-center"}>
                          <Link href={`/projects/${projectPubKey}/edit`}>
                            <a
                              type="button"
                              className="inline-flex items-center gap-x-1 px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-white bg-opacity-30 text-purple-2 hover:bg-purple-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-2">
                              <PencilAltIcon className={"w-4"} />
                              Edit IDO
                            </a>
                          </Link>
                        </div>
                      )
                    }
                  </div>
                  {walletAddress && walletAddress == ido.creator &&
                    <>
                      <div className={"relative"}>
                        <img src={tempCover || ido.cover} className={"mb-6 rounded-lg"} alt={ido.name} />
                        <div className={"flex justify-center items-center absolute duration-300 scale-105 cursor-pointer filter backdrop-blur-sm top-0 w-full h-full"} {...getRootProps()}>
                          {isDragActive ? <p className="pl-1">Drop the file here ...</p> : <CloudUploadIcon className={"w-32 text-white "} />}
                        </div>
                        <input {...getInputProps()} disabled={true} id="file-upload" name="projectCover" type="file" className="sr-only" />
                      </div>
                    </>
                  }
                  <SRLWrapper>

                    {(!walletAddress || walletAddress != ido.creator) && <img src={ido.cover} className={"mb-6 rounded-lg cursor-pointer ease transition-transform duration-300 hover:scale-105"} alt={ido.name} />}

                    <Tab.Group>
                      <Tab.List className={"mb-3"}>
                        <div className="border-b border-gray-500">
                          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <Tab as={Fragment}>
                              {({ selected }) => (
                                <a
                                  href={"#details"}
                                  className={`${selected ? "border-purple-2 text-purple-2" : "border-transparent hover:text-purple-2 hover:border-purple-2"} whitespace-nowrap pt-2 pb-3 px-1 border-b-2 font-medium text-sm"`}
                                  aria-current={selected ? "page" : undefined}>
                                  Project Details
                                </a>
                              )}
                            </Tab>
                            <Tab as={Fragment}>
                              {({ selected }) => (
                                <a
                                  href={"#token"}
                                  className={`${selected ? "border-purple-2 text-purple-2" : "border-transparent hover:text-purple-2 hover:border-purple-2"} whitespace-nowrap pt-2 pb-3 px-1 border-b-2 font-medium text-sm"`}
                                  aria-current={selected ? "page" : undefined}>
                                  Token Details
                                </a>
                              )}
                            </Tab>
                            {ido.whitepaperUrl && (
                              <Tab as={Fragment}>
                                {({ selected }) => (
                                  <a
                                    href={"#wp"}
                                    className={`${selected ? "border-purple-2 text-purple-2" : "border-transparent hover:text-purple-2 hover:border-purple-2"} flex items-center gap-x-1 whitespace-nowrap pt-2 pb-3 px-1 border-b-2 font-medium text-sm"`}
                                    aria-current={selected ? "page" : undefined}>
                                    White Paper
                                  </a>
                                )}
                              </Tab>
                            )}
                            {ido.websiteUrl && <a
                              href={ido.websiteUrl}
                              target={"_blank"}
                              className={"flex items-center gap-x-1 !ml-auto text-white px-3 pt-2 pb-3 font-medium text-sm"} rel="noreferrer">
                              <ExternalLinkIcon className={"w-5"} />
                              Visit Website
                            </a>}
                          </nav>
                        </div>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel>
                          <div className={"prose markdown prose-lg prose-invert"}>
                            {walletAddress && walletAddress == ido.creator || ido.content ? (
                              <EditorJs
                                content={ido.content || "{}"}
                                isOwner={walletAddress && walletAddress == ido.creator || false}
                                projectPubKey={projectPubKey}
                                coverFile={coverFile}
                                isCoverUpdated={tempCover != ""}
                                oldCover={ido.cover}
                                loading={loading}
                                setLoading={setLoading}
                              />
                            ) : (
                              <p>This IDO has no content at the moment.</p>
                            )}
                          </div>
                        </Tab.Panel>
                        <Tab.Panel className={"pt-6"}>
                          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 -rounded-md">
                            <table className="min-w-full divide-y divide-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg">
                              <tbody className="divide-y divide-gray-800">
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Token Address</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">{ido.tokenMint}</td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Token Name</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">{ido.name}</td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Symbol</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">{ido.symbol}</td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Decimals</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">{ido.tokenDecimals}</td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Price (in USDT)</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <NumberFormat value={ido.salePrice} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Market Cap (in USDT)</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <NumberFormat value={ido.marketCapFD} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Volume 24h (in USDT)</td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <NumberFormat value={ido.volumeUsdt} displayType={"text"} thousandSeparator={true} prefix={"$"} />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </Tab.Panel>
                        {ido.whitepaperUrl && (
                          <Tab.Panel className={"pt-6"}>
                            <iframe src={ido.whitepaperUrl + "#toolbar=0&navpanes=0"} className={"w-full my-3 min-h-screen border-none"} />
                          </Tab.Panel>
                        )}
                      </Tab.Panels>
                    </Tab.Group>
                  </SRLWrapper>
                  <div className={"mt-12"}>
                    <Disqus.DiscussionEmbed
                      shortname={"parasol-finance"}
                      config={{
                        url: window.location.href,
                        identifier: ido.tokenAddress,
                        title: ido.name
                      }}
                    />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="sticky flex flex-col gap-y-6 top-20">
                    <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
                      <div className={"relative p-6"}>
                        <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                          {ido.name}
                          {ido.isFeatured && (
                            <BadgeCheckIcon className={"h-7 text-purple-2"} />
                          )}
                        </h2>
                        <div className="flex text-white gap-x-3 mt-3 mb-6 items-center">
                          <img
                            className="h-8"
                            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                            alt="USDC"
                          />
                          <div className="flex items-end gap-x-2 text-4xl font-bold">
                            <NumberFormat
                              value={ido.hardCap}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                            <span>USDC</span>
                          </div>
                        </div>
                        <div className="prose prose-lg prose-invert">
                          <p>{ido.description}</p>
                        </div>
                        <div className="flex-col space-y-3 mt-6 mb-8">
                          <div className="flex font-medium items-center text-gray-300 gap-x-3">
                            <span>Hard Cap</span>
                            <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                            <span>
                              <NumberFormat
                                value={ido.hardCap}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </span>
                          </div>
                          <div className="flex font-medium items-center text-gray-300 gap-x-3">
                            <span>Price per Token</span>
                            <span className="flex-1 h-1 border-b border-dashed border-gray-400" />
                            <span>
                              <NumberFormat
                                value={ido.salePrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                            </span>
                          </div>
                        </div>
                        {walletAddress ? walletAddress == ido.creator ? (
                          <button className={"w-full button mt-8"} id="saveEditor" disabled={loading}>
                            {loading ? "Saving..." : "Save Changes"}
                          </button>
                        ) : (
                          <>
                            {ido.startTime >= Date.now() ? (
                              <button
                                onClick={() => setReminder(true)}
                                className="w-full button">
                                <BellIcon className={"w-5 h-5"} />
                                Set a Reminder
                              </button>
                            ) : (
                              <>
                                <Link href={`/projects/${projectPubKey}/participate`} passHref>
                                  <button className="w-full button">
                                    <FireIcon className={"w-6"} />
                                    Participate to Sale
                                  </button>
                                </Link>
                                {ido.endTime >= Date.now() && (
                                  <p className={"text-sm text-center mt-3 mb-1 text-gray-300"}>
                                    Sale close in <Countdown date={ido.endTime} />
                                  </p>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <button
                            className={"w-full flex items-center justify-center gap-x-2 mt-8 opacity-80-cursor-default bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}
                            type="button"
                            onClick={() => walletAddress ?? walletModal.setVisible(true)}>
                            Connect Wallet
                          </button>
                        )}
                      </div>
                    </div>
                    {ido.startTime >= Date.now() && (
                      <div className={"flex flex-col justify-center items-center"}>
                        <p className={"text-sm mb-1 text-gray-300"}>The Sale of {ido.name} Ends In:</p>
                        <Countdown
                          renderer={countdownRenderer}
                          intervalDelay={0}
                          precision={3}
                          date={ido.startTime} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </>
      }
    </>
  );
};

export default ProjectDetails;

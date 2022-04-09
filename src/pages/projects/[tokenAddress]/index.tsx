import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { Tab } from "@headlessui/react"
import Container from "../../../components/container";
import axios from "axios";
import Link from "next/link";
import NumberFormat from "react-number-format";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { ExternalLinkIcon, FireIcon } from "@heroicons/react/solid";
import Disqus from "disqus-react";

const EditorJs = dynamic(() => import("../../../components/editorjs"), {
  ssr: false,
});

const ProjectDetails = () => {
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const router = useRouter();

  const { tokenAddress } = router.query;

  const [ido, setIdo] = useState<any>(null);

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const { data }: any = await axios.get(`/api/projects/${tokenAddress}`);
      if (data) setIdo(data);
      else await router.push("/404");
    };
    if (tokenAddress) getDataByTokenAddress();
  }, [tokenAddress]);

  return (
    <section className="pt-6">
      {ido ? (
        <Container>
          <div className="grid grid-cols-9">
            <div className="col-span-6 pr-16">
              <div className="flex gap-x-5">
                <img
                  className="rounded-full h-16 p-1 m-0"
                  src={ido.projectIcon}
                  alt={ido.projectName}
                />
                <div className={"mb-6"}>
                  <a id="features" className="pb-3 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">{ido.projectName}</a>
                  <p className=" max-w-prose mx-auto text-sm lg:text-base text-gray-200">
                    We bring new technologies to our community.
                  </p>
                </div>
              </div>
              <img src={ido.projectCover} className={"mb-6 rounded-lg cursor-pointer ease transition-transform duration-300 -hover:scale-105"} alt={ido.name}/>
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
                      {ido.websiteUrl && <a
                        href={ido.websiteUrl}
                        target={"_blank"}
                        className={"flex items-center gap-x-1 !ml-auto text-white px-3 pt-2 pb-3 font-medium text-sm"} rel="noreferrer">
                        <ExternalLinkIcon className={"w-5"}/>
                        Visit Website
                      </a>}
                    </nav>
                  </div>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <div className={"prose markdown prose-lg prose-invert"}>
                      <EditorJs
                        content={ido.content || "{}"}
                        isOwner={walletAddress && walletAddress == ido.publicKey || false}
                        tokenAddress={tokenAddress}
                      />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 -rounded-md">
                      <table className="min-w-full divide-y divide-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong border border-gray-800 rounded-lg">
                        <tbody className="divide-y divide-gray-800">
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Token Address</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">{tokenAddress}</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Token Name</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">{ido.projectName}</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Symbol</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">N/a</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Decimals</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">7</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Price (in USDT)</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">N/a</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Market Cap (in USDT)</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">N/a</td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">Volume 24h (in USDT)</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">N/a</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <iframe src={ido.whitepaperUrl + "#toolbar=0&navpanes=0"} className={"w-full my-3 min-h-screen border-none"}/>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className={"mt-12"}>
                <Disqus.DiscussionEmbed
                  shortname={"parasol-finance"}
                  config={{
                    url: window.location.href,
                    identifier: ido.tokenAddress,
                    title: ido.projectName
                  }}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="sticky flex flex-col gap-y-6 top-20">
                <div className="relative bg-[#231f38] bg-opacity-50 shadow-half-strong border border-gray-800 rounded-lg">
                  <div className={"relative px-6 pt-6 pb-6"}>
                    <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                      {ido.projectName}
                      {ido.isFeatured && (
                        <BadgeCheckIcon className={"h-7 text-purple-2"}/>
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
                    <div className="flex-col space-y-3 mt-6">
                      <div className="flex font-medium items-center text-gray-300 gap-x-3">
                        <span>Hard Cap</span>
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400"/>
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
                        <span className="flex-1 h-1 border-b border-dashed border-gray-400"/>
                        <span>
                          <NumberFormat
                            value={ido.tokenPrice}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </div>
                    </div>
                    <Link href={`/projects/${tokenAddress}/participate`}>
                      <a className={"w-full flex items-center justify-center gap-x-2 mt-8 bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium rounded-lg"}>
                        <FireIcon className={"w-6"}/>
                        Participate to Sale
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        ""
      )}
    </section>
  );
};

export default ProjectDetails;

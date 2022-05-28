import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import axios from "axios";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NftStore, Project } from "parasol-finance-sdk";
import NumberFormat from "react-number-format";
import { SRLWrapper } from "simple-react-lightbox";
import { ScrollPercentage } from "react-scroll-percentage";
import NProgress from "nprogress";

import { RadioGroup } from "@headlessui/react";
import { BadgeCheckIcon, ClockIcon } from "@heroicons/react/solid";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  HandIcon,
} from "@heroicons/react/outline";

import { Loading } from "components";

import Card from "components/card";
import Container from "components/container";
import Layout from "components/layout";
import { useReminderModal } from "components/reminder-modal/useReminderModal";
import {
  isToday,
  notification,
  slugify,
  globalErrorHandle,
} from "utils/functions";
import { useWalletModal } from "components/wallet-connector";
import { NftContext } from "context/NftContext";

const EditorJs = dynamic(() => import("components/editorjs"), {
  ssr: false,
});

import USDC_logo from "assets/logos/usdc-logo.svg";

const nftAllocation: any = {
  Dreamer: 210,
  Rider: 2100,
  Chiller: 21000,
  MoonWalker: 210000,
};

const ProjectParticipate = ({ setBackgroundCover }: any) => {
  const { provider, config, helper, nftKinds } = useContext(NftContext);
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const { setReminder, setProjectKey } = useReminderModal();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const walletModal = useWalletModal();
  const router = useRouter();
  const [cover, setCover] = useState("");
  const [nftMint, setNftMint] = useState<any>();

  const { projectPubKey }: any = router.query;

  const [ido, setIdo] = useState<any>(null);

  const { nfts, setNfts, user, wallet } = React.useContext(NftContext);
  const [project, setProject] = useState<any>(null);
  const [amount, setAmount] = useState<any>();
  const [allocation, setallocation] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allocationDetails, setAllocationDetails] = useState(false);
  const [participatedAmount, setParticipatedAmount] = useState(0);
  const [nftsReady, setNftsReady] = useState(false);
  const [projectData, setProjectData] = useState<any>(null);

  const getUsdcBalance = async () => {
    try {
      const projectData = await project.data();
      const nftMintAccountKey = new PublicKey(nftMint.mint);
      const participatedAmount_ = await user.getParticipateAmount(
        nftMintAccountKey,
        new PublicKey(projectPubKey),
        projectData.salePrice,
        projectData.rewardDecimals
      );
      setParticipatedAmount(participatedAmount_);

      const usdcMint = new PublicKey(projectData.treasuryMint);
      const ata = await user.getAssociatedTokenAccountFor(usdcMint);
      const balance = await helper.getTokenBalance(ata);
      setUsdcBalance(balance);
    }
    catch (error: any) {
      globalErrorHandle(error);
    }
  };

  useEffect(() => {
    if (project && user && wallet.connected && helper && nftMint && projectData)
      getUsdcBalance();
    else setUsdcBalance(0);
  }, [project, user, wallet.connected, helper, nftMint, projectData]);

  useEffect(() => {
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
        const project = await new Project(
          provider,
          nftStore,
          new PublicKey(projectPubKey)
        ).build();
        setProject(project);
        const data = await project.data();
        setCover(data.cover);
        setBackgroundCover(data.cover);
        if (data) {
          if (data.rewardMint) {
            const requestOne = await axios.get(
              `https://public-api.solscan.io/token/meta?tokenAddress=${data.rewardMint}`
            );
            const requestTwo = await axios.get(
              `https://public-api.solscan.io/market/token/${data.rewardMint}`
            );
            axios
              .all([requestOne, requestTwo])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
                  const responseTwo = responses[1];
                  setIdo({ ...data, ...responseOne.data, ...responseTwo.data });
                })
              )
              .catch((error: any) => {
                globalErrorHandle(error);
              });
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

  const submitParticipation = async () => {
    setLoading(true);
    try {
      if (nftMint) {
        if (amount > 0) {
          // if (amount <= allocation - participatedAmount) {
          const projectData = await project.data();

          const treasuryMint = new PublicKey(projectData.treasuryMint);
          const nftMintAccountKey = new PublicKey(nftMint.mint);

          const tx = await project.participate(
            {
              treasuryMint,
              nftMint: nftMintAccountKey,
              amount,
            },
            user
          );

          const signature = await sendTransaction(tx, connection);

          await connection.confirmTransaction(signature, "confirmed");
          getUsdcBalance();
          notification("success", "Successfully", "Transaction Success");
          // } else {
          //   notification('danger', 'more than allocation.');
          // }
        }
        else {
          notification("danger", "Please enter an amount.");
        }
      }
      else {
        notification("danger", "No Nft.");
      }
    }
    catch (error: any) {
      globalErrorHandle(error);
    }

    setLoading(false);
  };

  const setNftAndAllocation = (nft: any) => {
    setNftMint(nft);
    setallocation(
      nftAllocation[nft.attributes[0].value] *
        projectData.allocationFeeBasisPoints
    );
  };

  const getMax = (max: number) => {
    setAmount(usdcBalance * max);
  };

  useEffect(() => {
    const initNfts = async () => {
      const projectData_ = await project.data();
      setProjectData(projectData_);
      setNftMint(nfts[0]);
      setallocation(
        nftAllocation[nfts[0].attributes[0].value] *
          projectData_.allocationFeeBasisPoints
      );
    };
    if (nfts && nfts[0] && !nftsReady && project) initNfts();
  }, [nfts, project]);

  return (
    <section className={"relative overflow-hidden lg:py-12"}>
      {nfts && ido ? (
        <>
          {ido.startTime >= Date.now() && (
            <div
              className={
                "absolute inset-0 z-10 flex flex-col items-center pt-52 pb-12 filter backdrop-blur-md"
              }
            >
              <h1 className={"mb-3 text-4xl font-bold"}>Scheduled IDO</h1>
              <p className={"mb-6 text-lg font-medium"}>
                This IDO is not yet launched, come back later.
              </p>
              <button
                onClick={() => {
                  setReminder(true);
                  setProjectKey("lol");
                }}
                className="button whitespace-nowrap py-3 text-base"
              >
                <BellIcon className={"h-5 w-5"} />
                Set a Reminder
              </button>
            </div>
          )}
          <Container>
            <div className={"px-0"}>
              <Layout short={true}>
                <div className="grid gap-y-6 md:grid-cols-8 lg:gap-y-0">
                  <div className="pt-10 md:col-span-5 md:pr-16">
                    <Link href={`/projects/${projectPubKey}`}>
                      <a className="inline-flex items-center gap-x-2 rounded-lg text-gray-300">
                        <ArrowLeftIcon className={"w-4"} />
                        Back to Project
                      </a>
                    </Link>
                    <h1 className="mt-5 flex gap-x-3 text-4xl font-extrabold tracking-tight text-white sm:leading-none lg:text-5xl xl:text-6xl">
                      <span className={"text-purple-2"}>{ido.name}</span>
                      <span>Presale</span>
                      {ido.isFeatured && (
                        <BadgeCheckIcon className={"h-8 w-8 text-purple-2"} />
                      )}
                    </h1>
                    <p className="prose prose-lg prose-invert mt-6 line-clamp-5">
                      {ido.description}
                    </p>
                    <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-white sm:mt-10">
                      Token Sale Details
                    </p>
                    <div className="my-3 flex flex-col gap-x-12 gap-y-4 mxm:flex-row">
                      {ido.symbol && (
                        <div className="flex items-center">
                          {ido.icon && (
                            <div className="mr-4">
                              <img alt="FOXY" className="w-10" src={ido.icon} />
                            </div>
                          )}
                          <div>
                            <p className="text-sm">Token Symbol</p>
                            <h4 className="whitespace-nowrap text-xl">
                              ${ido.symbol}
                            </h4>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="mr-4">
                          <img
                            className={"h-10 w-10"}
                            src={"/assets/logos/usdc-logo.svg"}
                            alt={"USDC"}
                          />
                        </div>
                        <div>
                          <p className="text-sm">Token Price</p>
                          <h4 className="whitespace-nowrap text-xl">
                            <NumberFormat
                              value={ido.salePrice}
                              displayType={"text"}
                              thousandSeparator={true}
                            />{" "}
                            USDC
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <img
                            className={"h-10 w-10"}
                            src={"/assets/logos/usdc-logo.svg"}
                            alt={"USDC"}
                          />
                        </div>
                        <div>
                          <p className="text-sm">Hard Cap</p>
                          <h4 className="whitespace-nowrap text-xl">
                            <NumberFormat
                              value={ido.hardCap}
                              displayType={"text"}
                              thousandSeparator={true}
                            />{" "}
                            USDC
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        "mt-12 flex flex-col gap-x-10 gap-y-4 mxm:flex-row"
                      }
                    >
                      {ido.websiteUrl && (
                        <a
                          href={ido.websiteUrl}
                          target={"_blank"}
                          rel={"noreferrer"}
                          className={"flex items-center gap-x-2 text-sm"}
                        >
                          <GlobeAltIcon className={"w-5 text-gray-300"} />
                          Website
                        </a>
                      )}
                      {ido.twitter && (
                        <a
                          href={ido.twitter}
                          target={"_blank"}
                          rel={"noreferrer"}
                          className={"flex items-center gap-x-2 text-sm"}
                        >
                          <svg
                            className={"w-5 text-gray-300"}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                              fill={"currentColor"}
                            />
                          </svg>
                          Twitter
                        </a>
                      )}
                      <div className={"flex items-center gap-x-2 text-sm"}>
                        <ClockIcon className={"w-5 text-gray-300"} />
                        Starts At: {ido.startTime.toLocaleDateString()}{" "}
                        {isToday(ido.startTime) &&
                          ido.startTime.toLocaleTimeString()}
                      </div>
                      <div className={"flex items-center gap-x-2 text-sm"}>
                        <ClockIcon className={"w-5 text-gray-300"} />
                        Ends At: {ido.endTime.toLocaleDateString()}{" "}
                        {isToday(ido.endTime) &&
                          ido.endTime.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <Card padded={true}>
                      <div className="p-2">
                        <h2 className="flex items-center gap-x-2 text-3xl font-bold">
                          Participate Now!
                        </h2>
                        <p className="mt-5 text-lg font-medium text-gray-300 line-clamp-2">
                          To participate in the IDO, please enter your desired
                          amount and choose your NFT.
                        </p>
                        <div
                          onClick={() =>
                            setAllocationDetails(!allocationDetails)
                          }
                          className={
                            "mt-3 flex cursor-pointer justify-between gap-x-2"
                          }
                        >
                          <div className={"font-medium text-purple-2"}>
                            Your IDO&apos;s allocation is{" "}
                            <NumberFormat
                              value={allocation - participatedAmount}
                              displayType={"text"}
                              thousandSeparator={true}
                              decimalScale={2}
                              prefix={"$"}
                            />
                            .
                          </div>
                          {allocation != 0 && (
                            <div
                              className={
                                "flex w-16 items-center justify-end gap-x-2"
                              }
                            >
                              <div className="h-2 flex-1 rounded-full bg-gray-400">
                                <div
                                  style={{
                                    width: `${(
                                      (participatedAmount / allocation) *
                                      100
                                    ).toFixed(0)}%`,
                                  }}
                                  className="h-2 rounded-full bg-purple-2"
                                />
                              </div>
                              <p className={"text-xs"}>
                                {(
                                  (participatedAmount / allocation) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            </div>
                          )}
                        </div>
                        {allocationDetails && allocation != 0 && (
                          <div
                            className={"mt-3 space-y-2 text-sm text-gray-300"}
                          >
                            <p className={"flex items-center gap-x-1"}>
                              <ChevronRightIcon className={"h-3 w-3"} />
                              You initially received an allocation of{" "}
                              <NumberFormat
                                value={allocation}
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                prefix={"$"}
                              />
                            </p>
                            <p className={"flex items-center gap-x-1"}>
                              <ChevronRightIcon className={"h-3 w-3"} />
                              You have participated in the amount of{" "}
                              <NumberFormat
                                value={participatedAmount}
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                prefix={"$"}
                              />
                            </p>
                          </div>
                        )}
                        <div className={"mt-6"}>
                          <div
                            className={"mb-4 flex items-end justify-between"}
                          >
                            <label
                              htmlFor="amount"
                              className="text-sm font-medium"
                            >
                              Participation Amount
                            </label>
                            <div className="flex items-center gap-x-2 text-xs font-medium">
                              <label>
                                Balance: {usdcBalance.toLocaleString("en-US")}{" "}
                                USDC
                              </label>
                              <button
                                className={
                                  "rounded-full bg-gray-500 bg-opacity-50 px-2 py-[2px] text-[9px] font-bold uppercase text-gray-400 hover:bg-opacity-30"
                                }
                                onClick={() => getMax(0.5)}
                              >
                                Half
                              </button>
                              <button
                                className={
                                  "rounded-full bg-gray-500 bg-opacity-50 px-2 py-[2px] text-[9px] font-bold uppercase text-gray-400 hover:bg-opacity-30"
                                }
                                onClick={() => getMax(1)}
                              >
                                Max
                              </button>
                            </div>
                          </div>
                          <div className="relative mt-2 rounded-md shadow-sm">
                            <input
                              readOnly={
                                walletAddress === undefined ||
                                nfts.length === 0 ||
                                ido.startTime > Date.now()
                              }
                              type="number"
                              name="amount"
                              id="amount"
                              onChange={(e) => setAmount(e.target.value)}
                              value={amount}
                              className="block w-full rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 p-3 pr-12 shadow-xl shadow-half-strong placeholder:text-gray-300 focus:border-purple-2 focus:ring-purple-2 sm:text-sm"
                              placeholder="0.00"
                              aria-describedby="price-currency"
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                              <span
                                className="flex items-center gap-x-1 text-gray-300 sm:text-sm"
                                id="price-currency"
                              >
                                <img
                                  className={"h-4 w-4"}
                                  src={"/assets/logos/usdc-logo.svg"}
                                  alt={"USDC"}
                                />
                                USDC
                              </span>
                            </div>
                          </div>
                        </div>
                        <RadioGroup
                          className="mt-6 max-h-[335px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-parasol"
                          value={nftMint}
                          onChange={(nft) => setNftAndAllocation(nft)}
                        >
                          <RadioGroup.Label className="sr-only">
                            Server size
                          </RadioGroup.Label>
                          <div className="space-y-2">
                            {nfts.length > 0 ? (
                              nfts.map((nft: any) => (
                                <RadioGroup.Option
                                  key={nft.name}
                                  value={nft}
                                  className={({ active, checked }) =>
                                    `${
                                      active
                                        ? "ring-2-ring-offset-2 ring-purple-1 ring-opacity-60 ring-offset-purple-1"
                                        : ""
                                    } ${
                                      checked
                                        ? "border-2 border-purple-2 bg-purple-2 bg-opacity-5"
                                        : "border-2 border-transparent bg-white bg-opacity-5"
                                    } relative flex cursor-pointer rounded-lg p-3 shadow-md focus:outline-none`
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                          <div className="text-sm">
                                            <RadioGroup.Label
                                              as="p"
                                              className={`font-medium ${
                                                checked ? "text-white" : ""
                                              }`}
                                            >
                                              <div className="flex items-center">
                                                <div className="mr-4">
                                                  <img
                                                    className={
                                                      "h-12 w-12 rounded-md"
                                                    }
                                                    src={nft.image}
                                                    alt={nft.name}
                                                  />
                                                </div>
                                                <div>
                                                  <p className="text-xs">
                                                    {nft.name}
                                                  </p>
                                                  <h2 className="whitespace-nowrap text-lg">
                                                    {nft.attributes[0].value}
                                                  </h2>
                                                </div>
                                              </div>
                                            </RadioGroup.Label>
                                          </div>
                                        </div>
                                        {checked && (
                                          <div className="flex-shrink-0 text-purple-2">
                                            <CheckIcon className="h-6 w-6" />
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </RadioGroup.Option>
                              ))
                            ) : (
                              <Link href={"/tiers"}>
                                <a className="relative flex cursor-pointer rounded-lg border border-purple-2 bg-purple-2 bg-opacity-5 p-3 shadow-md hover:ring-2 hover:ring-purple-2 focus:outline-none">
                                  <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                      <div className="text-sm">
                                        <p className="font-medium text-white">
                                          <div className="flex items-center">
                                            <div className="mr-4">
                                              {/*<Image width={32} height={32} src={Logo} className="h-5" alt="logo" />*/}
                                              <img
                                                className="h-12 w-12 rounded-md"
                                                src="https://parasol.finance/assets/nft-access-keys/covers/Dreamer.png"
                                                alt="PSOL KEY #2"
                                              />
                                            </div>
                                            <div>
                                              <p className="text-xs">
                                                You don&apos;t have an NFT
                                                currently.
                                              </p>
                                              <h2 className="whitespace-nowrap text-xs mxm:text-lg">
                                                Buy your NFT Access Key!
                                              </h2>
                                            </div>
                                          </div>
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0 px-3 text-purple-2">
                                      <ArrowRightIcon className={"w-5"} />
                                    </div>
                                  </div>
                                </a>
                              </Link>
                            )}
                          </div>
                        </RadioGroup>
                        {walletAddress ? (
                          <button
                            disabled={
                              nfts.length == 0 ||
                              ido.startTime > Date.now() ||
                              loading
                            }
                            className={`w-full ${
                              nfts.length == 0
                                ? "cursor-not-allowed opacity-70"
                                : ""
                            } button mt-8`}
                            onClick={submitParticipation}
                          >
                            {!loading ? (
                              <>
                                <HandIcon className={"h-6 w-6"} />
                                Participate Now
                              </>
                            ) : (
                              <>Loading ...</>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              walletAddress ?? walletModal.setVisible(true)
                            }
                            className={"button mt-8 w-full"}
                          >
                            Connect Wallet
                          </button>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
                {ido.content && (
                  <div className={"flex flex-col gap-x-12 mxm:flex-row"}>
                    <div className={"w-48"}>
                      <ul
                        role="list"
                        className="divide-y-divide-gray-200-divide-opacity-10 pt-4"
                      >
                        {JSON.parse(ido.content).blocks.map((block: any) => {
                          if (
                            block.type === "header" &&
                            block.data.level <= 3
                          ) {
                            return (
                              <li key={block.id} className="relative py-2">
                                <a
                                  href={`#${slugify(block.data.text)}`}
                                  className="block focus:outline-none"
                                >
                                  <p
                                    className={`${
                                      block.data.level > 2 ? "pl-3-" : ""
                                    } flex items-center gap-x-1 text-sm font-medium text-gray-300 duration-300  hover:translate-x-3 hover:text-gray-200`}
                                  >
                                    <ChevronRightIcon className={"h-3 w-3"} />
                                    <span className={"flex-1 truncate"}>
                                      {block.data.text}
                                    </span>
                                  </p>
                                </a>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                    <div className={"flex-1"}>
                      <ScrollPercentage
                        as="div"
                        onChange={(percentage) => NProgress.set(percentage)}
                      >
                        <div
                          className={"prose prose-lg prose-invert max-w-full"}
                        >
                          <SRLWrapper>
                            <EditorJs
                              projectPubKey={projectPubKey}
                              content={ido.content || "{}"}
                            />
                          </SRLWrapper>
                        </div>
                      </ScrollPercentage>
                    </div>
                  </div>
                )}
              </Layout>
            </div>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default ProjectParticipate;

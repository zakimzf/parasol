import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

import axios from "axios";
import Disqus from "disqus-react";
import { NftStore, Project } from "parasol-finance-sdk";
import Countdown from "react-countdown";
import { useDropzone } from "react-dropzone";
import NumberFormat from "react-number-format";
import { SRLWrapper } from "simple-react-lightbox";
import { PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { Tab } from "@headlessui/react";
import {
  ExternalLinkIcon,
  FireIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import {
  BadgeCheckIcon,
  BellIcon,
  CloudUploadIcon,
  PencilAltIcon,
  SaveAsIcon,
} from "@heroicons/react/outline";

import { Loading } from "components";

import Card from "components/card";
import Container from "components/container";
import { useWalletModal } from "components/wallet-connector";
import { useReminderModal } from "components/reminder-modal/useReminderModal";
import { NftContext } from "context/NftContext";
import { getBase64, isToday } from "utils/functions";

const EditorJs = dynamic(() => import("components/editorjs"), {
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
  const [tempCover, setTempCover] = useState("");
  const [coverFile, setCoverFile] = useState("");

  const { projectPubKey }: any = router.query;

  const [ido, setIdo] = useState<any>(null);

  useEffect(() => {
    const getDataByTokenAddress = async () => {
      const nftStore = await new NftStore(provider, config).build();
      try {
        const project = await new Project(
          provider,
          nftStore,
          new PublicKey(projectPubKey)
        ).build();
        const data = await project.data();
        setCover(data.cover);
        if (data) {
          if (data.splToken) {
            const requestOne = await axios.get(
              `https://public-api.solscan.io/token/meta?tokenAddress=${data.splToken}`
            );
            const requestTwo = await axios.get(
              `https://public-api.solscan.io/market/token/${data.splToken}`
            );
            axios
              .all([requestOne, requestTwo])
              .then(
                axios.spread((...responses) => {
                  const responseOne = responses[0];
                  const responseTwo = responses[1];
                  setIdo({
                    ...data,
                    ...responseOne.data,
                    ...responseTwo.data,
                  });
                })
              )
              .catch((errors) => {
                // react on errors.
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

  const countdownRenderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (!completed) {
      if (days === 0) {
        return (
          <div className="flex items-end justify-center gap-x-2 text-4xl font-bold">
            <span>{hours}h</span>
            <span>{minutes}m</span>
            <span>{seconds}s</span>
          </div>
        );
      }
      return (
        <div className="flex items-end justify-center gap-x-1 text-4xl font-bold">
          <span>{days}</span>
          <span className="pr-2">days</span>
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
    setTempCover((await getBase64(file[0])) as any);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  console.log(ido, "ido");

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL)</title>
        {/*<meta property="og:image" content={`/api/projects/${projectPubKey}?cover`} />*/}
        {/*<meta property="twitter:image" content={`/api/projects/${projectPubKey}?cover`} />*/}
        <meta property="og:image" content="/assets/preview/projects.png" />
        <meta property="twitter:image" content="/assets/preview/projects.png" />
      </Head>
      {ido ? (
        <>
          <section className="pt-6">
            <Container>
              <div className="grid md:grid-cols-9">
                <div className="md:col-span-6 md:pr-16">
                  <div className="mb-6 flex gap-x-5">
                    {ido.icon && (
                      <img
                        className="m-0 h-16 rounded-full p-1"
                        src={ido.icon}
                        alt={ido.name}
                      />
                    )}
                    <div
                      className={
                        walletAddress && walletAddress == ido.owner
                          ? "w-1/2"
                          : "w-2/3"
                      }
                    >
                      <a
                        id="features"
                        className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                      >
                        {ido.name}
                      </a>
                      <p className="mt-1 max-w-prose overflow-hidden	text-ellipsis text-sm text-gray-200 sm:whitespace-nowrap lg:text-base">
                        {ido.description}
                      </p>
                    </div>
                    {walletAddress && walletAddress == ido.owner && (
                      <div className="ml-auto flex items-center justify-items-end">
                        <Link href={`/projects/${projectPubKey}/edit`}>
                          <a
                            type="button"
                            className="inline-flex items-center gap-x-1 rounded-full border border-transparent bg-white bg-opacity-30 px-3.5 py-2 text-sm font-medium leading-4 text-white text-purple-2 shadow-sm hover:bg-purple-2 focus:outline-none focus:ring-2 focus:ring-purple-2 focus:ring-offset-2"
                          >
                            <PencilAltIcon className="w-4" />
                            Edit IDO
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                  {walletAddress && walletAddress == ido.owner && (
                    <>
                      <div className="relative">
                        <img
                          src={tempCover || ido.cover}
                          className="mb-6 w-full rounded-lg"
                          alt={ido.name}
                        />
                        <div
                          className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black bg-opacity-50 filter duration-300 hover:backdrop-blur-sm"
                          {...getRootProps()}
                        >
                          {isDragActive ? (
                            <p className="pl-1">Drop the file here ...</p>
                          ) : (
                            <CloudUploadIcon className="w-32 text-white " />
                          )}
                        </div>
                        <input
                          {...getInputProps()}
                          disabled={true}
                          id="file-upload"
                          name="projectCover"
                          type="file"
                          className="sr-only"
                        />
                      </div>
                    </>
                  )}
                  <SRLWrapper>
                    {(!walletAddress || walletAddress != ido.owner) && (
                      <img
                        src={ido.cover}
                        className="ease mb-6 w-full cursor-pointer rounded-lg transition-transform duration-300 hover:scale-105"
                        alt={ido.name}
                      />
                    )}
                    <Tab.Group>
                      <Tab.List className="mb-3">
                        <div className="border-b border-gray-500">
                          <nav
                            aria-label="Tabs"
                            className="-mb-px flex sxm:space-x-8"
                          >
                            <Tab as={Fragment}>
                              {({ selected }) => (
                                <a
                                  href="#details"
                                  className={`${
                                    selected
                                      ? "border-purple-2 text-purple-2"
                                      : "border-transparent hover:border-purple-2 hover:text-purple-2"
                                  } text-sm" border-b-2 px-1 pt-2 pb-3 font-medium`}
                                  aria-current={selected ? "page" : undefined}
                                >
                                  Project Details
                                </a>
                              )}
                            </Tab>
                            <Tab as={Fragment}>
                              {({ selected }) => (
                                <a
                                  href="#token"
                                  className={`${
                                    selected
                                      ? "border-purple-2 text-purple-2"
                                      : "border-transparent hover:border-purple-2 hover:text-purple-2"
                                  } text-sm" border-b-2 px-1 pt-2 pb-3 font-medium`}
                                  aria-current={selected ? "page" : undefined}
                                >
                                  Token Details
                                </a>
                              )}
                            </Tab>
                            {ido.whitepaperUrl && (
                              <Tab as={Fragment}>
                                {({ selected }) => (
                                  <a
                                    href="#wp"
                                    className={`${
                                      selected
                                        ? "border-purple-2 text-purple-2"
                                        : "border-transparent hover:border-purple-2 hover:text-purple-2"
                                    } text-sm" flex items-center gap-x-1 border-b-2 px-1 pt-2 pb-3 font-medium`}
                                    aria-current={selected ? "page" : undefined}
                                  >
                                    White Paper
                                  </a>
                                )}
                              </Tab>
                            )}
                            {ido.websiteUrl && (
                              <a
                                href={ido.websiteUrl}
                                target="_blank"
                                className="!ml-auto flex items-center gap-x-1 px-3 pt-2 pb-3 text-sm font-medium text-white"
                                rel="noreferrer"
                              >
                                <ExternalLinkIcon className="w-5" />
                                <span className="hidden lg:block">
                                  Visit Website
                                </span>
                              </a>
                            )}
                          </nav>
                        </div>
                      </Tab.List>
                      <Tab.Panels>
                        <Tab.Panel>
                          <div className="markdown prose prose-lg prose-invert">
                            {(walletAddress && walletAddress == ido.owner) ||
                            ido.content ? (
                                <EditorJs
                                  content={ido.content || "{}"}
                                  isOwner={
                                    (walletAddress &&
                                    walletAddress == ido.owner) ||
                                  false
                                  }
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
                        <Tab.Panel className="pt-6">
                          <div className="-rounded-md overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                            <table className="min-w-full divide-y divide-gray-800 rounded-lg border border-gray-800 bg-[#231f38] bg-opacity-50 shadow-xl shadow-half-strong">
                              <tbody className="divide-y divide-gray-800">
                                {ido.rewardMint && (
                                  <tr>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                      Token Address
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                      {ido.rewardMint}
                                    </td>
                                  </tr>
                                )}
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                    Token Name
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {ido.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                    Symbol
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {ido.symbol}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                    Decimals
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {ido.rewardDecimals}
                                  </td>
                                </tr>
                                {ido.rewardMint && (
                                  <>
                                    <tr>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                        Price (in USDC)
                                      </td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <NumberFormat
                                          value={ido.salePrice}
                                          displayType="text"
                                          thousandSeparator={true}
                                          prefix="$"
                                        />
                                      </td>
                                    </tr>
                                    {ido.marketCapFD && (
                                      <tr>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                          Market Cap (in USDC)
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                          <NumberFormat
                                            value={ido.marketCapFD}
                                            displayType="text"
                                            thousandSeparator={true}
                                            prefix="$"
                                          />
                                        </td>
                                      </tr>
                                    )}
                                    {ido.volumeUsdt && (
                                      <tr>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                                          Volume 24h (in USDC)
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                                          <NumberFormat
                                            value={ido.volumeUsdt}
                                            displayType="text"
                                            thousandSeparator={true}
                                            prefix="$"
                                          />
                                        </td>
                                      </tr>
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </Tab.Panel>
                        {ido.whitepaperUrl && (
                          <Tab.Panel className="pt-6">
                            <iframe
                              src={ido.whitepaperUrl + "#toolbar=0&navpanes=0"}
                              className="my-3 min-h-screen w-full border-none"
                            />
                          </Tab.Panel>
                        )}
                      </Tab.Panels>
                    </Tab.Group>
                  </SRLWrapper>
                  <div className={"mt-12"}>
                    {/*<Disqus.DiscussionEmbed
                      shortname={"parasol-finance"}
                      config={{
                        url: window.location.href,
                        identifier: ido.tokenAddress,
                        title: ido.name,
                      }}
                    />*/}
                  </div>
                </div>
                <div className="md:col-span-3">
                  <div className="sticky top-20 flex flex-col gap-y-6">
                    <Card>
                      <div className="flex flex-col gap-y-6 p-6">
                        {ido.saleTotalAmount >= ido.hardCap && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm">
                            <div className="pyro pointer-events-none absolute inset-0">
                              <div className="before"></div>
                              <div className="after"></div>
                            </div>
                            {/*<CheckIcon className="w-20 h-20 mb-3 rounded-full bg-green-400 bg-opacity-20 p-3 text-green-600" />*/}
                            <h2 className="text-3xl font-bold">Sale is Over</h2>
                            <p className="text-lg font-medium">
                              The sale of {ido.name} is completed.
                            </p>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <h2 className="flex items-center gap-x-2 text-2xl font-bold">
                            {ido.name}
                            {ido.isFeatured && (
                              <BadgeCheckIcon className="h-7 text-purple-2" />
                            )}
                          </h2>
                          {ido.status !== "PUBLISHED" && (
                            <label className="rounded-md bg-white bg-opacity-10 p-2 text-xs font-medium uppercase">
                              {ido.status}
                            </label>
                          )}
                        </div>
                        <div className="flex items-center gap-x-3 text-white">
                          <img
                            className="h-8"
                            src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                            alt="USDC"
                          />
                          <div className="flex items-end gap-x-2 text-4xl font-bold">
                            <NumberFormat
                              value={ido.hardCap}
                              displayType="text"
                              thousandSeparator={true}
                            />
                            <span>USDC</span>
                          </div>
                        </div>
                        <div className="prose prose-lg prose-invert break-all">
                          <p>{ido.description}</p>
                        </div>
                        <div className="flex-col space-y-3">
                          <div className="flex items-center gap-x-3 font-medium text-gray-300">
                            <span>Hard Cap</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span>
                              <NumberFormat
                                value={ido.hardCap}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="$"
                              />
                            </span>
                          </div>
                          <div className="flex items-center gap-x-3 font-medium text-gray-300">
                            <span>Price per Token</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span>
                              <NumberFormat
                                value={ido.salePrice}
                                displayType="text"
                                thousandSeparator={true}
                                prefix="$"
                              />
                            </span>
                          </div>
                          <div className="flex items-center gap-x-3 font-medium text-gray-300">
                            <span>Start Time</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span>
                              {ido.startTime.toLocaleDateString()}{" "}
                              {isToday(ido.startTime) &&
                                ido.startTime.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-x-3 font-medium text-gray-300">
                            <span>End Time</span>
                            <span className="h-1 flex-1 border-b border-dashed border-gray-400" />
                            <span>
                              {ido.endTime.toLocaleDateString()}{" "}
                              {isToday(ido.endTime) &&
                                ido.endTime.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        {ido.saleTotalAmount > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-sm font-medium">
                                Sale Progress
                              </label>
                              <label className="text-sm font-medium">
                                Raised Amount:{" "}
                                <NumberFormat
                                  value={
                                    ido.saleTotalAmount <= ido.hardCap
                                      ? ido.saleTotalAmount
                                      : ido.hardCap
                                  }
                                  displayType="text"
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  prefix="$"
                                />
                              </label>
                            </div>
                            <div className="flex h-2 overflow-hidden rounded bg-purple-2 bg-opacity-30 text-xs">
                              <div
                                style={{
                                  width: `${
                                    ido.saleTotalAmount / ido.hardCap > 0.1
                                      ? (ido.saleTotalAmount / ido.hardCap) *
                                        100
                                      : 5
                                  }%`,
                                }}
                                className="flex flex-col justify-center whitespace-nowrap bg-purple-2 text-center text-white shadow-none"
                              ></div>
                            </div>
                          </div>
                        )}
                        {walletAddress ? (
                          walletAddress == ido.owner ? (
                            <button
                              id="saveEditor"
                              disabled={loading}
                              className="button mt-2 w-full"
                            >
                              <SaveAsIcon className="h-5 w-5" />
                              {loading ? "Saving..." : "Save Changes"}
                            </button>
                          ) : (
                            <>
                              {ido.startTime >= Date.now() ? (
                                <button
                                  onClick={() => setReminder(true)}
                                  className="button mt-2 w-full"
                                >
                                  <BellIcon className="h-5 w-5" />
                                  Set a Reminder
                                </button>
                              ) : (
                                <>
                                  {ido.endTime >= Date.now() ? (
                                    <>
                                      <Link
                                        href={`/projects/${projectPubKey}/participate`}
                                        passHref
                                      >
                                        <button className="button mt-2 w-full">
                                          <FireIcon className="w-6" />
                                          Participate In The sale
                                        </button>
                                      </Link>
                                      <p className="text-center text-sm text-gray-300">
                                        Sale close in{" "}
                                        <Countdown date={ido.endTime} />
                                      </p>
                                    </>
                                  ) : (
                                    <button
                                      disabled={true}
                                      className="mt- button w-full cursor-not-allowed opacity-90"
                                    >
                                      <XCircleIcon className="w-6" />
                                      Sale is Over
                                    </button>
                                  )}
                                </>
                              )}
                            </>
                          )
                        ) : (
                          <button
                            className="opacity-80-cursor-default mt-2 flex w-full items-center justify-center gap-x-2 rounded-lg bg-gradient-to-r from-purple-1 to-purple-2 px-5 py-4 text-lg font-medium"
                            type="button"
                            onClick={() =>
                              walletAddress ?? walletModal.setVisible(true)
                            }
                          >
                            Connect Wallet
                          </button>
                        )}
                      </div>
                    </Card>
                    {ido.startTime >= Date.now() && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="mb-1 text-sm text-gray-300">
                          The Sale of {ido.name} Starts In:
                        </p>
                        <Countdown
                          renderer={countdownRenderer}
                          intervalDelay={0}
                          precision={3}
                          date={ido.startTime}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Container>
          </section>
          {ido.endTime >= Date.now() && ido.status === "PUBLISHED" && (
            <Link href={`/projects/${projectPubKey}/participate`} passHref>
              <button className="button fixed inset-x-6 bottom-6 z-50 bg-white !bg-none text-sm font-medium uppercase !text-black shadow-lg lg:hidden">
                Participate In The sale
              </button>
            </Link>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProjectDetails;

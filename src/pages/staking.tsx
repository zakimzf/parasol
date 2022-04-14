import React, { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  DownloadIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { RadioGroup } from "@headlessui/react";

import Container from "../components/container";
import Card from "../components/card";

import Heading from "../components/heading";
import { NftContext } from "../context/NftContext";
import { useWalletModal } from "../components/wallet-connector";
import { notification } from "../utils/functions";
import Head from "next/head";

const operations = [
  { id: 0, title: "Stake", description: "Lock your $PSOL for 90 days." },
  { id: 1, title: "Unstake", description: "Retrieve your locked $PSOL." },
];

const advantages = [
  {
    id: 1,
    name: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: "Lorem ipsum",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
    icon: LightningBoltIcon,
  },
];

const Staking = () => {
  const { user, wallet, helper } = React.useContext(NftContext);
  const [iBalance, setIBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [balanceAvailable, setBalanceAvailable] = useState(true);
  const [isPending, setPending] = useState(false);
  const walletModal = useWalletModal();

  useEffect(() => {
    if (!wallet.connected) return;
    if (helper) getIOBalance().then();
    else setIBalance(0);
  }, [wallet.publicKey]);

  useEffect(() => {
    isBalanceAvailable();
  }, [inputAmount]);

  useEffect(() => {
    setPending(walletModal.visible);
  }, [walletModal.visible]);

  const getIOBalance = async () => {
    const psolAmount = await helper.getTokenBalance(user.paymentAta);
    setIBalance(psolAmount);
  };

  const getMaxAmount = () => {
    if (wallet.connected) {
      const val = restrictDecimal(+iBalance);
      setInputAmount(val);
      if (inputAmount !== +iBalance) {
        setInputAmount(val);
      }
    }
    else {
      notification("information", "Please connect your wallet before.", "Connection Required");
    }
  };
  const getHalfAmount = () => {
    if (wallet.connected) {
      const val = restrictDecimal(+iBalance / 2);
      setInputAmount(val);
      if (inputAmount !== +iBalance / 2) {
        setInputAmount(val);
      }
    }
    else {
      notification("information", "Please connect your wallet before.", "Connection Required");
    }
  };

  const isBalanceAvailable = () => {
    if (iBalance < inputAmount) {
      setBalanceAvailable(false);
    }
    else if (iBalance == inputAmount) {
      if (inputAmount === 0) setBalanceAvailable(true);
      else setBalanceAvailable(true);
    }
    else {
      if (inputAmount === 0) setBalanceAvailable(true);
      else setBalanceAvailable(true);
    }
  };

  const restrictDecimal = (val: any) => {
    return Number(val.toFixed(7));
  };

  const [selectedOperation, setSelectedOperation] = useState(operations[0]);
  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Parasol Finance ($PSOL) | Staking $PSOL</title>
        <meta name="title" content="Parasol Finance ($PSOL) | Staking $PSOL"/>
        <meta property="og:image" content="/assets/preview/staking.png"/>
        <meta property="twitter:image" content="/assets/preview/staking.png"/>
      </Head>
      <div className={"absolute flex flex-col justify-center items-center inset-0 filter backdrop-blur-md z-10"}>
        <h1 className={"text-4xl mb-2 font-bold"}>Coming Soon</h1>
        <p className={"text-lg font-medium"}>This feature is not yet available but should be soon.</p>
      </div>
      <Heading
        tagline={"Parasol Finance"}
        title={"Parasol Staking"}
        description={"Stake $PSOL and earn Airdrops for every IDOs."}
      />
      <Container>
        <div className="relative grid grid-cols-9">
          <div className={"relative col-span-6 pr-12"}>
            <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Key Advantages to Stake Your $PSOL.
            </h3>
            <p className="mt-3 text-lg">
              By staking your $PSOL tokens, you will earn Airdrops on all
              future IDOs on the platform.
            </p>
            <dl className="mt-10 space-y-10">
              {advantages.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-2 text-white">
                      <item.icon className="h-6 w-6" aria-hidden="true"/>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-200">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={"flex flex-col col-span-3"}>
            <Card padded={true}>
              <h2 className="flex gap-x-2 items-center text-2xl font-bold">
                {selectedOperation.id == 0 ? "Stake" : "Unstake"} PSOL Tokens
              </h2>
              <p className="mt-3 text-lg">
                By staking your $PSOL tokens, you will earn Airdrops on all
                future IDOs on the platform.
              </p>
              <div className={"flex mt-6 justify-between items-end mb-4"}>
                <label className="text-sm font-medium">Stake Amount:</label>
                <div className="flex gap-x-2 items-center text-xs font-medium">
                  <button
                    className={
                      "bg-gray-500 text-[9px] bg-opacity-50 uppercase font-bold text-gray-400 px-2 py-[2px] rounded-full hover:bg-opacity-30"
                    }
                    onClick={getHalfAmount}
                  >
                    Half
                  </button>
                  <button
                    className={
                      "bg-gray-500 text-[9px] bg-opacity-50 uppercase font-bold text-gray-400 px-2 py-[2px] rounded-full hover:bg-opacity-30"
                    }
                    onClick={getMaxAmount}
                  >
                    Max
                  </button>
                </div>
              </div>
              <div
                className={`flex justify-between items-stretch bg-white bg-opacity-5 rounded-xl px-4 py-3 ${
                  balanceAvailable
                    ? "outline-hidden"
                    : "outline outline-red-700"
                }`}
              >
                <button
                  type="button"
                  className="gap-x-2 py-2 px-2 rounded-lg flex items-center"
                >
                  <img
                    src={"/assets/logos/parasol-logo-mark-reverse-rgb.svg"}
                    className="w-5 h-5 rounded-full"
                    alt={"PSOL"}
                  />
                  <div className="font-semibold" translate={"no"}>
                    PSOL
                  </div>
                </button>
                <input
                  type={"number"}
                  value={inputAmount}
                  onChange={(e) =>
                    setInputAmount(restrictDecimal(+e.target.value))
                  }
                  inputMode="decimal"
                  className={
                    "bg-transparent outline-0 ring-0 border-transparent font-semibold text-right text-gray-300 text-lg w-full"
                  }
                />
              </div>
              {!balanceAvailable ? (
                <div className="text-center text-red-500 text-xs my-4">
                  Your balance is not enough to stake/unstake this amount
                </div>
              ) : (
                ""
              )}
              <RadioGroup
                className={"mt-6"}
                value={selectedOperation}
                onChange={setSelectedOperation}
              >
                <RadioGroup.Label className="text-base font-medium">
                  What you want to do?
                </RadioGroup.Label>
                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {operations.map((mailingList) => (
                    <RadioGroup.Option
                      key={mailingList.id}
                      value={mailingList}
                      className={({ checked, active }) =>
                        `${
                          checked ? "border-transparent" : "border-gray-300"
                        } ${
                          active ? "border-purple-2" : ""
                        } relative border-2 rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none`
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <div className="flex-1 flex">
                            <div className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block font-bold text-sm font-medium "
                              >
                                {mailingList.title}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className="mt-1 flex items-center text-sm "
                              >
                                {mailingList.description}
                              </RadioGroup.Description>
                            </div>
                          </div>
                          <CheckCircleIcon
                            className={`${
                              !checked ? "invisible" : ""
                            } h-5 w-5 text-purple-2`}
                          />
                          <div
                            className={`${
                              checked
                                ? "border-purple-2"
                                : "border-transparent"
                            } border-2 absolute -inset-px rounded-lg pointer-events-none`}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
              {wallet.connected ? (
                <button
                  id="stake-btn"
                  className={`w-full button mt-8 ${!balanceAvailable ? "opacity-50" : ""}`}
                  disabled={!balanceAvailable}>
                  {selectedOperation.id == 0 ? <UploadIcon className={"w-6"}/> : <DownloadIcon className={"w-6"}/>}
                  {selectedOperation.id == 0 ? "Stake" : "Unstake"} Your $PSOL
                </button>
              ) : (
                <button
                  onClick={() => walletModal.setVisible(true)}
                  className="flex items-center justify-center w-full bg-gradient-to-r from-purple-1 to-purple-2 mt-6 px-5 py-4 gap-x-2 text-lg font-medium rounded-lg"
                  disabled={isPending}
                >
                  {isPending ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white w-[28px] h-[28px] ml-[6px] mt-[0px]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="#82D9FF"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 96 86"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M95.5053 67.8049L79.658 84.8288C79.3134 85.1986 78.8966 85.4934 78.4334 85.6949C77.9703 85.8964 77.4706 86.0003 76.9656 86H1.8398C1.48134 86 1.13068 85.8951 0.830924 85.6982C0.531164 85.5013 0.295357 85.221 0.152475 84.8917C0.00959266 84.5624 -0.03414 84.1985 0.0266501 83.8446C0.0874403 83.4908 0.250105 83.1624 0.494658 82.8999L16.3543 65.876C16.6979 65.5072 17.1134 65.2129 17.5751 65.0115C18.0368 64.81 18.5349 64.7056 19.0385 64.7048H94.1602C94.5187 64.7048 94.8693 64.8097 95.1691 65.0066C95.4688 65.2035 95.7046 65.4838 95.8475 65.8131C95.9904 66.1424 96.0341 66.5063 95.9734 66.8601C95.9126 67.214 95.7499 67.5423 95.5053 67.8049ZM79.658 33.5236C79.3134 33.1538 78.8966 32.859 78.4334 32.6575C77.9703 32.456 77.4706 32.3521 76.9656 32.3524H1.8398C1.48134 32.3524 1.13068 32.4573 0.830924 32.6542C0.531164 32.8511 0.295357 33.1314 0.152475 33.4607C0.00959266 33.79 -0.03414 34.1539 0.0266501 34.5078C0.0874403 34.8616 0.250105 35.19 0.494658 35.4525L16.3543 52.4764C16.6979 52.8452 17.1134 53.1394 17.5751 53.3409C18.0368 53.5424 18.5349 53.6468 19.0385 53.6476H94.1602C94.5187 53.6476 94.8693 53.5427 95.1691 53.3458C95.4688 53.1489 95.7046 52.8686 95.8475 52.5393C95.9904 52.21 96.0341 51.8461 95.9734 51.4922C95.9126 51.1384 95.7499 50.81 95.5053 50.5475L79.658 33.5236ZM1.8398 21.2952H76.9656C77.4706 21.2955 77.9703 21.1917 78.4334 20.9902C78.8966 20.7887 79.3134 20.4938 79.658 20.124L95.5053 3.1001C95.7499 2.83758 95.9126 2.50922 95.9734 2.15538C96.0341 1.80153 95.9904 1.4376 95.8475 1.10831C95.7046 0.779013 95.4688 0.498699 95.1691 0.301804C94.8693 0.10491 94.5187 1.21255e-05 94.1602 0L19.0385 0C18.5349 0.000858433 18.0368 0.105251 17.5751 0.306715C17.1134 0.508179 16.6979 0.802426 16.3543 1.17124L0.498747 18.1951C0.25443 18.4574 0.0918367 18.7854 0.0309086 19.1389C-0.0300194 19.4923 0.0133662 19.8559 0.155745 20.1851C0.298123 20.5142 0.533305 20.7945 0.832447 20.9918C1.13159 21.189 1.48169 21.2944 1.8398 21.2952Z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                  {isPending ? "" : "Connect Wallet"}
                </button>
              )}
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Staking;

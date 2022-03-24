import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { RadioGroup } from "@headlessui/react";
import { PublicKey } from "@solana/web3.js";
import { BigNumber } from "bignumber.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  TokenChooserMode,
  useTokenModal,
} from "../components/token-chooser/useTokenModal";
import {
  getPlatformFeeAccounts,
  Jupiter,
  RouteInfo,
  TOKEN_LIST_URL,
} from "@jup-ag/core";

import { Token } from "../components/token-chooser/constants";
import Notification from "../components/slices/notification";
import { useWalletModal } from "../components/wallet-connector";
import { getWalletAdapterNetwork } from "../core/solana-network";

const Swap = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [selected, setSelected] = useState<RouteInfo>();
  const { setVisible, setMode, input, output, setInput, setOutput } =
    useTokenModal();
  const walletModal = useWalletModal();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [inputAmount, setInputAmount] = useState(0);
  const [platformFeeAndAccounts, setPlatformFeeAndAccounts] = useState<{
    feeBps: number;
    feeAccounts: Map<string, PublicKey>;
  }>();
  const [iBalance, setIBalance] = useState(0);
  const [oBalance, setOBalance] = useState(0);
  const [routes, setRoutes] = useState<RouteInfo[]>([]);
  const [isPending, setPending] = useState(false);
  const [isRoutePending, setRoutePending] = useState(false);
  const [swapStatus, setSwapStatus] = useState(true);
  const [swapResult, setSwapResult] = useState(false);
  const [balanceAvailable, setBalanceAvailable] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [transactionFee, SetTransactionFee] = useState(0);
  const [requestable, setRequestable] = useState(false);
  const [rate, setRate] = useState("0");

  const cluster: WalletAdapterNetwork = getWalletAdapterNetwork(
    process.env.NETWORK
  );

  useEffect(() => {
    getPlatformFeeAccounts(
      connection,
      new PublicKey(process.env.PLATFORM_FEE_ADDRESS as any) // The platform fee account owner. Need to fetch this from the env
    ).then((r) => {
      setPlatformFeeAndAccounts({
        feeBps: +(process.env.PLATFORM_FEE_PERCENTAGE as any) * 100,
        feeAccounts: r,
      });
    });
    fetch(TOKEN_LIST_URL[cluster])
      .then((response) => response.json())
      .then((result) => setTokens(result));
  }, [cluster, connection]);

  useEffect(() => {
    if (wallet.publicKey) {
      getIOBalance().then();
    } else {
      setIBalance(0);
      setOBalance(0);
    }

    getRoutes().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, output, requestable, wallet.publicKey]);

  useEffect(() => {
    setPending(walletModal.visible);
  }, [walletModal.visible]);

  useEffect(() => {
    setPending(isRoutePending);
  }, [isRoutePending]);

  useEffect(() => {
    isSwapAvailable();
  }, [inputAmount, input, iBalance, swapStatus, balanceAvailable]);

  const chosenInput = tokens.find((x) => x.address === input.toString());
  const chosenOutput = tokens.find((x) => x.address === output.toString());

  const getIOBalance = async () => {
    const [iResult, oResult] = await Promise.all([
      connection.getParsedTokenAccountsByOwner(wallet.publicKey as any, {
        mint: input
      }),
      connection.getParsedTokenAccountsByOwner(wallet.publicKey as any, {
        mint: output
      }),
    ]);

    if (iResult.value.length > 0) {
      const parsedInfo = iResult.value[0].account.data.parsed;
      const iTokenAmount = parsedInfo.info.tokenAmount.uiAmount;
      setIBalance(iTokenAmount);
    } else {
      setIBalance(0);
    }
    if (oResult.value.length > 0) {
      const parsedInfo = oResult.value[0].account.data.parsed;
      const oTokenAmount = parsedInfo.info.tokenAmount.uiAmount;
      setOBalance(oTokenAmount);
    } else {
      setOBalance(0);
    }
  };
  const getRoutes = async () => {
    if (inputAmount === 0) {
      setRate("0");
      setRoutes([]);
      SetTransactionFee(0);
      return;
    }

    const amount = inputAmount * 10 ** (chosenInput?.decimals || 6);
    if (amount === 0) {
      setBalanceAvailable(true);
      setSwapStatus(false);
      setRoutes([]);
      setRate("0");
      SetTransactionFee(0);
      return;
    }

    setRoutePending(true);

    const jupiter = await Jupiter.load({
      connection,
      cluster,
      platformFeeAndAccounts,
    });

    const computeRoutes = await jupiter.computeRoutes({
      inputMint: input,
      outputMint: output,
      inputAmount: +amount,
      slippage: 1,
    });

    if (computeRoutes.routesInfos.length > 0) {
      setSwapStatus(true);
      const rate = calcRate(computeRoutes.routesInfos, inputAmount);
      setRate(rate);
    } else {
      setSwapStatus(false);
      setRate("0");
    }

    setRoutes([]);
    setRoutes(computeRoutes.routesInfos);
    setSelected(computeRoutes.routesInfos[0] || undefined);
    SetTransactionFee(computeRoutes.routesInfos[0].marketInfos[0].lpFee.pct);

    setRoutePending(false);
  };

  const startSwap = async () => {
    if (routes.length <= 0) {
      alert("Routes are not found!");
      return;
    }

    setPending(true);

    if (
      wallet.publicKey &&
      wallet.signAllTransactions &&
      wallet.signTransaction &&
      wallet.sendTransaction
    ) {
      const jupiter = await Jupiter.load({
        connection,
        cluster,
        user: wallet.publicKey as any,
        platformFeeAndAccounts,
      });
      const { execute } = await jupiter.exchange({
        routeInfo: selected as any,
      });
      const swapResult = await execute({
        wallet: {
          sendTransaction: wallet.sendTransaction,
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        },
        onTransaction: async (txid) => {
          console.log("sending transaction");
          await connection.confirmTransaction(txid);
          console.log("confirmed transaction");

          return await connection.getTransaction(txid, {
            commitment: "confirmed",
          });
        },
      });
      console.log(swapResult);
      if ("error" in swapResult) {
        setSwapResult(false);
        alert(`Error:${swapResult.error}`);
      } else if ("txid" in swapResult) {
        setSwapResult(true);
        setShowNotification(true);
        console.log("Sucess:", swapResult.txid);
        console.log("Input:", swapResult.inputAmount);
        console.log("Output:", swapResult.outputAmount);
      }
    }

    setPending(false);
  };
  const getMaxAmount = () => {
    setRequestable(!requestable);
    if (wallet.connected) {
      const val = restrictDecimal(+iBalance);
      setInputAmount(val);
      if (inputAmount !== +iBalance) {
        setInputAmount(val);
      }
    } else {
      console.log("Please connect wallet");
    }
  };
  const getHalfAmount = () => {
    setRequestable(!requestable);
    if (wallet.connected) {
      const val = restrictDecimal(+iBalance / 2);
      setInputAmount(val);
      if (inputAmount !== +iBalance / 2) {
        setInputAmount(val);
      }
    } else {
      console.log("Please connect wallet");
    }
  };
  const onBlurIAmountEvent = () => {
    setRequestable(!requestable);
    if (
      routes.length === 0 ||
      inputAmount * 10 ** (chosenInput?.decimals || 6) !== routes[0].inAmount
    ) {
      getRoutes();
    }
  };
  const onTokenChangeEvent = () => {
    setInput(output);
    setOutput(input);
  };

  const getValidatedRouteText = () => {
    if (inputAmount > 0) {
      if (routes.length <= 0) {
        return "Routes are not found!";
      } else {
        if (!isRoutePending) {
          return routes.length + " routes found!";
        } else {
          return "Finding routes...";
        }
      }
    } else {
      return "Please input the amount";
    }
  };

  const swap = () => {
    if (wallet.connected) {
      return (
        <button
          id="swap-btn"
          onClick={startSwap}
          className={`flex items-center justify-center w-full gap-x-2 bg-gradient-to-r from-purple-1 to-purple-2 mt-6 px-5 py-4 text-lg font-medium rounded-lg ${
            isPending || !swapStatus ? "opacity-50" : ""
          }`}
          disabled={isPending || !swapStatus}
        >
          {/*<RefreshIcon className={"w-5 h-5"} />*/}
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
            "Swap " +
            (chosenInput && chosenInput.symbol) +
            " to " +
            (chosenOutput && chosenOutput.symbol)
          )}
        </button>
      );
    } else {
      return (
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
      );
      // return <WalletConnect />
    }
  };

  const calcRate = (allRoutes: any, inputVal: any) => {
    if (allRoutes.length > 0) {
      if (inputVal == 0) {
        return 0.0 + " ";
      } else {
        return (
          (
            allRoutes[0].outAmount /
            10 ** (chosenOutput as any).decimals /
            inputVal
          ).toFixed(6) + " "
        );
      }
    } else {
      return 0.0 + " ";
    }
  };

  const isSwapAvailable = () => {
    if (iBalance < inputAmount) {
      setBalanceAvailable(false);
      setSwapStatus(false);
    } else if (iBalance == inputAmount) {
      if (inputAmount === 0) {
        setSwapStatus(false);
        setBalanceAvailable(true);
      } else {
        setBalanceAvailable(true);
        setSwapStatus(true);
      }
    } else {
      if (inputAmount === 0) {
        setSwapStatus(false);
        setBalanceAvailable(true);
      } else {
        setSwapStatus(true);
        setBalanceAvailable(true);
      }
    }
  };

  const restrictDecimal = (val: any) => {
    return Number(val.toFixed(chosenInput?.decimals));
  };

  return (
    <section className="pt-6 pb-20">
      {showNotification ? (
        <Notification
          title={swapResult ? "Transaction Success!" : "Transaction Faild!"}
          source={swapResult ? "Transaction Success!" : "Transaction Faild!"}
          color={swapResult ? "bg-green-700" : "bg-red-700"}
        />
      ) : (
        ""
      )}
      <div className="flex flex-col gap-y-6 max-w-md mx-auto mt-6">
        <div className="bg-[#231f38] bg-opacity-80 shadow-xl rounded-xl shadow-half-strong border border-gray-800 p-8">
          <div className={"flex justify-between items-end mb-4"}>
            <label className="text-sm font-medium">Exchange From:</label>
            <div className="flex gap-x-2 items-center text-xs font-medium">
              <label>
                Balance:{" "}
                {(iBalance ? iBalance.toString() : "0") +
                  " " +
                  chosenInput?.symbol}
              </label>
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
              balanceAvailable ? "outline-hidden" : "outline outline-red-700"
            }`}
          >
            {chosenInput && (
              <button
                onClick={() => {
                  setMode(TokenChooserMode.Input);
                  setVisible(true);
                }}
                type="button"
                className="gap-x-2 py-2 px-2 rounded-lg flex items-center hover:bg-gray-500 hover:bg-opacity-10"
              >
                <img
                  src={chosenInput.logoURI}
                  className="w-5 h-5 rounded-full"
                  alt={chosenInput.symbol}
                />
                <div className="font-semibold" translate={"no"}>
                  {chosenInput.symbol}
                </div>
                <ChevronDownIcon className={"h-5"} />
              </button>
            )}
            <input
              type={"number"}
              inputMode="decimal"
              value={inputAmount}
              onChange={(e) => setInputAmount(restrictDecimal(+e.target.value))}
              onBlur={onBlurIAmountEvent}
              className={
                "bg-transparent outline-0 ring-0 border-transparent font-semibold text-right text-gray-300 text-lg w-full"
              }
            />
          </div>
          {!balanceAvailable ? (
            <div className="text-center text-red-500 text-xs my-4">
              Your balance is not enough to swap this amount
            </div>
          ) : (
            ""
          )}
          <button className="flex mx-auto" onClick={onTokenChangeEvent}>
            <svg
              className={"h-4 mt-5 mb-2 text-gray-300"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M19.3,13.1a.7.7,0,0,1,.5,1.192l-5.427,5.5a.7.7,0,1,1-1-.983L17.626,14.5H.7a.7.7,0,0,1,0-1.4ZM6.62.2a.7.7,0,0,1,.007.99L2.374,5.5H19.3a.7.7,0,0,1,0,1.4H.7A.7.7,0,0,1,.2,5.711L5.63.208A.7.7,0,0,1,6.62.2Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className={"flex justify-between items-end mb-4"}>
            <label className="text-sm font-medium">And Receive:</label>
            <div className="flex gap-x-2 items-center text-xs font-medium">
              <label>
                Balance:{" "}
                {(oBalance ? oBalance.toString() : "0") +
                  " " +
                  chosenOutput?.symbol}
              </label>
            </div>
          </div>
          <div className="relative flex justify-between items-center py-3">
            {chosenOutput && (
              <button
                type="button"
                onClick={() => {
                  setMode(TokenChooserMode.Output);
                  setVisible(true);
                }}
                className="flex gap-x-2 px-4 py-3 rounded-lg items-center bg-gray-500 bg-opacity-10 hover:bg-opacity-20"
              >
                <img
                  src={chosenOutput.logoURI}
                  className="w-5 h-5 rounded-full"
                  alt={chosenOutput.symbol}
                />
                <div className="font-semibold" translate={"no"}>
                  {chosenOutput.symbol}
                </div>
                <ChevronDownIcon className={"h-5"} />
              </button>
            )}
            <div className="font-semibold mr-3 text-gray-300 text-lg">
              {routes.length > 0
                ? routes[0].outAmount / 10 ** (chosenOutput as any).decimals
                : 0.0}
            </div>
          </div>
          <div className={"text-center text-gray-500 text-xs my-4"}>
            {getValidatedRouteText()}
          </div>
          <RadioGroup
            className={
              "mt-6 max-h-[11rem] -mx-4 px-4 scrollbar-thin scrollbar-thumb-purple-2 scrollbar-thumb-rounded-full"
            }
            value={selected}
            onChange={setSelected}
          >
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-4">
              {routes.length > 0 &&
                routes.map((route) => (
                  <RadioGroup.Option
                    key={route.marketInfos[0].marketMeta.amm.label}
                    value={route}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? "ring-2-ring-offset-2 ring-offset-purple-1 ring-purple-1 ring-opacity-60"
                          : ""
                      } ${
                        checked
                          ? "border-2 border-purple-2 bg-purple-2 bg-opacity-5"
                          : "border-2 border-transparent bg-white bg-opacity-5"
                      } relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex justify-between items-center w-full">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium ${
                                checked ? "text-white" : ""
                              }`}
                            >
                              {route.marketInfos[0].marketMeta.amm.label}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={"inline text-gray-400"}
                            >
                              <span>
                                {chosenInput && chosenInput.symbol}
                                <span className={"px-2"}>&rarr;</span>
                                {chosenOutput && chosenOutput.symbol}
                              </span>
                            </RadioGroup.Description>
                          </div>
                          <div>
                            {chosenOutput &&
                              route.outAmount /
                                10 ** chosenOutput.decimals}{" "}
                          </div>
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
            </div>
          </RadioGroup>
          {isRoutePending && routes.length > 0 && (
            <div className="w-[100%] min-h-[11rem] mt-[-11rem] z-[10] grid place-items-center backdrop-blur-[2px]">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white w-[48px] h-[48px] ml-[6px] mt-[0px]"
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
            </div>
          )}
          {swap()}
        </div>
        <div>
          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div className="text-black-50 dark:text-white-50">Rate</div>
              <div className="flex cursor-pointer text-black-50 dark:text-white-50 text-xs align-center text-right">
                <span className="min-w-[9.5rem] max-w-full whitespace-nowrap">
                  {rate == "0" ? 0 : 1} {chosenInput?.symbol} ≈ {rate}
                  {chosenOutput?.symbol}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="text-black-50 dark:text-white-50">
                Price Impact
              </div>
              <div className="text-black-50 dark:text-white-50">
                {selected?.marketInfos[0].priceImpactPct
                  ? (selected?.marketInfos[0].priceImpactPct).toFixed(4)
                  : 0}
                %
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="text-black-50 dark:text-white-50">
                Minimum Received
              </div>
              <div className="text-black-50 dark:text-white-50">
                {selected?.marketInfos[0].minOutAmount
                  ? selected?.marketInfos[0].minOutAmount
                  : 0}{" "}
                {chosenOutput?.symbol}
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="text-black-50 dark:text-white-50">
                <span>
                  Fees paid to <span translate="no">Raydium</span> LP
                </span>
              </div>
              <div className="text-black-50 dark:text-white-50">
                0.5 {chosenInput?.symbol} (
                {process.env.PLATFORM_FEE_PERCENTAGE as any}%)
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="text-black-50 dark:text-white-50">
                Transaction Fee
                <span
                  id="popover-trigger-7"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="popover-content-7"
                ></span>
              </div>
              <div className="text-black-50 dark:text-white-50">
                {transactionFee + " "}
                SOL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Swap;

import React, { useContext, useEffect, useState } from "react";
import { ArrowLeftIcon, CheckIcon, SwitchVerticalIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NftContext } from "../../context/NftContext";

import Card from "../../components/card";
import { useWalletModal } from "../../components/wallet-connector";
import { PublicKey } from "@solana/web3.js";
import { notification } from "../../utils/functions";
import Head from "next/head";
import { RadioGroup } from "@headlessui/react";

const Migrate = () => {
  const { sendTransaction } = useWallet();
  const { connection } = useConnection();
  const walletModal = useWalletModal();

  const { nfts, setNfts, user, wallet, getNFTList } = useContext(NftContext);
  const [isPending, setPending] = useState(false);

  useEffect(() => setSelected(nfts[0]), [nfts]);

  useEffect(() => {
    setPending(walletModal.visible);
  }, [walletModal.visible]);

  const [selected, setSelected] = useState<any>();

  const redeemNFT = async () => {
    const mintAddress = new PublicKey(selected.mint);
    try {
      const tx = await user.redeem(mintAddress);
      const signature = await sendTransaction(tx, connection);
      notification(
        "information",
        "Redeeming the NFT right now...",
        "Pending Transaction"
      );
      await connection.confirmTransaction(signature, "confirmed");
    }
    catch (err) {
      notification("danger", "Unable to redeem the NFT.", "Transaction Error");
      return false;
    }
    notification(
      "success",
      "Successfully redeemed NFT.",
      "Transaction Success"
    );

    setNfts([]);
    getNFTList();
  };

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | NFT Access Keys</title>
        <meta name="title" content="Parasol Finance ($PSOL) | NFT Access Keys"/>
        <meta property="og:image" content="/assets/preview/tiers.png" />
        <meta property="twitter:image" content="/assets/preview/tiers.png" />
      </Head>
      <section className={"py-6"}>
        <div className={"mx-auto max-w-md px-6 lg:px-0 space-y-6"}>
          <Link href={"/tiers"}>
            <a className="inline-flex gap-x-2 items-center py-3 rounded-lg text-gray-300">
              <ArrowLeftIcon className={"w-4"} />
              Back
            </a>
          </Link>
          <Card padded={true}>
            <div className={"space-y-6"}>
              <div className={"prose prose-lg prose-invert"}>
                <h2>Redeem NFT</h2>
                <p>
                You can burn your NFT and get back the amount of PSOL you invested by redeeming your NFT.
                </p>
                <p>
                Be careful about vesting, if you redeem quickly after the purchase you will incur penalties, please refer to the NFT page
                  {" "}<Link href={"/tiers"}>
                    <a>
                    here
                    </a>
                  </Link>.
                </p>
              </div>
              {nfts.length > 0 ? (
                <div>
                  <label className="block text-sm mb-3 font-medium text-blue-gray-900">
                  Available NFT Access Keys
                  </label>
                  <RadioGroup value={selected} onChange={setSelected}>
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
                </div>
              ) : (
                <div className={"prose prose-lg prose-invert"}>
                  <Link href={"/tiers"}>
                    <a className="inline-flex gap-x-2 items-centertext-gray-200">
                    No NFT Access Key. Please buy your NFT here.
                    </a>
                  </Link>
                </div>
              )}
              {wallet.connected ? (
                [
                  nfts.length > 0 ? (
                    <button
                      className={"w-full button"}
                      onClick={redeemNFT}
                    >
                      <SwitchVerticalIcon className={"w-5 h-5"} />
                    Redeem My NFT
                    </button>
                  ) : (
                    ""
                  ),
                ]
              ) : (
                <button
                  onClick={() => walletModal.setVisible(true)}
                  className="w-full button"
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
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Migrate;

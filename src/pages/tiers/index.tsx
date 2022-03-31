import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SwitchVerticalIcon, UploadIcon } from "@heroicons/react/outline";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Container from "../../components/container";
import NftCard from "../../components/cards/nft-card";
import Notification from "../../components/slices/notification";
import { NftContext } from "../../context/NftContext";
import { Keypair, PublicKey } from "@solana/web3.js";

const Tiers = function () {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const { wallet, user, nftKinds } = React.useContext(NftContext);

  const tiers = [
    {
      id: 0,
      name: "Dreamer",
      amount: 210,
      logo: "/images/tiers/covers/Dreamer.png",
      video: "https://parasol.finance/_nuxt/videos/1.4914065.mp4",
      vestingPeriod: 12,
    },
    {
      id: 1,
      name: "Rider",
      amount: 2100,
      logo: "/images/tiers/covers/Rider.png",
      video: "https://parasol.finance/_nuxt/videos/2.b97bbf5.mp4",
      vestingPeriod: 8,
    },
    {
      id: 2,
      name: "Chiller",
      amount: 21000,
      logo: "/images/tiers/covers/Chiller.png",
      video: "https://parasol.finance/_nuxt/videos/3.7803a7c.mp4",
      vestingPeriod: 6,
      owned: true
    },
    {
      id: 3,
      name: "MoonWalker",
      amount: 210000,
      logo: "/images/tiers/covers/MoonWalker.png",
      video: "https://parasol.finance/_nuxt/videos/4.93829ce.mp4",
      vestingPeriod: 4,
    },
  ];

  const [notificationMsg, setNotificationMsg] = useState({
    msg: "",
    status: "error",
  });

  const buyNFT = async (index: number) => {
    try {
      const mintKeypair = Keypair.generate();
      const tx = await user.purchase(mintKeypair.publicKey, nftKinds[index]);
      const signature = await sendTransaction(tx, connection, { signers: [mintKeypair] });
      setNotificationMsg({ msg: "Minting an NFT Now....", status: "pending" });
      await connection.confirmTransaction(signature, "confirmed");
    } catch (err) {
      setNotificationMsg({ msg: "Minting an NFT is failed!", status: "error" });
      return false;
    }
    setNotificationMsg({
      msg: "Successfully minted an NFT",
      status: "success",
    });
  };

  return (
    <>
      <section>
        <Container>
          <div className={"grid grid-cols-3  pt-10 pb-16"}>
            <div className={"flex gap-x-2 items-center"}></div>
            <div>
              <div className="text-center">
                <h2 className="text-base font-semibold tracking-wider mb-3 text-purple-400 uppercase">
                  An Unique System
                </h2>
                <a
                  id="features"
                  className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl"
                >
                  Our NFT Access Keys
                </a>
                <p className="mt-5 max-w-prose mx-auto text-sm lg:text-base text-gray-200">
                  Ready to Buy your NFT Access Key using $PSOL token?
                </p>
              </div>
            </div>
            {notificationMsg.msg.length > 0 ? (
              <Notification
                title={notificationMsg.msg}
                source={notificationMsg.msg}
                color={
                  notificationMsg.status == "pending"
                    ? "bg-gray-700"
                    : notificationMsg.status == "error"
                      ? "bg-red-700"
                      : "bg-green-700"
                }
              />
            ) : (
              ""
            )}
            <div className={"flex gap-x-2 justify-end items-center"}>
              <Link href={"/tiers/migrate"}>
                <a className="inline-flex relative gap-x-2 items-center border border-white border-opacity-30 hover:bg-white hover:bg-opacity-5 px-5 py-3 rounded-lg text-gray-300">
                  <UploadIcon className={"w-4"} />
                  Migrate
                </a>
              </Link>
              <Link href={"/tiers/redeem"}>
                <a className="inline-flex gap-x-2 items-center border border-white border-opacity-30 hover:bg-white hover:bg-opacity-5 px-5 py-3 rounded-lg text-gray-200">
                  <SwitchVerticalIcon className={"w-4"} />
                  Redeem
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container fluid={false}>
          <div className="grid grid-cols-4 gap-x-7">
            {tiers.map((t, index) => (
              <NftCard
                owned={t.owned}
                key={t.id}
                name={t.name}
                amount={t.amount}
                index={index}
                poster={t.logo}
                video={t.video}
                vestingPeriod={t.vestingPeriod}
                buyNFT={buyNFT}
                connected={wallet.connected}
              />
            ))}
          </div>
        </Container>
      </section>
      <section className={"mt-12"}>
        <Container>
          <div className="relative z-10 text-center py-10 mb-8 md:mb-2 md:px-6">
            <div className="text-base max-w-prose lg:max-w-none">
              <h2 className="leading-6 text-purple-400 font-semibold tracking-wide uppercase">
                NFTs as Tiers System
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                The Vital Concepts Behind Parasol
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative md:p-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose prose-invert prose-lg lg:max-w-none">
                  {/*<h2>What is an NFT?</h2>*/}
                  <p>
                    Non-fungible tokens, or NFTs, are the latest cryptocurrency
                    phenomenon to go mainstream in the industry. Non-fungible
                    tokens, or NFTs, are pieces of digital content directly
                    stored to the blockchain.
                  </p>
                  <p>
                    They are unique, non-interchangeable, and can represent
                    real-world objects like art, music, video games, and much
                    more. NFTs cannot be replicated on a whim.
                  </p>
                  <p>
                    They can be traded on a marketplace, staked on a platform,
                    or utilized for many interesting purposes. Which brings us
                    to Parasol Finance’s utility NFTs.
                  </p>
                </div>
                <div className="prose prose-invert prose-lg lg:mt-0">
                  {/*<h2>NFT’s as Key access</h2>*/}
                  <p>
                    Parasol Finance is adopting a unique and never-before-seen
                    mechanism for our upcoming IDO launchpad.
                  </p>
                  <p>
                    One of the first use cases we are currently planning with
                    Parasol NFTs is that they will act as keys that unlock
                    access to exclusive communities, events, and most
                    importantly, IDO allocations. These NFTs will represent a
                    user’s share of upcoming IDO sales and will be directly used
                    to purchase IDO tokens based on the user’s NFT.
                  </p>
                  <p>
                    This distinctive feature will set Parasol Finance apart from
                    the crowd by providing the Parasol community with
                    unparalleled utility for NFTs.
                  </p>
                </div>
              </div>
              {/*<div className="mt-12 flex justify-center rounded-md shadow">*/}
              {/*	<Button value="Read More" />*/}
              {/*</div>*/}
            </div>
          </div>
        </Container>
      </section>
      {/*<EyeCatcher />*/}
    </>
  );
};
export default Tiers;

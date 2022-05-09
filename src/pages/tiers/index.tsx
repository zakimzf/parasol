import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { Keypair } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { NftKind } from "parasol-finance-sdk";
import { SwitchVerticalIcon, UploadIcon } from "@heroicons/react/outline";

import Container from "components/container";
import NftCard from "components/cards/nft-card";
import { NftContext } from "context/NftContext";
import { globalErrorHandle, notification } from "utils/functions";

const Tiers = function () {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const [fetchTiers, setFetchTiers] = useState(false);
  const [tiers, setTiers] = useState<any>([
    {
      id: 0,
      name: "Dreamer",
      amount: 210,
      logo: "/assets/nft-access-keys/covers/Dreamer.png",
      video: "/assets/nft-access-keys/videos/Dreamer.mp4",
      vestingPeriod: 12,
    },
    {
      id: 1,
      name: "Rider",
      amount: 2100,
      logo: "/assets/nft-access-keys/covers/Rider.png",
      video: "/assets/nft-access-keys/videos/Rider.mp4",
      vestingPeriod: 8,
    },
    {
      id: 2,
      name: "Chiller",
      amount: 21000,
      logo: "/assets/nft-access-keys/covers/Chiller.png",
      video: "/assets/nft-access-keys/videos/Chiller.mp4",
      vestingPeriod: 6,
    },
    {
      id: 3,
      name: "MoonWalker",
      amount: 210000,
      logo: "/assets/nft-access-keys/covers/MoonWalker.png",
      video: "/assets/nft-access-keys/videos/MoonWalker.mp4",
      vestingPeriod: 4,
    },
  ]);

  const { provider, nfts, nftKinds, wallet, user } = useContext(NftContext);

  const buyNFT = async (index: number) => {
    try {
      const mintKeypair = Keypair.generate();
      const tx = await user.purchase(mintKeypair.publicKey, nftKinds[index]);
      const signature = await sendTransaction(tx, connection, {
        signers: [mintKeypair],
      });
      notification(
        "information",
        "Mining NFT right now...",
        "Pending Transaction"
      );
      await connection.confirmTransaction(signature, "confirmed");
      notification("success", "Successfully minted NFT", "Transaction Success");
    }
    catch (error: any) {
      globalErrorHandle(error);
    }
  };

  useEffect(() => {
    const nftKindData = async () => {
      const nftKinds = await Promise.all(
        [0, 1, 2, 3].map((tier) => new NftKind(provider, tier).build())
      );
      const tiersDataArray: any = tiers;
      await Promise.all(
        nftKinds.map(async (nftKind: any) => {
          tiersDataArray[nftKind.tier].data = await nftKind.data();
        })
      );
      setTiers(tiersDataArray);
      setFetchTiers(true);
    };
    nftKindData();
  }, []);

  const activeNft = (items: [any], tiers: any) => {
    return items.some((x) => x.attributes[0]["value"] == tiers.name);
  };

  return (
    <>
      <Head>
        <title>Parasol Finance ($PSOL) | NFT Access Keys</title>
        <meta
          name="title"
          content="Parasol Finance ($PSOL) | NFT Access Keys"
        />
        <meta property="og:image" content="/assets/preview/tiers.png" />
        <meta property="twitter:image" content="/assets/preview/tiers.png" />
      </Head>
      <section>
        <Container>
          <div className="grid pt-10 pb-16 md:grid-cols-3">
            <div className="flex items-center gap-x-2" />
            <div>
              <div className="text-center">
                <h2 className="mb-3 text-base font-semibold uppercase tracking-wider text-purple-400">
                  An Unique System
                </h2>
                <a
                  id="features"
                  className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
                >
                  Our NFT Access Keys
                </a>
                <p className="mx-auto mt-5 max-w-prose text-sm text-gray-200 lg:text-base">
                  Ready to Buy your NFT Access Key using $PSOL token?
                </p>
              </div>
            </div>
            <div
              className={
                "mt-5 flex items-center justify-center gap-x-2 md:justify-end"
              }
            >
              <Link href="/tiers/migrate">
                <a className="flex items-center gap-x-2 rounded-lg bg-white bg-opacity-5 px-5 py-3 text-gray-200 hover:bg-opacity-10">
                  <UploadIcon className="w-4" />
                  Migrate
                </a>
              </Link>
              <Link href="/tiers/redeem">
                <a className="flex items-center gap-x-2 rounded-lg bg-white bg-opacity-5 px-5 py-3 text-gray-200 hover:bg-opacity-10">
                  <SwitchVerticalIcon className="w-4" />
                  Redeem
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container fluid={false}>
          <div className="grid grid-cols-1 gap-x-7 sm:grid-cols-2 lg:grid-cols-4">
            {fetchTiers
              ? tiers.map((t: any, index: any) => (
                <NftCard
                  owned={activeNft(nfts, t)}
                  key={t.id}
                  id={t.id}
                  name={t.name}
                  amount={t.amount}
                  index={index}
                  poster={t.logo}
                  video={t.video}
                  vestingPeriod={t.vestingPeriod}
                  buyNFT={buyNFT}
                  connected={wallet.connected}
                  data={t.data && t.data}
                />
              ))
              : ""}
          </div>
        </Container>
      </section>
      <section className="mt-12">
        <Container>
          <div className="relative z-10 mb-8 py-10 text-center md:mb-2 md:px-6">
            <div className="text-base">
              <h2 className="font-semibold uppercase leading-6 tracking-wide text-purple-400">
                NFTs as Tiers System
              </h2>
              <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight sm:text-4xl">
                The Vital Concepts Behind Parasol
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="relative pb-6">
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="prose prose-lg prose-invert lg:max-w-none">
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
                <div className="prose prose-lg prose-invert lg:mt-0">
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
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default Tiers;

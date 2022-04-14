import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SwitchVerticalIcon, UploadIcon } from "@heroicons/react/outline";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Container from "../../components/container";
import NftCard from "../../components/cards/nft-card";
import { NftContext } from "../../context/NftContext";
import { Keypair } from "@solana/web3.js";
import { NftKind } from "parasol-finance-sdk";
import Head from "next/head";
import { notification } from "../../utils/functions";

const Tiers = function () {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const [ferchTiers, setFerchTiers] = useState(false);
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
      owned: true,
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

  const { provider, nfts, setNfts, wallet, user } =
    React.useContext(NftContext);

  const buyNFT = async (index: number) => {
    try {
      const mintKeypair = Keypair.generate();
      const tx = await user.purchase(mintKeypair.publicKey, index);
      const signature = await sendTransaction(tx, connection, {
        signers: [mintKeypair],
      });
      notification("information", "Mining NFT right now...", "Pending Transaction");
      await connection.confirmTransaction(signature, "confirmed");
    }
    catch (err) {
      notification("danger", "Unable to mint the NFT.", "Transaction Error");
      return false;
    }
    notification("success", "Successfully minted NFT", "Transaction Success");
  };

  useEffect(() => {
    const nftKindData = async () => {
      const nftKinds = await Promise.all(
        [0, 1, 2, 3].map((tier) => new NftKind(provider, tier).build())
      );
      const tiersDataArray: any = tiers;
      await Promise.all(
        nftKinds.map(async (nftKind: any) => {
          const data = await nftKind.data();
          tiersDataArray[nftKind.tier].data = data;
        })
      );
      setTiers(tiersDataArray);
      setFerchTiers(true);
    };
    nftKindData();
  }, []);

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
          <div className={"grid grid-cols-3  pt-10 pb-16"}>
            <div className={"flex gap-x-2 items-center"} />
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
            {ferchTiers
              ? tiers.map((t: any, index: any) => (
                <NftCard
                  owned={t.owned}
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
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default Tiers;

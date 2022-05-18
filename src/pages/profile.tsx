import React, { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { ExternalLinkIcon, TrendingUpIcon } from "@heroicons/react/outline";
import { useWallet } from "@solana/wallet-adapter-react";

import Container from "components/container";
import Layout from "components/layout";
import { NftContext } from "context/NftContext";

const Profile = function () {
  const { publicKey } = useWallet();
  const walletAddress = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const { nfts } = useContext(NftContext);
  const router = useRouter();

  useEffect(() => {
    if (walletAddress === undefined) {
      router.push("/404");
    }
  }, [walletAddress]);
  return (
    <Layout short={true}>
      <section className={"mt-6"}>
        <Container>
          <div className="md:flex md:items-center md:justify-between md:space-x-5">
            <div className="flex items-start space-x-5">
              <div className="pt-1.5">
                <h1 className="flex items-center gap-x-2 text-3xl mb-1 font-bold">
                  <span>Hey {walletAddress && walletAddress.slice(0, 8) + "..." || "buddy"} 👋</span>
                </h1>
                <p className="font-medium">
                  Welcome on your Parasol Finance Profile Page.
                </p>
              </div>
            </div>
            <div
              className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <Link href={"/tiers"}>
                <a
                  className="inline-flex gap-x-2 items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-purple-2 bg-white hover:bg-purple-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-2">
                  <TrendingUpIcon className={"w-5"}/>
                  Upgrade NFT Level
                </a>
              </Link>
              {/*<Link href={"/profile/kyc"}>*/}
              {/*  <a className="inline-flex gap-x-2 items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-purple-2 bg-white hover:bg-purple-2 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-2">*/}
              {/*    <FingerPrintIcon className={"w-5"} />*/}
              {/*    Apply KYC*/}
              {/*  </a>*/}
              {/*</Link>*/}
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <div className={"mb-6"}>
            <a className="text-xl font-bold text-white tracking-tight">
              Your NFT Access Keys
            </a>
            <p className="truncate mt-1 max-w-prose text-sm lg:text-base text-gray-200">
              Find all the NFTs that you own.
            </p>
          </div>
          {nfts.length > 0 ? (
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-5 lg:gap-x-8">
              {nfts.map((nft: any) => (
                <li key={nft.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <a
                        href={`https://explorer.solana.com/address/${nft.mint}`}
                        target={"_blank"}
                        rel={"noreferrer"}>
                        <img className="object-cover shadow-lg rounded-lg" src={nft.image} alt={nft.name}/>
                      </a>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium">
                        <h3 className={"mb-2"}>{nft.attributes[0].value}</h3>
                        <p className="text-purple-2 mb-3">{nft.name}</p>
                        <a
                          href={`https://explorer.solana.com/address/${nft.mint}`}
                          className={"flex gap-x-2 items-center text-sm"}
                          target={"_blank"}
                          rel={"noreferrer"}>
                          <ExternalLinkIcon className={"w-4 h-4"}/>
                          Open on Solscan
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <h2 className={"text-lg mb-1 font-medium"}>You don&apos;t have any NFT, order your first <Link href={"/tiers"}><a className={"text-purple-2"}>here</a></Link>.</h2>
            </div>
          )}
        </Container>
      </section>
    </Layout>
  );
}

export default Profile;
import React, { createContext, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Provider } from "@project-serum/anchor";
import { Migrator, NftKind, NftStore, NftStoreConfig, RpcHelper, User } from "parasol-finance-sdk";

import { PublicKey } from "@solana/web3.js";

interface Context {
  setNfts: (n: any) => void;
  nfts: any;
  nftStore: any;
  nftKinds: any;
  user: any;
  helper: any;
  migrator: any;
  wallet: any;
  config: any;
  provider: any,
}

export const NftContext = createContext<Context>({
  setNfts: () => {},
  nfts: [],
  provider: null,
  nftStore: null,
  nftKinds: null,
  user: null,
  helper: null,
  migrator: null,
  wallet: null,
  config: null,
});

export const NftProvider: React.FC<React.ReactNode> = ({ children }: any) => {
  const [nfts, setNfts] = useState<any>([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  const [nftStore, setNftStore] = useState<any>();
  const [nftKinds, setNftKinds] = useState<any>();
  const [user, setUser] = useState<any>();
  const [helper, setHelper] = useState<any>();
  const [migrator, setMigrator] = useState<any>();

  useEffect(() => {
    if (!wallet.connected) return;
    initParams();
  }, [wallet.connected]);

  const config: NftStoreConfig = {
    paymentMint: new PublicKey(process.env.NEXT_PUBLIC_MINT as any),
    collectionMint: new PublicKey(process.env.NEXT_PUBLIC_COLLECTION_MINT as any),
  };
  const provider = new Provider(connection, wallet as any, {
    preflightCommitment: "confirmed",
  });

  const initParams = async () => {
    const nftStore = await new NftStore(provider, config).build();
    setNftStore(nftStore);
    const nftKinds = await Promise.all([0,1,2,3].map((tier) => new NftKind(provider, tier).build()));
    setNftKinds(nftKinds);
    const user = await new User(provider, nftStore).build();
    setUser(user);
    const migrator = new Migrator(provider, user, nftKinds);
    setMigrator(migrator);
    const helper = new RpcHelper(provider);
    setHelper(helper);
  };

  const setData = (n: any): void => {
    setNfts(n);
  };
  return (
    <NftContext.Provider
      value={{
        setNfts: setData,
        nfts,
        provider,
        nftStore,
        nftKinds,
        user,
        helper,
        migrator,
        config,
        wallet: useWallet(),
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
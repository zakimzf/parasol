import React, { createContext, useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Provider } from "@project-serum/anchor";
import {
  NftKind,
  NftStore,
  NftStoreConfig,
  User,
  Migrator
} from "parasol-finance-sdk";

import { PublicKey } from "@solana/web3.js";

interface Context {
  setNfts: (n: any) => void;
  nfts: any;
  provider: any;
  nftStore: any;
  nftKinds: any;
  user: any;
  migrator: any;
  wallet: any;
  config: any;
}

export const NftContext = createContext<Context>({
  setNfts: () => {},
  nfts: [],
  provider: null,
  nftStore: null,
  nftKinds: null,
  user: null,
  migrator: null,
  wallet: null,
  config: null,
});

export const NftProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [nfts, setNfts] = useState<any>([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  const [nftStore, setNftStore] = useState<any>();
  const [nftKinds, setNftKinds] = useState<any>();
  const [user, setUser] = useState<any>();
  const [migrator, setMigrator] = useState<any>();

  useEffect(() => {
    if (!wallet.connected) return;
    initParams();
  }, [wallet.connected]);

  const config: NftStoreConfig = {
    paymentMint: new PublicKey(process.env.NEXT_PUBLIC_MINT as any),
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
        migrator,
        config,
        wallet: useWallet()
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

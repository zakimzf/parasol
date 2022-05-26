import React, { createContext, useEffect, useState } from "react";

import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  AnchorProvider,
  Migrator,
  NftKind,
  NftStore,
  NftStoreConfig,
  ProjectKind,
  RpcHelper,
  User,
} from "parasol-finance-sdk";

interface Context {
  setNfts: (n: any) => void;
  nfts: any;
  nftStore: any;
  nftKinds: any;
  projectKinds: any;
  user: any;
  helper: any;
  migrator: any;
  wallet: any;
  config: any;
  provider: any;
  getNFTList: () => void;
}

export const NftContext = createContext<Context>({
  setNfts: () => {},
  nfts: [],
  provider: null,
  nftStore: null,
  nftKinds: null,
  projectKinds: null,
  user: null,
  helper: null,
  migrator: null,
  wallet: null,
  config: null,
  getNFTList: () => {},
});

export const NftProvider = ({ children }: any) => {
  const [nfts, setNfts] = useState<any>([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  const [nftStore, setNftStore] = useState<any>();
  const [nftKinds, setNftKinds] = useState<any>();
  const [projectKinds, setProjectKinds] = useState<any>();
  const [user, setUser] = useState<any>();
  const [helper, setHelper] = useState<any>();
  const [migrator, setMigrator] = useState<any>();

  useEffect(() => {
    if (!wallet.connected) return;
    initParams();
  }, [wallet.connected]);

  const config: NftStoreConfig = {
    paymentMint: new PublicKey(process.env.NEXT_PUBLIC_PAYMENT_MINT as string),
    collectionMint: new PublicKey(
      process.env.NEXT_PUBLIC_COLLECTION_MINT as string
    ),
  };

  const provider = new AnchorProvider(connection, wallet as any, {
    preflightCommitment: "confirmed",
  });

  const initParams = async () => {
    const nftStore = await new NftStore(provider, config).build();
    setNftStore(nftStore);

    const nftKinds = await Promise.all(
      [0, 1, 2, 3].map((tier) => new NftKind(provider, tier).build())
    );
    setNftKinds(nftKinds);

    const projectKinds = await Promise.all(
      [0, 1, 2].map((tier) => new ProjectKind(provider, tier).build())
    );
    setProjectKinds(projectKinds);

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

  useEffect(() => {
    if (!wallet.connected) return;
    if (user) {
      getNFTList();
    }
  }, [wallet.connected, user]);

  const getNFTList = async () => {
    const nftsMetadata = await user.getNFTList();
    setNfts(nftsMetadata);
  };

  return (
    <NftContext.Provider
      value={{
        setNfts: setData,
        nfts,
        provider,
        nftStore,
        nftKinds,
        projectKinds,
        user,
        helper,
        migrator,
        config,
        wallet: useWallet(),
        getNFTList,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

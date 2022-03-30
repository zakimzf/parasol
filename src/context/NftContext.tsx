import React, { createContext, useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Provider } from "@project-serum/anchor";
import {
  NftStore,
  NftStoreConfig,
  User,
} from "parasol-finance-sdk";
import { PublicKey } from "@solana/web3.js";

interface Context {
  setNfts: (n: any) => void;
  nfts: any;
  nftStore: any;
  user: any;
  wallet: any;
  config: any;
}

export const NftContext = createContext<Context>({
  setNfts: () => {},
  nfts: [],
  nftStore: null,
  user: null,
  wallet: null,
  config: null,
});

export const NftProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [nfts, setNfts] = useState<any>([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  const [nftStore, setNftStore] = useState<any>();
  const [user, setUser] = useState<any>();

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
    const user = await new User(provider, nftStore).build();
    setUser(user);
  };

  const setData = (n: any): void => {
    setNfts(n);
  };
  return (
    <NftContext.Provider
      value={{
        setNfts: setData,
        nfts,
        nftStore,
        user,
        config,
        wallet: useWallet()
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

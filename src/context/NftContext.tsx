import React, { createContext, useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Provider } from "@project-serum/anchor";
import {
  NftStore,
  ProgramAdapter,
  ProgramConfig,
  User,
} from "parasol-finance-sdk";
import { PublicKey } from "@solana/web3.js";

interface Context {
  setNfts: (n: any) => void;
  nfts: any;
  adapter: any;
  nftStore: any;
  user: any;
  wallet: any;
}

export const NftContext = createContext<Context>({
  setNfts: () => {},
  nfts: [],
  adapter: null,
  nftStore: null,
  user: null,
  wallet: null,
});

export const NftProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [nfts, setNfts] = useState<any>([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  const [adapter, setAdapter] = useState<any>();
  const [nftStore, setNftStore] = useState<any>();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (!wallet.connected) return;
    initParams();
  }, [wallet.connected]);

  const config: ProgramConfig = {
    mint: new PublicKey(process.env.NEXT_PUBLIC_MINT as any),
  };

  const provider = new Provider(connection, wallet as any, {
    preflightCommitment: "confirmed",
  });


  const initParams = async () => {
    const adapter = await new ProgramAdapter(provider, config);
    setAdapter(adapter);
    const nftStore = await new NftStore(adapter.config.mint).build();
    setNftStore(nftStore);
    const user = await new User(adapter.program.provider, nftStore).build();
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
        adapter,
        nftStore,
        user,
        wallet: useWallet()
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

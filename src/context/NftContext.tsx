import React, { createContext, useState } from "react";

interface Context {
  setNfts: (n: any) => void;
  nfts: any;
}

export const NftContext = createContext<Context>({
  setNfts: () => {},
  nfts: [],
});

export const NftProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [nfts, setNfts] = useState<any>([]);

  const setData = (n: any): void => {
    setNfts(n);
  };
  return (
    <NftContext.Provider
      value={{
        setNfts: setData,
        nfts,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

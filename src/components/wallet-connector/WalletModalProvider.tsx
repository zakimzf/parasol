import React, { FC, useState } from "react";

import { WalletModalContext } from "./useWalletModal";
import { WalletModal } from "./WalletModal";

type WalletModalProviderProps = {
  children: React.ReactNode,
};

export const WalletModalProvider: FC<WalletModalProviderProps> = ({ children }: WalletModalProviderProps) => {
  const [visible, setVisible] = useState(false);
  return <WalletModalContext.Provider
    value={{
      visible,
      setVisible,
    }}>
    {children}
    <WalletModal />
  </WalletModalContext.Provider>
};

import React, { FC, useState } from "react";
import { PublicKey } from "@solana/web3.js";

import { TokenModal } from "./TokenModal";
import { TokenChooserContext, TokenChooserMode } from "./useTokenModal";

type TokenChooserProps = {
  children: React.ReactNode,
};

export const TokenModalProvider: FC<TokenChooserProps> = ({ children }: TokenChooserProps) => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState(TokenChooserMode.Input);
  const [input, setInput] = useState(new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"));
  const [output, setOutput] = useState(new PublicKey("PFo38bhqnYn9ntEs6GHN5LAi26QX1tBxMabmqu5LtX9"));
  return <TokenChooserContext.Provider
    value={{
      visible, setVisible,
      mode, setMode,
      input, setInput,
      output, setOutput,
    }}>
    {children}
    <TokenModal />
  </TokenChooserContext.Provider>
};

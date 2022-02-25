import React, { FC, useState } from 'react';
import { TokenModal } from "./TokenModal";
import { TokenChooserContext, TokenChooserMode } from './useTokenModal';
import { PublicKey } from "@solana/web3.js";

export const TokenModalProvider: FC = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState(TokenChooserMode.Input);
  const [input, setInput] = useState(new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"));
  const [output, setOutput] = useState(new PublicKey("Hmatmu1ktLbobSvim94mfpZmjL5iiyoM1zidtXJRAdLZ"));
  return <TokenChooserContext.Provider
    value={{
      visible, setVisible,
      mode, setMode,
      input, setInput,
      output, setOutput
    }}>
    {children}
    <TokenModal />
  </TokenChooserContext.Provider>
};

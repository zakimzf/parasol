import { createContext, useContext } from "react";

import { PublicKey } from "@solana/web3.js";

export enum TokenChooserMode {
  Input,
  Output
}

export interface TokenChooserContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
  mode: TokenChooserMode;
  setMode: (open: TokenChooserMode) => void;
  input: PublicKey;
  output: PublicKey;
  setInput: (token: PublicKey) => void;
  setOutput: (token: PublicKey) => void;
}

export const TokenChooserContext = createContext<TokenChooserContextState>({} as TokenChooserContextState);

export function useTokenModal (): TokenChooserContextState {
  return useContext(TokenChooserContext);
}

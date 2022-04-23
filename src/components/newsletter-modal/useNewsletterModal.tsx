import { createContext, useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export enum NewsletterChooserMode {
  Input,
  Output
}

export interface NewsletterChooserContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
  mode: NewsletterChooserMode;
  setMode: (open: NewsletterChooserMode) => void;
  input: PublicKey;
  output: PublicKey;
  setInput: (newsletter: PublicKey) => void;
  setOutput: (newsletter: PublicKey) => void;
}

export const NewsletterChooserContext = createContext<NewsletterChooserContextState>({} as NewsletterChooserContextState);

export function useNewsletterModal (): NewsletterChooserContextState {
  return useContext(NewsletterChooserContext);
}

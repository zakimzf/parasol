import { createContext, useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export enum NewsletterChooserMode {
  Input,
  Output
}

export interface NewsletterModalContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const NewsletterModalContext = createContext<NewsletterModalContextState>({} as NewsletterModalContextState);

export function useNewsletterModal (): NewsletterModalContextState {
  return useContext(NewsletterModalContext);
}

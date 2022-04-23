import { createContext, useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export enum NewsletterChooserMode {
  Input,
  Output
}

export interface NewsletterModalContextState {
  reminder: boolean;
  setReminder: (open: boolean) => void;
}

export const NewsletterModalContext = createContext<NewsletterModalContextState>({} as NewsletterModalContextState);

export function useNewsletterModal (): NewsletterModalContextState {
  return useContext(NewsletterModalContext);
}

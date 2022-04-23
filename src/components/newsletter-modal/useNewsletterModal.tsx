import { createContext, useContext } from "react";
import { PublicKey } from "@solana/web3.js";

export enum NewsletterChooserMode {
  Input,
  Output
}

export interface NewsletterChooserContextState {
  visible: boolean;
  setVisible: (open: boolean) => void;
}

export const NewsletterChooserContext = createContext<NewsletterChooserContextState>({} as NewsletterChooserContextState);

export function useNewsletterModal (): NewsletterChooserContextState {
  return useContext(NewsletterChooserContext);
}

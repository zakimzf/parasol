import React, { FC, useState } from "react";
import { PublicKey } from "@solana/web3.js";

import { NewsletterModal } from "./NewsletterModal";
import { NewsletterChooserContext, NewsletterChooserMode } from "./useNewsletterModal";

type NewsletterChooserProps = {
  children: React.ReactNode,
};

export const NewsletterModalProvider: FC<NewsletterChooserProps> = ({ children }: NewsletterChooserProps) => {
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState(NewsletterChooserMode.Input);
  const [input, setInput] = useState(new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"));
  const [output, setOutput] = useState(new PublicKey("Hmatmu1ktLbobSvim94mfpZmjL5iiyoM1zidtXJRAdLZ"));
  return <NewsletterChooserContext.Provider
    value={{
      visible, setVisible,
      mode, setMode,
      input, setInput,
      output, setOutput,
    }}>
    {children}
    <NewsletterModal />
  </NewsletterChooserContext.Provider>
};

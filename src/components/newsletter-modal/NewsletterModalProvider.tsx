import React, { FC, useState } from "react";
import { PublicKey } from "@solana/web3.js";

import { NewsletterModal } from "./NewsletterModal";
import { NewsletterModalContext, NewsletterChooserMode } from "./useNewsletterModal";

type NewsletterChooserProps = {
  children: React.ReactNode,
};

export const NewsletterModalProvider: FC<NewsletterChooserProps> = ({ children }: NewsletterChooserProps) => {
  const [visible, setVisible] = useState(false);
  return <NewsletterModalContext.Provider
    value={{
      visible, setVisible,
    }}>
    {children}
    <NewsletterModal />
  </NewsletterModalContext.Provider>
};

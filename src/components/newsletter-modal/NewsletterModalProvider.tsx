import React, { FC, useState } from "react";

import { NewsletterModal } from "./NewsletterModal";
import { NewsletterModalContext } from "./useNewsletterModal";

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

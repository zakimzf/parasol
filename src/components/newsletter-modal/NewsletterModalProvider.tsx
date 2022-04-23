import React, { FC, useState } from "react";

import { NewsletterModal } from "./NewsletterModal";
import { NewsletterModalContext } from "./useNewsletterModal";

type NewsletterChooserProps = {
  children: React.ReactNode,
};

export const NewsletterModalProvider: FC<NewsletterChooserProps> = ({ children }: NewsletterChooserProps) => {
  const [reminder, setReminder] = useState(false);
  return <NewsletterModalContext.Provider
    value={{
      reminder, setReminder,
    }}>
    {children}
    <NewsletterModal />
  </NewsletterModalContext.Provider>
};

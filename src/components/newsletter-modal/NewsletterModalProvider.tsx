import React, { FC, useState } from "react";

import { NewsletterModal } from "./NewsletterModal";
import { NewsletterModalContext } from "./useNewsletterModal";

type NewsletterChooserProps = {
  children: React.ReactNode,
};

export const NewsletterModalProvider: FC<NewsletterChooserProps> = ({ children }: NewsletterChooserProps) => {
  const [reminder, setReminder] = useState(false);
  const [projectKey, setProjectKey] = useState<any>();
  return <NewsletterModalContext.Provider
    value={{
      reminder, setReminder, projectKey, setProjectKey
    }}>
    {children}
    <NewsletterModal />
  </NewsletterModalContext.Provider>
};

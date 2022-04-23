import { createContext, useContext } from "react";

export interface NewsletterModalContextState {
  reminder: boolean;
  setReminder: (open: boolean) => void;
  projectKey: string;
  setProjectKey: (id: any) => void;
}

export const NewsletterModalContext = createContext<NewsletterModalContextState>({} as NewsletterModalContextState);

export function useNewsletterModal (): NewsletterModalContextState {
  return useContext(NewsletterModalContext);
}

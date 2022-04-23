import { createContext, useContext } from "react";

export interface ReminderModalContextState {
  reminder: boolean;
  setReminder: (open: boolean) => void;
  projectKey: string;
  setProjectKey: (id: any) => void;
}

export const ReminderModalContext = createContext<ReminderModalContextState>({} as ReminderModalContextState);

export function useReminderModal (): ReminderModalContextState {
  return useContext(ReminderModalContext);
}

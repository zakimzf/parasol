import React, { FC, useState } from "react";

import { ReminderModal } from "./ReminderModal";
import { ReminderModalContext } from "./useReminderModal";

type ReminderModalProviderProps = {
  children: React.ReactNode,
};

export const ReminderModalProvider: FC<ReminderModalProviderProps> = ({ children }: ReminderModalProviderProps) => {
  const [reminder, setReminder] = useState(false);
  const [projectKey, setProjectKey] = useState<any>();
  return <ReminderModalContext.Provider
    value={{
      reminder, setReminder, projectKey, setProjectKey
    }}>
    {children}
    <ReminderModal />
  </ReminderModalContext.Provider>
};

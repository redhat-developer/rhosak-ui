import type { FunctionComponent } from "react";
import { createContext, useContext, useState } from "react";
import type { KafkaInstance } from "ui";
import type { KafkaInstanceDrawerTab } from "ui";

const AppContext = createContext<{
  selectedInstance: KafkaInstance | undefined;
  selectInstance: (instance: KafkaInstance) => void;
  activeTab: KafkaInstanceDrawerTab;
  setActiveTab: (tab: KafkaInstanceDrawerTab) => void;
  deselectInstance: () => void;
}>(null!);

export const AppProvider: FunctionComponent = ({ children }) => {
  const [selectedInstance, setSelectedInstance] = useState<
    KafkaInstance | undefined
  >(undefined);
  const [activeTab, setActiveTab] = useState<KafkaInstanceDrawerTab>("details");

  return (
    <AppContext.Provider
      value={{
        selectedInstance,
        activeTab,
        setActiveTab,
        selectInstance: setSelectedInstance,
        deselectInstance: () => setSelectedInstance(undefined),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppProvider() {
  const context = useContext(AppContext);
  return context;
}

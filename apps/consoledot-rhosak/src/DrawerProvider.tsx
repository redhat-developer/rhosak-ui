import { useKafkaInstance } from "consoledot-api";
import type { FunctionComponent } from "react";
import { createContext, useContext, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import type { KafkaInstance, KafkaInstanceDrawerTab } from "ui";
import type { ControlPlaneRouteParams } from "./routes";
import { ControlPlaneRoutePath } from "./routes";

const DrawerContext = createContext<{
  selectedInstance: KafkaInstance | undefined;
  selectInstance: (id: string) => void;
  activeTab: KafkaInstanceDrawerTab;
  setActiveTab: (tab: KafkaInstanceDrawerTab) => void;
  deselectInstance: () => void;
}>(null!);

export const DrawerProvider: FunctionComponent = ({ children }) => {
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);
  const history = useHistory();
  if (!match) {
    throw Error("ConnectedHeader used outside the expected route");
  }
  const { data: selectedInstance } = useKafkaInstance(match.params.id);

  const selectInstance = (id: string) => {
    history.replace(`/streams/${id}`);
  };
  const deselectInstance = () => {
    history.replace(`/streams`);
  };
  const [activeTab, setActiveTab] = useState<KafkaInstanceDrawerTab>("details");

  return (
    <DrawerContext.Provider
      value={{
        selectedInstance,
        activeTab,
        setActiveTab,
        selectInstance,
        deselectInstance,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export function useDrawer() {
  const context = useContext(DrawerContext);
  return context;
}

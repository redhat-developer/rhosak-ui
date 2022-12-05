import type { FunctionComponent, MutableRefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouteMatch } from "react-router-dom";
import type { KafkaInstanceDrawerTab } from "ui";
import type { ControlPlaneRouteParams } from "./routes/streams/routes";
import { ControlPlaneRoutePath } from "./routes/streams/routes";

type DrawerContextProps = {
  selectedInstance: string | undefined;
  activeTab: KafkaInstanceDrawerTab;
  setActiveTab: (tab: KafkaInstanceDrawerTab) => void;
  isExpanded: boolean;
  toggleExpanded: (newState?: boolean) => void;
  onClose: MutableRefObject<(() => void) | undefined>;
};
const DrawerContext = createContext<DrawerContextProps>(null!);

export const DrawerProvider: FunctionComponent = ({ children }) => {
  const match = useRouteMatch<ControlPlaneRouteParams>(ControlPlaneRoutePath);
  if (!match) {
    throw Error("DrawerProvider used outside the expected route");
  }
  const selectedInstance = match.params.id;
  console.log("??", match.url, match.params);
  const [isExpanded, setIsExpanded] = useState(selectedInstance !== undefined);
  const [activeTab, setActiveTab] = useState<KafkaInstanceDrawerTab>("details");
  const onClose = useRef<() => void | undefined>();

  const toggleExpanded = useCallback((newValue: boolean | undefined) => {
    setIsExpanded((prev) => {
      const isExpanded = newValue !== undefined ? newValue : !prev;
      if (isExpanded === false && onClose.current) {
        onClose.current();
      }
      return isExpanded;
    });
  }, []);

  const value = useMemo(() => {
    const shouldBeExpanded = selectedInstance !== undefined && isExpanded;

    return {
      selectedInstance: selectedInstance,
      activeTab,
      setActiveTab,
      isExpanded: shouldBeExpanded,
      toggleExpanded,
      onClose,
    };
  }, [activeTab, isExpanded, selectedInstance, toggleExpanded]);

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};

export function useDrawer(onClose?: () => void) {
  const context = useContext(DrawerContext);
  context.onClose.current = onClose;
  return context;
}

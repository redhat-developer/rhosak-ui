import { useKafka, useSSOProvider } from "consoledot-api/src";
import type { FunctionComponent, MutableRefObject } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouteMatch } from "react-router-dom";
import type { KafkaInstanceDrawerTab } from "ui";
import { KafkaInstanceDrawer } from "ui";
import type { ControlPlaneRouteParams } from "./routesConsts";
import {
  ControlPlaneRoutePath,
  ControlPlaneSpecialSegments,
  DedicatedControlPlaneRouteMatch,
} from "./routesConsts";

type DrawerContextProps = {
  selectedInstance: string | undefined;
  activeTab: KafkaInstanceDrawerTab;
  setActiveTab: (tab: KafkaInstanceDrawerTab) => void;
  isExpanded: boolean;
  toggleExpanded: (newState?: boolean) => void;
  onClose: MutableRefObject<(() => void) | undefined>;
};
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const DrawerContext = createContext<DrawerContextProps>(null!);

export const DrawerProvider: FunctionComponent = ({ children }) => {
  const standardMatch = useRouteMatch<ControlPlaneRouteParams>(
    ControlPlaneRoutePath
  );
  const dedicatedMatch = useRouteMatch<ControlPlaneRouteParams>(
    DedicatedControlPlaneRouteMatch
  );
  const match = standardMatch || dedicatedMatch;
  if (!match) {
    throw Error("DrawerProvider used outside the expected route");
  }
  const selectedInstance =
    (match.params.id &&
      ControlPlaneSpecialSegments.includes(match.params.id)) ||
    match.params.section !== undefined
      ? undefined
      : match.params.id;
  const { data: instance } = useKafka(selectedInstance);
  const [isExpanded, setIsExpanded] = useState(
    selectedInstance !== undefined && match.isExact
  );
  const [activeTab, setActiveTab] = useState<KafkaInstanceDrawerTab>("details");
  const onClose = useRef<() => void | undefined>();

  const { data: tokenEndPointUrl } = useSSOProvider();

  const toggleExpanded = useCallback((newValue: boolean | undefined) => {
    setIsExpanded((prev) => {
      const isExpanded = newValue !== undefined ? newValue : !prev;
      if (isExpanded === false && onClose.current) {
        onClose.current();
      }
      return isExpanded;
    });
  }, []);

  useEffect(() => {
    if (!instance) {
      setIsExpanded(false);
    }
  }, [instance]);

  const value = useMemo(() => {
    const shouldBeExpanded = selectedInstance !== undefined && isExpanded;

    return {
      selectedInstance,
      activeTab,
      setActiveTab,
      isExpanded: shouldBeExpanded,
      toggleExpanded,
      onClose,
    };
  }, [activeTab, isExpanded, selectedInstance, toggleExpanded]);

  return (
    <DrawerContext.Provider value={value}>
      <KafkaInstanceDrawer
        instance={instance}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isExpanded={isExpanded}
        onClose={() => toggleExpanded(false)}
        tokenEndpointUrl={tokenEndPointUrl}
      >
        {children}
      </KafkaInstanceDrawer>
    </DrawerContext.Provider>
  );
};

export function useDrawer(onClose?: () => void) {
  const context = useContext(DrawerContext);
  context.onClose.current = onClose;
  return context;
}

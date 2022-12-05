import NotificationsPortal from "@redhat-cloud-services/frontend-components-notifications/NotificationPortal";
import { notificationsReducer } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { getRegistry } from "@redhat-cloud-services/frontend-components-utilities/Registry";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { useKafkaInstance } from "consoledot-api";
import { memo, useEffect } from "react";
import type { Reducer } from "redux";
import { KafkaInstanceDrawer } from "ui";

import "./App.scss";

import { AppRoutes } from "./AppRoutes";
import { useDrawer } from "./DrawerProvider";

const App = memo(() => {
  // const history = useHistory();
  const chrome = useChrome();

  const {
    selectedInstance,
    activeTab,
    setActiveTab,
    isExpanded,
    toggleExpanded,
  } = useDrawer();

  const { t } = useTranslation();
  const title = t("kafka:rhosakTitle");
  const { data: drawerInstance } = useKafkaInstance(selectedInstance);

  useEffect(() => {
    if (chrome) {
      const registry = getRegistry();
      registry.register({ notifications: notificationsReducer as Reducer });
      const { updateDocumentTitle } = chrome.init();

      updateDocumentTitle(title);
    }
  }, [chrome, title]);

  return (
    <>
      <NotificationsPortal />
      <KafkaInstanceDrawer
        instance={drawerInstance}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isExpanded={isExpanded}
        onClose={() => toggleExpanded(false)}
      >
        <AppRoutes />
      </KafkaInstanceDrawer>
    </>
  );
});

export default App;

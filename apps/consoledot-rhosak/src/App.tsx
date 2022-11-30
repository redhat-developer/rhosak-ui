import NotificationsPortal from "@redhat-cloud-services/frontend-components-notifications/NotificationPortal";
import { notificationsReducer } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { getRegistry } from "@redhat-cloud-services/frontend-components-utilities/Registry";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { memo, useEffect } from "react";
import type { Reducer } from "redux";
import { KafkaInstanceDrawer } from "ui";
import "./App.css";
import { useAppProvider } from "./AppProvider";

import { AppRoutes } from "./AppRoutes";

const App = memo(() => {
  // const history = useHistory();
  const chrome = useChrome();
  const { selectedInstance, activeTab, setActiveTab, deselectInstance } =
    useAppProvider();

  const { t } = useTranslation();
  const title = t("kafka:rhosakTitle");

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
        instance={selectedInstance}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={deselectInstance}
      >
        <AppRoutes />
      </KafkaInstanceDrawer>
    </>
  );
});

export default App;

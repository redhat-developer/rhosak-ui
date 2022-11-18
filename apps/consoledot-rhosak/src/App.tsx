import NotificationsPortal from "@redhat-cloud-services/frontend-components-notifications/NotificationPortal";
import { notificationsReducer } from "@redhat-cloud-services/frontend-components-notifications/redux";

import { getRegistry } from "@redhat-cloud-services/frontend-components-utilities/Registry";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import type { OnChromeEvent } from "@redhat-cloud-services/types";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { Reducer } from "redux";
import "./App.css";

import { AppRoutes } from "./AppRoutes";

const App = () => {
  const history = useHistory();
  const chrome = useChrome();
  const { t } = useTranslation();
  const title = t("kafka:rhosakTitle");

  useEffect(() => {
    let unregister: ReturnType<typeof OnChromeEvent>;
    if (chrome) {
      const registry = getRegistry();
      registry.register({ notifications: notificationsReducer as Reducer });
      const { updateDocumentTitle, on } = chrome.init();

      updateDocumentTitle(title);
      unregister = on(
        "APP_NAVIGATION",
        (event) => event.navId && history.push(`/${event.navId}`)
      );
    }
    return () => {
      unregister && unregister();
    };
  }, [history, chrome, title]);

  return (
    <>
      <NotificationsPortal />
      <AppRoutes />
    </>
  );
};

export default App;

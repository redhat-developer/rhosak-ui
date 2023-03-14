import NotificationsPortal from "@redhat-cloud-services/frontend-components-notifications/NotificationPortal";
import { notificationsReducer } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { getRegistry } from "@redhat-cloud-services/frontend-components-utilities/Registry";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { memo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import type { Reducer } from "redux";

import "./App.scss";

import { Routes } from "./routes";

const App = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const history = useHistory();
  const { updateDocumentTitle, on } = useChrome();

  const { t } = useTranslation();
  const title = t("kafka:rhosakTitle");

  useEffect(() => {
    const registry = getRegistry();
    registry.register({ notifications: notificationsReducer as Reducer });

    updateDocumentTitle(title);

    const unregister = on("APP_NAVIGATION", (event) => {
      console.dir(event);
      if (event.navId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        history.push("/" + event.navId === "/" ? "" : event.navId);
      }
    });
    return () => {
      if (unregister) {
        unregister();
      }
    };
  }, [history, on, title, updateDocumentTitle]);

  return (
    <>
      <NotificationsPortal />
      <Routes />
    </>
  );
});

export default App;

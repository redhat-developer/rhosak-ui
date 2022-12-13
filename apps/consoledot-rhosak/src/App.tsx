import NotificationsPortal from "@redhat-cloud-services/frontend-components-notifications/NotificationPortal";
import { notificationsReducer } from "@redhat-cloud-services/frontend-components-notifications/redux";
import { getRegistry } from "@redhat-cloud-services/frontend-components-utilities/Registry";
import { useChrome } from "@redhat-cloud-services/frontend-components/useChrome";
import { useTranslation } from "@rhoas/app-services-ui-components";
import { memo, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import type { Reducer } from "redux";

import "./App.scss";
import { DrawerProvider } from "./DrawerProvider";
import { OverviewRoute } from "./routes/overview/OverviewRoute";

import { StreamsRoutes } from "./routes/StreamsRoutes";

const App = memo(() => {
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
      event.navId && history.push("/" + event.navId === "/" ? "" : event.navId);
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
      <Switch>
        <Route path={"/overview"} exact>
          <OverviewRoute />
        </Route>
        <Redirect from={"/"} to={"/kafkas"} exact />
        <Route path={"/kafkas"}>
          <DrawerProvider>
            <StreamsRoutes />
          </DrawerProvider>
        </Route>
        <Route path={""} exact></Route>
      </Switch>
    </>
  );
});

export default App;
